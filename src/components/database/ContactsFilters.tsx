
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface ContactsFiltersProps {
  onFilterChange: (filters: any) => void;
  showTeamFilters?: boolean;
  totalResults?: number;
}

const ContactsFilters = ({ onFilterChange, showTeamFilters = false, totalResults = 0 }: ContactsFiltersProps) => {
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

  // Separate states for filter options - these stay independent of filtered results
  const { data: allCountries, isLoading: countriesLoading } = useQuery({
    queryKey: ['all-countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: showTeamFilters,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // Cities for selected country only
  const { data: citiesForCountry, isLoading: citiesLoading, isFetching: citiesFetching } = useQuery({
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
    enabled: showTeamFilters && filters.country !== "all" && !!allCountries,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: (previousData) => previousData
  });

  // All sports available in the system - independent of filters
  const { data: allSports } = useQuery({
    queryKey: ['all-sports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sports')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
    enabled: showTeamFilters,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  // All levels available in the system - independent of filters
  const { data: allLevels } = useQuery({
    queryKey: ['all-levels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('level')
        .not('level', 'is', null)
        .neq('level', '');
      
      if (error) throw error;
      
      // Extract unique levels
      const uniqueLevels = [...new Set(data?.map(team => team.level) || [])];
      return uniqueLevels.sort();
    },
    enabled: showTeamFilters,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset city when country changes
    if (key === "country") {
      newFilters.city = "all";
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      position: "all",
      team: "all",
      sport: "all",
      level: "all",
      country: "all",
      city: "all",
      revenue: "all",
      employees: "all"
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const isCityDisabled = filters.country === "all";
  const isCityLoading = citiesLoading || citiesFetching;

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          {totalResults} result{totalResults !== 1 ? 's' : ''} found
        </div>

        {showTeamFilters && (
          <>
            <div className="space-y-1">
              <Label htmlFor="country" className="text-xs">Country</Label>
              <Select 
                value={filters.country} 
                onValueChange={(value) => handleFilterChange("country", value)}
              >
                <SelectTrigger id="country" className="h-8 text-xs">
                  <SelectValue placeholder={countriesLoading ? "Loading countries..." : "All countries"} />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All countries</SelectItem>
                  {allCountries?.map((country) => (
                    <SelectItem key={country.id} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="city" className="text-xs">City</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Select 
                      value={filters.city} 
                      onValueChange={(value) => handleFilterChange("city", value)}
                      disabled={isCityDisabled}
                    >
                      <SelectTrigger 
                        id="city" 
                        className={`h-8 text-xs ${isCityDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <SelectValue 
                          placeholder={
                            isCityDisabled 
                              ? "Select a country first" 
                              : isCityLoading 
                                ? "Loading cities..." 
                                : "All cities"
                          } 
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="all">All cities</SelectItem>
                        {citiesForCountry?.map((city) => (
                          <SelectItem key={city.id} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                {isCityDisabled && (
                  <TooltipContent className="bg-white border shadow-md">
                    <p>Please select a country first</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </div>

            <div className="space-y-1">
              <Label htmlFor="sport" className="text-xs">Sport</Label>
              <Select 
                value={filters.sport} 
                onValueChange={(value) => handleFilterChange("sport", value)}
              >
                <SelectTrigger id="sport" className="h-8 text-xs">
                  <SelectValue placeholder="All sports" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All sports</SelectItem>
                  {allSports?.map((sport) => (
                    <SelectItem key={sport.id} value={sport.name}>
                      {sport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="level" className="text-xs">Level</Label>
              <Select 
                value={filters.level} 
                onValueChange={(value) => handleFilterChange("level", value)}
              >
                <SelectTrigger id="level" className="h-8 text-xs">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All levels</SelectItem>
                  {allLevels?.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="revenue" className="text-xs">Revenue</Label>
              <Select 
                value={filters.revenue} 
                onValueChange={(value) => handleFilterChange("revenue", value)}
              >
                <SelectTrigger id="revenue" className="h-8 text-xs">
                  <SelectValue placeholder="All revenues" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All revenues</SelectItem>
                  <SelectItem value="less1m">Less than $1M</SelectItem>
                  <SelectItem value="1m-10m">$1M - $10M</SelectItem>
                  <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                  <SelectItem value="more50m">More than $50M</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="employees" className="text-xs">Employees</Label>
              <Select 
                value={filters.employees} 
                onValueChange={(value) => handleFilterChange("employees", value)}
              >
                <SelectTrigger id="employees" className="h-8 text-xs">
                  <SelectValue placeholder="All sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sizes</SelectItem>
                  <SelectItem value="less50">Less than 50</SelectItem>
                  <SelectItem value="50-200">50 - 200</SelectItem>
                  <SelectItem value="200-1000">200 - 1000</SelectItem>
                  <SelectItem value="more1000">More than 1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {!showTeamFilters && (
          <>
            <div className="space-y-1">
              <Label htmlFor="position" className="text-xs">Position</Label>
              <Select 
                value={filters.position} 
                onValueChange={(value) => handleFilterChange("position", value)}
              >
                <SelectTrigger id="position" className="h-8 text-xs">
                  <SelectValue placeholder="All positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All positions</SelectItem>
                  <SelectItem value="Marketing Director">Marketing Director</SelectItem>
                  <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                  <SelectItem value="Head Coach">Head Coach</SelectItem>
                  <SelectItem value="Commercial Director">Commercial Director</SelectItem>
                  <SelectItem value="PR Director">PR Director</SelectItem>
                  <SelectItem value="Digital Strategy Director">Digital Strategy Director</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="team" className="text-xs">Team</Label>
              <Select 
                value={filters.team} 
                onValueChange={(value) => handleFilterChange("team", value)}
              >
                <SelectTrigger id="team" className="h-8 text-xs">
                  <SelectValue placeholder="All teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All teams</SelectItem>
                  <SelectItem value="Manchester United">Manchester United</SelectItem>
                  <SelectItem value="LA Lakers">LA Lakers</SelectItem>
                  <SelectItem value="Real Madrid">Real Madrid</SelectItem>
                  <SelectItem value="Chicago Bulls">Chicago Bulls</SelectItem>
                  <SelectItem value="Boston Red Sox">Boston Red Sox</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ContactsFilters;
