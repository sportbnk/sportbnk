
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface CreditsContextType {
  credits: number;
  tier: string;
  loading: boolean;
  refreshCredits: () => Promise<void>;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};

export const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credits, setCredits] = useState<number>(0);
  const [tier, setTier] = useState<string>('free');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0);
      setTier('free');
      setLoading(false);
      return;
    }

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('credits, tier')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching credits:', error);
        setCredits(0);
        setTier('free');
      } else if (profile) {
        setCredits(profile.credits || 0);
        setTier(profile.tier || 'free');
      }
    } catch (error) {
      console.error('Failed to fetch credits:', error);
      setCredits(0);
      setTier('free');
    } finally {
      setLoading(false);
    }
  };

  const refreshCredits = async () => {
    await fetchCredits();
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  return (
    <CreditsContext.Provider
      value={{
        credits,
        tier,
        loading,
        refreshCredits,
      }}
    >
      {children}
    </CreditsContext.Provider>
  );
};
