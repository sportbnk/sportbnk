
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContactsFilters from "@/components/database/ContactsFilters";
import ContactsTable from "@/components/database/ContactsTable";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useCredits } from "@/contexts/CreditsContext";
import { Search } from "lucide-react";

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
  const { credits, tier } = useCredits();

  // Search for specific team function
  const searchSpecificTeam = async () => {
    console.log('=== SEARCHING FOR "FORE" Business ===');
    
    try {
      // Search with exact match
      const { data: exactMatch, error: exactError } = await supabase
        .from('teams')
        .select('*')
        .eq('name', '"FORE" Business');
      
      console.log('Exact match search results:', exactMatch);
      console.log('Exact match error:', exactError);

      // Search with ILIKE for partial matches
      const { data: partialMatch, error: partialError } = await supabase
        .from('teams')
        .select('*')
        .ilike('name', '%FORE%');
      
      console.log('Partial match (FORE) results:', partialMatch);
      console.log('Partial match error:', partialError);

      // Search with ILIKE for Business
      const { data: businessMatch, error: businessError } = await supabase
        .from('teams')
        .select('*')
        .ilike('name', '%Business%');
      
      console.log('Business match results:', businessMatch);
      console.log('Business match error:', businessError);

      // Get all teams to see what's in the database
      const { data: allTeams, error: allError } = await supabase
        .from('teams')
        .select('name')
        .order('name');
      
      console.log('All team names in database:', allTeams?.map(t => t.name));
      console.log('Total teams:', allTeams?.length);
      
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const { data: organizationsData, isLoading } = useQuery({
    queryKey: ['organizations', filters, searchTerm],
    queryFn: async () => {
      console.log('Fetching organizations with filters:', filters);
      console.log('Search term:', searchTerm);
      
      let query = supabase
        .from('teams')
        .select(`
          id,
          name,
          revenue,
          employees,
          level,
          sports!inner (
            name
          ),
          cities!inner (
            name,
            countries!inner (
              name
            )
          )
        `);

      // Apply search filter
      if (searchTerm.trim()) {
        query = query.ilike('name', `%${searchTerm.trim()}%`);
      }

      // Apply filters
      if (filters.sport !== "all") {
        query = query.eq('sports.name', filters.sport);
      }
      if (filters.level !== "all") {
        query = query.eq('level', filters.level);
      }
      if (filters.country !== "all") {
        query = query.eq('cities.countries.name', filters.country);
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
        console.error('Error fetching organizations:', error);
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
            name: team.sports?.name || ''
          },
          city: {
            name: team.cities?.name || '',
            country: {
              name: team.cities?.countries?.name || ''
            }
          }
        };
        
        console.log('Transformed DTO:', dto);
        return dto;
      });
      
      console.log('Final transformed data:', transformedData);
      return transformedData;
    }
  });

  // Use useCallback to prevent re-rendering of ContactsFilters
  const handleFilterChange = useCallback((newFilters: any) => {
    console.log('Filter change received:', newFilters);
    setFilters(newFilters);
  }, []);

  const handleUseCredits = (amount: number) => {
    // This will be handled by the credits context in the future
    console.log(`Using ${amount} credits`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Organisations Database</h1>
        </div>
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">Loading organizations...</p>
        </div>
      </div>
    );
  }

  // Transform DTO data to match ContactsTable expected format
  const tableData = (organizationsData || []).map(org => ({
    id: org.id,
    team: org.name, // Map name to team field for table display
    sport: org.sport.name,
    level: org.level || '',
    city: org.city.name,
    country: org.city.country.name,
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
        <h1 className="text-2xl font-bold">Organizations Database</h1>
        <Button onClick={searchSpecificTeam} variant="outline">
          Debug: Search for "FORE" Business
        </Button>
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
                totalResults={organizationsData?.length || 0}
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
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search organizations by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>
          
          <ContactsTable 
            data={tableData} 
            useCredits={handleUseCredits}
          />
        </div>
      </div>
    </div>
  );
}
