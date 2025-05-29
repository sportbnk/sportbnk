
import React, { useState } from "react";
import CrmLayout from "@/components/crm/CrmLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, Users, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import ContactsView from "@/components/database/ContactsView";

interface List {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  profile_id: string;
}

interface Contact {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  role: string | null;
  position: string;
  team: string;
  teamId: number;
  verified?: boolean;
  activeReplier?: boolean;
  email_credits_consumed: number;
  phone_credits_consumed: number;
  linkedin_credits_consumed: number;
}

const Lists = () => {
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [revealedLinkedIns, setRevealedLinkedIns] = useState<Record<string, boolean>>({});
  
  const queryClient = useQueryClient();

  // Fetch user's lists
  const { data: lists = [], isLoading: listsLoading } = useQuery({
    queryKey: ['lists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lists')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as List[];
    },
  });

  // Create new list mutation
  const createListMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('lists')
        .insert({
          name: newListName,
          description: newListDescription,
          profile_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      setNewListName("");
      setNewListDescription("");
      toast.success("List created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create list: " + error.message);
    },
  });

  // Delete list mutation
  const deleteListMutation = useMutation({
    mutationFn: async (listId: string) => {
      const { error } = await supabase
        .from('lists')
        .delete()
        .eq('id', listId);

      if (error) throw error;
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      queryClient.invalidateQueries({ queryKey: ['listContacts'] });
      setSelectedListId(null);
      toast.success("List deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete list: " + error.message);
    },
  });

  // Fetch contacts for selected list
  const { data: listContacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['listContacts', selectedListId],
    queryFn: async () => {
      if (!selectedListId) return [];
      
      const { data, error } = await supabase
        .from('list_items')
        .select(`
          contact_id,
          contacts (
            id,
            name,
            email,
            phone,
            linkedin,
            role,
            email_credits_consumed,
            phone_credits_consumed,
            linkedin_credits_consumed,
            team_id,
            teams (
              name
            )
          )
        `)
        .eq('list_id', selectedListId);
      
      if (error) throw error;
      
      return data.map((item: any) => ({
        id: item.contacts.id,
        name: item.contacts.name,
        email: item.contacts.email,
        phone: item.contacts.phone,
        linkedin: item.contacts.linkedin,
        position: item.contacts.role || 'N/A',
        team: item.contacts.teams?.name || 'Unknown',
        teamId: item.contacts.team_id,
        email_credits_consumed: item.contacts.email_credits_consumed || 1,
        phone_credits_consumed: item.contacts.phone_credits_consumed || 2,
        linkedin_credits_consumed: item.contacts.linkedin_credits_consumed || 0,
      })) as Contact[];
    },
    enabled: !!selectedListId,
  });

  // Remove contact from list mutation
  const removeContactMutation = useMutation({
    mutationFn: async (contactId: string) => {
      const { error } = await supabase
        .from('list_items')
        .delete()
        .eq('list_id', selectedListId)
        .eq('contact_id', contactId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listContacts', selectedListId] });
      toast.success("Contact removed from list!");
    },
    onError: (error) => {
      toast.error("Failed to remove contact: " + error.message);
    },
  });

  const handleRevealEmail = (email: string, credits: number) => {
    setRevealedEmails(prev => ({ ...prev, [email]: true }));
    toast.success(`Email revealed! ${credits} credits used.`);
  };

  const handleRevealPhone = (phone: string, credits: number) => {
    setRevealedPhones(prev => ({ ...prev, [phone]: true }));
    toast.success(`Phone revealed! ${credits} credits used.`);
  };

  const handleRevealLinkedIn = (linkedin: string, credits: number) => {
    setRevealedLinkedIns(prev => ({ ...prev, [linkedin]: true }));
    toast.success(`LinkedIn revealed! ${credits} credits used.`);
  };

  const handleViewTeam = (teamId: number) => {
    toast.info(`Viewing team ID: ${teamId}`);
  };

  const handleAddToList = (contact: Contact, listId: string, listName: string) => {
    toast.info("Contact is already in a list");
  };

  if (listsLoading) {
    return (
      <CrmLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </CrmLayout>
    );
  }

  return (
    <CrmLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Lists</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" /> Create List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New List</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter list name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description (optional)</label>
                  <Textarea
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    placeholder="Enter list description"
                  />
                </div>
                <Button 
                  onClick={() => createListMutation.mutate()}
                  disabled={!newListName.trim() || createListMutation.isPending}
                  className="w-full"
                >
                  {createListMutation.isPending ? "Creating..." : "Create List"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Lists sidebar */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Lists ({lists.length})</h2>
            {lists.map((list) => (
              <Card 
                key={list.id} 
                className={`cursor-pointer transition-colors ${
                  selectedListId === list.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedListId(list.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{list.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteListMutation.mutate(list.id);
                      }}
                      disabled={deleteListMutation.isPending}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {list.description && (
                    <p className="text-sm text-muted-foreground">{list.description}</p>
                  )}
                </CardHeader>
              </Card>
            ))}
            
            {lists.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No lists created yet. Create your first list to get started!
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contacts view */}
          <div className="md:col-span-2">
            {selectedListId ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Contacts ({listContacts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {contactsLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    <ContactsView
                      data={listContacts}
                      revealedEmails={revealedEmails}
                      revealedPhones={revealedPhones}
                      revealedLinkedIns={revealedLinkedIns}
                      onRevealEmail={handleRevealEmail}
                      onRevealPhone={handleRevealPhone}
                      onRevealLinkedIn={handleRevealLinkedIn}
                      onViewTeam={handleViewTeam}
                      onAddToList={handleAddToList}
                      onRemoveFromList={(contactId) => removeContactMutation.mutate(contactId)}
                      isSavedList={true}
                    />
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a list to view its contacts</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </CrmLayout>
  );
};

export default Lists;
