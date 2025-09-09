-- Add generic email and phone numbers to all teams
UPDATE teams 
SET 
  email = LOWER(REPLACE(name, ' ', '')) || '@' || LOWER(REPLACE(name, ' ', '')) || '.com',
  phone = '+44 20 ' || (1000 + (ABS(HASHTEXT(id::text)) % 9000))::text || ' ' || (1000 + (ABS(HASHTEXT(name)) % 9000))::text
WHERE email IS NULL OR phone IS NULL;