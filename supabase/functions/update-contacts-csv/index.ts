
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { csvData, selectedColumns, nullifyEmpty, startRow, batchSize } = await req.json()

    const lines = csvData.split('\n').filter((line: string) => line.trim() !== '')
    if (lines.length < 2) {
      throw new Error('CSV must contain at least a header row and one data row')
    }

    const headers = lines[0].split(',').map((h: string) => h.trim().replace(/"/g, ''))
    const nameIndex = headers.findIndex((h: string) => h.toLowerCase() === 'name')
    
    if (nameIndex === -1) {
      throw new Error('CSV must contain a "Name" column')
    }

    const totalRows = lines.length - 1
    const endRow = Math.min(startRow + batchSize - 1, totalRows)
    const dataLines = lines.slice(startRow, endRow + 1)

    const results = {
      processed: 0,
      successful: 0,
      notFound: 0,
      errors: [] as string[],
      isComplete: endRow >= totalRows,
      nextStartRow: endRow + 1,
      totalRows: totalRows
    }

    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i]
      const rowNumber = startRow + i + 1
      
      try {
        const values = line.split(',').map((v: string) => v.trim().replace(/"/g, ''))
        const contactName = values[nameIndex]

        if (!contactName) {
          results.errors.push(`Row ${rowNumber}: Contact name is required`)
          results.processed++
          continue
        }

        // Find existing contact by name
        const { data: existingContact, error: findError } = await supabaseClient
          .from('contacts')
          .select('id')
          .eq('name', contactName)
          .single()

        if (findError) {
          results.notFound++
          results.processed++
          continue
        }

        // Build update object for selected columns only
        const updateData: any = {}
        
        for (const column of selectedColumns) {
          const columnIndex = headers.findIndex(h => h === column)
          if (columnIndex === -1) continue
          
          const value = values[columnIndex] || ''
          
          // Handle empty values based on nullifyEmpty setting
          if (value === '') {
            if (nullifyEmpty) {
              updateData[column.toLowerCase()] = null
            }
            // If not nullifying empty, skip this field to preserve existing value
            continue
          }
          
          // Map CSV columns to database columns
          switch (column.toLowerCase()) {
            case 'team':
              // Handle team by finding team record
              if (value) {
                const { data: team } = await supabaseClient
                  .from('teams')
                  .select('id')
                  .eq('name', value)
                  .single()
                
                if (team) {
                  updateData.team_id = team.id
                }
              }
              break
            case 'department':
              // Handle department by finding or creating department record
              if (value) {
                const { data: department } = await supabaseClient
                  .from('departments')
                  .select('id')
                  .eq('name', value)
                  .single()
                
                if (department) {
                  updateData.department_id = department.id
                } else {
                  const { data: newDepartment } = await supabaseClient
                    .from('departments')
                    .insert({ name: value })
                    .select('id')
                    .single()
                  
                  if (newDepartment) {
                    updateData.department_id = newDepartment.id
                  }
                }
              }
              break
            case 'is_email_verified':
              updateData.is_email_verified = value.toLowerCase() === 'true'
              break
            default:
              updateData[column.toLowerCase()] = value
          }
        }

        // Update the contact
        const { error: updateError } = await supabaseClient
          .from('contacts')
          .update(updateData)
          .eq('id', existingContact.id)

        if (updateError) {
          results.errors.push(`Row ${rowNumber}: ${updateError.message}`)
        } else {
          results.successful++
        }

        results.processed++
      } catch (error) {
        results.errors.push(`Row ${rowNumber}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        results.processed++
      }
    }

    return new Response(
      JSON.stringify(results),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
