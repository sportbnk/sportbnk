import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { List, ListItem } from '@/types/teams';
import { useToast } from '@/components/ui/use-toast';

interface ListsContextType {
  lists: List[];
  loading: boolean;
  createList: (name: string, description?: string) => Promise<void>;
  deleteList: (listId: string) => Promise<void>;
  updateList: (listId: string, name: string, description?: string) => Promise<void>;
  addItemToList: (listId: string, contactId?: string, teamId?: string) => Promise<void>;
  removeItemFromList: (listItemId: string) => Promise<void>;
  refreshLists: () => Promise<void>;
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const useLists = () => {
  const context = useContext(ListsContext);
  if (context === undefined) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
};

export const ListsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLists = async () => {
    if (!user) return;

    try {
      // First get the user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      // Then fetch lists with their items
      const { data, error } = await supabase
        .from('lists')
        .select(`
          *,
          list_items(
            *,
            contact:contacts(*),
            team:teams(*)
          )
        `)
        .eq('profile_id', profile.id);

      if (error) throw error;
      setLists(data || []);
    } catch (error) {
      console.error('Error fetching lists:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lists",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [user]);

  const createList = async (name: string, description?: string) => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      const { error } = await supabase
        .from('lists')
        .insert({
          profile_id: profile.id,
          name,
          description,
        });

      if (error) throw error;

      await fetchLists();
      toast({
        title: "Success",
        description: "List created successfully",
      });
    } catch (error) {
      console.error('Error creating list:', error);
      toast({
        title: "Error",
        description: "Failed to create list",
        variant: "destructive",
      });
    }
  };

  const deleteList = async (listId: string) => {
    try {
      const { error } = await supabase
        .from('lists')
        .delete()
        .eq('id', listId);

      if (error) throw error;

      await fetchLists();
      toast({
        title: "Success",
        description: "List deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting list:', error);
      toast({
        title: "Error",
        description: "Failed to delete list",
        variant: "destructive",
      });
    }
  };

  const updateList = async (listId: string, name: string, description?: string) => {
    try {
      const { error } = await supabase
        .from('lists')
        .update({ name, description })
        .eq('id', listId);

      if (error) throw error;

      await fetchLists();
      toast({
        title: "Success",
        description: "List updated successfully",
      });
    } catch (error) {
      console.error('Error updating list:', error);
      toast({
        title: "Error",
        description: "Failed to update list",
        variant: "destructive",
      });
    }
  };

  const addItemToList = async (listId: string, contactId?: string, teamId?: string) => {
    try {
      const { error } = await supabase
        .from('list_items')
        .insert({
          list_id: listId,
          contact_id: contactId,
          team_id: teamId,
        });

      if (error) throw error;

      await fetchLists();
      toast({
        title: "Success",
        description: "Item added to list",
      });
    } catch (error) {
      console.error('Error adding item to list:', error);
      toast({
        title: "Error",
        description: "Failed to add item to list",
        variant: "destructive",
      });
    }
  };

  const removeItemFromList = async (listItemId: string) => {
    try {
      const { error } = await supabase
        .from('list_items')
        .delete()
        .eq('id', listItemId);

      if (error) throw error;

      await fetchLists();
      toast({
        title: "Success",
        description: "Item removed from list",
      });
    } catch (error) {
      console.error('Error removing item from list:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from list",
        variant: "destructive",
      });
    }
  };

  return (
    <ListsContext.Provider
      value={{
        lists,
        loading,
        createList,
        deleteList,
        updateList,
        addItemToList,
        removeItemFromList,
        refreshLists: fetchLists,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};