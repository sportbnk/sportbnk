
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactCsvRow {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
  team: string;
  department: string;
  is_email_verified?: string;
}

interface TeamConflictResolution {
  rowIndex: number;
  teamName: string;
  selectedTeamId: string;
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

    const { csvData, conflictResolutions, startRow = 1, batchSize = 50 } = await req.json();
    const lines = csvData.trim().split('\n');
    const headers = lines[0].toLowerCase().split(',').map((h: string) => h.trim());
    
    console.log(`Processing contacts CSV batch starting from row ${startRow}, batch size: ${batchSize}`);
    console.log('Headers:', headers);
    console.log('Conflict resolutions:', conflictResolutions);
    
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

    // Process batch of rows
    for (let i = startRow; i < endRow; i++) {
      try {
        const values = lines[i].split(',').map((v: string) => v.trim().replace(/"/g, ''));
        const row: any = {};
        
        // Map CSV columns to row object (case insensitive)
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        // Check if this row has a conflict resolution
        const conflictResolution = conflictResolutions?.find((r: TeamConflictResolution) => 
          r.rowIndex === i - 1 // Adjust for header row
        );

        // Process the contact data
        const processResult = await processContactRow(supabase, row, i + 1, conflictResolution);
        
        if (processResult.skipped) {
          results.skipped++;
        } else {
          results.successful++;
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
    console.error('Error in process-contacts-csv function:', error);
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

async function processContactRow(
  supabase: any, 
  row: any, 
  rowNumber: number, 
  conflictResolution?: TeamConflictResolution
): Promise<{ skipped: boolean }> {
  console.log(`Processing contact row ${rowNumber}:`, row);
  
  // Validate required fields
  const contactName = row.name?.trim();
  if (!contactName) throw new Error('Contact name is required');
  
  const teamName = row.team?.trim();
  if (!teamName) throw new Error('Team name is required');

  // Get team ID - either from conflict resolution or by searching
  let teamId: string;
  
  if (conflictResolution && conflictResolution.teamName.toLowerCase() === teamName.toLowerCase()) {
    teamId = conflictResolution.selectedTeamId;
    console.log(`Using conflict resolution team ID: ${teamId}`);
  } else {
    // Search for team by name
    const { data: teams, error: teamError } = await supabase
      .from('teams')
      .select('id')
      .ilike('name', teamName);

    if (teamError) throw new Error(`Failed to find team: ${teamError.message}`);
    
    if (!teams || teams.length === 0) {
      throw new Error(`No team found with name "${teamName}"`);
    }
    
    if (teams.length > 1) {
      throw new Error(`Multiple teams found with name "${teamName}" - conflict resolution required`);
    }
    
    teamId = teams[0].id;
  }

  // Check if contact already exists in this team
  const { data: existingContact, error: checkError } = await supabase
    .from('contacts')
    .select('id')
    .eq('team_id', teamId)
    .ilike('name', contactName)
    .maybeSingle();

  if (checkError) {
    throw new Error(`Failed to check for existing contact: ${checkError.message}`);
  }

  if (existingContact) {
    console.log(`Skipping duplicate contact "${contactName}" in team "${teamName}"`);
    return { skipped: true };
  }

  // Get or create department
  let departmentId = null;
  const departmentName = row.department?.trim();
  
  if (departmentName) {
    let { data: department, error: departmentError } = await supabase
      .from('departments')
      .select('id')
      .ilike('name', departmentName)
      .single();

    if (!department) {
      const { data: newDepartment, error: createDepartmentError } = await supabase
        .from('departments')
        .insert({ name: departmentName })
        .select('id')
        .single();
      
      if (createDepartmentError) throw new Error(`Failed to create department: ${createDepartmentError.message}`);
      department = newDepartment;
    }
    
    departmentId = department.id;
  }

  // Parse is_email_verified field
  let isEmailVerified = false;
  if (row.is_email_verified?.trim()) {
    const verifiedValue = row.is_email_verified.trim().toLowerCase();
    isEmailVerified = verifiedValue === 'true' || verifiedValue === '1' || verifiedValue === 'yes';
  }

  // Clean and prepare contact data
  const contactData = {
    name: contactName,
    role: row.role?.trim() || null,
    email: row.email?.trim() || null,
    phone: row.phone?.trim() || null,
    linkedin: row.linkedin?.trim() || null,
    team_id: teamId,
    department_id: departmentId,
    is_email_verified: isEmailVerified,
    // Credit consumption fields will use their defaults (1, 2, 0)
  };

  console.log('Contact data to insert:', contactData);

  // Insert contact
  const { data: contact, error: contactError } = await supabase
    .from('contacts')
    .insert(contactData)
    .select('id')
    .single();

  if (contactError) throw new Error(`Failed to create contact: ${contactError.message}`);
  
  console.log(`Successfully created contact with ID: ${contact.id}`);
  return { skipped: false };
}
