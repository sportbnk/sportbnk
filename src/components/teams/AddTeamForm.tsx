
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AddTeamFormProps {
  onSuccess: () => void;
}

const AddTeamForm = ({ onSuccess }: AddTeamFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    website: "",
    email: "",
    phone: "",
    employees: 0,
    founded: "",
    revenue: 0,
    postal_code: "",
    street: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('teams')
        .insert({
          name: formData.name,
          level: formData.level.toLowerCase(),
          website: formData.website,
          email: formData.email,
          phone: formData.phone,
          employees: formData.employees,
          founded: formData.founded,
          revenue: formData.revenue,
          postal_code: formData.postal_code,
          street: formData.street,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Team added successfully",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error adding team:', error);
      toast({
        title: "Error",
        description: "Failed to add team",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Team Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="level">Level</Label>
        <Input
          id="level"
          value={formData.level}
          onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
          placeholder="e.g., amateur, professional"
        />
      </div>

      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="employees">Employees</Label>
        <Input
          id="employees"
          type="number"
          min="0"
          value={formData.employees}
          onChange={(e) => setFormData(prev => ({ ...prev, employees: parseInt(e.target.value) || 0 }))}
        />
      </div>

      <div>
        <Label htmlFor="founded">Founded</Label>
        <Input
          id="founded"
          value={formData.founded}
          onChange={(e) => setFormData(prev => ({ ...prev, founded: e.target.value }))}
          placeholder="e.g., 2020"
        />
      </div>

      <div>
        <Label htmlFor="revenue">Revenue</Label>
        <Input
          id="revenue"
          type="number"
          min="0"
          value={formData.revenue}
          onChange={(e) => setFormData(prev => ({ ...prev, revenue: parseInt(e.target.value) || 0 }))}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Adding..." : "Add Team"}
      </Button>
    </form>
  );
};

export default AddTeamForm;
