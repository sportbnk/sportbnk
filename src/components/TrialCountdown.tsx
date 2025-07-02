
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

const TrialCountdown = () => {
  const { user } = useAuth();
  const { tier } = useCredits();
  const navigate = useNavigate();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

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
      
      if (remaining <= 0) {
        setShowExpiredModal(true);
      }
    };

    calculateDaysLeft();
    
    // Update every hour
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60);
    
    return () => clearInterval(interval);
  }, [user, tier]);

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  if (!user || tier !== 'free' || daysLeft === null) {
    return null;
  }

  return (
    <>
      <div className="flex items-center space-x-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-md border border-orange-200">
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">
          {daysLeft > 0 ? `${daysLeft} days left` : 'Trial expired'}
        </span>
      </div>

      <AlertDialog open={showExpiredModal} onOpenChange={() => {}}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl font-bold text-sportbnk-navy">
              Free Trial Expired
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-3">
              <div className="text-gray-600">
                Your 14-day free trial has ended. Upgrade to continue using SportsBnk's powerful features.
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">What you'll get with a paid plan:</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Unlimited searches</li>
                  <li>• Enhanced data enrichment</li>
                  <li>• Advanced filters</li>
                  <li>• Export capabilities</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col space-y-2">
            <Button 
              onClick={handleUpgrade}
              className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90"
            >
              View Pricing Plans
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TrialCountdown;
