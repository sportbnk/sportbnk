import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Mail, Phone, Linkedin, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContactsFilters from "@/components/database/ContactsFilters";
import ListSelectionPopover from "@/components/database/ListSelectionPopover";

const People = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    position: "all",
    team: "all",
    sport: "all",
    level: "all",
    country: "all",
    city: "all",
    revenue: "all",
    employees: "all"
  });
  const { toast } = useToast();

  // Fetch all departments to get ID for the selected position
  const { data: allDepartments } = useQuery({
    queryKey: ['all-departments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('departments')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts', filters, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('contacts')
        .select(`
          *,
          teams (
            id,
            name,
            cities (
              id,
              name,
              countries (
                id,
                name
              )
            )
          ),
          departments (
            id,
            name
          )
        `);

      // Apply department filter using department ID
      if (filters.position !== "all") {
        const selectedDepartment = allDepartments?.find(dept => dept.name === filters.position);
        if (selectedDepartment) {
          query = query.eq('department_id', selectedDepartment.id);
        }
      }

      // Apply team filters
      if (filters.team !== "all") {
        query = query.eq('teams.name', filters.team);
      }

      // Apply location filters through team relationships
      if (filters.country !== "all") {
        query = query.eq('teams.cities.countries.name', filters.country);
      }

      if (filters.city !== "all") {
        query = query.eq('teams.cities.name', filters.city);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching contacts:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!allDepartments, // Only run query when departments are loaded
  });

  const filteredContacts = contacts?.filter(contact => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.teams?.name?.toLowerCase().includes(searchLower) ||
      contact.role?.toLowerCase().includes(searchLower)
    );
  });

  const handleRevealContact = async (contactId: string, field: 'email' | 'phone' | 'linkedin') => {
    try {
      // This would normally involve credit checking and user authentication
      toast({
        title: "Contact Revealed",
        description: `${field} details revealed for this contact.`,
      });
    } catch (error) {
      console.error('Error revealing contact:', error);
      toast({
        title: "Error",
        description: "Failed to reveal contact details",
        variant: "destructive",
      });
    }
  };

  const handleAddToList = (contact: any, listId: string, listName: string) => {
    toast({
      title: "Contact Added",
      description: `${contact.name} has been added to ${listName}`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">People Database</h1>
        </div>
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">People Database</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold">Filters</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <ContactsFilters 
                onFilterChange={setFilters}
                showTeamFilters={false}
                totalResults={filteredContacts?.length || 0}
                filters={filters}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Contact Database</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts?.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        {contact.role ? (
                          <Badge variant="secondary">{contact.role}</Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.departments?.name ? (
                          <span>{contact.departments.name}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.teams?.name ? (
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span>{contact.teams.name}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.teams?.cities ? (
                          <span className="text-sm text-gray-600">
                            {contact.teams.cities.name}, {contact.teams.cities.countries.name}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.email ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevealContact(contact.id, 'email')}
                            className="flex items-center space-x-1"
                          >
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">{contact.email}</span>
                          </Button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.phone ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevealContact(contact.id, 'phone')}
                            className="flex items-center space-x-1"
                          >
                            <Phone className="h-4 w-4" />
                            <span className="text-sm">{contact.phone}</span>
                          </Button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {contact.linkedin ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevealContact(contact.id, 'linkedin')}
                            className="flex items-center space-x-1"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span className="text-sm">View Profile</span>
                          </Button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <ListSelectionPopover
                          contact={{
                            id: contact.id,
                            name: contact.name,
                            email: contact.email,
                            phone: contact.phone,
                            position: contact.role,
                            team: contact.teams?.name,
                            teamId: contact.teams?.id,
                            linkedin: contact.linkedin,
                            verified: false,
                            activeReplier: false
                          }}
                          onAddToList={handleAddToList}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default People;
