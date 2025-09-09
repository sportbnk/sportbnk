-- Clean up data added by AI collection features

-- Remove all contacts that were added by the executives collection
-- (these would have been added recently and have team_id and department_id)
DELETE FROM contacts 
WHERE team_id IS NOT NULL 
AND department_id IS NOT NULL 
AND created_at > '2024-01-01';

-- Remove all team social links added by AI collection
DELETE FROM team_social_links;

-- Clear team fields that were populated by AI collection
UPDATE teams SET 
  website = NULL,
  email = NULL, 
  phone = NULL,
  description = NULL,
  founded_year = NULL
WHERE website IS NOT NULL 
   OR email IS NOT NULL 
   OR phone IS NOT NULL 
   OR description IS NOT NULL 
   OR founded_year IS NOT NULL;