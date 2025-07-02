
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { Clock } from 'lucide-react';

const TrialCountdown = () => {
  const { user } = useAuth();
  const { tier } = useCredits();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!user || tier !== 'free') {
      setDaysLeft(null);
      return;
    }

    const calculateDaysLeft = () => {
      const signupDate = new Date(user.created_at);
      const now = new Date();
      const daysSinceSignup = Math.floor((now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
      const remaining = 14 - daysSinceSignup;
      
      setDaysLeft(remaining);
    };

    calculateDaysLeft();
    
    // Update every hour
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60);
    
    return () => clearInterval(interval);
  }, [user, tier]);

  if (!user || tier !== 'free' || daysLeft === null) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-md border border-orange-200">
      <Clock className="h-4 w-4" />
      <span className="text-sm font-medium">
        {daysLeft > 0 ? `${daysLeft} days left` : 'Trial expired'}
      </span>
    </div>
  );
};

export default TrialCountdown;
