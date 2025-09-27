import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Filter,
  Building2,
  MapPin,
  Users,
  ExternalLink,
  Mail,
  Phone,
  LinkedinIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import team logos
import arsenalLogo from "@/assets/team-logos/arsenal.png";
import chelseaLogo from "@/assets/team-logos/chelsea.png";
import liverpoolLogo from "@/assets/team-logos/liverpool.png";
import manchesterUnitedLogo from "@/assets/team-logos/manchester-united.png";
import manchesterCityLogo from "@/assets/team-logos/manchester-city.png";
import tottenhamLogo from "@/assets/team-logos/tottenham.png";
import newcastleLogo from "@/assets/team-logos/newcastle.png";
import astonVillaLogo from "@/assets/team-logos/aston-villa.png";
import bournemouthLogo from "@/assets/team-logos/bournemouth.png";
import brentfordLogo from "@/assets/team-logos/brentford.png";
import brightonLogo from "@/assets/team-logos/brighton.png";
import crystalPalaceLogo from "@/assets/team-logos/crystal-palace.png";
import evertonLogo from "@/assets/team-logos/everton.png";
import fulhamLogo from "@/assets/team-logos/fulham.png";
import ipswichLogo from "@/assets/team-logos/ipswich-town.png";
import leicesterLogo from "@/assets/team-logos/leicester.png";
import nottinghamForestLogo from "@/assets/team-logos/nottingham-forest.png";
import southamptonLogo from "@/assets/team-logos/west-ham.png"; // Using as placeholder
import westHamLogo from "@/assets/team-logos/west-ham.png";
import wolvesLogo from "@/assets/team-logos/wolves.png";

interface Organisation {
  id: string;
  name: string;
  type: string;
  sport: string;
  league: string;
  location: string;
  country: string;
  foundedYear: number;
  employees: string;
  website?: string;
  email?: string;
  phone?: string;
}

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  organisation: string;
  email: string;
  phone: string;
  linkedin?: string;
  location: string;
  department: string;
}

