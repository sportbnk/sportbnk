
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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Don't show anything if no user or not free tier
    if (!user || tier !== 'free') {
      setShowModal(false);
      return;
    }

    // Don't show on pricing or auth pages
    if (location.pathname.startsWith('/pricing') || location.pathname.startsWith('/auth')) {
      setShowModal(false);
      return;
    }

    // Check if we've already shown the modal this session
    const modalShownThisSession = sessionStorage.getItem('trialModalShown');
    if (modalShownThisSession) {
      setShowModal(false);
      return;
    }

    // Calculate days since signup
    const signupDate = new Date(user.created_at);
    const now = new Date();
    const daysSinceSignup = Math.floor((now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Show modal if trial has expired (14+ days)
    if (daysSinceSignup >= 14) {
      setShowModal(true);
      // Mark as shown for this session
      sessionStorage.setItem('trialModalShown', 'true');
    }
  }, [user, tier, location.pathname]);

  const handleUpgrade = () => {
    setShowModal(false);
    navigate('/pricing');
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // Always render children - the modal is separate
  return (
    <>
      {children}
      
      {showModal && (
        <AlertDialog open={true} onOpenChange={handleClose}>
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
                    <li>• Ayyy searches</li>
                    <li>• Enhanced data enrichment</li>
                    <li>• Advanced filters</li>
                    <li>• Export capabilities</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button 
                variant="outline"
                onClick={handleClose}
                className="mt-2 sm:mt-0"
              >
                Continue Trial
              </Button>
              <Button 
                onClick={handleUpgrade}
                className="bg-sportbnk-green hover:bg-sportbnk-green/90"
              >
                View Pricing Plans
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default TrialGuard;
