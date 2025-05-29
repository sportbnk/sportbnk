
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

const ProfileHeader = ({ name, email, role, avatarUrl: initialAvatarUrl }: ProfileHeaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialAvatarUrl);
  const { user } = useAuth();

  // Fetch latest avatar from database on mount
  useEffect(() => {
    const fetchLatestAvatar = async () => {
      console.log('ProfileHeader: User object from auth:', user);
      console.log('ProfileHeader: Initial avatar URL prop:', initialAvatarUrl);
      
      if (user) {
        console.log('ProfileHeader: Fetching profile for user ID:', user.id);
        
        // Add a fresh query with no cache
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')  // Select all fields to see what's there
          .eq('user_id', user.id)
          .maybeSingle();
        
        console.log('ProfileHeader: RAW Profile data from database:', profile);
        console.log('ProfileHeader: Database query error:', error);
        console.log('ProfileHeader: Profile avatar_url specifically:', profile?.avatar_url);
        console.log('ProfileHeader: Profile avatar_url type:', typeof profile?.avatar_url);
        console.log('ProfileHeader: Profile avatar_url length:', profile?.avatar_url?.length);
        
        if (profile?.avatar_url) {
          console.log('ProfileHeader: Setting avatar URL from database:', profile.avatar_url);
          setAvatarUrl(profile.avatar_url);
        } else {
          console.log('ProfileHeader: No avatar in database, using initial prop:', initialAvatarUrl);
          setAvatarUrl(initialAvatarUrl);
        }
      }
    };

    fetchLatestAvatar();
  }, [user, initialAvatarUrl]);

  // Listen for avatar updates from other components
  useEffect(() => {
    const handleAvatarUpdate = (event: CustomEvent) => {
      console.log('ProfileHeader: Avatar update received:', event.detail.avatarUrl);
      setAvatarUrl(event.detail.avatarUrl);
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    
    return () => {
      window.removeEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    };
  }, []);

  console.log('ProfileHeader: Current avatar URL being displayed:', avatarUrl);
  console.log('ProfileHeader: Avatar URL is empty?', !avatarUrl);
  console.log('ProfileHeader: Avatar URL is undefined?', avatarUrl === undefined);
  console.log('ProfileHeader: Avatar URL is null?', avatarUrl === null);

  return (
    <Card className="mb-6">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-muted-foreground">{email}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