const premierLeagueTeams: Organisation[] = [
  {
    id: '1',
    name: 'Arsenal FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1886,
    employees: '500-1000',
    website: 'https://www.arsenal.com',
    email: 'info@arsenal.co.uk',
    phone: '+44 20 7619 5003'
  },
  {
    id: '2',
    name: 'Aston Villa FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Birmingham',
    country: 'England',
    foundedYear: 1874,
    employees: '200-500',
    website: 'https://www.avfc.co.uk',
    email: 'enquiries@avfc.co.uk',
    phone: '+44 121 327 2299'
  },
  {
    id: '3',
    name: 'AFC Bournemouth',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Bournemouth',
    country: 'England',
    foundedYear: 1899,
    employees: '100-200',
    website: 'https://www.afcb.co.uk',
    email: 'enquiries@afcb.co.uk',
    phone: '+44 1202 726 300'
  },
  {
    id: '4',
    name: 'Brentford FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1889,
    employees: '100-200',
    website: 'https://www.brentfordfc.com',
    email: 'enquiries@brentfordfc.com',
    phone: '+44 20 8847 2511'
  },
  {
    id: '5',
    name: 'Brighton & Hove Albion FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Brighton',
    country: 'England',
    foundedYear: 1901,
    employees: '200-500',
    website: 'https://www.brightonandhovealbion.com',
    email: 'seagulls@brightonandhovealbion.com',
    phone: '+44 1273 695 400'
  },
  {
    id: '6',
    name: 'Chelsea FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1905,
    employees: '500-1000',
    website: 'https://www.chelseafc.com',
    email: 'info@chelseafc.com',
    phone: '+44 871 984 1955'
  },
  {
    id: '7',
    name: 'Crystal Palace FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1905,
    employees: '200-500',
    website: 'https://www.cpfc.co.uk',
    email: 'info@cpfc.co.uk',
    phone: '+44 20 8768 6000'
  },
  {
    id: '8',
    name: 'Everton FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Liverpool',
    country: 'England',
    foundedYear: 1878,
    employees: '200-500',
    website: 'https://www.evertonfc.com',
    email: 'info@evertonfc.com',
    phone: '+44 151 556 1878'
  },
  {
    id: '9',
    name: 'Fulham FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1879,
    employees: '200-500',
    website: 'https://www.fulhamfc.com',
    email: 'enquiries@fulhamfc.com',
    phone: '+44 843 208 1222'
  },
  {
    id: '10',
    name: 'Ipswich Town FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Ipswich',
    country: 'England',
    foundedYear: 1878,
    employees: '100-200',
    website: 'https://www.itfc.co.uk',
    email: 'enquiries@itfc.co.uk',
    phone: '+44 1473 400 500'
  },
  {
    id: '11',
    name: 'Leicester City FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Leicester',
    country: 'England',
    foundedYear: 1884,
    employees: '200-500',
    website: 'https://www.lcfc.com',
    email: 'reception@lcfc.co.uk',
    phone: '+44 344 815 5000'
  },
  {
    id: '12',
    name: 'Liverpool FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Liverpool',
    country: 'England',
    foundedYear: 1892,
    employees: '1000+',
    website: 'https://www.liverpoolfc.com',
    email: 'info@liverpoolfc.com',
    phone: '+44 151 263 2361'
  },
  {
    id: '13',
    name: 'Manchester City FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Manchester',
    country: 'England',
    foundedYear: 1880,
    employees: '500-1000',
    website: 'https://www.mancity.com',
    email: 'mancity@mancity.com',
    phone: '+44 161 444 1894'
  },
  {
    id: '14',
    name: 'Manchester United FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Manchester',
    country: 'England',
    foundedYear: 1878,
    employees: '1000+',
    website: 'https://www.manutd.com',
    email: 'info@manutd.com',
    phone: '+44 161 868 8000'
  },
  {
    id: '15',
    name: 'Newcastle United FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Newcastle',
    country: 'England',
    foundedYear: 1892,
    employees: '200-500',
    website: 'https://www.nufc.co.uk',
    email: 'admin@nufc.co.uk',
    phone: '+44 191 201 8400'
  },
  {
    id: '16',
    name: 'Nottingham Forest FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Nottingham',
    country: 'England',
    foundedYear: 1865,
    employees: '100-200',
    website: 'https://www.nottinghamforest.co.uk',
    email: 'info@nottinghamforest.co.uk',
    phone: '+44 115 982 4444'
  },
  {
    id: '17',
    name: 'Southampton FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Southampton',
    country: 'England',
    foundedYear: 1885,
    employees: '200-500',
    website: 'https://www.southamptonfc.com',
    email: 'sfc@southamptonfc.com',
    phone: '+44 23 8022 8575'
  },
  {
    id: '18',
    name: 'Tottenham Hotspur FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1882,
    employees: '500-1000',
    website: 'https://www.tottenhamhotspur.com',
    email: 'customer.care@tottenhamhotspur.com',
    phone: '+44 344 499 5000'
  },
  {
    id: '19',
    name: 'West Ham United FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1895,
    employees: '200-500',
    website: 'https://www.whufc.com',
    email: 'info@westhamunited.co.uk',
    phone: '+44 20 8548 2748'
  },
  {
    id: '19',
    name: 'West Ham United FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1895,
    employees: '200-500',
    website: 'https://www.whufc.com',
    email: 'info@whufc.com',
    phone: '+44 20 8548 2748'
  },
  {
    id: '20',
    name: 'Wolverhampton Wanderers FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Wolverhampton',
    country: 'England',
    foundedYear: 1877,
    employees: '200-500',
    website: 'https://www.wolves.co.uk',
    email: 'info@wolves.co.uk',
    phone: '+44 871 222 2220'
  }
];

