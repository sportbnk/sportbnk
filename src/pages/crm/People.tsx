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
  const [revealedLinkedIns, setRevealedLinkedIns] = useState<Set<string>>(new Set());
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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTeam("");
    setSelectedRole("");
    setSelectedSport("");
  };

  const hasActiveFilters = searchQuery || selectedTeam || selectedRole || selectedSport;

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
          field_name: 'linkedin'
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

  const handleRevealLinkedIn = async (contactId: string) => {
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
          field_name: 'linkedin'
        });

      if (error) {
        console.error('Error saving revealed detail:', error);
      }

      setRevealedLinkedIns(prev => new Set([...prev, contactId]));
      toast.success("LinkedIn revealed!");
    } catch (error) {
      console.error('Error revealing linkedin:', error);
      toast.error("Failed to reveal LinkedIn");
    }
  };

  const getProfileImage = (contactId: string) => {
    const images = [profile1, profile2, profile3, profile4, profile5];
    const hash = contactId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return images[Math.abs(hash) % images.length];
  };

  const generateDummyPhone = (contactId: string) => {
    const hash = contactId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const phoneNumber = Math.abs(hash).toString().padStart(10, '0').slice(0, 10);
    return `+44 ${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7)}`;
  };

  const generateDummyLinkedIn = (contact: Contact) => {
    const firstName = contact.first_name.toLowerCase().replace(/\s+/g, '');
    const lastName = contact.last_name.toLowerCase().replace(/\s+/g, '');
    return `https://linkedin.com/in/${firstName}-${lastName}-${contact.id.slice(0, 8)}`;
  };

  const generateDummyEmail = (contact: Contact) => {
    const firstName = contact.first_name.toLowerCase().replace(/\s+/g, '');
    const lastName = contact.last_name.toLowerCase().replace(/\s+/g, '');
    const domain = contact.team?.name ? 
      contact.team.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '') + '.com' : 
      'example.com';
    return `${firstName}.${lastName}@${domain}`;
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
      'LinkedIn': revealedLinkedIns.has(contact.id) ? contact.linkedin : 'Hidden',
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
      <div className="flex gap-6 h-full">
        {/* Sidebar Skeleton */}
        <div className="w-80 space-y-4">
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
                <SelectContent className="bg-popover border-border z-50">
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
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="all">All Roles</SelectItem>
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
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Sport</label>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="bg-background border-border h-8 text-xs">
                  <SelectValue placeholder="All Sports" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="all">All Sports</SelectItem>
                  {sports.map((sport) => (
                    <SelectItem key={sport.id} value={sport.id}>
                      {sport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">
                {filteredContacts.length} contacts found
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">People</h1>
              <p className="text-sm text-muted-foreground">Browse and manage sports industry contacts</p>
            </div>
            <Button onClick={exportToExcel} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Contact Table */}
          <Card className="shadow-sm border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Team</TableHead>
                      <TableHead className="font-semibold">Sport</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Phone</TableHead>
                      <TableHead className="font-semibold">LinkedIn</TableHead>
                      <TableHead className="font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentContacts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12">
                          <div className="flex flex-col items-center gap-3">
                            <User className="h-12 w-12 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-foreground">No contacts found</p>
                              <p className="text-sm text-muted-foreground">
                                Try adjusting your filters or search terms
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentContacts.map((contact) => (
                        <TableRow 
                          key={contact.id} 
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={getProfileImage(contact.id)} />
                                <AvatarFallback className="text-xs">
                                  {contact.first_name[0]}{contact.last_name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground text-sm">
                                  {contact.first_name} {contact.last_name}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-medium text-xs">
                              {contact.position || "Not specified"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-foreground truncate">
                                {contact.team?.name || "No team"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-medium text-xs">
                              {contact.sport?.name || contact.team?.sport?.name || "No sport"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {revealedEmails.has(contact.id) ? (
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <a 
                                  href={`mailto:${contact.email || generateDummyEmail(contact)}`} 
                                  className="text-sm text-foreground hover:text-primary truncate"
                                >
                                  {contact.email || generateDummyEmail(contact)}
                                </a>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRevealEmail(contact.id)}
                                className="h-6 px-2 text-xs bg-primary/10 hover:bg-primary/20 border-primary/20"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Reveal
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            {revealedPhones.has(contact.id) ? (
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <a 
                                  href={`tel:${contact.phone || generateDummyPhone(contact.id)}`} 
                                  className="text-sm text-foreground hover:text-primary"
                                >
                                  {contact.phone || generateDummyPhone(contact.id)}
                                </a>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRevealPhone(contact.id)}
                                className="h-6 px-2 text-xs bg-primary/10 hover:bg-primary/20 border-primary/20"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Reveal
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            {revealedLinkedIns.has(contact.id) ? (
                              <div className="flex items-center gap-2">
                                <Linkedin className="h-3 w-3 text-muted-foreground" />
                                <a 
                                  href={contact.linkedin || generateDummyLinkedIn(contact)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-foreground hover:text-primary"
                                >
                                  Profile
                                </a>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRevealLinkedIn(contact.id)}
                                className="h-6 px-2 text-xs bg-primary/10 hover:bg-primary/20 border-primary/20"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Reveal
                              </Button>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                // Add to list functionality will be implemented
                                toast.success("Contact added to list!");
                              }}
                              className="gap-1"
                            >
                              <Plus className="h-4 w-4" />
                              Add to List
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
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
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default People;