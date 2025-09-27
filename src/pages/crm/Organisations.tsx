import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
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
    // You could return different icons based on sport
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

        {/* Organisations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganisations.map((org) => (
            <Card key={org.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedOrganisations.includes(org.id)}
                      onCheckedChange={() => handleSelectOrganisation(org.id)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
                    {getSportIcon(org.sport)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {org.name}
                      </h3>
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
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {org.league}
                    </p>
                    
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-600">
                          {org.location}, {org.country}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-600">
                          {org.employees} employees
                        </p>
                      </div>
                      {org.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-600 truncate">
                            {org.email}
                          </p>
                        </div>
                      )}
                      {org.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-600">
                            {org.phone}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={`text-xs ${getTypeColor(org.type)}`}>
                        {org.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {org.sport}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Est. {org.foundedYear}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrganisations.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No organisations found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Organisations;