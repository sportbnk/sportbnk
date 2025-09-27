import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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
    const { organizationName, type, league, location } = await req.json();

    console.log('Classifying sport for:', { organizationName, type, league, location });

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
            content: `You are a sports classification expert. Analyze organization names and details to classify them as either "Cricket" or "Football" only. 
            
            Guidelines:
            - Look for keywords like FC, CF, United, City, etc. which typically indicate football
            - Look for keywords like CC, Cricket Club, County Cricket which indicate cricket
            - Consider league names (Premier League, La Liga = Football; County Championship, IPL = Cricket)
            - If unclear, make your best guess based on location and common naming patterns
            - Respond with ONLY "Cricket" or "Football" - nothing else`
          },
          { 
            role: 'user', 
            content: `Classify this organization:
            Name: ${organizationName}
            Type: ${type}
            League: ${league}
            Location: ${location}
            
            Is this Cricket or Football?`
          }
        ],
        max_tokens: 10,
        temperature: 0.1,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    const classification = data.choices[0].message.content.trim();
    
    // Validate the response
    if (classification !== 'Cricket' && classification !== 'Football') {
      console.warn('Invalid classification received:', classification);
      // Fallback logic based on keywords
      const nameAndType = `${organizationName} ${type} ${league}`.toLowerCase();
      if (nameAndType.includes('cricket') || nameAndType.includes('cc')) {
        return new Response(JSON.stringify({ sport: 'Cricket' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ sport: 'Football' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ sport: classification }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in classify-sport function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});