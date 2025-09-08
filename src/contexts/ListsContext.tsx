import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  team: string;
  teamId?: number;
  linkedin?: string;
  verified?: boolean;
  activeReplier?: boolean;
  email_credits_consumed?: number;
  phone_credits_consumed?: number;
  linkedin_credits_consumed?: number;
}

interface ContactList {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  contacts: Contact[];
}

interface ListsContextType {
  lists: ContactList[];
  loading: boolean;
  loadLists: () => Promise<void>;
  addContactToList: (listId: string, contactId: string) => Promise<void>;
  removeContactFromList: (listId: string, contactId: string) => Promise<void>;
  createList: (name: string, description?: string) => Promise<string | null>;
  deleteList: (listId: string) => Promise<void>;
  isContactInList: (listId: string, contactId: string) => boolean;
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const useListsContext = () => {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error('useListsContext must be used within a ListsProvider');
  }
  return context;
};

export const ListsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<ContactList[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadLists = useCallback(async () => {
    if (!user) {
      setLists([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      // Get user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        console.error('No profile found for user');
        return;
      }

      // Get all lists for this user with their contacts
      const { data: listsData, error } = await supabase
        .from('lists')
        .select(`
          id,
          name,
          description,
          created_at,
          list_items (
            contacts (
              id,
              name,
              email,
              phone,
              role,
              linkedin,
              email_credits_consumed,
              phone_credits_consumed,
              linkedin_credits_consumed,
              teams (
                id,
                name
              )
            )
          )
        `)
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading lists:', error);
        toast.error('Failed to load lists');
        return;
      }

      // Transform the data to match our interface
      const transformedLists: ContactList[] = listsData?.map(list => ({
        id: list.id,
        name: list.name,
        description: list.description,
        created_at: list.created_at,
        contacts: list.list_items?.map((item: any) => {
          console.log('Raw contact data from DB:', {
            name: item.contacts.name,
            email_credits_consumed: item.contacts.email_credits_consumed,
            phone_credits_consumed: item.contacts.phone_credits_consumed,
            linkedin_credits_consumed: item.contacts.linkedin_credits_consumed
          });
          
          return {
            id: item.contacts.id,
            name: item.contacts.name,
            email: item.contacts.email,
            phone: item.contacts.phone,
            position: item.contacts.role,
            team: item.contacts.teams?.name || '',
            teamId: item.contacts.teams?.id,
            linkedin: item.contacts.linkedin,
            verified: false,
            activeReplier: false,
            // Use nullish coalescing (??) instead of logical OR (||) to preserve 0 values
            email_credits_consumed: item.contacts.email_credits_consumed ?? 1,
            phone_credits_consumed: item.contacts.phone_credits_consumed ?? 2,
            linkedin_credits_consumed: item.contacts.linkedin_credits_consumed ?? 0
          };
        }) || []
      })) || [];

      console.log('Transformed lists data:', transformedLists);
      setLists(transformedLists);
    } catch (error) {
      console.error('Error loading lists:', error);
      toast.error('Failed to load lists');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addContactToList = async (listId: string, contactId: string) => {
    try {
      // Check if contact is already in this list
      const { data: existingItem } = await supabase
        .from('list_items')
        .select('id')
        .eq('list_id', listId)
        .eq('contact_id', contactId)
        .single();

      if (existingItem) {
        return; // Already in list
      }

      // Add contact to list
      const { error } = await supabase
        .from('list_items')
        .insert({
          list_id: listId,
          contact_id: contactId
        });

      if (error) {
        console.error('Error adding contact to list:', error);
        throw error;
      }

      // Reload lists to update the UI
      await loadLists();
    } catch (error) {
      console.error('Error adding contact to list:', error);
      throw error;
    }
  };

  const removeContactFromList = async (listId: string, contactId: string) => {
    try {
      const { error } = await supabase
        .from('list_items')
        .delete()
        .eq('list_id', listId)
        .eq('contact_id', contactId);

      if (error) {
        console.error('Error removing contact from list:', error);
        throw error;
      }

      // Reload lists to update the UI
      await loadLists();
    } catch (error) {
      console.error('Error removing contact from list:', error);
      throw error;
    }
  };

  const createList = async (name: string, description?: string): Promise<string | null> => {
    if (!user) return null;

    try {
      // Get user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        throw new Error("Profile not found");
      }

      // Create new list
      const { data: newList, error } = await supabase
        .from('lists')
        .insert({
          profile_id: profile.id,
          name: name.trim(),
          description: description?.trim()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating list:', error);
        throw error;
      }

      // Reload lists to update the UI
      await loadLists();
      return newList.id;
    } catch (error) {
      console.error('Error creating list:', error);
      throw error;
    }
  };

  const deleteList = async (listId: string) => {
    try {
      const { error } = await supabase
        .from('lists')
        .delete()
        .eq('id', listId);

      if (error) {
        console.error('Error deleting list:', error);
        throw error;
      }

      // Reload lists to update the UI
      await loadLists();
    } catch (error) {
      console.error('Error deleting list:', error);
      throw error;
    }
  };

  const isContactInList = (listId: string, contactId: string): boolean => {
    const list = lists.find(l => l.id === listId);
    return list?.contacts.some(c => c.id === contactId) || false;
  };

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  const value: ListsContextType = {
    lists,
    loading,
    loadLists,
    addContactToList,
    removeContactFromList,
    createList,
    deleteList,
    isContactInList
  };

  return (
    <ListsContext.Provider value={value}>
      {children}
    </ListsContext.Provider>
  );
};
