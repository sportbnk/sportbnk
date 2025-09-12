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
import { Skeleton } from '@/components/ui/skeleton';
import { Search, User, Building2, MapPin, Mail, Phone, Linkedin, Twitter, Instagram, Facebook, Filter, X, Eye, ExternalLink, Plus, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Contact, Team, Department } from "@/types/teams";
import { useLists } from "@/contexts/ListsContext";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";

const People = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [revealedEmails, setRevealedEmails] = useState<Set<string>>(new Set());
  const [revealedPhones, setRevealedPhones] = useState<Set<string>>(new Set());
  
  const { lists, addItemToList } = useLists();
  const { user } = useAuth();

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTeam("all");
    setSelectedDepartment("all");
  };

  const hasActiveFilters = searchQuery || selectedTeam !== "all" || selectedDepartment !== "all";

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery, selectedTeam, selectedDepartment]);

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

      // Fetch filter options
      const [teamsResult, departmentsResult] = await Promise.all([
        supabase.from('teams').select('*').order('name'),
        supabase.from('departments').select('*').order('name')
      ]);

      setContacts(contactsData || []);
      setTeams(teamsResult.data || []);
      setDepartments(departmentsResult.data || []);
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

    if (selectedDepartment && selectedDepartment !== "all") {
      filtered = filtered.filter(contact => contact.department_id === selectedDepartment);
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

            {/* Department Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Role</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="bg-background border-border h-8 text-xs">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">All Roles</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Showing {filteredContacts.length} of {contacts.length} people
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
                {filteredContacts.length === 0 ? (
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
                  filteredContacts.map((contact) => (
                    <TableRow 
                      key={contact.id} 
                      className="hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shadow-soft">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
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
      </div>
    </div>
  );
};

export default People;