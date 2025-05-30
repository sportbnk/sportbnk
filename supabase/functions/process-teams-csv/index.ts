import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import * as XLSX from 'https://esm.sh/xlsx@0.18.5';

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

    const { csvData, fileType = 'csv', startRow = 1, batchSize = 100 } = await req.json();
    
    let lines: string[] = [];
    let headers: string[] = [];
    
    // Determine file type and parse accordingly
    if (fileType === 'xlsx' || fileType === 'xls') {
      console.log('Processing XLSX file');
      
      // Parse XLSX data
      const workbook = XLSX.read(csvData, { type: 'base64' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert to JSON array
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Convert to CSV-like format for consistency with existing processing
      lines = jsonData.map((row: any[]) => 
        row.map(cell => cell === null || cell === undefined ? '' : String(cell)).join(',')
      );
      
      headers = lines[0].toLowerCase().split(',').map((h: string) => h.trim());
      console.log('XLSX Headers:', headers);
    } else {
      console.log('Processing CSV file');
      lines = csvData.trim().split('\n');
      headers = lines[0].toLowerCase().split(',').map((h: string) => h.trim());
      console.log('CSV Headers:', headers);
    }
    
    console.log(`Processing teams file (${fileType}) batch starting from row ${startRow}, batch size: ${batchSize}`);
    
    const results = {
      processed: 0,
      errors: [] as string[],
      successful: 0,
      skipped: 0,
      totalRows: lines.length - 1, // Exclude header
      nextStartRow: startRow,
      isComplete: false
    };

    // Calculate the actual batch end
    const endRow = Math.min(startRow + batchSize, lines.length);
    
    // Load existing teams once for efficient duplicate checking
    const { data: existingTeams } = await supabase
      .from('teams')
      .select(`
        id,
        name,
        cities (
          name,
          countries (
            name
          )
        )
      `);

    // Process batch of rows
    for (let i = startRow; i < endRow; i++) {
      try {
        let values: string[] = [];
        
        if (fileType === 'xlsx' || fileType === 'xls') {
          // For XLSX, values are already properly separated
          values = lines[i].split(',');
        } else {
          // For CSV, handle potential comma issues
          values = lines[i].split(',').map((v: string) => v.trim().replace(/"/g, ''));
        }
        
        // Log raw parsing details for debugging
        console.log(`\n=== ${fileType.toUpperCase()} PARSING DEBUG FOR ROW ${i + 1} ===`);
        console.log(`Raw line: "${lines[i]}"`);
        console.log(`Split into ${values.length} values:`, values);
        console.log(`Expected ${headers.length} headers:`, headers);
        
        if (values.length !== headers.length) {
          console.warn(`⚠️  MISMATCH: Row ${i + 1} has ${values.length} values but ${headers.length} headers!`);
        }
        
        const row: any = {};
        
        // Map columns to row object (case insensitive) with detailed logging
        headers.forEach((header, index) => {
          const value = values[index] || '';
          row[header] = value;
          console.log(`  ${header} (index ${index}) = "${value}"`);
        });
        
        console.log(`Final mapped row object:`, row);
        console.log(`=== END ${fileType.toUpperCase()} PARSING DEBUG ===\n`);

        // Check for duplicates using in-memory data
        const isDuplicate = checkForDuplicateInMemory(existingTeams, row);
        if (isDuplicate) {
          console.log(`Skipping duplicate team: ${row.name} (row ${i + 1})`);
          results.skipped++;
        } else {
          // Process the team data
          await processTeamRow(supabase, row, i + 1);
          results.successful++;
          
          // Add to existing teams list to avoid duplicates within the same batch
          if (existingTeams) {
            existingTeams.push({
              id: 'temp',
              name: row.name?.trim(),
              cities: row.city?.trim() ? {
                name: row.city.trim(),
                countries: row.country?.trim() ? {
                  name: row.country.trim()
                } : null
              } : null
            });
          }
        }
        
      } catch (error) {
        console.error(`Error processing row ${i + 1}:`, error);
        results.errors.push(`Row ${i + 1}: ${error.message}`);
      }
      
      results.processed++;
    }

    // Determine if processing is complete
    results.isComplete = endRow >= lines.length;
    results.nextStartRow = endRow;

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in process-teams-csv function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      processed: 0,
      successful: 0,
      skipped: 0,
      errors: [error.message],
      isComplete: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function checkForDuplicateInMemory(existingTeams: any[], row: any) {
  if (!row.name?.trim() || !existingTeams) {
    return false;
  }

  const teamName = row.name.trim().toLowerCase();
  const cityName = row.city?.trim()?.toLowerCase();
  const countryName = row.country?.trim()?.toLowerCase();

  for (const team of existingTeams) {
    if (team.name?.toLowerCase() === teamName) {
      // If no city provided in CSV, match teams with same name and no city
      if (!cityName && !team.cities) {
        return true;
      }
      
      // If city provided, check for exact match
      if (cityName && team.cities) {
        const teamCityName = team.cities.name?.toLowerCase();
        const teamCountryName = team.cities.countries?.name?.toLowerCase();
        
        if (teamCityName === cityName) {
          // Match if countries are the same or one is missing
          if (!countryName || !teamCountryName || teamCountryName === countryName) {
            return true;
          }
        }
      }
    }
  }

  return false;
}

async function processTeamRow(supabase: any, row: any, rowNumber: number) {
  console.log(`\n=== PROCESSING TEAM ROW ${rowNumber} ===`);
  
  // Log all field mappings that will be sent to database
  console.log(`Database field mappings for row ${rowNumber}:`);
  console.log(`  name: "${row.name}"`);
  console.log(`  sport/sports: "${row.sport || row.sports}"`);
  console.log(`  level: "${row.level}"`);
  console.log(`  street: "${row.street}"`);
  console.log(`  postal: "${row.postal}"`);
  console.log(`  city: "${row.city}"`);
  console.log(`  country: "${row.country}"`);
  console.log(`  website: "${row.website}"`);
  console.log(`  phone: "${row.phone}"`);
  console.log(`  email: "${row.email}"`);
  console.log(`  founded: "${row.founded}"`);
  console.log(`  revenue: "${row.revenue}"`);
  console.log(`  employees: "${row.employees}"`);
  console.log(`  socials: "${row.socials}"`);
  console.log(`  hours: "${row.hours}"`);
  
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

  // Create team with only provided data and validate field lengths
  const teamData: any = {
    name: row.name.trim()
  };

  // Validate and log field lengths before adding to teamData
  const fieldValidations = [
    { field: 'level', value: row.level?.toLowerCase().trim(), maxLength: 20 },
    { field: 'website', value: row.website?.trim(), maxLength: null }, // text field, no limit
    { field: 'email', value: row.email?.trim(), maxLength: 255 }, // assuming varchar(255)
    { field: 'phone', value: row.phone?.trim(), maxLength: 20 },
    { field: 'founded', value: row.founded?.trim(), maxLength: 20 },
    { field: 'postal_code', value: row.postal?.trim(), maxLength: 20 },
    { field: 'street', value: row.street?.trim(), maxLength: null } // text field, no limit
  ];

  console.log(`\n=== FIELD VALIDATION FOR ROW ${rowNumber} ===`);
  for (const validation of fieldValidations) {
    const length = validation.value?.length || 0;
    const status = validation.maxLength && length > validation.maxLength ? '❌ TOO LONG' : '✅ OK';
    console.log(`  ${validation.field}: "${validation.value}" (${length} chars, max: ${validation.maxLength || 'unlimited'}) ${status}`);
    
    if (validation.value && validation.maxLength && validation.value.length > validation.maxLength) {
      console.error(`\n🚨 FIELD LENGTH ERROR 🚨`);
      console.error(`Field '${validation.field}' value too long: "${validation.value}" (${validation.value.length} chars, max ${validation.maxLength})`);
      console.error(`This suggests CSV field misalignment - check for extra commas in the source data!`);
      throw new Error(`Field '${validation.field}' value too long: "${validation.value}" (${validation.value.length} characters, maximum ${validation.maxLength} allowed)`);
    }
  }

  // Only add fields if they have values and pass validation
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

  console.log(`Final team data to insert:`, teamData);
  console.log(`=== END PROCESSING ROW ${rowNumber} ===\n`);

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .insert(teamData)
    .select('id')
    .single();

  if (teamError) {
    console.error(`Database error for team insertion:`, teamError);
    throw new Error(`Failed to create team: ${teamError.message}`);
  }

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
