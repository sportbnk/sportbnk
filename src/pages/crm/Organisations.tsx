import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Download, 
  Plus, 
  Filter,
  Building2,
  MapPin,
  Users,
  ExternalLink,
  Globe,
  Mail,
  Phone,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  logoUrl?: string;
  description?: string;
}

const mockOrganisations: Organisation[] = [
  {
    id: '1',
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
    phone: '+44 161 868 8000',
    description: 'Professional football club based in Manchester'
  },
  {
    id: '2',
    name: 'Real Madrid CF',
    type: 'Football Club',
    sport: 'Football',
    league: 'La Liga',
    location: 'Madrid',
    country: 'Spain',
    foundedYear: 1902,
    employees: '500-1000',
    website: 'https://www.realmadrid.com',
    email: 'info@realmadrid.com',
    phone: '+34 91 398 4300'
  },
  {
    id: '3',
    name: 'Surrey County Cricket Club',
    type: 'Cricket Club',
    sport: 'Cricket',
    league: 'County Championship',
    location: 'London',
    country: 'England',
    foundedYear: 1845,
    employees: '100-500',
    website: 'https://www.surreycricket.com',
    email: 'info@surreycricket.com',
    phone: '+44 20 8398 1000'
  },
  {
    id: '4',
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
    id: '5',
    name: 'FC Barcelona',
    type: 'Football Club',
    sport: 'Football',
    league: 'La Liga',
    location: 'Barcelona',
    country: 'Spain',
    foundedYear: 1899,
    employees: '1000+',
    website: 'https://www.fcbarcelona.com',
    email: 'info@fcbarcelona.com',
    phone: '+34 93 496 3600'
  },
  {
    id: '6',
    name: 'Yorkshire County Cricket Club',
    type: 'Cricket Club',
    sport: 'Cricket',
    league: 'County Championship',
    location: 'Leeds',
    country: 'England',
    foundedYear: 1863,
    employees: '100-500',
    website: 'https://www.yorkshireccc.com',
    email: 'info@yorkshireccc.com',
    phone: '+44 113 278 7394'
  },
  {
    id: '7',
    name: 'Chennai Super Kings',
    type: 'Cricket Team',
    sport: 'Cricket',
    league: 'IPL',
    location: 'Chennai',
    country: 'India',
    foundedYear: 2008,
    employees: '100-500',
    website: 'https://www.chennaisuperkings.com',
    email: 'info@csk.com',
    phone: '+91 44 2811 0000'
  },
  {
    id: '8',
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
    id: '9',
    name: 'Mumbai Indians',
    type: 'Cricket Team',
    sport: 'Cricket',
    league: 'IPL',
    location: 'Mumbai',
    country: 'India',
    foundedYear: 2008,
    employees: '100-500',
    website: 'https://www.mumbaiindians.com',
    email: 'info@mumbaiindians.com',
    phone: '+91 22 2675 0000'
  },
  {
    id: '10',
    name: 'Bayern Munich',
    type: 'Football Club',
    sport: 'Football',
    league: 'Bundesliga',
    location: 'Munich',
    country: 'Germany',
    foundedYear: 1900,
    employees: '1000+',
    website: 'https://fcbayern.com',
    email: 'info@fcbayern.com',
    phone: '+49 89 69931 0'
  },
  {
    id: '11',
    name: 'Kent County Cricket Club',
    type: 'Cricket Club',
    sport: 'Cricket',
    league: 'County Championship',
    location: 'Canterbury',
    country: 'England',
    foundedYear: 1859,
    employees: '50-100',
    website: 'https://www.kentcricket.co.uk',
    email: 'info@kentcricket.co.uk',
    phone: '+44 1227 456 886'
  },
  {
    id: '12',
    name: 'Juventus FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Serie A',
    location: 'Turin',
    country: 'Italy',
    foundedYear: 1897,
    employees: '500-1000',
    website: 'https://www.juventus.com',
    email: 'info@juventus.com',
    phone: '+39 011 6563111'
  },
  {
    id: '13',
    name: 'Royal Challengers Bangalore',
    type: 'Cricket Team',
    sport: 'Cricket',
    league: 'IPL',
    location: 'Bangalore',
    country: 'India',
    foundedYear: 2008,
    employees: '50-100',
    website: 'https://www.royalchallengers.com',
    email: 'info@rcb.com',
    phone: '+91 80 4092 0000'
  },
  {
    id: '14',
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
    id: '15',
    name: 'Warwickshire County Cricket Club',
    type: 'Cricket Club',
    sport: 'Cricket',
    league: 'County Championship',
    location: 'Birmingham',
    country: 'England',
    foundedYear: 1882,
    employees: '50-100',
    website: 'https://www.warwickshireccc.com',
    email: 'info@warwickshireccc.com',
    phone: '+44 121 446 4422'
  }
];

