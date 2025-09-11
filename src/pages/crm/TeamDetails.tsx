import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Calendar,
  Users,
  ArrowLeft,
  ExternalLink,
  Clock,
  User,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Plus,
  Briefcase,
  TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Team, Contact } from "@/types/teams";

const TeamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to get social media icon
  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    if (id) {
      fetchTeamDetails();
    }
  }, [id]);

  const fetchTeamDetails = async () => {
    if (!id) return;

    try {
      // Fetch team with all related data
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .select(`
          *,
          sport:sports(*),
          city:cities(*),
          country:countries(*),
          team_social_links(*),
          opening_hours(*)
        `)
        .eq('id', id)
        .single();

      if (teamError) throw teamError;

      // Fetch team contacts
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select(`
          *,
          department:departments(*)
        `)
        .eq('team_id', id);

      if (contactsError) throw contactsError;

      setTeam(teamData);
      setContacts(contactsData || []);
    } catch (error: any) {
      console.error('Error fetching team details:', error);
      setError(error.message || 'Failed to load team details');
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (dayIndex: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  };

  const formatTime = (time: string | null) => {
    if (!time) return 'Closed';
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/crm/teams')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
        </div>
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="space-y-4 pt-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/crm/teams')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Teams
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team not found</h3>
            <p className="text-muted-foreground text-center">
              {error || 'The team you are looking for does not exist.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/crm/teams')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Teams
        </Button>
      </div>

      {/* Team Header */}
      <div className="flex items-start gap-6">
        {team.logo_url && (
          <img 
            src={team.logo_url} 
            alt={`${team.name} logo`}
            className="w-16 h-16 object-contain rounded-lg border"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {team.sport && (
              <Badge variant="secondary">{team.sport.name}</Badge>
            )}
            {team.league && (
              <Badge variant="outline">{team.league}</Badge>
            )}
            {team.division && (
              <Badge variant="outline">{team.division}</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(team.city || team.country) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {team.city?.name}
                      {team.city?.name && team.country?.name && ', '}
                      {team.country?.name}
                    </span>
                  </div>
                )}

                {team.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={team.website.startsWith('http') ? team.website : `https://${team.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {team.website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {team.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`mailto:${team.email}`}
                      className="text-primary hover:underline"
                    >
                      {team.email}
                    </a>
                  </div>
                )}

                {team.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{team.phone}</span>
                  </div>
                )}

                {team.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span>{team.address}</span>
                  </div>
                )}

                {team.description && (
                  <div className="pt-4">
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{team.description}</p>
                  </div>
                )}

                {/* Social Media Links */}
                {team.team_social_links && team.team_social_links.length > 0 && (
                  <div className="pt-4">
                    <h4 className="font-semibold mb-3">Social Media</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {team.team_social_links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors"
                        >
                          {getSocialIcon(link.platform)}
                          <span className="capitalize">{link.platform}</span>
                          <ExternalLink className="h-3 w-3 ml-auto" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hiring Opportunities Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Hiring Opportunities
              </CardTitle>
            </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">Commercial Director</h4>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Lead commercial strategy and partnerships to drive revenue growth
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Posted: 2 weeks ago</span>
                      <span>Department: Commercial</span>
                      <span>Type: Full-time</span>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">Head of Marketing</h4>
                      <Badge variant="outline">New</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Develop and execute marketing campaigns to increase fan engagement
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Posted: 5 days ago</span>
                      <span>Department: Marketing</span>
                      <span>Type: Full-time</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">Youth Academy Coach</h4>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Develop young talent in our expanding youth academy program
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Posted: 1 week ago</span>
                      <span>Department: Academy</span>
                      <span>Type: Full-time</span>
                    </div>
                  </div>
                </div>
            </CardContent>
          </Card>

          {/* Buying Signals Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Buying Signals
              </CardTitle>
            </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="destructive">High Priority</Badge>
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                    </div>
                    <h4 className="font-semibold">Kit Sponsor Deal Expiring</h4>
                    <p className="text-sm text-muted-foreground">
                      Current 3-year deal with Umbro expires at end of 2024/25 season
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">Medium Priority</Badge>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                    <h4 className="font-semibold">Promotion to League One</h4>
                    <p className="text-sm text-muted-foreground">
                      Recent promotion increases commercial value and fan engagement opportunities
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">New Opportunity</Badge>
                      <span className="text-sm text-muted-foreground">2 weeks ago</span>
                    </div>
                    <h4 className="font-semibold">New Commercial Director Hired</h4>
                    <p className="text-sm text-muted-foreground">
                      Fresh leadership likely to review all commercial partnerships and explore new revenue streams
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">Monitoring</Badge>
                      <span className="text-sm text-muted-foreground">3 weeks ago</span>
                    </div>
                    <h4 className="font-semibold">Stadium Development Plans</h4>
                    <p className="text-sm text-muted-foreground">
                      Announced plans for Crown Ground improvements create naming rights opportunities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          {/* Employees Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employees {contacts.length > 0 && `(${contacts.length})`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {contacts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Mobile</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {contact.first_name} {contact.last_name}
                        </TableCell>
                        <TableCell>
                          {contact.position ? (
                            <Badge variant="secondary">{contact.position}</Badge>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {contact.department?.name || <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell>
                          {contact.email ? (
                            <a 
                              href={`mailto:${contact.email}`} 
                              className="text-primary hover:underline"
                            >
                              {contact.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {contact.phone || <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell>
                          {contact.mobile || <span className="text-muted-foreground">—</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <Users className="h-12 w-12 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">No employees found</p>
                      <p className="text-sm text-muted-foreground">
                        Employee data will be displayed here when available
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Opening Hours */}
        <div className="space-y-6">
          {team.opening_hours && team.opening_hours.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.opening_hours
                    .sort((a, b) => a.day_of_week - b.day_of_week)
                    .map((hours) => (
                      <div key={hours.id} className="flex justify-between items-center">
                        <span className="font-medium">{getDayName(hours.day_of_week)}</span>
                        <span className="text-muted-foreground">
                          {hours.is_closed ? 'Closed' : (
                            hours.open_time && hours.close_time
                              ? `${formatTime(hours.open_time)} - ${formatTime(hours.close_time)}`
                              : 'Hours not set'
                          )}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default TeamDetails;