const mockPeople: Person[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    position: 'Chief Executive Officer',
    organisation: 'Arsenal FC',
    email: 'j.smith@arsenal.co.uk',
    phone: '+44 20 7619 5001',
    linkedin: 'https://linkedin.com/in/john-smith-arsenal',
    location: 'London',
    department: 'Executive'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    position: 'Marketing Director',
    organisation: 'Manchester United FC',
    email: 's.johnson@manutd.com',
    phone: '+44 161 868 8001',
    linkedin: 'https://linkedin.com/in/sarah-johnson-mufc',
    location: 'Manchester',
    department: 'Marketing'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    position: 'Head of Commercial',
    organisation: 'Liverpool FC',
    email: 'm.brown@liverpoolfc.com',
    phone: '+44 151 263 2362',
    linkedin: 'https://linkedin.com/in/michael-brown-lfc',
    location: 'Liverpool',
    department: 'Commercial'
  },
  {
    id: '4',
    firstName: 'Emma',
    lastName: 'Wilson',
    position: 'Communications Manager',
    organisation: 'Chelsea FC',
    email: 'e.wilson@chelseafc.com',
    phone: '+44 871 984 1956',
    linkedin: 'https://linkedin.com/in/emma-wilson-cfc',
    location: 'London',
    department: 'Communications'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Taylor',
    position: 'Stadium Operations Director',
    organisation: 'Manchester City FC',
    email: 'd.taylor@mancity.com',
    phone: '+44 161 444 1895',
    linkedin: 'https://linkedin.com/in/david-taylor-mcfc',
    location: 'Manchester',
    department: 'Operations'
  },
  {
    id: '6',
    firstName: 'Lisa',
    lastName: 'Anderson',
    position: 'Head of Youth Development',
    organisation: 'Tottenham Hotspur FC',
    email: 'l.anderson@tottenhamhotspur.com',
    phone: '+44 344 499 5001',
    linkedin: 'https://linkedin.com/in/lisa-anderson-thfc',
    location: 'London',
    department: 'Academy'
  },
  {
    id: '7',
    lastName: 'Garcia',
    firstName: 'Carlos',
    position: 'Head of Recruitment',
    organisation: 'Brighton & Hove Albion FC',
    email: 'c.garcia@brightonandhovealbion.com',
    phone: '+44 1273 695 401',
    linkedin: 'https://linkedin.com/in/carlos-garcia-bhafc',
    location: 'Brighton',
    department: 'Football Operations'
  },
  {
    id: '8',
    firstName: 'Rachel',
    lastName: 'Thomas',
    position: 'Finance Director',
    organisation: 'Newcastle United FC',
    email: 'r.thomas@nufc.co.uk',
    phone: '+44 191 201 8401',
    linkedin: 'https://linkedin.com/in/rachel-thomas-nufc',
    location: 'Newcastle',
    department: 'Finance'
  }
];

const getTeamLogo = (teamName: string) => {
  const logoMap: Record<string, string> = {
    'Arsenal FC': arsenalLogo,
    'Chelsea FC': chelseaLogo,
    'Liverpool FC': liverpoolLogo,
    'Manchester United FC': manchesterUnitedLogo,
    'Manchester City FC': manchesterCityLogo,
    'Tottenham Hotspur FC': tottenhamLogo,
    'Newcastle United FC': newcastleLogo,
    'Aston Villa FC': astonVillaLogo,
    'AFC Bournemouth': bournemouthLogo,
    'Brentford FC': brentfordLogo,
    'Brighton & Hove Albion FC': brightonLogo,
    'Crystal Palace FC': crystalPalaceLogo,
    'Everton FC': evertonLogo,
    'Fulham FC': fulhamLogo,
    'Ipswich Town FC': ipswichLogo,
    'Leicester City FC': leicesterLogo,
    'Nottingham Forest FC': nottinghamForestLogo,
    'Southampton FC': southamptonLogo,
    'West Ham United FC': westHamLogo,
    'Wolverhampton Wanderers FC': wolvesLogo
  };
  return logoMap[teamName] || arsenalLogo;
};

