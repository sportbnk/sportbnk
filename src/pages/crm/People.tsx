
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

const People = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select(`
          *,
          teams (
            id,
            name
          ),
          departments (
            id,
            name
          )
        `);
      
      if (error) throw error;
      return data;
    },
  });

  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.teams?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-sportbnk-navy">People</h1>
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
                <TableHead>Team</TableHead>
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
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default People;
