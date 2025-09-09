import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log('Starting club information collection...');
    
    // Get all teams from the database
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('id, name, sport:sports(name), league, level')
      .in('level', ['Professional', 'International', 'Representative']);
    
    if (teamsError) {
      console.error('Error fetching teams:', teamsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch teams' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log(`Found ${teams.length} professional clubs to process`);

    const results = [];
    
    // Process teams in batches to avoid overwhelming the API
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      console.log(`Processing ${i + 1}/${teams.length}: ${team.name}`);
      
      try {
        // Use AI to search for club information
        const clubInfo = await searchClubInfo(team);
        
        if (clubInfo) {
          // Update the team in the database
          const { error: updateError } = await supabase
            .from('teams')
            .update({
              website: clubInfo.website,
              email: clubInfo.email,
              phone: clubInfo.phone,
              description: clubInfo.description,
              founded_year: clubInfo.founded_year
            })
            .eq('id', team.id);
          
          if (updateError) {
            console.error(`Error updating ${team.name}:`, updateError);
          } else {
            console.log(`✅ Updated ${team.name}`);
            
            // Add social media links if found
            if (clubInfo.social_media && clubInfo.social_media.length > 0) {
              for (const social of clubInfo.social_media) {
                await supabase
                  .from('team_social_links')
                  .upsert({
                    team_id: team.id,
                    platform: social.platform,
                    url: social.url
                  }, {
                    onConflict: 'team_id,platform'
                  });
              }
            }
          }
          
          results.push({
            team: team.name,
            status: 'success',
            data: clubInfo
          });
        } else {
          results.push({
            team: team.name,
            status: 'no_data',
            message: 'No information found'
          });
        }
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`Error processing ${team.name}:`, error);
        results.push({
          team: team.name,
          status: 'error',
          error: error.message
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Club information collection completed',
        total_processed: teams.length,
        results: results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in collect-club-info function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

async function searchClubInfo(team: any) {
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const prompt = `Find the current official information for "${team.name}", a ${team.level} ${team.sport?.name || 'sports'} club/team in the ${team.league || 'league'}. 

Please provide ONLY factual, current information in this exact JSON format:
{
  "website": "official website URL or null",
  "email": "general contact email or null", 
  "phone": "main phone number or null",
  "description": "brief 1-2 sentence description",
  "founded_year": number or null,
  "social_media": [
    {"platform": "twitter", "url": "twitter URL"},
    {"platform": "facebook", "url": "facebook URL"},
    {"platform": "instagram", "url": "instagram URL"},
    {"platform": "youtube", "url": "youtube URL"}
  ]
}

Only include social media entries that exist. Use null for any information you cannot find with confidence. For phone numbers, use international format if possible.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a precise research assistant. Provide only verified, factual information about sports organizations. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      console.error('No content in OpenAI response');
      return null;
    }

    // Try to parse JSON response
    try {
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      const clubInfo = JSON.parse(cleanContent);
      
      // Validate the response structure
      if (typeof clubInfo === 'object' && clubInfo !== null) {
        return clubInfo;
      } else {
        console.error('Invalid response structure from AI');
        return null;
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('Raw content:', content);
      return null;
    }

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
}