import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Users, 
  Calendar,
  DollarSign,
  Clock,
  ShieldCheck,
  Flame,
  Linkedin
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

const TeamDetails = () => {
  const { teamId } = useParams();
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});

  const { data: team, isLoading } = useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      const { data, error } = await supabase
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
          team_social_links (
            id,
            platform,
            url
          ),
          opening_hours (
            id,
            day,
            start_hour,
            end_hour
          ),
          contacts (
            id,
            name,
            email,
            phone,
            role
          )
        `)
        .eq('id', teamId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!teamId,
  });

  // Helper function to open URLs in new tab
  const openInNewTab = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleRevealEmail = (email: string) => {
    setRevealedEmails(prev => ({ ...prev, [email]: true }));
  };

  const handleRevealPhone = (phone: string) => {
    setRevealedPhones(prev => ({ ...prev, [phone]: true }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-600">Team not found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sportbnk-navy">{team.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            {team.sports && (
              <Badge variant="secondary">{team.sports.name}</Badge>
            )}
            {team.level && (
              <Badge variant="outline">{team.level}</Badge>
            )}
          </div>
        </div>
        <Button>Edit Team</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Organization Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>
                {team.street && `${team.street}, `}
                {team.cities?.name}
                {team.postal_code && ` ${team.postal_code}`}
                {team.cities?.countries?.name && `, ${team.cities.countries.name}`}
              </span>
            </div>
            
            {team.website && (
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <a 
                  href={team.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {team.website}
                </a>
              </div>
            )}
            
            {team.email && (
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{team.email}</span>
              </div>
            )}
            
            {team.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{team.phone}</span>
              </div>
            )}
            
            {team.employees && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span>{team.employees} employees</span>
              </div>
            )}
            
            {team.founded && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Founded in {team.founded}</span>
              </div>
            )}
            
            {team.revenue && (
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <span>Revenue: ${team.revenue.toLocaleString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Opening Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {team.opening_hours && team.opening_hours.length > 0 ? (
              <div className="space-y-2">
                {team.opening_hours.map((hours) => (
                  <div key={hours.id} className="flex justify-between">
                    <span className="capitalize font-medium">{hours.day}:</span>
                    <span>{hours.start_hour} - {hours.end_hour}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No opening hours specified</p>
            )}
          </CardContent>
        </Card>
      </div>

      {team.team_social_links && team.team_social_links.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {team.team_social_links.map((social) => (
                <span
                  key={social.id}
                  onClick={() => openInNewTab(social.url)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <span className="capitalize">{social.platform}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {team.contacts && team.contacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Team Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {team.contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{contact.name}</h4>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Flame className="h-4 w-4 text-orange-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Active replier - high response rate</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    {contact.role && (
                      <p className="text-sm text-gray-600">{contact.role}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      {contact.email ? (
                        revealedEmails[contact.email] ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-mono overflow-hidden text-ellipsis">{contact.email}</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <ShieldCheck className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Verified email address</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRevealEmail(contact.email)}
                              className="h-6 text-xs px-2"
                            >
                              Reveal (2)
                            </Button>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <ShieldCheck className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">Verified email address</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-muted-foreground">Email not available</span>
                      )}
                      
                      {contact.phone ? (
                        revealedPhones[contact.phone] ? (
                          <span className="text-xs font-mono">{contact.phone}</span>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRevealPhone(contact.phone!)}
                              className="h-6 text-xs px-2"
                            >
                              Reveal (3)
                            </Button>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-muted-foreground">Phone not available</span>
                      )}
                      
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-blue-700 hover:underline"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeamDetails;
