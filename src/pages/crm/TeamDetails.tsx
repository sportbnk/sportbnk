
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import ListSelectionPopover from "@/components/database/ListSelectionPopover";
import InsufficientCreditsDialog from "@/components/database/InsufficientCreditsDialog";
import { useCredits } from "@/contexts/CreditsContext";

const TeamDetails = () => {
  const { teamId } = useParams();
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [revealedLinkedins, setRevealedLinkedins] = useState<Record<string, boolean>>({});
  const [showCreditsDialog, setShowCreditsDialog] = useState(false);
  const [creditsDialogInfo, setCreditsDialogInfo] = useState<{
    required: number;
    actionType: "email" | "phone" | "linkedin";
  }>({ required: 0, actionType: "email" });
  
  const { credits } = useCredits();

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
            role,
            linkedin,
            email_credits_consumed,
            phone_credits_consumed,
            linkedin_credits_consumed
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

  const handleRevealEmail = (email: string, requiredCredits: number) => {
    if (credits < requiredCredits) {
      setCreditsDialogInfo({ required: requiredCredits, actionType: "email" });
      setShowCreditsDialog(true);
      return;
    }
    setRevealedEmails(prev => ({ ...prev, [email]: true }));
  };

  const handleRevealPhone = (phone: string, requiredCredits: number) => {
    if (credits < requiredCredits) {
      setCreditsDialogInfo({ required: requiredCredits, actionType: "phone" });
      setShowCreditsDialog(true);
      return;
    }
    setRevealedPhones(prev => ({ ...prev, [phone]: true }));
  };

  const handleRevealLinkedin = (linkedin: string, requiredCredits: number) => {
    if (credits < requiredCredits) {
      setCreditsDialogInfo({ required: requiredCredits, actionType: "linkedin" });
      setShowCreditsDialog(true);
      return;
    }
    setRevealedLinkedins(prev => ({ ...prev, [linkedin]: true }));
  };

  const handleAddToList = (contact: any, listId: string, listName: string) => {
    console.log(`Added ${contact.name} to list ${listName}`);
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
    <>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden md:table-cell">LinkedIn</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div className="font-medium flex items-center gap-1 text-sm">
                          {contact.name}
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
                      </TableCell>
                      <TableCell className="text-sm">
                        {contact.role || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {contact.email ? (
                          contact.email_credits_consumed === 0 ? (
                            // Show email directly if no credits required
                            <div className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
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
                          ) : revealedEmails[contact.email] ? (
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
                                onClick={() => handleRevealEmail(contact.email, contact.email_credits_consumed)}
                                className="h-6 text-xs px-2"
                              >
                                Reveal ({contact.email_credits_consumed})
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
                          <span className="text-xs text-muted-foreground">Not available</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contact.phone ? (
                          contact.phone_credits_consumed === 0 ? (
                            // Show phone directly if no credits required
                            <div className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                              <span className="text-xs font-mono">{contact.phone}</span>
                            </div>
                          ) : revealedPhones[contact.phone] ? (
                            <span className="text-xs font-mono">{contact.phone}</span>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRevealPhone(contact.phone!, contact.phone_credits_consumed)}
                                className="h-6 text-xs px-2"
                              >
                                Reveal ({contact.phone_credits_consumed})
                              </Button>
                            </div>
                          )
                        ) : (
                          <span className="text-xs text-muted-foreground">Not available</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {contact.linkedin ? (
                          contact.linkedin_credits_consumed === 0 ? (
                            // Show LinkedIn directly if no credits required
                            <a 
                              href={contact.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center text-blue-700 hover:underline"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          ) : revealedLinkedins[contact.linkedin] ? (
                            <a 
                              href={contact.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center text-blue-700 hover:underline"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Linkedin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRevealLinkedin(contact.linkedin!, contact.linkedin_credits_consumed)}
                                className="h-6 text-xs px-2"
                              >
                                Reveal ({contact.linkedin_credits_consumed})
                              </Button>
                            </div>
                          )
                        ) : (
                          <span className="text-xs text-muted-foreground">N/A</span>
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
                            team: team.name,
                            teamId: team.id
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
        )}
      </div>

      <InsufficientCreditsDialog
        open={showCreditsDialog}
        onOpenChange={setShowCreditsDialog}
        creditsRequired={creditsDialogInfo.required}
        creditsAvailable={credits}
        actionType={creditsDialogInfo.actionType}
      />
    </>
  );
};

export default TeamDetails;
