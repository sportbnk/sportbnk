import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Download, 
  Plus, 
  Filter,
  Users,
  Building2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Person {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  sport: string;
  department: string;
  avatarUrl?: string;
  linkedinUrl?: string;
}

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

const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Commercial Director',
    company: 'Manchester United FC',
    email: 's.johnson@manutd.com',
    phone: '+44 161 868 8000',
    location: 'Manchester, UK',
    sport: 'Football',
    department: 'Commercial',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson'
  },
  {
    id: '2',
    name: 'David Martinez',
    position: 'Head of Procurement',
    company: 'Real Madrid CF',
    email: 'd.martinez@realmadrid.com',
    phone: '+34 91 398 4300',
    location: 'Madrid, Spain',
    sport: 'Football',
    department: 'Operations'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    position: 'Marketing Director',
    company: 'Surrey County Cricket Club',
    email: 'e.thompson@surreyccc.co.uk',
    phone: '+44 20 8398 1000',
    location: 'London, UK',
    sport: 'Cricket',
    department: 'Marketing'
  },
  {
    id: '4',
    name: 'James Wilson',
    position: 'Partnership Manager',
    company: 'Liverpool FC',
    email: 'j.wilson@liverpoolfc.com',
    phone: '+44 151 263 2361',
    location: 'Liverpool, UK',
    sport: 'Football',
    department: 'Partnerships'
  },
  {
    id: '5',
    name: 'Maria Rodriguez',
    position: 'Head of Digital Marketing',
    company: 'FC Barcelona',
    email: 'm.rodriguez@fcbarcelona.com',
    phone: '+34 93 496 3600',
    location: 'Barcelona, Spain',
    sport: 'Football',
    department: 'Marketing'
  },
  {
    id: '6',
    name: 'Tom Brown',
    position: 'Commercial Manager',
    company: 'Yorkshire County Cricket Club',
    email: 't.brown@yorkshireccc.com',
    phone: '+44 113 278 7394',
    location: 'Leeds, UK',
    sport: 'Cricket',
    department: 'Commercial'
  }
];

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

const Discover = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedOrganisations, setSelectedOrganisations] = useState<string[]>([]);
  const [sportFilter, setSportFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredPeople = mockPeople.filter(person =>
    (person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
     person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
     person.department.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (sportFilter === 'all' || person.sport === sportFilter) &&
    (countryFilter === 'all' || person.location.includes(countryFilter)) &&
    (departmentFilter === 'all' || person.department === departmentFilter)
  );

  const filteredOrganisations = mockOrganisations.filter(org =>
    (org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     org.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
     org.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
     org.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
     org.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (sportFilter === 'all' || org.sport === sportFilter) &&
    (countryFilter === 'all' || org.country === countryFilter)
  );

  const handleSelectPerson = (personId: string) => {
    setSelectedPeople(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handleSelectOrganisation = (orgId: string) => {
    setSelectedOrganisations(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  const handleSelectAllPeople = () => {
    if (selectedPeople.length === filteredPeople.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(filteredPeople.map(person => person.id));
    }
  };

  const handleSelectAllOrganisations = () => {
    if (selectedOrganisations.length === filteredOrganisations.length) {
      setSelectedOrganisations([]);
    } else {
      setSelectedOrganisations(filteredOrganisations.map(org => org.id));
    }
  };

  const handleAddToList = (type: 'people' | 'organisations') => {
    const selected = type === 'people' ? selectedPeople : selectedOrganisations;
    if (selected.length === 0) {
      toast({
        title: "No Selection",
        description: `Please select ${type} to add to list.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to List",
      description: `Successfully added ${selected.length} ${type === 'people' ? (selected.length === 1 ? 'person' : 'people') : (selected.length === 1 ? 'organisation' : 'organisations')} to your list.`,
    });
    
    if (type === 'people') {
      setSelectedPeople([]);
    } else {
      setSelectedOrganisations([]);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Commercial': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-green-100 text-green-800',
      'Operations': 'bg-yellow-100 text-yellow-800',
      'Partnerships': 'bg-purple-100 text-purple-800',
      'Digital': 'bg-pink-100 text-pink-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Discover</h1>
          <p className="text-gray-600 mt-1">Find and discover organizations and people in sports</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search people, organizations, positions, departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filters */}
              <div className="flex gap-4">
                <Select value={sportFilter} onValueChange={setSportFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sport" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    <SelectItem value="all">All Sports</SelectItem>
                    <SelectItem value="Football">Football</SelectItem>
                    <SelectItem value="Cricket">Cricket</SelectItem>
                    <SelectItem value="Rugby">Rugby</SelectItem>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="England">England</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Partnerships">Partnerships</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setSportFilter('all');
                  setCountryFilter('all');
                  setDepartmentFilter('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Toggle Between Organizations and People */}
        <Tabs defaultValue="organisations" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid w-80 grid-cols-2">
              <TabsTrigger value="organisations" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Organisations ({filteredOrganisations.length})
              </TabsTrigger>
              <TabsTrigger value="people" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                People ({filteredPeople.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Organisations Tab */}
          <TabsContent value="organisations">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {selectedOrganisations.length > 0 && (
                  <Badge variant="secondary">
                    {selectedOrganisations.length} selected
                  </Badge>
                )}
              </div>
              <Button 
                onClick={() => handleAddToList('organisations')}
                disabled={selectedOrganisations.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to List ({selectedOrganisations.length})
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
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
                      <TableHead className="w-20">Website</TableHead>
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
                
                {filteredOrganisations.length === 0 && (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No organisations found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* People Tab */}
          <TabsContent value="people">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {selectedPeople.length > 0 && (
                  <Badge variant="secondary">
                    {selectedPeople.length} selected
                  </Badge>
                )}
              </div>
              <Button 
                onClick={() => handleAddToList('people')}
                disabled={selectedPeople.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to List ({selectedPeople.length})
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
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
                      <TableHead>Company</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="w-20">LinkedIn</TableHead>
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
                              <AvatarImage src={person.avatarUrl} />
                              <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                                {getInitials(person.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{person.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700">{person.position}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{person.company}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getDepartmentColor(person.department)}`}>
                            {person.department}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {person.sport}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{person.location}</span>
                          </div>
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
                          </div>
                        </TableCell>
                        <TableCell>
                          {person.linkedinUrl && (
                            <a
                              href={person.linkedinUrl}
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
                
                {filteredPeople.length === 0 && (
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