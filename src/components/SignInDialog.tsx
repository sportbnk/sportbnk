
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface SignInDialogProps {
  className?: string;
  triggerClassName?: string;
}

export function SignInDialog({ className, triggerClassName }: SignInDialogProps) {
  return (
    <Link to="/auth">
      <Button 
        variant="outline" 
        className={`bg-white border border-sportbnk-green text-sportbnk-navy hover:bg-sportbnk-lightGrey ${triggerClassName}`}
      >
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    </Link>
  );
}
