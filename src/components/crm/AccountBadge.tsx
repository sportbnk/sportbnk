
import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface AccountBadgeProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
  showEmail?: boolean;
}

const AccountBadge = ({ name: propName, email: propEmail, avatarUrl: propAvatarUrl, showEmail = true }: AccountBadgeProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(propAvatarUrl);
  
  // Use props if provided, otherwise use data from auth context
  const name = propName || user?.user_metadata?.name || user?.email?.split('@')[0] || "User";
  const email = propEmail || user?.email || "user@example.com";

  // Always fetch latest avatar from database on mount (don't rely on props or cache)
  useEffect(() => {
    const fetchLatestAvatar = async () => {
      console.log('=== AccountBadge Debug Start ===');
      console.log('AccountBadge: User object from auth:', user);
      console.log('AccountBadge: User ID:', user?.id);
      console.log('AccountBadge: Prop avatar URL:', propAvatarUrl);
      
      if (user) {
        console.log('AccountBadge: About to fetch profile for user ID:', user.id);
        
        try {
          // Add a fresh query with no cache and select all fields
          const { data: profile, error, status, statusText } = await supabase
            .from('profiles')
            .select('*')  // Select all fields to see what's there
            .eq('user_id', user.id)
            .maybeSingle();
          
          console.log('AccountBadge: Database query status:', status);
          console.log('AccountBadge: Database query statusText:', statusText);
          console.log('AccountBadge: Database query error:', error);
          console.log('AccountBadge: RAW Profile data from database:', profile);
          
          if (error) {
            console.error('AccountBadge: Database error details:', {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code
            });
          }
          
          if (profile) {
            console.log('AccountBadge: Profile found!');
            console.log('AccountBadge: Profile keys:', Object.keys(profile));
            console.log('AccountBadge: Profile avatar_url specifically:', profile.avatar_url);
            console.log('AccountBadge: Profile avatar_url type:', typeof profile.avatar_url);
            console.log('AccountBadge: Profile avatar_url length:', profile.avatar_url?.length);
            console.log('AccountBadge: Profile avatar_url is null?', profile.avatar_url === null);
            console.log('AccountBadge: Profile avatar_url is undefined?', profile.avatar_url === undefined);
            console.log('AccountBadge: Profile avatar_url is empty string?', profile.avatar_url === '');
            console.log('AccountBadge: Profile avatar_url truthy?', !!profile.avatar_url);
            
            if (profile.avatar_url) {
              console.log('AccountBadge: Setting avatar URL from database:', profile.avatar_url);
              setAvatarUrl(profile.avatar_url);
            } else if (propAvatarUrl) {
              console.log('AccountBadge: No avatar in database, using prop:', propAvatarUrl);
              setAvatarUrl(propAvatarUrl);
            } else {
              console.log('AccountBadge: No avatar found anywhere');
            }
          } else {
            console.log('AccountBadge: NO PROFILE FOUND for user ID:', user.id);
            if (propAvatarUrl) {
              console.log('AccountBadge: Using prop avatar:', propAvatarUrl);
              setAvatarUrl(propAvatarUrl);
            }
          }
        } catch (fetchError) {
          console.error('AccountBadge: Fetch error:', fetchError);
          if (propAvatarUrl) {
            setAvatarUrl(propAvatarUrl);
          }
        }
      } else {
        console.log('AccountBadge: No user object available');
      }
      
      console.log('=== AccountBadge Debug End ===');
    };

    fetchLatestAvatar();
  }, [user, propAvatarUrl]);

  // Listen for avatar updates from other components
  useEffect(() => {
    const handleAvatarUpdate = (event: CustomEvent) => {
      console.log('AccountBadge: Avatar update received:', event.detail.avatarUrl);
      setAvatarUrl(event.detail.avatarUrl);
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    
    return () => {
      window.removeEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    };
  }, []);

  console.log('AccountBadge: Final avatar URL being displayed:', avatarUrl);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    navigate("/profile");
  };
  
  // Handle settings navigation
  const handleSettingsClick = () => {
    navigate("/settings");
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto px-3 py-2 flex items-center gap-2 rounded-md">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-sm">
            <span className="font-medium">{name}</span>
            {showEmail && <span className="text-xs text-muted-foreground">{email}</span>}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettingsClick}>
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
