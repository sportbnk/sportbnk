
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Camera, Loader2 } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const personaInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.string().optional(),
});

type PersonalInfoValues = z.infer<typeof personaInfoSchema>;

interface PersonalInfoProps {
  userData: {
    name: string;
    email: string;
    phone?: string;
    role?: string;
    avatarUrl?: string;
  };
  onUpdate: (data: PersonalInfoValues) => void;
  onAvatarUpdate?: (avatarUrl: string) => void;
}

const PersonalInfo = ({ userData, onUpdate, onAvatarUpdate }: PersonalInfoProps) => {
  const { user } = useAuth();
  const { uploadImage, uploading } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personaInfoSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "",
      role: userData.role || "",
    },
  });

  const onSubmit = (data: PersonalInfoValues) => {
    onUpdate(data);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      const avatarUrl = await uploadImage(file, user.id);
      if (avatarUrl) {
        // Update the avatar_url in the profiles table
        const { error } = await supabase
          .from('profiles')
          .update({ avatar_url: avatarUrl })
          .eq('user_id', user.id);

        if (error) {
          console.error('Error updating avatar in database:', error);
          toast.error('Failed to update profile picture');
          return;
        }

        // Call the callback to update the parent component
        onAvatarUpdate?.(avatarUrl);
        toast.success('Profile picture updated successfully');
      }
    } catch (error) {
      console.error('Error handling file upload:', error);
      toast.error('Failed to update profile picture');
    }

    // Reset the input
    event.target.value = '';
  };

  return (
    <TooltipProvider>
      <div>
        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
        
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage src={userData.avatarUrl} alt={userData.name} />
              <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
              onClick={handleAvatarClick}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input 
                            {...field} 
                            type="email" 
                            disabled 
                            className="text-black cursor-not-allowed" 
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Email address cannot be changed</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input 
                            {...field} 
                            type="tel" 
                            disabled 
                            className="text-black cursor-not-allowed" 
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Phone number cannot be changed</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </div>
    </TooltipProvider>
  );
};

export default PersonalInfo;
