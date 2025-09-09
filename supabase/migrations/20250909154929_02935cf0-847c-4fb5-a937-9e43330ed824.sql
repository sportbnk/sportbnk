-- Seed dummy CEO contacts for every team
-- 1) Ensure an "Executive" department exists and capture its id
WITH inserted_dept AS (
  INSERT INTO departments (name)
  SELECT 'Executive'
  WHERE NOT EXISTS (
    SELECT 1 FROM departments WHERE name = 'Executive'
  )
  RETURNING id
),
dept AS (
  SELECT id FROM inserted_dept
  UNION ALL
  SELECT id FROM departments WHERE name = 'Executive'
),
-- 2) Prepare CEO contacts for teams that don't yet have a CEO
prepared AS (
  SELECT
    t.id AS team_id,
    (SELECT id FROM dept) AS department_id,
    -- Generate made-up first and last names
    initcap((ARRAY['Alex','Jordan','Taylor','Casey','Riley','Morgan','Avery','Reese','Quinn','Hayden','Jamie','Cameron','Drew','Elliot','Kendall'])[1 + floor(random()*15)::int]) AS first_name,
    initcap((ARRAY['Smith','Johnson','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson'])[1 + floor(random()*15)::int]) AS last_name,
    -- Email format: ceo@{teamname}.com (team name slugified)
    'ceo@' || regexp_replace(lower(t.name), '[^a-z0-9]+', '', 'g') || '.com' AS email,
    'CEO' AS position
  FROM teams t
  WHERE NOT EXISTS (
    SELECT 1 FROM contacts c
    WHERE c.team_id = t.id
      AND upper(coalesce(c.position,'')) LIKE 'CEO%'
  )
)
INSERT INTO contacts (team_id, department_id, first_name, last_name, email, position)
SELECT team_id, department_id, first_name, last_name, email, position
FROM prepared;