-- Update contacts to inherit their team's sport
UPDATE public.contacts 
SET sport_id = teams.sport_id 
FROM public.teams 
WHERE contacts.team_id = teams.id 
AND teams.sport_id IS NOT NULL;