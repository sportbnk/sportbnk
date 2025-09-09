import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { RevealedDetail } from '@/types/teams';

interface RevealContextType {
  revealedDetails: RevealedDetail[];
  revealContact: (contactId: string, fieldName: string) => Promise<void>;
  revealTeam: (teamId: string, fieldName: string) => Promise<void>;
  isRevealed: (id: string, fieldName: string) => boolean;
  loading: boolean;
}

const RevealContext = createContext<RevealContextType | undefined>(undefined);

export const useReveal = () => {
  const context = useContext(RevealContext);
  if (context === undefined) {
    throw new Error('useReveal must be used within a RevealProvider');
  }
  return context;
};

export const RevealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [revealedDetails, setRevealedDetails] = useState<RevealedDetail[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRevealedDetails = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      const { data, error } = await supabase
        .from('revealed_details')
        .select('*')
        .eq('profile_id', profile.id);

      if (error) throw error;
      setRevealedDetails(data || []);
    } catch (error) {
      console.error('Error fetching revealed details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevealedDetails();
  }, [user]);

  const revealContact = async (contactId: string, fieldName: string) => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      const { error } = await supabase
        .from('revealed_details')
        .insert({
          profile_id: profile.id,
          contact_id: contactId,
          field_name: fieldName,
        });

      if (error) throw error;
      await fetchRevealedDetails();
    } catch (error) {
      console.error('Error revealing contact detail:', error);
    }
  };

  const revealTeam = async (teamId: string, fieldName: string) => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      const { error } = await supabase
        .from('revealed_details')
        .insert({
          profile_id: profile.id,
          team_id: teamId,
          field_name: fieldName,
        });

      if (error) throw error;
      await fetchRevealedDetails();
    } catch (error) {
      console.error('Error revealing team detail:', error);
    }
  };

  const isRevealed = (id: string, fieldName: string) => {
    return revealedDetails.some(
      detail => 
        (detail.contact_id === id || detail.team_id === id) && 
        detail.field_name === fieldName
    );
  };

  return (
    <RevealContext.Provider
      value={{
        revealedDetails,
        revealContact,
        revealTeam,
        isRevealed,
        loading,
      }}
    >
      {children}
    </RevealContext.Provider>
  );
};