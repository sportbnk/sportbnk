-- Ensure sports exist
INSERT INTO public.sports (name)
SELECT s
FROM (VALUES ('Cricket'), ('Football'), ('Rugby')) AS v(s)
WHERE NOT EXISTS (
  SELECT 1 FROM public.sports sp WHERE sp.name = v.s
);

-- Ensure countries exist
INSERT INTO public.countries (name)
SELECT c
FROM (
  VALUES ('England'), ('Wales'), ('Ireland'), ('Scotland'), ('Northern Ireland'), ('Multi-nation')
) AS v(c)
WHERE NOT EXISTS (
  SELECT 1 FROM public.countries co WHERE co.name = v.c
);

-- Ensure cities exist with proper country mapping
INSERT INTO public.cities (name, country_id)
SELECT city, c.id
FROM (
  VALUES 
    ('London', 'England'),
    ('Dublin', 'Ireland'),
    ('Edinburgh', 'Scotland'),
    ('Derry', 'Ireland'),
    ('Belfast', 'Ireland'),
    ('Cork', 'Ireland'),
    ('Galway', 'Ireland'),
    ('Cardiff', 'Wales'),
    ('Glasgow', 'Scotland')
) AS v(city, country)
JOIN public.countries c ON c.name = v.country
WHERE NOT EXISTS (
  SELECT 1 FROM public.cities ci WHERE ci.name = v.city AND ci.country_id = c.id
);

-- Insert teams if not already present
INSERT INTO public.teams (name, sport_id, country_id, city_id, level, league)
SELECT 
  t.club,
  sp.id as sport_id,
  co.id as country_id,
  ci.id as city_id,
  t.level,
  t.league
FROM (
  VALUES
    ('England Cricket','Cricket','International','England','London','ICC Tests, ODIs, T20Is'),
    ('Ireland Cricket','Cricket','International','Ireland','Dublin','ICC Tests, ODIs, T20Is'),
    ('Scotland Cricket','Cricket','International','Scotland','Edinburgh','ICC ODIs, T20Is'),
    ('North West Warriors','Cricket','Professional','Ireland','Derry','Inter-Provincial Championship'),
    ('Northern Knights (NCU)','Cricket','Professional','Ireland','Belfast','Inter-Provincial Championship'),
    ('Munster Reds','Cricket','Professional','Ireland','Cork','Inter-Provincial Championship'),
    ('Connacht Cricket','Cricket','Development','Ireland','Galway','Development / Emerging'),
    ('Leinster Lightning','Cricket','Professional','Ireland','Dublin','Inter-Provincial Championship'),
    ('England Football','Football','International','England','London','FIFA World Cup, UEFA Euros'),
    ('Wales Football','Football','International','Wales','Cardiff','FIFA World Cup, UEFA Euros'),
    ('Northern Ireland Football','Football','International','Northern Ireland','Belfast','FIFA World Cup, UEFA Euros'),
    ('Republic of Ireland Football','Football','International','Ireland','Dublin','FIFA World Cup, UEFA Euros'),
    ('Scotland Football','Football','International','Scotland','Glasgow','FIFA World Cup, UEFA Euros'),
    ('England Rugby','Rugby','International','England','London','Six Nations, Rugby World Cup'),
    ('Ireland Rugby','Rugby','International','Ireland','Dublin','Six Nations, Rugby World Cup'),
    ('Scotland Rugby','Rugby','International','Scotland','Edinburgh','Six Nations, Rugby World Cup'),
    ('Wales Rugby','Rugby','International','Wales','Cardiff','Six Nations, Rugby World Cup'),
    ('British & Irish Lions','Rugby','Representative','Multi-nation','London','Lions Tours')
) AS t(club, sport, level, country, city, league)
JOIN public.sports sp ON sp.name = t.sport
JOIN public.countries co ON co.name = t.country
LEFT JOIN public.cities ci ON ci.name = t.city AND ci.country_id = co.id
WHERE NOT EXISTS (
  SELECT 1 FROM public.teams x WHERE x.name = t.club
);