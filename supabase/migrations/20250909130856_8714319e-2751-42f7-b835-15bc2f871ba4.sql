-- Seed English and Welsh clubs into teams (organisations)
-- Idempotent: only inserts missing sports, countries, cities, and teams by name

-- 1) Ensure sport exists
INSERT INTO public.sports (name)
SELECT 'Football'
WHERE NOT EXISTS (SELECT 1 FROM public.sports s WHERE s.name = 'Football');

-- 2) Temp staging table for incoming data
CREATE TEMP TABLE tmp_orgs (
  name text NOT NULL,
  sport text NOT NULL,
  level text,
  country text NOT NULL,
  city text NOT NULL,
  league text
) ON COMMIT DROP;

-- 3) Load rows
INSERT INTO tmp_orgs (name, sport, level, country, city, league) VALUES
  -- Premier League
  ('Bournemouth','Football','Professional','England','Bournemouth','Premier League'),
  ('Brentford','Football','Professional','England','London','Premier League'),
  ('Crystal Palace','Football','Professional','England','London','Premier League'),
  ('Everton','Football','Professional','England','Liverpool','Premier League'),
  ('Fulham','Football','Professional','England','London','Premier League'),
  ('Ipswich Town','Football','Professional','England','Ipswich','Premier League'),
  ('Leicester City','Football','Professional','England','Leicester','Premier League'),
  ('Nottingham Forest','Football','Professional','England','Nottingham','Premier League'),
  ('Southampton','Football','Professional','England','Southampton','Premier League'),
  ('Wolverhampton Wanderers','Football','Professional','England','Wolverhampton','Premier League'),
  -- EFL Championship
  ('Birmingham City','Football','Professional','England','Birmingham','EFL Championship'),
  ('Blackburn Rovers','Football','Professional','England','Blackburn','EFL Championship'),
  ('Bristol City','Football','Professional','England','Bristol','EFL Championship'),
  ('Cardiff City','Football','Professional','Wales','Cardiff','EFL Championship'),
  ('Coventry City','Football','Professional','England','Coventry','EFL Championship'),
  ('Hull City','Football','Professional','England','Hull','EFL Championship'),
  ('Leeds United','Football','Professional','England','Leeds','EFL Championship'),
  ('Middlesbrough','Football','Professional','England','Middlesbrough','EFL Championship'),
  ('Millwall','Football','Professional','England','London','EFL Championship'),
  ('Norwich City','Football','Professional','England','Norwich','EFL Championship'),
  ('Plymouth Argyle','Football','Professional','England','Plymouth','EFL Championship'),
  ('Portsmouth','Football','Professional','England','Portsmouth','EFL Championship'),
  ('Preston North End','Football','Professional','England','Preston','EFL Championship'),
  ('Queens Park Rangers','Football','Professional','England','London','EFL Championship'),
  ('Sheffield Wednesday','Football','Professional','England','Sheffield','EFL Championship'),
  ('Stoke City','Football','Professional','England','Stoke-on-Trent','EFL Championship'),
  ('Sunderland','Football','Professional','England','Sunderland','EFL Championship'),
  ('Swansea City','Football','Professional','Wales','Swansea','EFL Championship'),
  ('Watford','Football','Professional','England','Watford','EFL Championship'),
  ('West Bromwich Albion','Football','Professional','England','West Bromwich','EFL Championship'),
  ('Derby County','Football','Professional','England','Derby','EFL Championship'),
  ('Luton Town','Football','Professional','England','Luton','EFL Championship'),
  ('Oxford United','Football','Professional','England','Oxford','EFL Championship'),
  ('Sheffield United','Football','Professional','England','Sheffield','EFL Championship'),
  -- EFL League One
  ('Barnsley','Football','Professional','England','Barnsley','EFL League One'),
  ('Blackpool','Football','Professional','England','Blackpool','EFL League One'),
  ('Bolton Wanderers','Football','Professional','England','Bolton','EFL League One'),
  ('Bristol Rovers','Football','Professional','England','Bristol','EFL League One'),
  ('Burton Albion','Football','Professional','England','Burton upon Trent','EFL League One'),
  ('Cambridge United','Football','Professional','England','Cambridge','EFL League One'),
  ('Charlton Athletic','Football','Professional','England','London','EFL League One'),
  ('Chesterfield','Football','Professional','England','Chesterfield','EFL League One'),
  ('Exeter City','Football','Professional','England','Exeter','EFL League One'),
  ('Huddersfield Town','Football','Professional','England','Huddersfield','EFL League One'),
  ('Leyton Orient','Football','Professional','England','London','EFL League One'),
  ('Lincoln City','Football','Professional','England','Lincoln','EFL League One'),
  ('Milton Keynes Dons','Football','Professional','England','Milton Keynes','EFL League One'),
  ('Northampton Town','Football','Professional','England','Northampton','EFL League One'),
  ('Peterborough United','Football','Professional','England','Peterborough','EFL League One'),
  ('Port Vale','Football','Professional','England','Stoke-on-Trent','EFL League One'),
  ('Reading','Football','Professional','England','Reading','EFL League One'),
  ('Shrewsbury Town','Football','Professional','England','Shrewsbury','EFL League One'),
  ('Stevenage','Football','Professional','England','Stevenage','EFL League One'),
  ('Stockport County','Football','Professional','England','Stockport','EFL League One'),
  ('Walsall','Football','Professional','England','Walsall','EFL League One'),
  ('Wycombe Wanderers','Football','Professional','England','High Wycombe','EFL League One'),
  -- EFL League Two
  ('Accrington Stanley','Football','Professional','England','Accrington','EFL League Two'),
  ('AFC Wimbledon','Football','Professional','England','London','EFL League Two'),
  ('Barrow','Football','Professional','England','Barrow-in-Furness','EFL League Two'),
  ('Bradford City','Football','Professional','England','Bradford','EFL League Two'),
  ('Bromley','Football','Professional','England','London','EFL League Two'),
  ('Carlisle United','Football','Professional','England','Carlisle','EFL League Two'),
  ('Colchester United','Football','Professional','England','Colchester','EFL League Two'),
  ('Crawley Town','Football','Professional','England','Crawley','EFL League Two'),
  ('Crewe Alexandra','Football','Professional','England','Crewe','EFL League Two'),
  ('Doncaster Rovers','Football','Professional','England','Doncaster','EFL League Two'),
  ('Forest Green Rovers','Football','Professional','England','Nailsworth','EFL League Two'),
  ('Gillingham','Football','Professional','England','Gillingham','EFL League Two'),
  ('Grimsby Town','Football','Professional','England','Grimsby','EFL League Two'),
  ('Harrogate Town','Football','Professional','England','Harrogate','EFL League Two'),
  ('Mansfield Town','Football','Professional','England','Mansfield','EFL League Two'),
  ('Morecambe','Football','Professional','England','Morecambe','EFL League Two'),
  ('Newport County','Football','Professional','Wales','Newport','EFL League Two'),
  ('Notts County','Football','Professional','England','Nottingham','EFL League Two'),
  ('Salford City','Football','Professional','England','Salford','EFL League Two'),
  ('Sutton United','Football','Professional','England','London','EFL League Two'),
  ('Swindon Town','Football','Professional','England','Swindon','EFL League Two'),
  ('Tranmere Rovers','Football','Professional','England','Birkenhead','EFL League Two'),
  ('Wrexham','Football','Professional','Wales','Wrexham','EFL League Two'),
  ('Yeovil Town','Football','Professional','England','Yeovil','EFL League Two');

-- 4) Ensure countries exist
INSERT INTO public.countries (name, code)
SELECT DISTINCT t.country, NULL
FROM tmp_orgs t
LEFT JOIN public.countries c ON c.name = t.country
WHERE c.id IS NULL;

-- 5) Ensure cities exist (by name + country)
INSERT INTO public.cities (name, country_id)
SELECT DISTINCT t.city, c.id
FROM tmp_orgs t
JOIN public.countries c ON c.name = t.country
LEFT JOIN public.cities ci ON ci.name = t.city AND ci.country_id = c.id
WHERE ci.id IS NULL;

-- 6) Insert teams joined to sport, country, and city (avoid duplicates by team name)
WITH football AS (
  SELECT id AS sport_id FROM public.sports WHERE name = 'Football' LIMIT 1
)
INSERT INTO public.teams (name, sport_id, level, country_id, city_id, league)
SELECT DISTINCT t.name, f.sport_id, t.level, c.id, ci.id, t.league
FROM tmp_orgs t
CROSS JOIN football f
JOIN public.countries c ON c.name = t.country
JOIN public.cities ci ON ci.name = t.city AND ci.country_id = c.id
LEFT JOIN public.teams te ON te.name = t.name
WHERE te.id IS NULL;