
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";
import { useLists } from "@/contexts/ListsContext";

interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  team?: string;
  linkedin?: string;
}

interface List {
  id: string;
  name: string;
  description?: string;
}

const Lists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const { toast } = useToast();
  const { lists, refreshLists } = useLists();

  // Fetch contacts for the selected list
  const { data: contacts, refetch: refetchContacts } = useQuery({
    queryKey: ['list-contacts', selectedList?.id],
    queryFn: async () => {
      if (!selectedList) return [];

      const { data, error } = await supabase
        .from('list_items')
        .select(`
          contacts (
            id,
            name,
            email,
            phone,
            role,
            linkedin,
            teams (
              name
            )
          )
        `)
        .eq('list_id', selectedList.id);

      if (error) {
        console.error('Error fetching contacts:', error);
        toast({
          title: "Error",
          description: "Failed to load contacts",
          variant: "destructive",
        });
        return [];
      }

      return data?.map(item => item.contacts) as Contact[];
    },
    enabled: !!selectedList, // Only run query when a list is selected
  });

  const filteredContacts = contacts?.filter(contact => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.role?.toLowerCase().includes(searchLower) ||
      contact.team?.toLowerCase().includes(searchLower)
    );
  });

  const handleRemoveFromList = async (contactId: string) => {
    if (!selectedList) return;

    try {
      const { error } = await supabase
        .from('list_items')
        .delete()
        .eq('list_id', selectedList.id)
        .eq('contact_id', contactId);

      if (error) {
        console.error('Error removing contact from list:', error);
        toast({
          title: "Error",
          description: "Failed to remove contact from list",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Contact removed from list",
      });
      // Refresh contacts
      refetchContacts();
    } catch (error) {
      console.error('Error removing contact from list:', error);
      toast({
        title: "Error", 
        description: "Failed to remove contact from list",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Lists</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Lists Sidebar */}
        <div className="md:col-span-1">
          <Card className="shadow-md">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold">Your Lists</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-2">
                {lists?.map((list) => (
                  <Button
                    key={list.id}
                    variant="outline"
                    className={`w-full justify-start text-sm ${selectedList?.id === list.id ? 'bg-accent text-accent-foreground' : ''}`}
                    onClick={() => setSelectedList(list)}
                  >
                    {list.name}
                  </Button>
                ))}
                {lists?.length === 0 && (
                  <p className="text-sm text-muted-foreground">No lists found. Create some lists to organize your contacts.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts Table */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedList ? selectedList.name : 'Select a List'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedList ? (
                <>
                  <div className="relative mb-4">
                    <Input
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full"
                    />
                    <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Team</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContacts?.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.role}</TableCell>
                          <TableCell>{contact.team}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFromList(contact.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredContacts?.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No contacts found in this list.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Select a list to view its contacts.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Lists;
