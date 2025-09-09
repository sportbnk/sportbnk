import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, User, Building2, MapPin, Mail, Phone, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Contact, Team, Department } from "@/types/teams";

const People = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

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

  const getSocialLinks = (contact: Contact) => {
    const links = [];
    if (contact.linkedin) links.push({ platform: 'LinkedIn', url: contact.linkedin, icon: Linkedin });
    if (contact.twitter) links.push({ platform: 'Twitter', url: contact.twitter, icon: Twitter });
    if (contact.instagram) links.push({ platform: 'Instagram', url: contact.instagram, icon: Instagram });
    if (contact.facebook) links.push({ platform: 'Facebook', url: contact.facebook, icon: Facebook });
    return links;
  };

  if (loading) {
    return (
      <div className="space-y-4 pt-6">
        <h1 className="text-2xl font-bold">People</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">People</h1>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger>
            <SelectValue placeholder="All Teams" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((department) => (
              <SelectItem key={department.id} value={department.id}>
                {department.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          onClick={() => {
            setSearchQuery("");
            setSelectedTeam("all");
            setSelectedDepartment("all");
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {contact.first_name} {contact.last_name}
              </CardTitle>
              {contact.position && (
                <Badge variant="secondary" className="w-fit">
                  {contact.position}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contact.team && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {contact.team.name}
                  </div>
                )}

                {contact.department && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {contact.department.name}
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-primary hover:underline truncate"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {(contact.phone || contact.mobile) && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {contact.phone || contact.mobile}
                    </span>
                  </div>
                )}

                {/* Social Links */}
                {getSocialLinks(contact).length > 0 && (
                  <div className="flex gap-2 pt-2">
                    {getSocialLinks(contact).map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                          title={link.platform}
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                )}

                {contact.notes && (
                  <div className="text-sm text-muted-foreground mt-3 p-3 bg-muted rounded-md">
                    <p className="line-clamp-3">{contact.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search criteria or clear the filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default People;