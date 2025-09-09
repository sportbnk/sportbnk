-- Seed cricket clubs with related sports, countries, and cities
BEGIN;

WITH seed AS (
  VALUES
    ('Derbyshire CCC','Cricket','Professional','England','Derby','County Championship (First-Class)'),
    ('Durham CCC','Cricket','Professional','England','Chester-le-Street','County Championship (First-Class)'),
    ('Essex CCC','Cricket','Professional','England','Chelmsford','County Championship (First-Class)'),
    ('Gloucestershire CCC','Cricket','Professional','England','Bristol','County Championship (First-Class)'),
    ('Glamorgan CCC','Cricket','Professional','Wales','Cardiff','County Championship (First-Class)'),
    ('Hampshire CCC','Cricket','Professional','England','Southampton','County Championship (First-Class)'),
    ('Kent CCC','Cricket','Professional','England','Canterbury','County Championship (First-Class)'),
    ('Lancashire CCC','Cricket','Professional','England','Manchester','County Championship (First-Class)'),
    ('Leicestershire CCC','Cricket','Professional','England','Leicester','County Championship (First-Class)'),
    ('Middlesex CCC','Cricket','Professional','England','London (Lord’s)','County Championship (First-Class)'),
    ('Northamptonshire CCC','Cricket','Professional','England','Northampton','County Championship (First-Class)'),
    ('Nottinghamshire CCC','Cricket','Professional','England','Nottingham','County Championship (First-Class)'),
    ('Somerset CCC','Cricket','Professional','England','Taunton','County Championship (First-Class)'),
    ('Surrey CCC','Cricket','Professional','England','London (The Oval)','County Championship (First-Class)'),
    ('Sussex CCC','Cricket','Professional','England','Hove (Brighton)','County Championship (First-Class)'),
    ('Warwickshire CCC','Cricket','Professional','England','Birmingham','County Championship (First-Class)'),
    ('Worcestershire CCC','Cricket','Professional','England','Worcester','County Championship (First-Class)'),
    ('Yorkshire CCC','Cricket','Professional','England','Leeds','County Championship (First-Class)'),
    ('Bedfordshire CCC','Cricket','Semi-Professional','England','Bedford','National Counties (Minor)'),
    ('Berkshire CCC','Cricket','Semi-Professional','England','Reading','National Counties (Minor)'),
    ('Buckinghamshire CCC','Cricket','Semi-Professional','England','High Wycombe','National Counties (Minor)'),
    ('Cambridgeshire CCC','Cricket','Semi-Professional','England','Cambridge','National Counties (Minor)'),
    ('Cheshire CCC','Cricket','Semi-Professional','England','Chester','National Counties (Minor)'),
    ('Cornwall CCC','Cricket','Semi-Professional','England','Truro','National Counties (Minor)'),
    ('Cumbria CCC','Cricket','Semi-Professional','England','Carlisle','National Counties (Minor)'),
    ('Devon CCC','Cricket','Semi-Professional','England','Exeter','National Counties (Minor)'),
    ('Dorset CCC','Cricket','Semi-Professional','England','Dorchester','National Counties (Minor)'),
    ('Herefordshire CCC','Cricket','Semi-Professional','England','Hereford','National Counties (Minor)'),
    ('Hertfordshire CCC','Cricket','Semi-Professional','England','Hertford','National Counties (Minor)'),
    ('Lincolnshire CCC','Cricket','Semi-Professional','England','Lincoln','National Counties (Minor)'),
    ('Norfolk CCC','Cricket','Semi-Professional','England','Norwich','National Counties (Minor)'),
    ('Northumberland CCC','Cricket','Semi-Professional','England','Newcastle upon Tyne','National Counties (Minor)'),
    ('Oxfordshire CCC','Cricket','Semi-Professional','England','Oxford','National Counties (Minor)'),
    ('Shropshire CCC','Cricket','Semi-Professional','England','Shrewsbury','National Counties (Minor)'),
    ('Staffordshire CCC','Cricket','Semi-Professional','England','Stoke-on-Trent','National Counties (Minor)'),
    ('Suffolk CCC','Cricket','Semi-Professional','England','Ipswich','National Counties (Minor)'),
    ('Wiltshire CCC','Cricket','Semi-Professional','England','Trowbridge','National Counties (Minor)')
) AS s(club, sport, level, country, city, league)

-- 1) Ensure sports exist
, ins_sports AS (
  INSERT INTO public.sports (name)
  SELECT DISTINCT s.sport
  FROM seed s
  WHERE NOT EXISTS (
    SELECT 1 FROM public.sports sp WHERE sp.name = s.sport
  )
  RETURNING name
)

-- 2) Ensure countries exist
, ins_countries AS (
  INSERT INTO public.countries (name)
  SELECT DISTINCT s.country
  FROM seed s
  WHERE NOT EXISTS (
    SELECT 1 FROM public.countries c WHERE c.name = s.country
  )
  RETURNING name
)

-- 3) Ensure cities exist (linked to countries)
, ins_cities AS (
  INSERT INTO public.cities (name, country_id)
  SELECT DISTINCT s.city, c.id
  FROM seed s
  JOIN public.countries c ON c.name = s.country
  WHERE NOT EXISTS (
    SELECT 1 FROM public.cities ci 
    WHERE ci.name = s.city AND (ci.country_id = c.id OR ci.country_id IS NULL)
  )
  RETURNING name, country_id
)

-- 4) Insert teams if not present by name
INSERT INTO public.teams (name, sport_id, country_id, city_id, level, league)
SELECT 
  s.club,
  sp.id as sport_id,
  c.id as country_id,
  ci.id as city_id,
  s.level,
  s.league
FROM seed s
JOIN public.sports sp ON sp.name = s.sport
JOIN public.countries c ON c.name = s.country
LEFT JOIN public.cities ci ON ci.name = s.city AND (ci.country_id = c.id OR ci.country_id IS NULL)
WHERE NOT EXISTS (
  SELECT 1 FROM public.teams t WHERE t.name = s.club
);

COMMIT;