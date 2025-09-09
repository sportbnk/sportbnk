import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Division priority to resolve duplicates (higher = stronger league)
const DIVISION_PRIORITY: Record<string, number> = {
  "Premier League": 4,
  "EFL Championship": 3,
  "EFL League One": 2,
  "EFL League Two": 1,
};

// Source lists provided by user
const premierLeague = [
  "Arsenal","Aston Villa","Bournemouth","Brentford","Brighton & Hove Albion","Chelsea","Crystal Palace","Everton","Fulham","Ipswich Town","Leicester City","Liverpool","Manchester City","Manchester United","Newcastle United","Nottingham Forest","Southampton","Tottenham Hotspur","West Ham United","Wolverhampton Wanderers",
];
const championship = [
  "Birmingham City","Blackburn Rovers","Bristol City","Cardiff City","Coventry City","Hull City","Leeds United","Middlesbrough","Millwall","Norwich City","Plymouth Argyle","Portsmouth","Preston North End","Queens Park Rangers","Sheffield Wednesday","Stoke City","Sunderland","Swansea City","Watford","West Bromwich Albion","Derby County","Luton Town","Oxford United","Sheffield United",
];
const leagueOne = [
  "Barnsley","Blackpool","Bolton Wanderers","Bristol Rovers","Burton Albion","Cambridge United","Charlton Athletic","Chesterfield","Crawley Town","Exeter City","Huddersfield Town","Leyton Orient","Lincoln City","Milton Keynes Dons","Northampton Town","Peterborough United","Port Vale","Reading","Shrewsbury Town","Stevenage","Stockport County","Walsall","Wycombe Wanderers",
];
const leagueTwo = [
  "Accrington Stanley","AFC Wimbledon","Barrow","Bradford City","Bromley","Carlisle United","Colchester United","Crawley Town","Crewe Alexandra","Doncaster Rovers","Forest Green Rovers","Gillingham","Grimsby Town","Harrogate Town","Mansfield Town","Morecambe","Newport County","Notts County","Salford City","Sutton United","Swindon Town","Tranmere Rovers","Wrexham","Yeovil Town",
];

function buildClubMap() {
  const map = new Map<string, { name: string; division: string }>();
  const apply = (names: string[], division: string) => {
    for (const n of names) {
      const existing = map.get(n);
      if (!existing) {
        map.set(n, { name: n, division });
      } else {
        // Keep higher priority division
        if (DIVISION_PRIORITY[division] > DIVISION_PRIORITY[existing.division]) {
          map.set(n, { name: n, division });
        }
      }
    }
  };
  apply(premierLeague, "Premier League");
  apply(championship, "EFL Championship");
  apply(leagueOne, "EFL League One");
  apply(leagueTwo, "EFL League Two");
  return Array.from(map.values());
}

async function fetchEnrichment(clubs: { name: string; division: string }[]) {
  if (!OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY not set, skipping AI enrichment");
    return {} as Record<string, { city?: string; website?: string; founded?: string; logo_url?: string }>;
  }

  const prompt = `Return strict JSON with an array key clubs. For each English football club below, include {name, city, website, founded, logo_url}. Use the official home city/town within England, the current official website domain, and a direct URL to the official team badge/logo (PNG/JPG format). If unsure about any field, leave it empty string. Clubs: ${clubs
    .map((c) => `${c.name}`)
    .join(", ")}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a precise data enricher. Output valid JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 2000,
    }),
  });

  const data = await res.json();
  const content: string = data?.choices?.[0]?.message?.content || "";
  try {
    const parsed = JSON.parse(content);
    const result: Record<string, { city?: string; website?: string; founded?: string; logo_url?: string }> = {};
    for (const item of parsed?.clubs || []) {
      if (item?.name) {
        result[item.name] = {
          city: item.city || undefined,
          website: item.website || undefined,
          founded: item.founded ? String(item.founded) : undefined,
          logo_url: item.logo_url || undefined,
        };
      }
    }
    return result;
  } catch (_e) {
    console.warn("Failed to parse AI JSON, continuing without enrichment");
    return {} as Record<string, { city?: string; website?: string; founded?: string; logo_url?: string }>;
  }
}

async function getOrCreateSportId(name: string) {
  const { data, error } = await supabase.from("sports").select("id").ilike("name", name).maybeSingle();
  if (error) throw error;
  if (data?.id) return data.id;
  const { data: inserted, error: insErr } = await supabase.from("sports").insert({ name }).select("id").single();
  if (insErr) throw insErr;
  return inserted.id;
}

async function getOrCreateCountryId(name: string) {
  const { data, error } = await supabase.from("countries").select("id").ilike("name", name).maybeSingle();
  if (error) throw error;
  if (data?.id) return data.id;
  const { data: inserted, error: insErr } = await supabase.from("countries").insert({ name }).select("id").single();
  if (insErr) throw insErr;
  return inserted.id;
}

async function getOrCreateCityId(name: string, country_id: string) {
  const { data, error } = await supabase
    .from("cities")
    .select("id")
    .eq("country_id", country_id)
    .ilike("name", name)
    .maybeSingle();
  if (error) throw error;
  if (data?.id) return data.id;
  const { data: inserted, error: insErr } = await supabase
    .from("cities")
    .insert({ name, country_id })
    .select("id")
    .single();
  if (insErr) throw insErr;
  return inserted.id;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Build list and resolve duplicates
    const clubs = buildClubMap();

    // IDs for relations
    const sportId = await getOrCreateSportId("Football");
    const countryId = await getOrCreateCountryId("England");

    // Find ALL existing teams to delete (clean slate)
    const { data: teamsToDelete, error: teamsErr } = await supabase
      .from("teams")
      .select("id");
    if (teamsErr) throw teamsErr;

    const toDeleteIds = (teamsToDelete || []).map((t) => t.id);

    // Clean related data first
    if (toDeleteIds.length) {
      await supabase.from("team_social_links").delete().in("team_id", toDeleteIds);
      await supabase.from("opening_hours").delete().in("team_id", toDeleteIds);
      await supabase.from("contacts").delete().in("team_id", toDeleteIds);
      await supabase.from("teams").delete().in("id", toDeleteIds);
    }

    // AI enrichment
    const enrichment = await fetchEnrichment(clubs);

    // Insert new clubs
    let inserted = 0;
    const errors: Array<{ name: string; error: string }> = [];
    for (const club of clubs) {
      try {
        const ai = enrichment[club.name] || {};
        let cityId: string | null = null;
        if (ai.city && ai.city.trim().length > 0) {
          cityId = await getOrCreateCityId(ai.city.trim(), countryId);
        }

        const payload: any = {
          name: club.name,
          level: "Professional",
          website: ai.website || null,
          founded: ai.founded || null,
          logo_url: ai.logo_url || null,
          sport_id: sportId,
          city_id: cityId,
        };

        const { error: insertErr } = await supabase.from("teams").insert(payload);
        if (insertErr) throw insertErr;
        inserted += 1;
      } catch (e: any) {
        errors.push({ name: club.name, error: e?.message || String(e) });
      }
    }

    return new Response(
      JSON.stringify({
        deleted_team_ids: toDeleteIds,
        inserted_count: inserted,
        total_requested: clubs.length,
        errors,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in seed-english-football:", error);
    return new Response(JSON.stringify({ error: error?.message || String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
