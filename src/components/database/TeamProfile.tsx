
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Globe, Users, DollarSign, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface Contact {
  name: string;
  position: string;
  email: string;
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
  contacts: Contact[];
  logo: string;
  description: string;
  founded: number;
  website: string;
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface TeamProfileProps {
  team: TeamData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TeamProfile = ({ team, open, onOpenChange }: TeamProfileProps) => {
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
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
                  <a href={team.website} target="_blank" rel="noopener noreferrer" className="mt-1 font-medium text-blue-600 hover:underline">
                    {team.website.replace(/^https?:\/\//, '')}
                  </a>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4 pt-4">
            {(!team.social.facebook && !team.social.twitter && !team.social.instagram && !team.social.linkedin) ? (
              <p className="text-center text-muted-foreground py-8">No social media profiles available</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {team.social.facebook && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <CardDescription>Facebook</CardDescription>
                      </div>
                      <a href={team.social.facebook} target="_blank" rel="noopener noreferrer" className="mt-1 font-medium text-blue-600 hover:underline">
                        Visit Page
                      </a>
                    </CardContent>
                  </Card>
                )}
                
                {team.social.twitter && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-sky-500" />
                        <CardDescription>Twitter</CardDescription>
                      </div>
                      <a href={team.social.twitter} target="_blank" rel="noopener noreferrer" className="mt-1 font-medium text-sky-500 hover:underline">
                        Visit Profile
                      </a>
                    </CardContent>
                  </Card>
                )}
                
                {team.social.instagram && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-pink-600" />
                        <CardDescription>Instagram</CardDescription>
                      </div>
                      <a href={team.social.instagram} target="_blank" rel="noopener noreferrer" className="mt-1 font-medium text-pink-600 hover:underline">
                        Visit Profile
                      </a>
                    </CardContent>
                  </Card>
                )}
                
                {team.social.linkedin && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        <CardDescription>LinkedIn</CardDescription>
                      </div>
                      <a href={team.social.linkedin} target="_blank" rel="noopener noreferrer" className="mt-1 font-medium text-blue-700 hover:underline">
                        Visit Page
                      </a>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TeamProfile;
