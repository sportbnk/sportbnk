
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { useLocation } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TrialGuardProps {
  children: React.ReactNode;
}

const TrialGuard: React.FC<TrialGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const { tier } = useCredits();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTrialExpired, setIsTrialExpired] = useState(false);

  useEffect(() => {
    if (!user || tier !== 'free') {
      setIsTrialExpired(false);
      return;
    }

    const checkTrialExpiry = () => {
      const signupDate = new Date(user.created_at);
      const now = new Date();
      const daysSinceSignup = Math.floor((now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceSignup >= 14) {
        setIsTrialExpired(true);
      } else {
        setIsTrialExpired(false);
      }
    };

    checkTrialExpiry();
  }, [user, tier]);

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  if (!user) {
    return <>{children}</>;
  }
console.log('path', location.pathname)
  // Don't show trial expiry popup on pricing or auth pages
  if (tier === 'free' && isTrialExpired && 
      !location.pathname.startsWith('/pricing') && 
      !location.pathname.startsWith('/auth')) {
    return (
      <AlertDialog open={true} onOpenChange={() => {}}>
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
          <AlertDialogFooter>
            <Button 
              onClick={handleUpgrade}
              className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90"
            >
              View Pricing Plans
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <>{children}</>;
};

export default TrialGuard;
