
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";
import { useCredits } from "@/contexts/CreditsContext";
import { toast } from "sonner";

type RevealType = 'email' | 'phone' | 'linkedin';

interface RevealedDetail {
  id: string;
  user_id: string;
  contact_id: string;
  has_revealed_email: boolean;
  has_revealed_phone: boolean;
  has_revealed_linkedin: boolean;
  created_at: string;
  updated_at: string;
}

interface Contact {
  id: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  email_credits_consumed: number;
  phone_credits_consumed: number;
  linkedin_credits_consumed: number;
}

interface RevealContextType {
  isRevealed: (contactId: string, type: RevealType) => boolean;
  canReveal: (contact: Contact, type: RevealType) => boolean;
  revealContact: (contact: Contact, type: RevealType) => Promise<boolean>;
  loading: boolean;
}

const RevealContext = createContext<RevealContextType | undefined>(undefined);

export const useReveal = () => {
  const context = useContext(RevealContext);
  if (!context) {
    throw new Error('useReveal must be used within a RevealProvider');
  }
  return context;
};

export const RevealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [revealedDetails, setRevealedDetails] = useState<Record<string, RevealedDetail>>({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { credits, refreshCredits } = useCredits();

  // Load revealed details for the current user
  const loadRevealedDetails = useCallback(async () => {
    if (!user) {
      setRevealedDetails({});
      return;
    }

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
        .eq('user_id', profile.id);

      if (error) {
        console.error('Error loading revealed details:', error);
        return;
      }

      // Create a map for quick lookup: contactId -> RevealedDetail
      const detailsMap: Record<string, RevealedDetail> = {};
      data?.forEach(detail => {
        detailsMap[detail.contact_id] = detail;
      });

      setRevealedDetails(detailsMap);
    } catch (error) {
      console.error('Error loading revealed details:', error);
    }
  }, [user]);

  // Check if a contact detail is revealed
  const isRevealed = useCallback((contactId: string, type: RevealType): boolean => {
    const detail = revealedDetails[contactId];
    if (!detail) return false;

    switch (type) {
      case 'email':
        return detail.has_revealed_email;
      case 'phone':
        return detail.has_revealed_phone;
      case 'linkedin':
        return detail.has_revealed_linkedin;
      default:
        return false;
    }
  }, [revealedDetails]);

  // Check if a contact detail can be revealed (free or already revealed)
  const canReveal = useCallback((contact: Contact, type: RevealType): boolean => {
    // If it's free (0 credits), it can always be revealed
    const creditsRequired = contact[`${type}_credits_consumed` as keyof Contact] as number;
    if (creditsRequired === 0) return true;

    // If already revealed, it can be "revealed" (shown)
    return isRevealed(contact.id, type);
  }, [isRevealed]);

  // Reveal a contact detail
  const revealContact = useCallback(async (contact: Contact, type: RevealType): Promise<boolean> => {
    if (!user) {
      toast.error('Please log in to reveal contact details');
      return false;
    }

    const creditsRequired = contact[`${type}_credits_consumed` as keyof Contact] as number;
    
    // If it's free, just return true
    if (creditsRequired === 0) {
      return true;
    }

    // If already revealed, just return true
    if (isRevealed(contact.id, type)) {
      return true;
    }

    // Check if user has enough credits
    if (credits < creditsRequired) {
      toast.error(`Insufficient credits. You need ${creditsRequired} credits to reveal this ${type}.`);
      return false;
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
        throw new Error('Profile not found');
      }

      // Check if revealed_details record exists for this user and contact
      let revealedDetail = revealedDetails[contact.id];

      if (revealedDetail) {
        // Update existing record
        const updateData: any = { updated_at: new Date().toISOString() };
        updateData[`has_revealed_${type}`] = true;

        const { error: updateError } = await supabase
          .from('revealed_details')
          .update(updateData)
          .eq('id', revealedDetail.id);

        if (updateError) throw updateError;

        // Update local state
        setRevealedDetails(prev => ({
          ...prev,
          [contact.id]: {
            ...revealedDetail,
            [`has_revealed_${type}`]: true,
            updated_at: new Date().toISOString()
          }
        }));
      } else {
        // Create new record
        const insertData = {
          user_id: profile.id,
          contact_id: contact.id,
          has_revealed_email: type === 'email',
          has_revealed_phone: type === 'phone',
          has_revealed_linkedin: type === 'linkedin'
        };

        const { data: newDetail, error: insertError } = await supabase
          .from('revealed_details')
          .insert(insertData)
          .select()
          .single();

        if (insertError) throw insertError;

        // Update local state
        setRevealedDetails(prev => ({
          ...prev,
          [contact.id]: newDetail
        }));
      }

      // Deduct credits from user's profile
      const { error: creditError } = await supabase
        .from('profiles')
        .update({ credits: credits - creditsRequired })
        .eq('id', profile.id);

      if (creditError) throw creditError;

      // Refresh credits in the context
      await refreshCredits();

      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} revealed successfully!`);
      return true;

    } catch (error) {
      console.error('Error revealing contact detail:', error);
      toast.error(`Failed to reveal ${type}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, credits, revealedDetails, isRevealed, refreshCredits]);

  // Load revealed details when user changes
  useEffect(() => {
    loadRevealedDetails();
  }, [loadRevealedDetails]);

  const value: RevealContextType = {
    isRevealed,
    canReveal,
    revealContact,
    loading
  };

  return (
    <RevealContext.Provider value={value}>
      {children}
    </RevealContext.Provider>
  );
};
