-- 1) Ensure required departments exist
INSERT INTO departments (name)
SELECT x.name
FROM (VALUES ('Finance'), ('Operations'), ('Commercial'), ('Football'), ('Cricket'), ('Sporting')) AS x(name)
WHERE NOT EXISTS (
  SELECT 1 FROM departments d WHERE d.name = x.name
);

-- Utility: generate a slug email domain from team name
-- We will inline the slugify using regexp_replace(lower(t.name), '[^a-z0-9]+', '', 'g')

-- 2) Insert CFO where missing
INSERT INTO contacts (team_id, department_id, first_name, last_name, email, position)
SELECT
  t.id AS team_id,
  (SELECT id FROM departments WHERE name = 'Finance') AS department_id,
  initcap((ARRAY['Alex','Jordan','Taylor','Casey','Riley','Morgan','Avery','Reese','Quinn','Hayden','Jamie','Cameron','Drew','Elliot','Kendall'])[1 + floor(random()*15)::int]) AS first_name,
  initcap((ARRAY['Smith','Johnson','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson'])[1 + floor(random()*15)::int]) AS last_name,
  'cfo@' || regexp_replace(lower(t.name), '[^a-z0-9]+', '', 'g') || '.com' AS email,
  'CFO' AS position
FROM teams t
WHERE NOT EXISTS (
  SELECT 1 FROM contacts c WHERE c.team_id = t.id AND upper(coalesce(c.position,'')) LIKE 'CFO%'
);

-- 3) Insert COO where missing
INSERT INTO contacts (team_id, department_id, first_name, last_name, email, position)
SELECT
  t.id AS team_id,
  (SELECT id FROM departments WHERE name = 'Operations') AS department_id,
  initcap((ARRAY['Alex','Jordan','Taylor','Casey','Riley','Morgan','Avery','Reese','Quinn','Hayden','Jamie','Cameron','Drew','Elliot','Kendall'])[1 + floor(random()*15)::int]) AS first_name,
  initcap((ARRAY['Smith','Johnson','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson'])[1 + floor(random()*15)::int]) AS last_name,
  'coo@' || regexp_replace(lower(t.name), '[^a-z0-9]+', '', 'g') || '.com' AS email,
  'COO' AS position
FROM teams t
WHERE NOT EXISTS (
  SELECT 1 FROM contacts c WHERE c.team_id = t.id AND upper(coalesce(c.position,'')) LIKE 'COO%'
);

-- 4) Insert Head of Commercial where missing
INSERT INTO contacts (team_id, department_id, first_name, last_name, email, position)
SELECT
  t.id AS team_id,
  (SELECT id FROM departments WHERE name = 'Commercial') AS department_id,
  initcap((ARRAY['Alex','Jordan','Taylor','Casey','Riley','Morgan','Avery','Reese','Quinn','Hayden','Jamie','Cameron','Drew','Elliot','Kendall'])[1 + floor(random()*15)::int]) AS first_name,
  initcap((ARRAY['Smith','Johnson','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson'])[1 + floor(random()*15)::int]) AS last_name,
  'headofcommercial@' || regexp_replace(lower(t.name), '[^a-z0-9]+', '', 'g') || '.com' AS email,
  'Head of Commercial' AS position
FROM teams t
WHERE NOT EXISTS (
  SELECT 1 FROM contacts c WHERE c.team_id = t.id AND upper(coalesce(c.position,'')) LIKE 'HEAD OF COMMERCIAL%'
);

-- 5) Insert Director of Football/Cricket (or Sporting Director) where missing
INSERT INTO contacts (team_id, department_id, first_name, last_name, email, position)
SELECT
  t.id AS team_id,
  CASE 
    WHEN s.name ILIKE '%cricket%' THEN (SELECT id FROM departments WHERE name = 'Cricket')
    WHEN s.name ILIKE '%football%' OR s.name ILIKE '%soccer%' THEN (SELECT id FROM departments WHERE name = 'Football')
    ELSE (SELECT id FROM departments WHERE name = 'Sporting')
  END AS department_id,
  initcap((ARRAY['Alex','Jordan','Taylor','Casey','Riley','Morgan','Avery','Reese','Quinn','Hayden','Jamie','Cameron','Drew','Elliot','Kendall'])[1 + floor(random()*15)::int]) AS first_name,
  initcap((ARRAY['Smith','Johnson','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson'])[1 + floor(random()*15)::int]) AS last_name,
  CASE 
    WHEN s.name ILIKE '%cricket%' THEN 'directorofcricket@' || regexp_replace(lower(t.name), '[^a-z0-9]+', '', 'g') || '.com'
    WHEN s.name ILIKE '%football%' OR s.name ILIKE '%soccer%' THEN 'directoroffootball@' || regexp_replace(lower(t.name), '[^a-z0-9]+', '', 'g') || '.com'
    ELSE 'sportingdirector@' || regexp_replace(lower(t.name), '[^a-z0-9]+', '', 'g') || '.com'
  END AS email,
  CASE 
    WHEN s.name ILIKE '%cricket%' THEN 'Director of Cricket'
    WHEN s.name ILIKE '%football%' OR s.name ILIKE '%soccer%' THEN 'Director of Football'
    ELSE 'Sporting Director'
  END AS position
FROM teams t
LEFT JOIN sports s ON s.id = t.sport_id
WHERE NOT EXISTS (
  SELECT 1 FROM contacts c 
  WHERE c.team_id = t.id AND (
    upper(coalesce(c.position,'')) LIKE 'DIRECTOR OF FOOTBALL%'
    OR upper(coalesce(c.position,'')) LIKE 'DIRECTOR OF CRICKET%'
    OR upper(coalesce(c.position,'')) LIKE 'SPORTING DIRECTOR%'
  )
);