const Discover = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganisations, setSelectedOrganisations] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('organisations');

  const filteredOrganisations = premierLeagueTeams.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPeople = mockPeople.filter(person =>
    `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectOrganisation = (orgId: string) => {
    setSelectedOrganisations(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  const handleSelectPerson = (personId: string) => {
    setSelectedPeople(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handleSelectAllOrganisations = () => {
    if (selectedOrganisations.length === filteredOrganisations.length) {
      setSelectedOrganisations([]);
    } else {
      setSelectedOrganisations(filteredOrganisations.map(org => org.id));
    }
  };

  const handleSelectAllPeople = () => {
    if (selectedPeople.length === filteredPeople.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(filteredPeople.map(person => person.id));
    }
  };

  const handleAddToList = () => {
    const selectedCount = activeTab === 'organisations' ? selectedOrganisations.length : selectedPeople.length;
    const itemType = activeTab === 'organisations' ? 'organisation' : 'person';
    
    if (selectedCount === 0) {
      toast({
        title: "No Selection",
        description: `Please select ${itemType}s to add to your list.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to List",
      description: `Successfully added ${selectedCount} ${selectedCount === 1 ? itemType : `${itemType}s`} to your list.`,
    });
    
    if (activeTab === 'organisations') {
      setSelectedOrganisations([]);
    } else {
      setSelectedPeople([]);
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Football Club': 'bg-green-100 text-green-800',
      'Cricket Club': 'bg-blue-100 text-blue-800',
      'Rugby Club': 'bg-purple-100 text-purple-800',
      'Basketball Club': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Executive': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-blue-100 text-blue-800',
      'Commercial': 'bg-green-100 text-green-800',
      'Communications': 'bg-orange-100 text-orange-800',
      'Operations': 'bg-gray-100 text-gray-800',
      'Academy': 'bg-yellow-100 text-yellow-800',
      'Football Operations': 'bg-red-100 text-red-800',
      'Finance': 'bg-indigo-100 text-indigo-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  const selectedCount = activeTab === 'organisations' ? selectedOrganisations.length : selectedPeople.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discover</h1>
            <p className="text-gray-600 mt-1">Explore and discover Premier League football teams and contacts</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleAddToList}
              disabled={selectedCount === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to My List ({selectedCount})
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={activeTab === 'organisations' 
                    ? "Search organisations by name, type, sport, league, or location..." 
                    : "Search people by name, position, organisation, or department..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="organisations">Organisations</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>
          
          <TabsContent value="organisations" className="mt-6">
            <Card>
              <CardContent className="p-0">
                {filteredOrganisations.length > 0 && (
                  <div className="flex items-center gap-4 p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all-orgs"
                        checked={selectedOrganisations.length === filteredOrganisations.length}
                        onCheckedChange={handleSelectAllOrganisations}
                      />
                      <label htmlFor="select-all-orgs" className="text-sm font-medium">
                        Select All ({filteredOrganisations.length})
                      </label>
                    </div>
                    {selectedOrganisations.length > 0 && (
                      <Badge variant="secondary">
                        {selectedOrganisations.length} selected
                      </Badge>
                    )}
                  </div>
                )}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedOrganisations.length === filteredOrganisations.length && filteredOrganisations.length > 0}
                          onCheckedChange={handleSelectAllOrganisations}
                        />
                      </TableHead>
                      <TableHead>Organisation</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>League</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrganisations.map((org) => (
                      <TableRow key={org.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox
                            checked={selectedOrganisations.includes(org.id)}
                            onCheckedChange={() => handleSelectOrganisation(org.id)}
                          />
                        </TableCell>
                         <TableCell>
                           <div className="flex items-center gap-3">
                             <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-white">
                               <img 
                                 src={getTeamLogo(org.name)} 
                                 alt={`${org.name} logo`}
                                 className="w-8 h-8 object-contain"
                               />
                             </div>
                             <div>
                               <button 
                                 onClick={() => navigate(`/crm/discover/organisation/${org.id}`)}
                                 className="font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer text-left"
                               >
                                 {org.name}
                               </button>
                               <div className="text-sm text-gray-500">Est. {org.foundedYear}</div>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getTypeColor(org.type)}`}>
                            {org.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {org.sport}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700">{org.league}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{org.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{org.employees}</span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {org.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600 truncate max-w-32">
                                  {org.email}
                                </span>
                              </div>
                            )}
                            {org.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">
                                  {org.phone}
                                </span>
                              </div>
                            )}
                            {org.website && (
                              <div className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3 text-gray-400" />
                                <a 
                                  href={org.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Website
                                </a>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredOrganisations.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No organisations found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="people" className="mt-6">
            <Card>
              <CardContent className="p-0">
                {filteredPeople.length > 0 && (
                  <div className="flex items-center gap-4 p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all-people"
                        checked={selectedPeople.length === filteredPeople.length}
                        onCheckedChange={handleSelectAllPeople}
                      />
                      <label htmlFor="select-all-people" className="text-sm font-medium">
                        Select All ({filteredPeople.length})
                      </label>
                    </div>
                    {selectedPeople.length > 0 && (
                      <Badge variant="secondary">
                        {selectedPeople.length} selected
                      </Badge>
                    )}
                  </div>
                )}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedPeople.length === filteredPeople.length && filteredPeople.length > 0}
                          onCheckedChange={handleSelectAllPeople}
                        />
                      </TableHead>
                      <TableHead>Person</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Organisation</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPeople.map((person) => (
                      <TableRow key={person.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox
                            checked={selectedPeople.includes(person.id)}
                            onCheckedChange={() => handleSelectPerson(person.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {person.firstName[0]}{person.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">
                                {person.firstName} {person.lastName}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700">{person.position}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{person.organisation}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getDepartmentColor(person.department)}`}>
                            {person.department}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{person.location}</span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600 truncate max-w-32">
                                {person.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {person.phone}
                              </span>
                            </div>
                            {person.linkedin && (
                              <div className="flex items-center gap-1">
                                <LinkedinIcon className="h-3 w-3 text-gray-400" />
                                <a 
                                  href={person.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  LinkedIn
                                </a>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredPeople.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No people found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Discover;