
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';

interface List {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

interface ListsContextType {
  lists: List[];
  loading: boolean;
  refreshLists: () => void;
  createList: (name: string, description?: string) => Promise<List | null>;
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const useLists = () => {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
};

interface ListsProviderProps {
  children: ReactNode;
}

export const ListsProvider = ({ children }: ListsProviderProps) => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchLists = async () => {
    if (!user) {
      setLists([]);
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
        setLists([]);
        return;
      }

      // Get all lists for this user
      const { data, error } = await supabase
        .from('lists')
        .select('id, name, description, created_at')
        .eq('profile_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching lists:', error);
        setLists([]);
        return;
      }

      setLists(data || []);
    } catch (error) {
      console.error('Error in fetchLists:', error);
      setLists([]);
    } finally {
      setLoading(false);
    }
  };

  const createList = async (name: string, description?: string): Promise<List | null> => {
    if (!user) return null;

    try {
      // Get user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) {
        throw new Error('Profile not found');
      }

      // Create new list
      const { data: newList, error } = await supabase
        .from('lists')
        .insert({
          profile_id: profile.id,
          name: name.trim(),
          description: description?.trim() || null
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating list:', error);
        throw error;
      }

      // Update local state
      setLists(prev => [newList, ...prev]);
      return newList;
    } catch (error) {
      console.error('Error creating list:', error);
      throw error;
    }
  };

  const refreshLists = () => {
    fetchLists();
  };

  useEffect(() => {
    fetchLists();
  }, [user]);

  return (
    <ListsContext.Provider value={{
      lists,
      loading,
      refreshLists,
      createList
    }}>
      {children}
    </ListsContext.Provider>
  );
};
