import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const triggerFootballSeeding = async () => {
  try {
    const { data, error } = await supabase.functions.invoke("seed-english-football", { 
      body: {} 
    });
    
    if (error) {
      console.error("Error seeding football data:", error);
      toast.error("Failed to seed football data");
      throw error;
    }
    
    console.log("Seeding result:", data);
    toast.success(`Successfully seeded ${data?.inserted_count || 0} football clubs`);
    
    return data;
  } catch (error) {
    console.error("Seeding error:", error);
    toast.error("Error during seeding process");
    throw error;
  }
};