const Organisations = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganisations, setSelectedOrganisations] = useState<string[]>([]);
  const [organisations, setOrganisations] = useState<Organisation[]>(mockOrganisations);
  const [isClassifying, setIsClassifying] = useState(false);

  const filteredOrganisations = organisations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectOrganisation = (orgId: string) => {
    setSelectedOrganisations(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrganisations.length === filteredOrganisations.length) {
      setSelectedOrganisations([]);
    } else {
      setSelectedOrganisations(filteredOrganisations.map(org => org.id));
    }
  };

  const handleAddToCRM = () => {
    if (selectedOrganisations.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select organisations to add to CRM.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to CRM",
      description: `Successfully added ${selectedOrganisations.length} ${selectedOrganisations.length === 1 ? 'organisation' : 'organisations'} to CRM.`,
    });
    
    setSelectedOrganisations([]);
  };

  const handleExportCSV = () => {
    if (selectedOrganisations.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select organisations to export.",
        variant: "destructive"
      });
      return;
    }

    const selectedData = organisations.filter(org => selectedOrganisations.includes(org.id));
    const csvContent = [
      ['Name', 'Type', 'Sport', 'League', 'Location', 'Country', 'Founded', 'Employees', 'Website', 'Email', 'Phone'],
      ...selectedData.map(org => [
        org.name,
        org.type,
        org.sport,
        org.league,
        org.location,
        org.country,
        org.foundedYear.toString(),
        org.employees,
        org.website || '',
        org.email || '',
        org.phone || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `organisations-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Exported ${selectedOrganisations.length} ${selectedOrganisations.length === 1 ? 'organisation' : 'organisations'} to CSV.`,
    });
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

  const getSportIcon = (sport: string) => {
    return <Building2 className="h-6 w-6 text-blue-600" />;
  };

  const classifyAllSports = async () => {
    setIsClassifying(true);
    const updatedOrganisations = [...organisations];
    
    try {
      for (let i = 0; i < updatedOrganisations.length; i++) {
        const org = updatedOrganisations[i];
        
        try {
          const { data, error } = await supabase.functions.invoke('classify-sport', {
            body: {
              organizationName: org.name,
              type: org.type,
              league: org.league,
              location: org.location
            }
          });

          if (error) {
            console.error('Error classifying sport for', org.name, error);
            continue;
          }

          if (data?.sport) {
            updatedOrganisations[i] = {
              ...org,
              sport: data.sport,
              type: data.sport === 'Cricket' ? 'Cricket Club' : 'Football Club'
            };
          }
        } catch (err) {
          console.error('Error classifying sport for', org.name, err);
        }
      }
      
      setOrganisations(updatedOrganisations);
      toast({
        title: "Classification Complete",
        description: "All organizations have been classified using AI!",
      });
    } catch (error) {
      console.error('Error during classification:', error);
      toast({
        title: "Classification Error",
        description: "There was an error classifying the organizations.",
        variant: "destructive"
      });
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organisations</h1>
            <p className="text-gray-600 mt-1">Build and manage your organisation lists</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={classifyAllSports}
              disabled={isClassifying}
              variant="secondary"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isClassifying ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              {isClassifying ? 'Classifying...' : 'AI Classify Sports'}
            </Button>
            <Button 
              onClick={handleAddToCRM}
              disabled={selectedOrganisations.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to CRM ({selectedOrganisations.length})
            </Button>
            <Button 
              onClick={handleExportCSV}
              disabled={selectedOrganisations.length === 0}
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
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
                  placeholder="Search organisations by name, type, sport, league, or location..."
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
            
            {/* Selection Controls */}
            {filteredOrganisations.length > 0 && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedOrganisations.length === filteredOrganisations.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm font-medium">
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
          </CardContent>
        </Card>

        {/* Organisations List */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedOrganisations.length === filteredOrganisations.length && filteredOrganisations.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>League</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
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
                        <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-100">
                          <Building2 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{org.name}</div>
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
                        <span className="text-sm text-gray-600">
                          {org.location}, {org.country}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{org.employees}</span>
                      </div>
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
                      </div>
                    </TableCell>
                    <TableCell>
                      {org.website && (
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
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
      </div>
    </div>
  );
};

export default Organisations;