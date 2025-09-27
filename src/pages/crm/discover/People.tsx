import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Filter,
  Users,
  Mail,
  Phone,
  LinkedinIcon,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const DiscoverPeople = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [people, setPeople] = useState<Person[]>(mockPeople);

  const filteredPeople = people.filter(person =>
    `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPerson = (personId: string) => {
    setSelectedPeople(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPeople.length === filteredPeople.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(filteredPeople.map(person => person.id));
    }
  };

  const handleAddToList = () => {
    if (selectedPeople.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select people to add to your list.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to List",
      description: `Successfully added ${selectedPeople.length} ${selectedPeople.length === 1 ? 'person' : 'people'} to your list.`,
    });
    
    setSelectedPeople([]);
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

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discover People</h1>
            <p className="text-gray-600 mt-1">Explore and discover key contacts in Premier League football</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleAddToList}
              disabled={selectedPeople.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to My List ({selectedPeople.length})
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
                  placeholder="Search people by name, position, organisation, or department..."
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
            {filteredPeople.length > 0 && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedPeople.length === filteredPeople.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="text-sm font-medium">
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
          </CardContent>
        </Card>

        {/* People List */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedPeople.length === filteredPeople.length && filteredPeople.length > 0}
                      onCheckedChange={handleSelectAll}
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
      </div>
    </div>
  );
};

export default DiscoverPeople;