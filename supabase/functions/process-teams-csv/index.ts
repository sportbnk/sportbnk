
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TeamCsvRow {
  name: string;
  sport?: string;
  level?: string;
  street?: string;
  postal?: string;
  city?: string;
  country?: string;
  website?: string;
  phone?: string;
  email?: string;
  founded?: string;
  revenue?: string;
  employees?: string;
  socials?: string;
  hours?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { csvData } = await req.json();
    const lines = csvData.trim().split('\n');
    const headers = lines[0].toLowerCase().split(',').map((h: string) => h.trim());
    
    console.log('Processing teams CSV with headers:', headers);
    
    const results = {
      processed: 0,
      errors: [] as string[],
      successful: 0
    };

    // Process each row (skip header)
    for (let i = 1; i < lines.length; i++) {
      try {
        const values = lines[i].split(',').map((v: string) => v.trim().replace(/"/g, ''));
        const row: any = {};
        
        // Map CSV columns to row object (case insensitive)
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        // Process the team data
        await processTeamRow(supabase, row, i + 1);
        results.successful++;
        
      } catch (error) {
        console.error(`Error processing row ${i + 1}:`, error);
        results.errors.push(`Row ${i + 1}: ${error.message}`);
      }
      
      results.processed++;
    }

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in process-teams-csv function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      processed: 0,
      successful: 0,
      errors: [error.message]
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function processTeamRow(supabase: any, row: any, rowNumber: number) {
  console.log(`Processing team row ${rowNumber}:`, row);
  
  // Only team name is required
  if (!row.name?.trim()) {
    throw new Error('Team name is required');
  }

  let countryId = null;
  let cityId = null;
  let sportId = null;

  // Get or create country if provided
  if (row.country?.trim()) {
    const countryName = row.country.trim();
    
    let { data: country, error: countryError } = await supabase
      .from('countries')
      .select('id, name')
      .ilike('name', countryName)
      .single();

    if (!country) {
      const { data: newCountry, error: createCountryError } = await supabase
        .from('countries')
        .insert({ name: countryName })
        .select('id')
        .single();
      
      if (createCountryError) throw new Error(`Failed to create country: ${createCountryError.message}`);
      country = newCountry;
    }
    countryId = country.id;
  }

  // Get or create city if provided (and country exists)
  if (row.city?.trim() && countryId) {
    const cityName = row.city.trim();
    
    let { data: city, error: cityError } = await supabase
      .from('cities')
      .select('id, name')
      .ilike('name', cityName)
      .eq('country_id', countryId)
      .single();

    if (!city) {
      const { data: newCity, error: createCityError } = await supabase
        .from('cities')
        .insert({ 
          name: cityName,
          country_id: countryId
        })
        .select('id')
        .single();
      
      if (createCityError) throw new Error(`Failed to create city: ${createCityError.message}`);
      city = newCity;
    }
    cityId = city.id;
  }

  // Get or create sport if provided
  if (row.sport?.trim()) {
    const sportName = row.sport.trim();
    
    let { data: sport, error: sportError } = await supabase
      .from('sports')
      .select('id')
      .ilike('name', sportName)
      .single();

    if (!sport) {
      const { data: newSport, error: createSportError } = await supabase
        .from('sports')
        .insert({ name: sportName })
        .select('id')
        .single();
      
      if (createSportError) throw new Error(`Failed to create sport: ${createSportError.message}`);
      sport = newSport;
    }
    sportId = sport.id;
  }

  // Clean revenue data
  let revenue = null;
  if (row.revenue?.trim()) {
    const cleanRevenue = row.revenue.replace(/,/g, '').split('.')[0];
    revenue = parseInt(cleanRevenue) || null;
  }

  // Clean employees data
  let employees = null;
  if (row.employees?.trim()) {
    employees = parseInt(row.employees) || null;
  }

  // Create team with only provided data
  const teamData: any = {
    name: row.name.trim()
  };

  // Only add fields if they have values
  if (row.level?.trim()) teamData.level = row.level.toLowerCase().trim();
  if (row.website?.trim()) teamData.website = row.website.trim();
  if (row.email?.trim()) teamData.email = row.email.trim();
  if (row.phone?.trim()) teamData.phone = row.phone.trim();
  if (employees !== null) teamData.employees = employees;
  if (row.founded?.trim()) teamData.founded = row.founded.trim();
  if (revenue !== null) teamData.revenue = revenue;
  if (row.postal?.trim()) teamData.postal_code = row.postal.trim();
  if (row.street?.trim()) teamData.street = row.street.trim();
  if (cityId) teamData.city_id = cityId;
  if (sportId) teamData.sport_id = sportId;

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .insert(teamData)
    .select('id')
    .single();

  if (teamError) throw new Error(`Failed to create team: ${teamError.message}`);

  // Process social links with semicolon separator (if provided)
  if (row.socials?.trim()) {
    const socialPairs = row.socials.split(';');
    for (const pair of socialPairs) {
      const [platform, url] = pair.split(':').map(s => s.trim());
      if (platform && url) {
        await supabase
          .from('team_social_links')
          .insert({
            platform: platform.toLowerCase(),
            url: url,
            team_id: team.id
          });
      }
    }
  }

  // Process opening hours with semicolon separator (if provided)
  if (row.hours?.trim()) {
    const hourPairs = row.hours.split(';');
    for (const pair of hourPairs) {
      const [day, timeRange] = pair.split(':').map(s => s.trim());
      if (day && timeRange) {
        const [startHour, endHour] = timeRange.split('-').map(s => s.trim());
        if (startHour && endHour) {
          await supabase
            .from('opening_hours')
            .insert({
              day: day.toLowerCase(),
              start_hour: startHour.toLowerCase(),
              end_hour: endHour.toLowerCase(),
              team_id: team.id
            });
        }
      }
    }
  }
}
