import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactsFilters from "@/components/database/ContactsFilters";
import ContactsTable from "@/components/database/ContactsTable";
import AddTeamDialog from "@/components/teams/AddTeamDialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Contact {
  name: string;
  position: string;
  email: string;
  phone?: string;
  linkedin?: string;
}

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

interface TeamData {
  id: number;
  team: string;
  sport: string;
  level: string;
  city: string;
  country: string;
  revenue: number;
  employees: number;
  logo: string;
  description: string;
  founded?: number;
  website?: string;
  email?: string;
  phone?: string;
  contacts: Contact[];
  social: SocialLinks;
}

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
          team_contacts (*),
          team_social_links (*)
        `);

      if (filters.sport !== "all") {
        query = query.eq('sport', filters.sport);
      }
      if (filters.level !== "all") {
        query = query.eq('level', filters.level);
      }
      if (filters.country !== "all") {
        query = query.eq('country', filters.country);
      }
      if (filters.city !== "all") {
        query = query.eq('city', filters.city);
      }

      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      const transformedData: TeamData[] = (data || []).map(team => ({
        id: team.id,
        team: team.team,
        sport: team.sport,
        level: team.level,
        city: team.city,
        country: team.country,
        revenue: team.revenue || 0,
        employees: team.employees || 0,
        logo: team.logo || '',
        description: team.description || '',
        founded: team.founded,
        website: team.website,
        email: team.email,
        phone: team.phone,
        contacts: (team.team_contacts || []).map((contact: any) => ({
          name: contact.name,
          position: contact.position || '',
          email: contact.email || '',
          phone: contact.phone || '',
          linkedin: contact.linkedin || ''
        })),
        social: (team.team_social_links || []).reduce((acc: SocialLinks, link: any) => {
          if (link.platform === 'facebook') acc.facebook = link.url;
          if (link.platform === 'twitter') acc.twitter = link.url;
          if (link.platform === 'instagram') acc.instagram = link.url;
          if (link.platform === 'linkedin') acc.linkedin = link.url;
          return acc;
        }, {})
      }));
      
      return transformedData;
    }
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleUseCredits = (amount: number) => {
    setCredits(prevCredits => prevCredits - amount);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teams Database</h1>
        <AddTeamDialog />
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
