
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

const ProfileHeader = ({ name, email, role, avatarUrl }: ProfileHeaderProps) => {
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
