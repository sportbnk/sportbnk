
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactsFilters from "@/components/database/ContactsFilters";
import ContactsTable from "@/components/database/ContactsTable";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { TeamData } from "@/types/teams";

export default function Teams() {
  const [filters, setFilters] = useState({
    sport: "all",
    level: "all",
    country: "all",
    city: "all",
    revenue: "all",
    employees: "all"
  });

  const [credits, setCredits] = useState(250);

  const { data: teamsData, isLoading } = useQuery({
    queryKey: ['teams', filters],
    queryFn: async () => {
      let query = supabase
        .from('teams')
        .select(`
          *,
          cities (
            id,
            name,
            countries (
              id,
              name
            )
          ),
          sports (
            id,
            name
          ),
          contacts (*),
          team_social_links (*)
        `);

      if (filters.sport !== "all") {
        // We'll need to join with sports table for filtering
        query = query.eq('sports.name', filters.sport);
      }
      if (filters.level !== "all") {
        query = query.eq('level', filters.level);
      }
      if (filters.country !== "all") {
        // We'll need to join with countries table for filtering
        query = query.eq('cities.countries.name', filters.country);
      }
      if (filters.city !== "all") {
        // We'll need to join with cities table for filtering
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
        console.error('Error fetching teams:', error);
        throw error;
      }
      
      const transformedData: TeamData[] = (data || []).map(team => ({
        id: team.id,
        team: team.name, // Map 'name' to 'team' field
        sport: team.sports?.name || '',
        level: team.level || '',
        city: team.cities?.name || '',
        country: team.cities?.countries?.name || '',
        revenue: team.revenue || 0,
        employees: team.employees || 0,
        logo: '', // No logo field in new schema
        description: '', // No description field in new schema
        founded: team.founded,
        website: team.website,
        email: team.email,
        phone: team.phone,
        contacts: (team.contacts || []).map((contact: any) => ({
          name: contact.name,
          position: contact.role || '',
          email: contact.email || '',
          phone: contact.phone || '',
          linkedin: contact.linkedin || ''
        })),
        social: (team.team_social_links || []).reduce((acc: any, link: any) => {
          if (link.platform === 'facebook') acc.facebook = link.url;
          if (link.platform === 'twitter') acc.twitter = link.url;
          if (link.platform === 'instagram') acc.instagram = link.url;
          if (link.platform === 'linkedin') acc.linkedin = link.url;
          return acc;
        }, {})
      }));
      
      console.log('Fetched teams data:', transformedData);
      return transformedData;
    }
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleUseCredits = (amount: number) => {
    setCredits(prevCredits => prevCredits - amount);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Organisations Database</h1>
        </div>
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">Loading cricket organizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cricket Organisations Database</h1>
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
                totalResults={teamsData?.length || 0}
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
              <Button className="w-full mt-4 bg-blue-800 hover:bg-blue-900 text-base">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <ContactsTable 
            data={teamsData || []} 
            useCredits={handleUseCredits}
          />
        </div>
      </div>
    </div>
  );
}
