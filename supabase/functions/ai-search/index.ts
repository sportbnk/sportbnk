
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    console.log('=== AI SEARCH DEBUG START ===');
    console.log('Input query:', query);
    
    if (!query) {
      console.log('ERROR: No query provided');
      throw new Error('Query is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create a prompt to convert natural language to search filters
    const systemPrompt = `You are a database query assistant. Convert natural language queries into structured search parameters for a sports database.

The database contains teams/organizations with these fields:
- name (text): team/organization name
- sport (text): sport type (football, cricket, rugby, golf, boxing, etc.)
- level (text): professional, amateur, youth, etc.
- city (text): city name
- country (text): country name
- revenue (number): annual revenue
- employees (number): number of employees

Convert the user's query into a JSON object with these possible filters:
{
  "searchTerm": "text to search in team names or leave empty",
  "sport": "specific sport name or 'all'",
  "level": "specific level or 'all'", 
  "city": "specific city name or 'all'",
  "country": "specific country name or 'all'",
  "revenue": "less1m|1m-10m|10m-50m|more50m|all",
  "employees": "less50|50-200|200-1000|more1000|all"
}

IMPORTANT: For sports, use the exact sport names as they appear in the database: Football, Cricket, Rugby, Golf, Boxing, Basketball, etc.

Examples:
- "London cricket clubs" → {"searchTerm": "", "sport": "Cricket", "city": "London", "country": "all", "level": "all", "revenue": "all", "employees": "all"}
- "Professional football teams in Manchester" → {"searchTerm": "", "sport": "Football", "level": "Professional", "city": "Manchester", "country": "all", "revenue": "all", "employees": "all"}
- "Golf clubs in Scotland" → {"searchTerm": "", "sport": "Golf", "city": "all", "country": "Scotland", "level": "all", "revenue": "all", "employees": "all"}

Only return the JSON object, no explanation.`;

    // Try to call OpenAI API, but fall back to simple search if it fails
    let filters;
    try {
      console.log('Calling OpenAI API...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: query }
          ],
          temperature: 0.1,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content.trim();
      
      console.log('AI response:', aiResponse);

      // Parse the AI response as JSON
      filters = JSON.parse(aiResponse);
      console.log('Parsed filters:', filters);
    } catch (error) {
      console.error('OpenAI API failed or parsing failed, using fallback search logic:', error);
      // Fallback: create basic filters from the search query
      filters = {
        searchTerm: query,
        sport: 'all',
        level: 'all',
        city: 'all',
        country: 'all',
        revenue: 'all',
        employees: 'all'
      };
      
      // Try to extract sport and city from query
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('cricket')) filters.sport = 'Cricket';
      if (lowerQuery.includes('football')) filters.sport = 'Football';
      if (lowerQuery.includes('rugby')) filters.sport = 'Rugby';
      if (lowerQuery.includes('golf')) filters.sport = 'Golf';
      if (lowerQuery.includes('boxing')) filters.sport = 'Boxing';
      
      if (lowerQuery.includes('london')) filters.city = 'London';
      if (lowerQuery.includes('manchester')) filters.city = 'Manchester';
      if (lowerQuery.includes('birmingham')) filters.city = 'Birmingham';
      
      console.log('Fallback filters:', filters);
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build queries for both teams and contacts
    let teamsQuery = supabase
      .from('teams')
      .select(`
        id,
        name,
        revenue,
        employees,
        level,
        sports (
          name
        ),
        cities (
          name,
          countries (
            name
          )
        )
      `);

    let contactsQuery = supabase
      .from('contacts')
      .select(`
        id,
        name,
        role,
        email,
        phone,
        linkedin,
        email_credits_consumed,
        phone_credits_consumed,
        linkedin_credits_consumed,
        teams (
          id,
          name,
          sports (
            name
          ),
          cities (
            name,
            countries (
              name
            )
          )
        )
      `);

    // Apply filters to teams query
    if (filters.searchTerm && filters.searchTerm.trim()) {
      teamsQuery = teamsQuery.ilike('name', `%${filters.searchTerm.trim()}%`);
    }

    // Priority 1: City/Country filters
    if (filters.city && filters.city !== 'all') {
      teamsQuery = teamsQuery.eq('cities.name', filters.city);
    }

    if (filters.country && filters.country !== 'all') {
      teamsQuery = teamsQuery.eq('cities.countries.name', filters.country);
    }

    // Priority 2: Sport filters
    if (filters.sport && filters.sport !== 'all') {
      teamsQuery = teamsQuery.eq('sports.name', filters.sport);
    }

    if (filters.level && filters.level !== 'all') {
      teamsQuery = teamsQuery.eq('level', filters.level);
    }

    if (filters.revenue && filters.revenue !== 'all') {
      if (filters.revenue === 'less1m') {
        teamsQuery = teamsQuery.lt('revenue', 1000000);
      } else if (filters.revenue === '1m-10m') {
        teamsQuery = teamsQuery.gte('revenue', 1000000).lte('revenue', 10000000);
      } else if (filters.revenue === '10m-50m') {
        teamsQuery = teamsQuery.gte('revenue', 10000000).lte('revenue', 50000000);
      } else if (filters.revenue === 'more50m') {
        teamsQuery = teamsQuery.gt('revenue', 50000000);
      }
    }

    if (filters.employees && filters.employees !== 'all') {
      if (filters.employees === 'less50') {
        teamsQuery = teamsQuery.lt('employees', 50);
      } else if (filters.employees === '50-200') {
        teamsQuery = teamsQuery.gte('employees', 50).lte('employees', 200);
      } else if (filters.employees === '200-1000') {
        teamsQuery = teamsQuery.gte('employees', 200).lte('employees', 1000);
      } else if (filters.employees === 'more1000') {
        teamsQuery = teamsQuery.gt('employees', 1000);
      }
    }

    // Apply similar filters to contacts query
    if (filters.searchTerm && filters.searchTerm.trim()) {
      contactsQuery = contactsQuery.or(`name.ilike.%${filters.searchTerm.trim()}%,role.ilike.%${filters.searchTerm.trim()}%`);
    }

    // Priority 1: City/Country filters for contacts (through teams)
    if (filters.city && filters.city !== 'all') {
      contactsQuery = contactsQuery.eq('teams.cities.name', filters.city);
    }

    if (filters.country && filters.country !== 'all') {
      contactsQuery = contactsQuery.eq('teams.cities.countries.name', filters.country);
    }

    // Priority 2: Sport filters for contacts (through teams)
    if (filters.sport && filters.sport !== 'all') {
      contactsQuery = contactsQuery.eq('teams.sports.name', filters.sport);
    }

    console.log('Executing database queries...');
    console.log('Teams query filters applied:', {
      searchTerm: filters.searchTerm,
      city: filters.city,
      country: filters.country,
      sport: filters.sport,
      level: filters.level
    });
    
    // Execute both queries
    const [teamsResult, contactsResult] = await Promise.all([
      teamsQuery.limit(25),
      contactsQuery.limit(25)
    ]);

    console.log('Teams query result:', teamsResult);
    console.log('Contacts query result:', contactsResult);

    if (teamsResult.error) {
      console.error('Teams query error:', teamsResult.error);
      throw new Error(`Teams query error: ${teamsResult.error.message}`);
    }

    if (contactsResult.error) {
      console.error('Contacts query error:', contactsResult.error);
      throw new Error(`Contacts query error: ${contactsResult.error.message}`);
    }

    const teams = teamsResult.data || [];
    const contacts = contactsResult.data || [];

    console.log(`Found ${teams.length} teams and ${contacts.length} contacts`);
    console.log('Teams data:', teams);
    console.log('Contacts data:', contacts);
    console.log('=== AI SEARCH DEBUG END ===');

    return new Response(
      JSON.stringify({ 
        teams: teams, 
        contacts: contacts,
        filters,
        query: query
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
