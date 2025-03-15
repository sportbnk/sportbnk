
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AccountBadgeProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

const AccountBadge = ({ name: propName, email: propEmail, avatarUrl }: AccountBadgeProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{name: string, email: string} | null>(null);
  
  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          name: parsedUser.name || "User",
          email: parsedUser.email || "user@example.com"
        });
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);
  
  // Use props if provided, otherwise use data from localStorage
  const name = propName || userData?.name || "User";
  const email = propEmail || userData?.email || "user@example.com";
  
  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Redirect to home page
    navigate("/");
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-sm">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountBadge;
