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
import { Contact, Team, Department, Sport } from "@/types/teams";
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
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [revealedEmails, setRevealedEmails] = useState<Set<string>>(new Set());
  const [revealedPhones, setRevealedPhones] = useState<Set<string>>(new Set());
  const itemsPerPage = 10;

  const { lists } = useLists();
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch contacts with related data
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select(`
          *,
          team:teams(
            id,
            name,
            sport:sports(id, name)
          ),
          department:departments(id, name),
          sport:sports(id, name)
        `)
        .order('first_name');

      if (contactsError) {
        console.error('Error fetching contacts:', contactsError);
        return;
      }

      // Fetch teams
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select('*')
        .order('name');

      if (teamsError) {
        console.error('Error fetching teams:', teamsError);
        return;
      }

      // Fetch sports
      const { data: sportsData, error: sportsError } = await supabase
        .from('sports')
        .select('*')
        .order('name');

      if (sportsError) {
        console.error('Error fetching sports:', sportsError);
        return;
      }

      setContacts(contactsData as Contact[] || []);
      setTeams(teamsData || []);
      setSports(sportsData || []);
    } catch (error) {
      console.error('Error in fetchData:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery, selectedTeam, selectedRole, selectedSport]);

  const filterContacts = () => {
    let filtered = contacts;

    if (searchQuery) {
      filtered = filtered.filter(contact =>
        contact.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.team?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTeam && selectedTeam !== "all") {
      filtered = filtered.filter(contact => contact.team_id === selectedTeam);
    }

    if (selectedRole && selectedRole !== "all") {
      filtered = filtered.filter(contact => contact.position === selectedRole);
    }

    if (selectedSport && selectedSport !== "all") {
      filtered = filtered.filter(contact => 
        contact.sport_id === selectedSport || contact.team?.sport?.id === selectedSport
      );
    }

    setFilteredContacts(filtered);
    setCurrentPage(1);
  };

  const handleRevealEmail = async (contactId: string) => {
    if (!user) {
      toast.error("Please sign in to reveal contact details");
      return;
    }

    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profileData) {
        toast.error("Profile not found");
        return;
      }

      const { error } = await supabase
        .from('revealed_details')
        .insert({
          profile_id: profileData.id,
          contact_id: contactId,
          field_name: 'email'
        });

      if (error) {
        console.error('Error saving revealed detail:', error);
      }

      setRevealedEmails(prev => new Set([...prev, contactId]));
      toast.success("Email revealed!");
    } catch (error) {
      console.error('Error revealing email:', error);
      toast.error("Failed to reveal email");
    }
  };

  const handleRevealPhone = async (contactId: string) => {
    if (!user) {
      toast.error("Please sign in to reveal contact details");
      return;
    }

    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profileData) {
        toast.error("Profile not found");
        return;
      }

      const { error } = await supabase
        .from('revealed_details')
        .insert({
          profile_id: profileData.id,
          contact_id: contactId,
          field_name: 'phone'
        });

      if (error) {
        console.error('Error saving revealed detail:', error);
      }

      setRevealedPhones(prev => new Set([...prev, contactId]));
      toast.success("Phone revealed!");
    } catch (error) {
      console.error('Error revealing phone:', error);
      toast.error("Failed to reveal phone");
    }
  };

  const generateDummyPhone = (contactId: string) => {
    const hash = contactId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const phoneNumber = Math.abs(hash).toString().padStart(10, '0').slice(0, 10);
    return `+44 ${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7)}`;
  };

  const getProfileImage = (contactId: string) => {
    const images = [profile1, profile2, profile3, profile4, profile5];
    const hash = contactId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return images[Math.abs(hash) % images.length];
  };

  const exportToExcel = () => {
    const exportData = filteredContacts.map(contact => ({
      'First Name': contact.first_name,
      'Last Name': contact.last_name,
      'Position': contact.position || '',
      'Team': contact.team?.name || '',
      'Sport': contact.sport?.name || contact.team?.sport?.name || '',
      'Email': revealedEmails.has(contact.id) ? contact.email : 'Hidden',
      'Phone': revealedPhones.has(contact.id) ? contact.phone : 'Hidden',
      'LinkedIn': contact.linkedin || '',
      'Notes': contact.notes || ''
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts_export.xlsx");
    toast.success("Contacts exported successfully!");
  };

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">People</h1>
          <p className="text-muted-foreground">Contact Directory</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex h-full">
          {/* Left Sidebar - Filters */}
          <div className="w-80 border-r p-6 bg-muted/30 rounded-lg mr-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Search & Filter</h3>
                
                {/* Search Input */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search people..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Team Filter */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Team</label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="All teams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All teams</SelectItem>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Role Filter */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All roles</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Director">Director</SelectItem>
                      <SelectItem value="CEO">CEO</SelectItem>
                      <SelectItem value="Head of Marketing">Head of Marketing</SelectItem>
                      <SelectItem value="Commercial Director">Commercial Director</SelectItem>
                      <SelectItem value="Communications Manager">Communications Manager</SelectItem>
                      <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                      <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                      <SelectItem value="Secretary">Secretary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sport Filter */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Sport</label>
                  <Select value={selectedSport} onValueChange={setSelectedSport}>
                    <SelectTrigger>
                      <SelectValue placeholder="All sports" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All sports</SelectItem>
                      {sports.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id}>
                          {sport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {filteredContacts.length} contacts found
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Contact Directory</h2>
                  <p className="text-muted-foreground">Browse and manage sports industry contacts</p>
                </div>
                <Button onClick={exportToExcel} className="gap-2">
                  <Download className="h-4 w-4" />
                  Export to Excel
                </Button>
              </div>

              {/* Contact Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead className="w-48">Name</TableHead>
                        <TableHead className="w-36">Role</TableHead>
                        <TableHead className="w-40">Club</TableHead>
                        <TableHead className="w-28">Sport</TableHead>
                        <TableHead className="w-60">Contact Details</TableHead>
                        <TableHead className="w-24">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentContacts.map((contact) => (
                        <TableRow key={contact.id} className="h-16">
                          <TableCell>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={getProfileImage(contact.id)} />
                              <AvatarFallback className="text-sm">
                                {contact.first_name[0]}{contact.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {contact.first_name} {contact.last_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-sm">
                              {contact.position || "Not specified"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="truncate">{contact.team?.name || "No team"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-sm">
                              {contact.sport?.name || contact.team?.sport?.name || "No sport"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {contact.email && (
                                revealedEmails.has(contact.id) ? (
                                  <div className="flex items-center gap-1 text-xs">
                                    <Mail className="h-3 w-3" />
                                    <a href={`mailto:${contact.email}`} className="hover:text-primary truncate">
                                      {contact.email}
                                    </a>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-xs">
                                    <Mail className="h-3 w-3" />
                                    <span className="text-muted-foreground">****@****.com</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRevealEmail(contact.id)}
                                      className="h-4 w-4 p-0"
                                    >
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )
                              )}
                              {revealedPhones.has(contact.id) ? (
                                <div className="flex items-center gap-1 text-xs">
                                  <Phone className="h-3 w-3" />
                                  <a href={`tel:${generateDummyPhone(contact.id)}`} className="hover:text-primary">
                                    {generateDummyPhone(contact.id)}
                                  </a>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-xs">
                                  <Phone className="h-3 w-3" />
                                  <span className="text-muted-foreground">+44 *** ***</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRevealPhone(contact.id)}
                                    className="h-4 w-4 p-0"
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="p-1">
                            <div className="flex items-center gap-1">
                              {contact.linkedin && (
                                <Button variant="ghost" size="sm" asChild className="h-6 w-6 p-0">
                                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-3 w-3" />
                                  </a>
                                </Button>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-6 w-6 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-3 w-3"
                                    >
                                      <circle cx="12" cy="12" r="1" />
                                      <circle cx="12" cy="5" r="1" />
                                      <circle cx="12" cy="19" r="1" />
                                    </svg>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add to list
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
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
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
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
        </div>
      </div>
    </div>
  );
};

export default People;