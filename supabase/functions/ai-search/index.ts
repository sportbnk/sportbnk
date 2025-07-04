
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
    
    if (!query) {
      throw new Error('Query is required');
    }

    console.log('Processing AI search query:', query);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create a prompt to convert natural language to search filters
    const systemPrompt = `You are a database query assistant. Convert natural language queries into structured search parameters for a sports database.

The database contains teams/organizations with these fields:
- name (text): team/organization name
- sport (text): sport type (football, cricket, rugby, etc.)
- level (text): professional, amateur, youth, etc.
- city (text): city name
- country (text): country name
- revenue (number): annual revenue
- employees (number): number of employees

Convert the user's query into a JSON object with these possible filters:
{
  "searchTerm": "text to search in team names",
  "sport": "specific sport or 'all'",
  "level": "specific level or 'all'", 
  "city": "specific city or 'all'",
  "country": "specific country or 'all'",
  "revenue": "less1m|1m-10m|10m-50m|more50m|all",
  "employees": "less50|50-200|200-1000|more1000|all"
}

Examples:
- "Find cricket clubs in London" → {"searchTerm": "", "sport": "cricket", "city": "London", "country": "all", "level": "all", "revenue": "all", "employees": "all"}
- "Show marketing managers in Dublin" → {"searchTerm": "marketing", "city": "Dublin", "sport": "all", "level": "all", "country": "all", "revenue": "all", "employees": "all"}
- "Football teams with over 50 employees" → {"searchTerm": "", "sport": "football", "employees": "more1000", "city": "all", "country": "all", "level": "all", "revenue": "all"}
- "Professional rugby teams" → {"searchTerm": "", "sport": "rugby", "level": "professional", "city": "all", "country": "all", "revenue": "all", "employees": "all"}

Only return the JSON object, no explanation.`;

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
    let filters;
    try {
      filters = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', aiResponse);
      throw new Error('Failed to parse AI response');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build the query based on AI-generated filters
    let dbQuery = supabase
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

    // Apply filters
    if (filters.searchTerm && filters.searchTerm.trim()) {
      dbQuery = dbQuery.ilike('name', `%${filters.searchTerm.trim()}%`);
    }

    if (filters.sport && filters.sport !== 'all') {
      dbQuery = dbQuery.eq('sports.name', filters.sport);
    }

    if (filters.level && filters.level !== 'all') {
      dbQuery = dbQuery.eq('level', filters.level);
    }

    if (filters.city && filters.city !== 'all') {
      dbQuery = dbQuery.eq('cities.name', filters.city);
    }

    if (filters.country && filters.country !== 'all') {
      dbQuery = dbQuery.eq('cities.countries.name', filters.country);
    }

    if (filters.revenue && filters.revenue !== 'all') {
      if (filters.revenue === 'less1m') {
        dbQuery = dbQuery.lt('revenue', 1000000);
      } else if (filters.revenue === '1m-10m') {
        dbQuery = dbQuery.gte('revenue', 1000000).lte('revenue', 10000000);
      } else if (filters.revenue === '10m-50m') {
        dbQuery = dbQuery.gte('revenue', 10000000).lte('revenue', 50000000);
      } else if (filters.revenue === 'more50m') {
        dbQuery = dbQuery.gt('revenue', 50000000);
      }
    }

    if (filters.employees && filters.employees !== 'all') {
      if (filters.employees === 'less50') {
        dbQuery = dbQuery.lt('employees', 50);
      } else if (filters.employees === '50-200') {
        dbQuery = dbQuery.gte('employees', 50).lte('employees', 200);
      } else if (filters.employees === '200-1000') {
        dbQuery = dbQuery.gte('employees', 200).lte('employees', 1000);
      } else if (filters.employees === 'more1000') {
        dbQuery = dbQuery.gt('employees', 1000);
      }
    }

    // Execute the query
    const { data: results, error } = await dbQuery.limit(50);

    if (error) {
      console.error('Database query error:', error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log(`Found ${results?.length || 0} results`);

    return new Response(
      JSON.stringify({ 
        results: results || [], 
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
