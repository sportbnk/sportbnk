
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CreditCard, Zap } from "lucide-react";
import { usePricing } from "@/contexts/PricingContext";

interface InsufficientCreditsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creditsRequired: number;
  creditsAvailable: number;
  actionType: "email" | "phone" | "linkedin";
}

const InsufficientCreditsDialog = ({
  open,
  onOpenChange,
  creditsRequired,
  creditsAvailable,
  actionType
}: InsufficientCreditsDialogProps) => {
  const { proFeatures } = usePricing();
  
  const handleUpgrade = () => {
    // Navigate to upgrade page or open upgrade modal
    window.location.href = "/pricing";
  };

  const getActionText = () => {
    switch (actionType) {
      case "email":
        return "email";
      case "phone":
        return "phone number";
      case "linkedin":
        return "LinkedIn profile";
      default:
        return "contact information";
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg">Insufficient Credits</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                Upgrade to continue revealing contacts
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        <div className="py-4 space-y-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-900">
              Revealing this {getActionText()} requires {creditsRequired} credits
            </p>
            <p className="text-sm text-gray-600 mt-1">
              You currently have {creditsAvailable} credits remaining
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Get unlimited access with Pro:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Upgrade Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InsufficientCreditsDialog;
