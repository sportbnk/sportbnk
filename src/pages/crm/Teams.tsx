import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactsFilters from "@/components/database/ContactsFilters";
import ContactsTable from "@/components/database/ContactsTable";
import AISearchBar from "@/components/database/AISearchBar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useCredits } from "@/contexts/CreditsContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// DTO interfaces for proper typing
interface SportDTO {
  name: string;
}

interface CountryDTO {
  name: string;
}

interface CityDTO {
  name: string;
  country: CountryDTO;
}

interface OrganizationDTO {
  id: string;
  name: string;
  revenue: number | null;
  employees: number | null;
  level: string | null;
  sport: SportDTO;
  city: CityDTO;
}

export default function Teams() {
  const [filters, setFilters] = useState({
    sport: "all",
    level: "all",
    country: "all",
    city: "all",
    revenue: "all",
    employees: "all",
    position: "all",
    team: "all"
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [isAiSearchActive, setIsAiSearchActive] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
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
  const handleFilterChange = useCallback((newFilters: any) => {
    console.log('Filter change received:', newFilters);
    setFilters(newFilters);
    setCurrentPage(1);
    // Clear AI search when using filters
    setIsAiSearchActive(false);
    setAiResults([]);
    setAiQuery('');
  }, []);

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


  // Separate count query to get accurate total results
  const { data: totalCount } = useQuery({
    queryKey: ['teams-count', filters, searchTerm],
    queryFn: async () => {
      // Skip count query if AI search is active
      if (isAiSearchActive) return aiResults.length;
      
      console.log('Fetching teams count with filters:', filters);
      
      let query = supabase
        .from('teams')
        .select('*', { count: 'exact', head: true });

      // Apply search filter
      if (searchTerm.trim()) {
        query = query.ilike('name', `%${searchTerm.trim()}%`);
      }

      // Apply sport filter - only filter if not "all"
      if (filters.sport !== "all") {
        query = query.eq('sports.name', filters.sport);
      }
      
      // Apply country filter - when country is selected, we need to ensure we only get teams from that country
      if (filters.country !== "all") {
        // First, we need to join with cities and countries, then filter
        query = query
          .not('cities', 'is', null)
          .not('cities.countries', 'is', null)
          .eq('cities.countries.name', filters.country);
      }
      
      if (filters.level !== "all") {
        query = query.eq('level', filters.level);
      }
      if (filters.city !== "all") {
        query = query.eq('cities.name', filters.city);
      }
      if (filters.revenue !== "all") {
        if (filters.revenue === "less1m") {
          query = query.lt('revenue', 1000000);
        } else if (filters.revenue === "1m-10m") {
          query = query.gte('revenue', 1000000).lte('revenue', 10000000);
        } else if (filters.revenue === "10m-50m") {
          query = query.gte('revenue', 10000000).lte('revenue', 50000000);
        } else if (filters.revenue === "more50m") {
          query = query.gt('revenue', 50000000);
        }
      }
      if (filters.employees !== "all") {
        if (filters.employees === "less50") {
          query = query.lt('employees', 50);
        } else if (filters.employees === "50-200") {
          query = query.gte('employees', 50).lte('employees', 200);
        } else if (filters.employees === "200-1000") {
          query = query.gte('employees', 200).lte('employees', 1000);
        } else if (filters.employees === "more1000") {
          query = query.gt('employees', 1000);
        }
      }

      const { count, error } = await query;
      
      if (error) {
        console.error('Error fetching teams count:', error);
        throw error;
      }
      
      console.log('Total teams count:', count);
      return count || 0;
    },
    enabled: !isAiSearchActive, // Only run when AI search is not active
  });

  const { data: organisationsData, isLoading } = useQuery({
    queryKey: ['organisations', filters, searchTerm, currentPage],
    queryFn: async () => {
      // Return AI results if AI search is active
      if (isAiSearchActive) {
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        return aiResults.slice(startIdx, endIdx);
      }

      console.log('Fetching organisations with filters:', filters, 'page:', currentPage);
      
      let query = supabase
        .from('teams')
        .select(`
          id,
          name,
          revenue,
          employees,
          level,
          sports (
            name
          ),
          cities (
            name,
            countries (
              name
            )
          )
        `)
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      // Apply search filter
      if (searchTerm.trim()) {
        query = query.ilike('name', `%${searchTerm.trim()}%`);
      }

      // Apply sport filter - only filter if not "all"
      if (filters.sport !== "all") {
        query = query.eq('sports.name', filters.sport);
      }
      
      // Apply country filter - when country is selected, we need to ensure we only get teams from that country
      if (filters.country !== "all") {
        // First, we need to join with cities and countries, then filter
        query = query
          .not('cities', 'is', null)
          .not('cities.countries', 'is', null)
          .eq('cities.countries.name', filters.country);
      }
      
      if (filters.level !== "all") {
        query = query.eq('level', filters.level);
      }
      if (filters.city !== "all") {
        query = query.eq('cities.name', filters.city);
      }
      if (filters.revenue !== "all") {
        if (filters.revenue === "less1m") {
          query = query.lt('revenue', 1000000);
        } else if (filters.revenue === "1m-10m") {
          query = query.gte('revenue', 1000000).lte('revenue', 10000000);
        } else if (filters.revenue === "10m-50m") {
          query = query.gte('revenue', 10000000).lte('revenue', 50000000);
        } else if (filters.revenue === "more50m") {
          query = query.gt('revenue', 50000000);
        }
      }
      if (filters.employees !== "all") {
        if (filters.employees === "less50") {
          query = query.lt('employees', 50);
        } else if (filters.employees === "50-200") {
          query = query.gte('employees', 50).lte('employees', 200);
        } else if (filters.employees === "200-1000") {
          query = query.gte('employees', 200).lte('employees', 1000);
        } else if (filters.employees === "more1000") {
          query = query.gt('employees', 1000);
        }
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching organisations:', error);
        throw error;
      }
      
      console.log('Raw data from Supabase:', data);
      
      // Transform data according to DTO specification
      const transformedData: OrganizationDTO[] = (data || []).map(team => {
        console.log('Processing team:', team);
        
        const dto: OrganizationDTO = {
          id: team.id,
          name: team.name,
          revenue: team.revenue,
          employees: team.employees,
          level: team.level,
          sport: {
            name: team.sports?.name || 'Not specified'
          },
          city: {
            name: team.cities?.name || 'Not specified',
            country: {
              name: team.cities?.countries?.name || 'Not specified'
            }
          }
        };
        
        console.log('Transformed DTO:', dto);
        return dto;
      });
      
      console.log('Final transformed data:', transformedData);
      return transformedData;
    },
    enabled: !isAiLoading, // Don't fetch while AI is loading
  });

  // Calculate total pages
  const totalPages = Math.ceil((totalCount || 0) / pageSize);
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const handleUseCredits = (amount: number) => {
    // This will be handled by the credits context in the future
    console.log(`Using ${amount} credits`);
  };

  if (isLoading || isAiLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Organisations Database</h1>
        </div>
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">
            {isAiLoading ? 'Processing AI search...' : 'Loading organisations...'}
          </p>
        </div>
      </div>
    );
  }

  // Transform DTO data to match ContactsTable expected format
  const tableData = (organisationsData || []).map(org => ({
    id: org.id,
    team: org.name, // Map name to team field for table display
    sport: org.sport?.name || 'Not specified',
    level: org.level || '',
    city: org.city?.name || 'Not specified',
    country: org.city?.country?.name || 'Not specified',
    revenue: org.revenue || 0,
    employees: org.employees || 0,
    logo: '', // No logo in current schema
    description: '', // No description in current schema
    founded: '', // Not included in DTO
    website: '', // Not included in DTO
    email: '', // Not included in DTO
    phone: '', // Not included in DTO
    contacts: [], // Not included in DTO
    social: [] // Changed from {} to [] to match SocialLink[] type
  }));

  console.log('Table data for display:', tableData);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organisations Database</h1>
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
                showTeamFilters={true}
                showPeopleFilters={false}
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
                <span>Organization Database</span>
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
              <ContactsTable 
                data={tableData} 
                useCredits={handleUseCredits}
              />

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
}
