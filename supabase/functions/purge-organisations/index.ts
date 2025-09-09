import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Fetch all team IDs first
    const { data: teams, error: teamsErr } = await supabase
      .from("teams")
      .select("id");
    if (teamsErr) throw teamsErr;

    const teamIds = (teams || []).map((t) => t.id);

    let deletedSocial = 0;
    let deletedHours = 0;
    let deletedContacts = 0;
    let deletedTeams = 0;

    if (teamIds.length) {
      const { count: socialCount, error: socialErr } = await supabase
        .from("team_social_links")
        .delete({ count: "exact" })
        .in("team_id", teamIds);
      if (socialErr) throw socialErr;
      deletedSocial = socialCount || 0;

      const { count: hoursCount, error: hoursErr } = await supabase
        .from("opening_hours")
        .delete({ count: "exact" })
        .in("team_id", teamIds);
      if (hoursErr) throw hoursErr;
      deletedHours = hoursCount || 0;

      const { count: contactsCount, error: contactsErr } = await supabase
        .from("contacts")
        .delete({ count: "exact" })
        .in("team_id", teamIds);
      if (contactsErr) throw contactsErr;
      deletedContacts = contactsCount || 0;

      const { count: teamsCount, error: deleteTeamsErr } = await supabase
        .from("teams")
        .delete({ count: "exact" })
        .in("id", teamIds);
      if (deleteTeamsErr) throw deleteTeamsErr;
      deletedTeams = teamsCount || 0;
    }

    return new Response(
      JSON.stringify({
        deleted_social_links: deletedSocial,
        deleted_opening_hours: deletedHours,
        deleted_contacts: deletedContacts,
        deleted_teams: deletedTeams,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error purging organisations:", error);
    return new Response(JSON.stringify({ error: error?.message || String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});