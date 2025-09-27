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
  Download, 
  Plus, 
  Filter,
  Users,
  Building2,
  Mail,
  Phone,
  MapPin,
  ExternalLink
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

const People = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [people, setPeople] = useState<Person[]>(mockPeople);

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.department.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleAddToCRM = () => {
    if (selectedPeople.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select people to add to CRM.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to CRM",
      description: `Successfully added ${selectedPeople.length} ${selectedPeople.length === 1 ? 'person' : 'people'} to CRM.`,
    });
    
    setSelectedPeople([]);
  };

  const handleExportCSV = () => {
    if (selectedPeople.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select people to export.",
        variant: "destructive"
      });
      return;
    }

    const selectedData = people.filter(person => selectedPeople.includes(person.id));
    const csvContent = [
      ['Name', 'Position', 'Company', 'Email', 'Phone', 'Location', 'Sport', 'Department'],
      ...selectedData.map(person => [
        person.name,
        person.position,
        person.company,
        person.email,
        person.phone,
        person.location,
        person.sport,
        person.department
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `people-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Exported ${selectedPeople.length} ${selectedPeople.length === 1 ? 'person' : 'people'} to CSV.`,
    });
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

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">People</h1>
            <p className="text-gray-600 mt-1">Build and manage your people lists</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleAddToCRM}
              disabled={selectedPeople.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to CRM ({selectedPeople.length})
            </Button>
            <Button 
              onClick={handleExportCSV}
              disabled={selectedPeople.length === 0}
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
                  placeholder="Search people by name, company, position, or department..."
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

export default People;