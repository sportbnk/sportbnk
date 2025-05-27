
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactsFilters from "@/components/database/ContactsFilters";
import { ContactsView } from "@/components/crm/ContactsView";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const People = () => {
  const navigate = useNavigate();
  const [credits, setCredits] = useState(456);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [activeFilters, setActiveFilters] = useState({
    position: "all",
    team: "all",
    sport: "all",
  });

  // Fetch team contacts from Supabase
  const { data: contactsData = [], isLoading } = useQuery({
    queryKey: ['team-contacts', activeFilters],
    queryFn: async () => {
      let query = supabase
        .from('team_contacts')
        .select(`
          *,
          teams (
            id,
            team,
            sport,
            logo,
            city,
            country
          )
        `);

      // Apply filters
      if (activeFilters.position !== "all") {
        query = query.eq('position', activeFilters.position);
      }
      if (activeFilters.team !== "all") {
        query = query.eq('teams.team', activeFilters.team);
      }
      if (activeFilters.sport !== "all") {
        query = query.eq('teams.sport', activeFilters.sport);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching team contacts:', error);
        throw error;
      }
      
      console.log('Fetched team contacts:', data);
      return data || [];
    }
  });
  
  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    setActiveFilters(filters);
  };
  
  const revealEmail = (email: string) => {
    if (revealedEmails[email]) return;
    setCredits(prev => Math.max(0, prev - 2));
    setRevealedEmails(prev => ({ ...prev, [email]: true }));
  };
  
  const revealPhone = (phone: string) => {
    if (revealedPhones[phone]) return;
    setCredits(prev => Math.max(0, prev - 3));
    setRevealedPhones(prev => ({ ...prev, [phone]: true }));
  };
  
  const viewTeam = (teamId: number) => {
    console.log("View team:", teamId);
    navigate(`/crm/teams/${teamId}`);
  };

  const handleAddToList = (contact: any) => {
    // Navigate to Lists page with contact data
    navigate('/database/lists', { 
      state: { 
        contactToAdd: {
          id: contact.id.toString(),
          name: contact.name,
          email: contact.email,
          company: contact.company,
          mobile: contact.mobile,
          role: contact.role,
        }
      }
    });
  };

  // Transform data to match ContactsView interface
  const transformedData = contactsData.map(contact => ({
    id: contact.id.toString(),
    name: contact.name || 'Unknown',
    email: contact.email || '',
    company: contact.teams?.team || 'Unknown Team',
    mobile: contact.phone || '',
    role: contact.position || 'Not specified',
  }));

  if (isLoading) {
    return (
      <div className="container max-w-full px-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-sportbnk-navy">People Database</h1>
        </div>
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">Loading team contacts...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-full px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sportbnk-navy">People Database</h1>
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
                totalResults={transformedData.length}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-md mb-4">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold">Credits</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <p className="text-2xl font-bold text-sportbnk-green">{credits}</p>
              <p className="text-sm text-muted-foreground">Credits remaining</p>
              <Button className="w-full mt-4 bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-base">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <Card className="shadow-md h-full">
            <CardHeader className="pb-3 border-b pt-4 px-4">
              <CardTitle className="text-lg font-semibold">People List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <ContactsView 
                  data={transformedData}
                  onAddToList={handleAddToList}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default People;
