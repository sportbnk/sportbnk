import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const purgeOrganisations = async () => {
  try {
    const { data, error } = await supabase.functions.invoke("purge-organisations", { body: {} });
    if (error) throw error;
    toast.success("Organisations and employees removed successfully");
    return data;
  } catch (err) {
    console.error("Purge failed:", err);
    toast.error("Failed to remove organisations");
    throw err;
  }
};