
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const teamSchema = z.object({
  team: z.string().min(1, "Team name is required"),
  sport: z.string().min(1, "Sport is required"),
  level: z.string().min(1, "Level is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  revenue: z.string().optional(),
  employees: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  founded: z.string().optional(),
  description: z.string().optional(),
});

type TeamFormValues = z.infer<typeof teamSchema>;

export default function AddTeamForm() {
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      team: "",
      sport: "",
      level: "",
      city: "",
      country: "",
      revenue: "",
      employees: "",
      website: "",
      email: "",
      phone: "",
      founded: "",
      description: "",
    },
  });

  const onSubmit = async (data: TeamFormValues) => {
    try {
      // Convert string values to numbers where needed
      const teamData = {
        team: data.team,
        sport: data.sport,
        level: data.level,
        city: data.city,
        country: data.country,
        revenue: data.revenue ? parseInt(data.revenue) : null,
        employees: data.employees ? parseInt(data.employees) : null,
        founded: data.founded ? parseInt(data.founded) : null,
        website: data.website || null,
        email: data.email || null,
        phone: data.phone || null,
        description: data.description || null,
      };

      const { error } = await supabase.from("teams").insert(teamData);

      if (error) throw error;

      toast.success("Team added successfully");
      form.reset();
    } catch (error: any) {
      toast.error("Failed to add team", {
        description: error.message
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="sport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sport</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Revenue</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Employees</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="founded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founded Year</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} type="url" />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Team</Button>
      </form>
    </Form>
  );
}
