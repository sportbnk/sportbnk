import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Mail, Phone, Linkedin, Building2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ContactsFilters from "@/components/database/ContactsFilters";
import ListSelectionPopover from "@/components/database/ListSelectionPopover";
import { useReveal } from "@/contexts/RevealContext";

const People = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    position: "all",
    team: "all",
    sport: "all",
    level: "all",
    country: "all",
    city: "all",
    revenue: "all",
    employees: "all"
  });
  
  const { toast } = useToast();
  const { isRevealed, canReveal, revealContact, loading: revealLoading } = useReveal();

  // Fetch all departments to get ID for the selected position
  const { data: allDepartments } = useQuery({
    queryKey: ['all-departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // Fetch all countries for filtering
  const { data: allCountries } = useQuery({
    queryKey: ['all-countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // Fetch cities for the selected country
  const { data: citiesForCountry } = useQuery({
    queryKey: ['cities-for-country', filters.country],
    queryFn: async () => {
      if (filters.country === "all") return [];
      
      const selectedCountry = allCountries?.find(c => c.name === filters.country);
      if (!selectedCountry) return [];

      const { data, error } = await supabase
        .from('cities')
        .select('id, name')
        .eq('country_id', selectedCountry.id)
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: filters.country !== "all" && !!allCountries,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // Fetch teams for the selected city
  const { data: teamsForCity } = useQuery({
    queryKey: ['teams-for-city', filters.city],
    queryFn: async () => {
      if (filters.city === "all") return [];
      
      const selectedCity = citiesForCountry?.find(c => c.name === filters.city);
      if (!selectedCity) return [];

      const { data, error } = await supabase
        .from('teams')
        .select('id, name')
        .eq('city_id', selectedCity.id)
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: filters.city !== "all" && !!citiesForCountry,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts', filters, searchTerm],
    queryFn = async () => {
  console.log('Fetching contacts with filters:', filters);

  const query = supabase
    .from('contacts')
    .select(`
      *,
      teams (
        id,
        name,
        cities (
          id,
          name,
          countries (
            id,
            name
          )
        )
      ),
      departments (
        id,
        name
      )
    `);

  // Apply search term (optional)
  if (searchTerm.trim()) {
    query.or(`name.ilike.%${searchTerm.trim()}%,email.ilike.%${searchTerm.trim()}%,role.ilike.%${searchTerm.trim()}%`);
  }

  // Filter by department if selected
  if (filters.position !== "all" && allDepartments) {
    const selectedDepartment = allDepartments.find(dept => dept.name === filters.position);
    if (selectedDepartment) {
      query.eq('department_id', selectedDepartment.id);
    }
  }

  // Team filter
  if (filters.team !== "all" && teamsForCity) {
    const selectedTeam = teamsForCity.find(team => team.name === filters.team);
    if (selectedTeam) {
      query.eq('team_id', selectedTeam.id);
    }
  } else {
    // City filter
    if (filters.city !== "all") {
      query.eq('teams.cities.name', filters.city);
    }
    // Country filter
    else if (filters.country !== "all") {
      query.eq('teams.cities.countries.name', filters.country);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }

  console.log('Raw contacts data:', data);
  return data || [];
}

  });

  const handleRevealClick = async (contact: any, type: 'email' | 'phone' | 'linkedin') => {
    await revealContact(contact, type);
  };

  const shouldShowRevealButton = (contact: any, type: 'email' | 'phone' | 'linkedin') => {
    const creditsRequired = contact[`${type}_credits_consumed`];
    return creditsRequired > 0 && !isRevealed(contact.id, type);
  };

  const shouldShowContent = (contact: any, type: 'email' | 'phone' | 'linkedin') => {
    return canReveal(contact, type);
  };

  const handleAddToList = (contact: any, listId: string, listName: string) => {
    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to ${listName}`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">People Database</h1>
        </div>
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">People Database</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold">Filters</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <ContactsFilters 
                onFilterChange={setFilters}
                showTeamFilters={false}
                totalResults={filteredContacts?.length || 0}
                filters={filters}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Contact Database</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts?.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        {contact.role ? (
                          <Badge variant="secondary">{contact.role}</Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.departments?.name ? (
                          <span>{contact.departments.name}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.teams?.name ? (
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span>{contact.teams.name}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.teams?.cities ? (
                          <span className="text-sm text-gray-600">
                            {contact.teams.cities.name}, {contact.teams.cities.countries.name}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.email ? (
                          shouldShowContent(contact, 'email') ? (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                              <span className="text-xs font-mono overflow-hidden text-ellipsis">{contact.email}</span>
                              {contact.is_email_verified && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Shield className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">Verified email address</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          ) : shouldShowRevealButton(contact, 'email') ? (
                            <div className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRevealClick(contact, 'email')}
                                className="h-6 text-xs px-2"
                                disabled={revealLoading}
                              >
                                Reveal ({contact.email_credits_consumed})
                              </Button>
                              {contact.is_email_verified && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Shield className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">Verified email address</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
                          ) : null
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.phone ? (
                          shouldShowContent(contact, 'phone') ? (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                              <span className="text-xs font-mono">{contact.phone}</span>
                            </div>
                          ) : shouldShowRevealButton(contact, 'phone') ? (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRevealClick(contact, 'phone')}
                                className="h-6 text-xs px-2"
                                disabled={revealLoading}
                              >
                                Reveal ({contact.phone_credits_consumed})
                              </Button>
                            </div>
                          ) : null
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.linkedin ? (
                          shouldShowContent(contact, 'linkedin') ? (
                            <a 
                              href={contact.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center text-blue-700 hover:underline"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          ) : shouldShowRevealButton(contact, 'linkedin') ? (
                            <div className="flex items-center gap-1">
                              <Linkedin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRevealClick(contact, 'linkedin')}
                                className="h-6 text-xs px-2"
                                disabled={revealLoading}
                              >
                                Reveal ({contact.linkedin_credits_consumed})
                              </Button>
                            </div>
                          ) : null
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <ListSelectionPopover
                          contact={{
                            id: contact.id,
                            name: contact.name,
                            email: contact.email,
                            phone: contact.phone,
                            position: contact.role,
                            team: contact.teams?.name,
                            teamId: contact.teams?.id,
                            linkedin: contact.linkedin,
                            verified: false,
                            activeReplier: false
                          }}
                          onAddToList={handleAddToList}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default People;
