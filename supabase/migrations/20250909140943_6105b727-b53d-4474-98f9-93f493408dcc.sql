-- Remove the mistakenly added rugby teams by exact name
DELETE FROM public.teams t
USING public.sports s
WHERE t.sport_id = s.id
  AND s.name = 'Rugby'
  AND t.name IN (
    'England Rugby',
    'Ireland Rugby',
    'Scotland Rugby',
    'Wales Rugby',
    'British & Irish Lions'
  );