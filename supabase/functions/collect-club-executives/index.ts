import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Executive data gathered from research
const executiveData = [
  // Arsenal
  { 
    clubName: 'Arsenal', 
    firstName: 'Richard', 
    lastName: 'Garlick', 
    position: 'CEO', 
    email: null, 
    linkedin: null 
  },
  { 
    clubName: 'Arsenal', 
    firstName: 'Stan', 
    lastName: 'Kroenke', 
    position: 'Chairman', 
    email: null, 
    linkedin: null 
  },
  
  // Chelsea
  { 
    clubName: 'Chelsea', 
    firstName: 'Jason', 
    lastName: 'Gannon', 
    position: 'President', 
    email: null, 
    linkedin: null 
  },
  { 
    clubName: 'Chelsea', 
    firstName: 'Todd', 
    lastName: 'Boehly', 
    position: 'Chairman', 
    email: null, 
    linkedin: null 
  },
  { 
    clubName: 'Chelsea', 
    firstName: 'David', 
    lastName: 'Barnard', 
    position: 'Director of Football', 
    email: null, 
    linkedin: null 
  },
  
  // Manchester United
  { 
    clubName: 'Manchester United', 
    firstName: 'Omar', 
    lastName: 'Berrada', 
    position: 'CEO', 
    email: null, 
    linkedin: null 
  },
  
  // Liverpool
  { 
    clubName: 'Liverpool', 
    firstName: 'Billy', 
    lastName: 'Hogan', 
    position: 'CEO', 
    email: null, 
    linkedin: null 
  },
  
  // Manchester City
  { 
    clubName: 'Manchester City', 
    firstName: 'Khaldoon', 
    lastName: 'Al Mubarak', 
    position: 'Chairman', 
    email: null, 
    linkedin: null 
  },
  
  // Tottenham Hotspur
  { 
    clubName: 'Tottenham Hotspur', 
    firstName: 'Vinai', 
    lastName: 'Venkatesham', 
    position: 'CEO', 
    email: null, 
    linkedin: null 
  },
  
  // Newcastle United
  { 
    clubName: 'Newcastle United', 
    firstName: 'Amanda', 
    lastName: 'Staveley', 
    position: 'Director', 
    email: null, 
    linkedin: null 
  },
  
  // West Ham United
  { 
    clubName: 'West Ham United', 
    firstName: 'David', 
    lastName: 'Sullivan', 
    position: 'Chairman', 
    email: null, 
    linkedin: null 
  },
  { 
    clubName: 'West Ham United', 
    firstName: 'Karren', 
    lastName: 'Brady', 
    position: 'Vice-Chair', 
    email: null, 
    linkedin: null 
  },
  { 
    clubName: 'West Ham United', 
    firstName: 'Nathan', 
    lastName: 'Thompson', 
    position: 'Commercial Director', 
    email: null, 
    linkedin: null 
  },
  
  // Brighton & Hove Albion
  { 
    clubName: 'Brighton & Hove Albion', 
    firstName: 'Paul', 
    lastName: 'Barber', 
    position: 'CEO', 
    email: null, 
    linkedin: null 
  },
  
  // Aston Villa
  { 
    clubName: 'Aston Villa', 
    firstName: 'Nassef', 
    lastName: 'Sawiris', 
    position: 'Chairman', 
    email: null, 
    linkedin: null 
  },
  { 
    clubName: 'Aston Villa', 
    firstName: 'Wesley', 
    lastName: 'Edens', 
    position: 'Chairman', 
    email: null, 
    linkedin: null 
  },
  { 
    clubName: 'Aston Villa', 
    firstName: 'Sharon', 
    lastName: 'Barnhurst', 
    position: 'Director', 
    email: null, 
    linkedin: null 
  },
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting to collect and insert club executives data...');

    // First, get all teams and departments
    const [teamsResult, departmentsResult] = await Promise.all([
      supabase.from('teams').select('id, name'),
      supabase.from('departments').select('id, name')
    ]);

    if (teamsResult.error) {
      console.error('Error fetching teams:', teamsResult.error);
      throw new Error('Failed to fetch teams');
    }

    if (departmentsResult.error) {
      console.error('Error fetching departments:', departmentsResult.error);
      throw new Error('Failed to fetch departments');
    }

    const teams = teamsResult.data || [];
    const departments = departmentsResult.data || [];
    
    console.log(`Found ${teams.length} teams and ${departments.length} departments`);

    let insertedCount = 0;
    const errors = [];

    // Process each executive
    for (const executive of executiveData) {
      try {
        // Find matching team
        const team = teams.find(t => 
          t.name.toLowerCase().includes(executive.clubName.toLowerCase()) ||
          executive.clubName.toLowerCase().includes(t.name.toLowerCase())
        );

        if (!team) {
          console.warn(`No team found for ${executive.clubName}`);
          errors.push(`No team found for ${executive.clubName}`);
          continue;
        }

        // Find matching department based on position
        const department = departments.find(d => {
          const deptName = d.name.toLowerCase();
          const position = executive.position.toLowerCase();
          
          return deptName === position ||
                 (deptName === 'ceo' && position.includes('ceo')) ||
                 (deptName === 'chairman' && (position.includes('chairman') || position.includes('chair'))) ||
                 (deptName === 'commercial director' && position.includes('commercial')) ||
                 (deptName === 'director of football' && position.includes('director of football')) ||
                 (deptName === 'president' && position.includes('president'));
        });

        if (!department) {
          console.warn(`No department found for position: ${executive.position}`);
          errors.push(`No department found for position: ${executive.position}`);
          continue;
        }

        // Check if contact already exists
        const existingContact = await supabase
          .from('contacts')
          .select('id')
          .eq('first_name', executive.firstName)
          .eq('last_name', executive.lastName)
          .eq('team_id', team.id)
          .single();

        if (existingContact.data) {
          console.log(`Contact ${executive.firstName} ${executive.lastName} already exists for ${team.name}`);
          continue;
        }

        // Insert the contact
        const contactData = {
          first_name: executive.firstName,
          last_name: executive.lastName,
          team_id: team.id,
          department_id: department.id,
          position: executive.position,
          email: executive.email,
          linkedin: executive.linkedin,
          notes: `Executive role at ${executive.clubName}. Added via automated data collection.`
        };

        const insertResult = await supabase
          .from('contacts')
          .insert(contactData);

        if (insertResult.error) {
          console.error(`Error inserting ${executive.firstName} ${executive.lastName}:`, insertResult.error);
          errors.push(`Error inserting ${executive.firstName} ${executive.lastName}: ${insertResult.error.message}`);
        } else {
          console.log(`Successfully inserted ${executive.firstName} ${executive.lastName} as ${executive.position} for ${team.name}`);
          insertedCount++;
        }

      } catch (error) {
        console.error(`Error processing ${executive.firstName} ${executive.lastName}:`, error);
        errors.push(`Error processing ${executive.firstName} ${executive.lastName}: ${error.message}`);
      }
    }

    const result = {
      success: true,
      message: `Successfully processed club executives data`,
      stats: {
        totalExecutives: executiveData.length,
        insertedCount,
        errorCount: errors.length,
        teamsFound: teams.length,
        departmentsFound: departments.length
      },
      errors: errors.length > 0 ? errors : undefined
    };

    console.log('Final result:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in collect-club-executives function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      details: 'Check function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});