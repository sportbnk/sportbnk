import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from '@/components/ui/skeleton';
import { Search, User, Building2, MapPin, Mail, Phone, Linkedin, Twitter, Instagram, Facebook, Filter, X, Eye, ExternalLink, Plus, Lock, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Contact, Team, Department } from "@/types/teams";
import { useLists } from "@/contexts/ListsContext";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";
import * as XLSX from 'xlsx';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profile1 from "@/assets/profiles/profile-1.jpg";
import profile2 from "@/assets/profiles/profile-2.jpg";
import profile3 from "@/assets/profiles/profile-3.jpg";
import profile4 from "@/assets/profiles/profile-4.jpg";
import profile5 from "@/assets/profiles/profile-5.jpg";

const People = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [revealedEmails, setRevealedEmails] = useState<Set<string>>(new Set());
  const [revealedPhones, setRevealedPhones] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  
  const { lists, addItemToList } = useLists();
  const { user } = useAuth();
  
  const ITEMS_PER_PAGE = 50;

  // Specific roles to filter by
  const allowedRoles = [
    "CEO",
    "CFO", 
    "Director of Football",
    "Director of Cricket",
    "COO",
    "Head of Commercial"
  ];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTeam("all");
    setSelectedRole("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedTeam !== "all" || selectedRole !== "all";

  // Calculate pagination values
  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery, selectedTeam, selectedRole]);

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchQuery, selectedTeam, selectedRole]);

  const fetchData = async () => {
    try {
      // Fetch contacts with related data
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select(`
          *,
          team:teams(*),
          department:departments(*)
        `)
        .order('first_name');

      if (contactsError) throw contactsError;

      // Fetch filter options - only teams needed now
      const teamsResult = await supabase.from('teams').select('*').order('name');

      setContacts(contactsData || []);
      setTeams(teamsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    if (searchQuery) {
      filtered = filtered.filter(contact =>
        contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.position?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTeam && selectedTeam !== "all") {
      filtered = filtered.filter(contact => contact.team_id === selectedTeam);
    }

    if (selectedRole && selectedRole !== "all") {
      filtered = filtered.filter(contact => 
        contact.position && contact.position.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  };

  const handleRevealEmail = (contactId: string) => {
    setRevealedEmails(prev => new Set([...prev, contactId]));
    toast.success("Email revealed!");
  };

  const handleRevealPhone = (contactId: string) => {
    setRevealedPhones(prev => new Set([...prev, contactId]));
    toast.success("Phone number revealed!");
  };

  const handleAddToList = async (listId: string, contactId: string, contactName: string) => {
    try {
      await addItemToList(listId, contactId, null);
      toast.success(`Added ${contactName} to list`);
    } catch (error) {
      toast.error("Failed to add to list");
    }
  };

  const generateDummyPhone = (contactId: string) => {
    // Generate consistent dummy phone based on contact ID
    const hash = contactId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const phoneNumber = Math.abs(hash) % 10000000000;
    return `+44 ${phoneNumber.toString().padStart(10, '0').replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}`;
  };

  // Sample profile images for demonstration
  const getProfileImage = (contactId: string) => {
    const profileImages = [profile1, profile2, profile3, profile4, profile5];
    const hash = contactId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Only show images for some contacts (about 30%)
    if (Math.abs(hash) % 10 < 3) {
      return profileImages[Math.abs(hash) % profileImages.length];
    }
    return null;
  };

  const exportToExcel = () => {
    if (filteredContacts.length === 0) {
      toast.error("No data to export");
      return;
    }

    const csvData = filteredContacts.map(contact => ({
      'First Name': contact.first_name,
      'Last Name': contact.last_name,
      'Role': contact.position || '',
      'Team': contact.team?.name || '',
      'Email': contact.email || '',
      'Phone': contact.phone || contact.mobile || generateDummyPhone(contact.id),
      'LinkedIn': `https://linkedin.com/in/${contact.first_name.toLowerCase()}-${contact.last_name.toLowerCase()}`,
      'Notes': contact.notes || ''
    }));

    // Create workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People Data");

    // Set column widths for better readability
    const wscols = [
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 25 }, // Role
      { wch: 25 }, // Team
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 40 }, // LinkedIn
      { wch: 30 }  // Notes
    ];
    ws['!cols'] = wscols;

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `people_export_${date}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);

    toast.success(`Exported ${filteredContacts.length} contacts to ${filename}`);
  };

  if (loading) {
    return (
      <div className="flex gap-6 h-full">
        {/* Sidebar Skeleton */}
        <div className="w-64 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-full">
      {/* Left Sidebar - Filters */}
      <div className="w-64 flex-shrink-0">
        <Card className="shadow-sm border-border sticky top-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground text-base">
              <Filter className="h-4 w-4 text-primary" />
              Filters
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto h-6 px-2 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Search */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-background border-border h-8 text-xs"
                />
              </div>
            </div>

            {/* Team Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Team</label>
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="bg-background border-border h-8 text-xs">
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="bg-background border-border h-8 text-xs">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Roles</SelectItem>
                  {allowedRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length} people
                {totalPages > 1 && (
                  <span className="block mt-1">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">People</h1>
            <p className="text-muted-foreground text-sm">
              Manage contacts and team members in your database
            </p>
          </div>
          <Button
            onClick={exportToExcel}
            className="flex items-center gap-2"
            disabled={filteredContacts.length === 0}
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        </div>

        {/* Results Table */}
        <Card className="shadow-sm border-border">
          <div className="rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Club</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Phone</TableHead>
                  <TableHead className="font-semibold">LinkedIn</TableHead>
                  <TableHead className="font-semibold text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedContacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <User className="h-12 w-12 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">No people found</p>
                          <p className="text-sm text-muted-foreground">
                            Try adjusting your filters or search terms
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedContacts.map((contact) => (
                    <TableRow 
                      key={contact.id} 
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getProfileImage(contact.id) ? (
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={getProfileImage(contact.id)} alt={`${contact.first_name} ${contact.last_name}`} />
                              <AvatarFallback>
                                <User className="h-5 w-5 text-muted-foreground" />
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shadow-soft">
                              <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-foreground">
                              {contact.first_name} {contact.last_name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {contact.position ? (
                          <Badge variant="secondary" className="font-medium">
                            {contact.position}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-foreground font-medium">
                          {contact.team?.name || '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {revealedEmails.has(contact.id) ? (
                          contact.email ? (
                            <a 
                              href={`mailto:${contact.email}`}
                              className="text-primary hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {contact.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">No email</span>
                          )
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRevealEmail(contact.id);
                            }}
                          >
                            <Lock className="h-3 w-3 mr-1" />
                            Reveal
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        {revealedPhones.has(contact.id) ? (
                          <span className="text-foreground">
                            {generateDummyPhone(contact.id)}
                          </span>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRevealPhone(contact.id);
                            }}
                          >
                            <Lock className="h-3 w-3 mr-1" />
                            Reveal
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`https://linkedin.com/in/${contact.first_name.toLowerCase()}-${contact.last_name.toLowerCase()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        {user && lists.length > 0 ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border">
                              {lists.map((list) => (
                                <DropdownMenuItem
                                  key={list.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToList(list.id, contact.id, `${contact.first_name} ${contact.last_name}`);
                                  }}
                                  className="cursor-pointer"
                                >
                                  Add to {list.name}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-50"
                            disabled
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default People;