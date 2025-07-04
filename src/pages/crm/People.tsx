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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Mail, Phone, Linkedin, Building2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ContactsFilters from "@/components/database/ContactsFilters";
import ListSelectionPopover from "@/components/database/ListSelectionPopover";
import AISearchBar from "@/components/database/AISearchBar";
import { useReveal } from "@/contexts/RevealContext";
import { useCredits } from "@/contexts/CreditsContext";

const People = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [isAiSearchActive, setIsAiSearchActive] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const { toast } = useToast();
  const { isRevealed, canReveal, revealContact, loading: revealLoading } = useReveal();
  const { credits, tier } = useCredits();

  const pageSize = 50;

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Calculate pagination range
  const getPaginationRange = (currentPage: number, totalPages: number) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // Reset to first page when filters change
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
    // Clear AI search when using filters
    setIsAiSearchActive(false);
    setAiResults([]);
    setAiQuery('');
  };

  // Reset to first page when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleAiResults = (results: any[], query: string) => {
    console.log('AI search results received:', results);
    setAiResults(results);
    setIsAiSearchActive(results.length > 0 || query.length > 0);
    setAiQuery(query);
    setCurrentPage(1);
  };

  const handleAiLoading = (loading: boolean) => {
    setIsAiLoading(loading);
  };

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

  // Separate count query to get accurate total results
  const { data: totalCount } = useQuery({
    queryKey: ['contacts-count', filters.position, filters.team, searchTerm],
    queryFn: async () => {
      // Skip count query if AI search is active
      if (isAiSearchActive) return aiResults.length;
      
      console.log('Fetching contacts count with position filter:', filters.position, 'and team filter:', filters.team);
      
      let query = supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      // Apply search filter first
      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm.trim()}%,email.ilike.%${searchTerm.trim()}%,role.ilike.%${searchTerm.trim()}%`);
      }

      // Apply department filter using department ID
      if (filters.position !== "all" && allDepartments) {
        const selectedDepartment = allDepartments.find(dept => dept.name === filters.position);
        if (selectedDepartment) {
          query = query.eq('department_id', selectedDepartment.id);
        }
      }

      // Apply team filter only if a specific team is selected
      if (filters.team !== "all" && teamsForCity) {
        const selectedTeam = teamsForCity.find(team => team.name === filters.team);
        if (selectedTeam) {
          query = query.eq('team_id', selectedTeam.id);
        }
      }

      const { count, error } = await query;
      
      if (error) {
        console.error('Error fetching contacts count:', error);
        throw error;
      }
      
      console.log('Total contacts count:', count);
      return count || 0;
    },
    enabled: !!allDepartments && !isAiSearchActive, // Only run query when departments are loaded and AI search is not active
  });

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts', filters.position, filters.team, searchTerm, currentPage],
    queryFn: async () => {
      // Return AI results if AI search is active
      if (isAiSearchActive) {
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        return aiResults.slice(startIdx, endIdx);
      }

      console.log('Fetching contacts with position filter:', filters.position, 'and team filter:', filters.team, 'page:', currentPage);
      
      let query = supabase
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
        `)
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      // Apply search filter first
      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm.trim()}%,email.ilike.%${searchTerm.trim()}%,role.ilike.%${searchTerm.trim()}%`);
      }
      console.log("filters", filters)

      // Apply department filter using department ID
      if (filters.position !== "all" && allDepartments) {
        const selectedDepartment = allDepartments.find(dept => dept.name === filters.position);
        console.log("detp not all")
        if (selectedDepartment) {
          console.log("selected filters dept", selectedDepartment)
          query = query.eq('department_id', selectedDepartment.id);
        }
      } else {
        console.log("all dept filters")
      }

      // Apply team filter only if a specific team is selected
      if (filters.team !== "all" && teamsForCity) {
        console.log("team not all")
        const selectedTeam = teamsForCity.find(team => team.name === filters.team);
        if (selectedTeam) {
          console.log("selected filters team", selectedTeam)
          query = query.eq('team_id', selectedTeam.id);
        }
      } else {
        console.log("all team filters")
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching contacts:', error);
        throw error;
      }
      
      console.log('Fetched contacts data:', data);
      return data || [];
    },
    enabled: !!allDepartments && !isAiLoading, // Only run query when departments are loaded and AI is not loading
  });

  // Calculate total pages
  const totalPages = Math.ceil((totalCount || 0) / pageSize);
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const filteredContacts = contacts?.filter(contact => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.teams?.name?.toLowerCase().includes(searchLower) ||
      contact.role?.toLowerCase().includes(searchLower)
    );
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

  if (isLoading || isAiLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">People Database</h1>
        </div>
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">
            {isAiLoading ? 'Processing AI search...' : 'Loading contacts...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">People Database</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-1">
          <Card className="shadow-md mb-4">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold">Filters</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <ContactsFilters 
                onFilterChange={handleFilterChange}
                showTeamFilters={false}
                totalResults={totalCount || 0}
                filters={filters}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold">Credits</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <p className="text-2xl font-bold text-green-600">{credits}</p>
              <p className="text-sm text-muted-foreground">Credits remaining</p>
              <p className="text-xs text-muted-foreground capitalize mb-4">({tier} plan)</p>
              <Button className="w-full mt-4 bg-blue-800 hover:bg-blue-900 text-base">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <Card className="shadow-md mb-4">
            <CardContent className="p-4">
              <AISearchBar 
                onResults={handleAiResults}
                onLoading={handleAiLoading}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Contact Database</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {isAiSearchActive && aiQuery ? (
                    <>AI Search: "{aiQuery}" • {formatNumber(totalCount || 0)} results</>
                  ) : (
                    <>
                      {formatNumber(totalCount || 0)} total results
                      {totalPages > 1 && (
                        <span> • Page {currentPage} of {totalPages}</span>
                      )}
                    </>
                  )}
                </span>
              </CardTitle>
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

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {paginationRange.map((page, index) => (
                        <PaginationItem key={index}>
                          {page === '...' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              onClick={() => setCurrentPage(page as number)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default People;
