
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
    console.log('=== TrialGuard Debug Info ===');
    console.log('Current pathname:', location.pathname);
    console.log('User:', user);
    console.log('Tier:', tier);
    
    if (!user || tier !== 'free') {
      console.log('Not showing trial guard - no user or not free tier');
      setIsTrialExpired(false);
      return;
    }

    const checkTrialExpiry = () => {
      console.log('Checking trial expiry...');
      const signupDate = new Date(user.created_at);
      const now = new Date();
      const daysSinceSignup = Math.floor((now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
      
      console.log('Days since signup:', daysSinceSignup);
      console.log('Is pricing page?', location.pathname.startsWith('/pricing'));
      console.log('Is auth page?', location.pathname.startsWith('/auth'));
      
      const shouldShowPopup = daysSinceSignup >= 14 && 
        !location.pathname.startsWith('/pricing') && 
        !location.pathname.startsWith('/auth');
      
      console.log('Should show trial popup?', shouldShowPopup);
      
      if (shouldShowPopup) {
        setIsTrialExpired(true);
      } else {
        setIsTrialExpired(false);
      }
    };

    checkTrialExpiry();
  }, [user, tier, location.pathname]);

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  if (!user) {
    console.log('No user - rendering children');
    return <>{children}</>;
  }

  console.log('Final render decision:');
  console.log('- tier === free:', tier === 'free');
  console.log('- isTrialExpired:', isTrialExpired);
  console.log('- current path:', location.pathname);
  console.log('- starts with /pricing:', location.pathname.startsWith('/pricing'));
  console.log('- starts with /auth:', location.pathname.startsWith('/auth'));

  // Don't show trial expiry popup on pricing or auth pages
  if (tier === 'free' && isTrialExpired && 
      !location.pathname.startsWith('/pricing') && 
      !location.pathname.startsWith('/auth')) {
    console.log('SHOWING TRIAL EXPIRED POPUP');
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

  console.log('RENDERING CHILDREN - no popup');
  return <>{children}</>;
};

export default TrialGuard;
