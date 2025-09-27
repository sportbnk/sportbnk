import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Processing AI search for query:', query);

    // Get OpenAI API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // First, get all available data
    const [contactsResult, teamsResult] = await Promise.all([
      supabase.from('contacts').select(`
        *,
        team:teams(name),
        department:departments(name)
      `),
      supabase.from('teams').select(`
        *,
        sport:sports(name),
        city:cities(name),
        country:countries(name)
      `)
    ]);

    if (contactsResult.error || teamsResult.error) {
      throw new Error('Failed to fetch data from database');
    }

    const contacts = contactsResult.data || [];
    const teams = teamsResult.data || [];

    // Create a context for OpenAI
    const dataContext = {
      contacts: contacts.map(c => ({
        id: c.id,
        name: `${c.first_name} ${c.last_name}`,
        position: c.position,
        team: c.team?.name,
        department: c.department?.name,
        email: c.email
      })),
      teams: teams.map(t => ({
        id: t.id,
        name: t.name,
        sport: t.sport?.name,
        league: t.league,
        city: t.city?.name,
        country: t.country?.name
      }))
    };

    // Use OpenAI to intelligently search and rank results
    const prompt = `
    You are an intelligent search assistant for a sports database. Based on the user's query, find the most relevant contacts and teams.
    
    User query: "${query}"
    
    Available data:
    ${JSON.stringify(dataContext, null, 2)}
    
    Return the most relevant results in this exact JSON format:
    {
      "results": [
        {
          "type": "contact" | "team",
          "data": <the original object>,
          "relevance": <score from 0-1>
        }
      ]
    }
    
    Only include results that are actually relevant to the query. Sort by relevance score (highest first).
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful search assistant. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    const aiResponse = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', aiResponse);
      throw new Error('AI search failed');
    }

    const aiContent = aiResponse.choices[0].message.content;
    console.log('AI response:', aiContent);

    let searchResults;
    try {
      searchResults = JSON.parse(aiContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to simple text search
      const fallbackResults = [
        ...contacts.filter(c => 
          c.first_name.toLowerCase().includes(query.toLowerCase()) ||
          c.last_name.toLowerCase().includes(query.toLowerCase()) ||
          c.position?.toLowerCase().includes(query.toLowerCase())
        ).map(c => ({ type: 'contact', data: c, relevance: 0.5 })),
        ...teams.filter(t => 
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.league?.toLowerCase().includes(query.toLowerCase())
        ).map(t => ({ type: 'team', data: t, relevance: 0.5 }))
      ];
      
      searchResults = { results: fallbackResults.slice(0, 10) };
    }

    return new Response(
      JSON.stringify(searchResults),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in ai-search function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});