-- Insert sport Cricket if not exists
INSERT INTO public.sports (name)
SELECT 'Cricket'
WHERE NOT EXISTS (SELECT 1 FROM public.sports WHERE name = 'Cricket');

-- Insert Wales if not exists  
INSERT INTO public.countries (name)
SELECT 'Wales'
WHERE NOT EXISTS (SELECT 1 FROM public.countries WHERE name = 'Wales');

-- Insert new cities with their countries
INSERT INTO public.cities (name, country_id)
SELECT city, c.id
FROM (VALUES
  ('Derby', 'England'),
  ('Chester-le-Street', 'England'),
  ('Chelmsford', 'England'),
  ('Canterbury', 'England'),
  ('Manchester', 'England'),
  ('London (Lord''s)', 'England'),
  ('Taunton', 'England'),
  ('London (The Oval)', 'England'),
  ('Hove (Brighton)', 'England'),
  ('Worcester', 'England'),
  ('Bedford', 'England'),
  ('Truro', 'England'),
  ('Dorchester', 'England'),
  ('Hereford', 'England'),
  ('Hertford', 'England'),
  ('Newcastle upon Tyne', 'England'),
  ('Trowbridge', 'England')
) AS new_cities(city, country)
JOIN public.countries c ON c.name = new_cities.country
WHERE NOT EXISTS (
  SELECT 1 FROM public.cities ci 
  WHERE ci.name = new_cities.city AND ci.country_id = c.id
);

-- Insert cricket teams
INSERT INTO public.teams (name, sport_id, country_id, city_id, level, league)
SELECT 
  team_data.club,
  sp.id as sport_id,
  c.id as country_id,
  ci.id as city_id,
  team_data.level,
  team_data.league
FROM (VALUES
  ('Derbyshire CCC','Professional','England','Derby','County Championship (First-Class)'),
  ('Durham CCC','Professional','England','Chester-le-Street','County Championship (First-Class)'),
  ('Essex CCC','Professional','England','Chelmsford','County Championship (First-Class)'),
  ('Gloucestershire CCC','Professional','England','Bristol','County Championship (First-Class)'),
  ('Glamorgan CCC','Professional','Wales','Cardiff','County Championship (First-Class)'),
  ('Hampshire CCC','Professional','England','Southampton','County Championship (First-Class)'),
  ('Kent CCC','Professional','England','Canterbury','County Championship (First-Class)'),
  ('Lancashire CCC','Professional','England','Manchester','County Championship (First-Class)'),
  ('Leicestershire CCC','Professional','England','Leicester','County Championship (First-Class)'),
  ('Middlesex CCC','Professional','England','London (Lord''s)','County Championship (First-Class)'),
  ('Northamptonshire CCC','Professional','England','Northampton','County Championship (First-Class)'),
  ('Nottinghamshire CCC','Professional','England','Nottingham','County Championship (First-Class)'),
  ('Somerset CCC','Professional','England','Taunton','County Championship (First-Class)'),
  ('Surrey CCC','Professional','England','London (The Oval)','County Championship (First-Class)'),
  ('Sussex CCC','Professional','England','Hove (Brighton)','County Championship (First-Class)'),
  ('Warwickshire CCC','Professional','England','Birmingham','County Championship (First-Class)'),
  ('Worcestershire CCC','Professional','England','Worcester','County Championship (First-Class)'),
  ('Yorkshire CCC','Professional','England','Leeds','County Championship (First-Class)'),
  ('Bedfordshire CCC','Semi-Professional','England','Bedford','National Counties (Minor)'),
  ('Berkshire CCC','Semi-Professional','England','Reading','National Counties (Minor)'),
  ('Buckinghamshire CCC','Semi-Professional','England','High Wycombe','National Counties (Minor)'),
  ('Cambridgeshire CCC','Semi-Professional','England','Cambridge','National Counties (Minor)'),
  ('Cheshire CCC','Semi-Professional','England','Chester','National Counties (Minor)'),
  ('Cornwall CCC','Semi-Professional','England','Truro','National Counties (Minor)'),
  ('Cumbria CCC','Semi-Professional','England','Carlisle','National Counties (Minor)'),
  ('Devon CCC','Semi-Professional','England','Exeter','National Counties (Minor)'),
  ('Dorset CCC','Semi-Professional','England','Dorchester','National Counties (Minor)'),
  ('Herefordshire CCC','Semi-Professional','England','Hereford','National Counties (Minor)'),
  ('Hertfordshire CCC','Semi-Professional','England','Hertford','National Counties (Minor)'),
  ('Lincolnshire CCC','Semi-Professional','England','Lincoln','National Counties (Minor)'),
  ('Norfolk CCC','Semi-Professional','England','Norwich','National Counties (Minor)'),
  ('Northumberland CCC','Semi-Professional','England','Newcastle upon Tyne','National Counties (Minor)'),
  ('Oxfordshire CCC','Semi-Professional','England','Oxford','National Counties (Minor)'),
  ('Shropshire CCC','Semi-Professional','England','Shrewsbury','National Counties (Minor)'),
  ('Staffordshire CCC','Semi-Professional','England','Stoke-on-Trent','National Counties (Minor)'),
  ('Suffolk CCC','Semi-Professional','England','Ipswich','National Counties (Minor)'),
  ('Wiltshire CCC','Semi-Professional','England','Trowbridge','National Counties (Minor)')
) AS team_data(club, level, country, city, league)
JOIN public.sports sp ON sp.name = 'Cricket'
JOIN public.countries c ON c.name = team_data.country
LEFT JOIN public.cities ci ON ci.name = team_data.city AND ci.country_id = c.id
WHERE NOT EXISTS (
  SELECT 1 FROM public.teams t WHERE t.name = team_data.club
);