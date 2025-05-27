
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, Globe, MapPin, Clock, Users, DollarSign } from "lucide-react";
import TeamEmployees from "@/components/database/TeamEmployees";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { TeamData } from "@/types/teams";

const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [credits, setCredits] = useState(456);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  
  // Fetch team data from Supabase
  const { data: team, isLoading } = useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      if (!teamId) return null;
      
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          team_contacts (*),
          team_social_links (*)
        `)
        .eq('id', teamId)
        .single();

      if (error) {
        throw error;
      }

      // Transform to match TeamData interface
      const transformedTeam: TeamData = {
        id: data.id,
        team: data.team,
        sport: data.sport,
        level: data.level,
        city: data.city,
        country: data.country,
        revenue: data.revenue || 0,
        employees: data.employees || 0,
        logo: data.logo || '',
        description: data.description || '',
        founded: data.founded,
        website: data.website,
        email: data.email,
        phone: data.phone,
        contacts: (data.team_contacts || []).map((contact: any) => ({
          name: contact.name,
          position: contact.position || '',
          email: contact.email || '',
          phone: contact.phone || '',
          linkedin: contact.linkedin || ''
        })),
        social: (data.team_social_links || []).reduce((acc: any, link: any) => {
          if (link.platform === 'facebook') acc.facebook = link.url;
          if (link.platform === 'twitter') acc.twitter = link.url;
          if (link.platform === 'instagram') acc.instagram = link.url;
          if (link.platform === 'linkedin') acc.linkedin = link.url;
          return acc;
        }, {})
      };

      return transformedTeam;
    },
    enabled: !!teamId
  });

  // Create mock employee data for TeamEmployees component (since we don't have employee data in DB yet)
  const teamEmployees = team ? {
    id: team.id,
    team: team.team,
    teamLogo: team.logo,
    employees: team.contacts.map((contact, index) => ({
      id: index + 1,
      name: contact.name,
      position: contact.position,
      email: contact.email,
      phone: contact.phone,
      linkedin: contact.linkedin,
      verified: Math.random() > 0.5,
      activeReplier: Math.random() > 0.7
    }))
  } : null;
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-0">
        <div className="flex items-center gap-2 mb-6 px-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/crm/teams")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-sportbnk-navy">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="container mx-auto px-0">
        <div className="flex items-center gap-2 mb-6 px-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/crm/teams")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-sportbnk-navy">Team not found</h1>
        </div>
      </div>
    );
  }
  
  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`;
    }
    if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(1)}K`;
    }
    return `$${revenue}`;
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

  // Mock opening hours - in a real app this would come from the team data
  const openingHours = {
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM", 
    wednesday: "9:00 AM - 6:00 PM",
    thursday: "9:00 AM - 6:00 PM",
    friday: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed"
  };
  
  return (
    <div className="container mx-auto px-0">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/crm/teams")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-sportbnk-navy">Team Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Header Card */}
        <Card className="shadow-md lg:col-span-3">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={team.logo} alt={team.team} />
                <AvatarFallback>{team.team.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-2 flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h2 className="text-3xl font-bold">{team.team}</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500">{team.sport}</Badge>
                    <Badge variant="outline">{team.level}</Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  {team.city}, {team.country}
                </p>
              </div>
              
              <div className="flex flex-col gap-2 self-start">
                <p className="text-sm text-muted-foreground">Credits remaining</p>
                <p className="text-2xl font-bold text-sportbnk-green">{credits}</p>
                <Button className="mt-2 bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-sm">
                  Upgrade
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Business Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <a href={`tel:${team.phone}`} className="text-blue-600 hover:underline">
                      {team.phone}
                    </a>
                  </div>
                )}
                {team.email && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <a href={`mailto:${team.email}`} className="text-blue-600 hover:underline">
                      {team.email}
                    </a>
                  </div>
                )}
              </div>
              {team.website && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Website</p>
                  <a href={team.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {team.website?.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{team.city}, {team.country}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Venue location and headquarters
              </p>
            </CardContent>
          </Card>

          {/* Opening Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Opening Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="capitalize font-medium">{day}</span>
                    <span className={hours === "Closed" ? "text-red-600" : "text-green-600"}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Organization Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {team.employees > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employees</p>
                  <p className="text-2xl font-bold">{team.employees}</p>
                </div>
              )}
              {team.revenue > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Annual Revenue</p>
                  <p className="text-2xl font-bold">{formatRevenue(team.revenue)}</p>
                </div>
              )}
              {team.founded && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Founded</p>
                  <p className="text-2xl font-bold">{team.founded}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Team Employees Section */}
        {teamEmployees && teamEmployees.employees.length > 0 && (
          <div className="lg:col-span-3 mt-6">
            <Card className="shadow-md">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Team Contacts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <TeamEmployees
                  selectedTeam={teamEmployees}
                  revealedEmails={revealedEmails}
                  revealedPhones={revealedPhones}
                  onRevealEmail={revealEmail}
                  onRevealPhone={revealPhone}
                  onCloseEmployees={() => {}}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetails;
