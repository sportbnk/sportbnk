
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

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
}

const PersonalInfo = ({ userData, onUpdate }: PersonalInfoProps) => {
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
      
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userData.avatarUrl} alt={userData.name} />
            <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
            <Camera className="h-4 w-4" />
          </Button>
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
                    <Input {...field} type="email" />
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
                    <Input {...field} type="tel" />
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
  );
};

export default PersonalInfo;
