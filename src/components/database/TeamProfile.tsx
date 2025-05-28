import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Globe, Users, DollarSign, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamData } from "@/types/teams";

interface Contact {
  name: string;
  position: string;
  email: string;
  phone?: string;
  linkedin?: string;
}

interface TeamProfileProps {
  team: TeamData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  revealedEmails: Record<string, boolean>;
  revealedPhones: Record<string, boolean>;
  onRevealEmail: (email: string) => void;
  onRevealPhone: (phone: string) => void;
}

const TeamProfile: React.FC<TeamProfileProps> = ({ 
  team, 
  open, 
  onOpenChange, 
  revealedEmails, 
  revealedPhones, 
  onRevealEmail, 
  onRevealPhone 
}: TeamProfileProps) => {
  if (!team) return null;

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`;
    }
    if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(1)}K`;
    }
    return `$${revenue}`;
  };

  // Helper function to open URLs in new tab without formatting
  const openInNewTab = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={team.logo} alt={team.team} />
              <AvatarFallback>{team.team.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{team.team}</DialogTitle>
              <p className="text-sm text-muted-foreground">{team.sport} • {team.level}</p>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="contacts">Key Contacts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="text-sm leading-relaxed">
              <p>{team.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <CardDescription>Location</CardDescription>
                  </div>
                  <p className="mt-1 font-medium">{team.city}, {team.country}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <CardDescription>Employees</CardDescription>
                  </div>
                  <p className="mt-1 font-medium">{team.employees}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <CardDescription>Annual Revenue</CardDescription>
                  </div>
                  <p className="mt-1 font-medium">{formatRevenue(team.revenue)}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <CardDescription>Founded</CardDescription>
                  </div>
                  <p className="mt-1 font-medium">{team.founded}</p>
                </CardContent>
              </Card>
            </div>
            
            {team.website && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <CardDescription>Website</CardDescription>
                  </div>
                  <span 
                    onClick={() => openInNewTab(team.website!)} 
                    className="mt-1 font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    {team.website.replace(/^https?:\/\//, '')}
                  </span>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4 pt-4">
            {(!team.social || team.social.length === 0) ? (
              <p className="text-center text-muted-foreground py-8">No social media profiles available</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {team.social.map((socialLink, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <CardDescription className="capitalize">{socialLink.platform}</CardDescription>
                      </div>
                      <span 
                        onClick={() => openInNewTab(socialLink.url)} 
                        className="mt-1 font-medium text-blue-600 hover:underline cursor-pointer"
                      >
                        Visit Profile
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4 pt-4">
            <div className="space-y-4">
              {team.contacts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No contact information available</p>
              ) : (
                team.contacts.map((contact, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-base">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{contact.position}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {revealedEmails[contact.email] ? (
                              <span className="text-sm font-mono">{contact.email.replace(/\*/g, (match, offset) => contact.email.split('@')[0][offset])}</span>
                            ) : (
                              <span className="text-sm font-mono">{contact.email}</span>
                            )}
                          </div>
                          {!revealedEmails[contact.email] && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onRevealEmail(contact.email)}
                            >
                              Reveal (2 credits)
                            </Button>
                          )}
                        </div>
                        
                        {contact.phone && (
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              {revealedPhones[contact.phone] ? (
                                <span className="text-sm font-mono">{contact.phone}</span>
                              ) : (
                                <span className="text-sm font-mono">+*-***-***-****</span>
                              )}
                            </div>
                            {!revealedPhones[contact.phone] && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => onRevealPhone(contact.phone!)}
                              >
                                Reveal (3 credits)
                              </Button>
                            )}
                          </div>
                        )}
                        
                        {contact.linkedin && (
                          <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 text-blue-700" />
                            <span 
                              onClick={() => openInNewTab(contact.linkedin!)} 
                              className="text-sm text-blue-700 hover:underline cursor-pointer"
                            >
                              LinkedIn Profile
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TeamProfile;
