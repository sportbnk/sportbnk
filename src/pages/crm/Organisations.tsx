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
  Phone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const Organisations = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganisations, setSelectedOrganisations] = useState<string[]>([]);
  const [organisations, setOrganisations] = useState<Organisation[]>(mockOrganisations);

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