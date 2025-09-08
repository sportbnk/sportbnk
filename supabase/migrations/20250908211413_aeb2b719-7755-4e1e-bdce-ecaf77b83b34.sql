-- Enable RLS (safe if already enabled)
ALTER TABLE IF EXISTS public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read teams
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'teams' AND policyname = 'Authenticated users can view teams'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Authenticated users can view teams"
      ON public.teams
      FOR SELECT
      TO authenticated
      USING (true)
    $$;
  END IF;
END$$;

-- Allow authenticated users to read contacts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'contacts' AND policyname = 'Authenticated users can view contacts'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Authenticated users can view contacts"
      ON public.contacts
      FOR SELECT
      TO authenticated
      USING (true)
    $$;
  END IF;
END$$;

-- Seed demo data only if tables are empty
DO $$
BEGIN
  -- Seed teams if none exist
  IF NOT EXISTS (SELECT 1 FROM public.teams) THEN
    INSERT INTO public.teams (name, level, revenue, employees, sport_id)
    VALUES
      ('Manchester United', 'Professional', 700000000, 900, (SELECT id FROM public.sports WHERE name = 'Football' LIMIT 1)),
      ('LA Lakers', 'Professional', 500000000, 400, (SELECT id FROM public.sports WHERE name = 'Basketball' LIMIT 1)),
      ('Harlequins RFC', 'Professional', 120000000, 150, (SELECT id FROM public.sports WHERE name = 'Rugby' LIMIT 1)),
      ('FC Barcelona', 'Professional', 800000000, 1000, (SELECT id FROM public.sports WHERE name = 'Football' LIMIT 1)),
      ('NY Yankees', 'Professional', 600000000, 350, NULL);
  END IF;

  -- Seed contacts if none exist
  IF NOT EXISTS (SELECT 1 FROM public.contacts) THEN
    INSERT INTO public.contacts (name, role, email, phone, linkedin, team_id)
    VALUES
      ('Erik ten Hag', 'Head Coach', 'erik.tenhag@example.com', '+44 20 1234 5678', 'https://linkedin.com/in/etenhag', (SELECT id FROM public.teams WHERE name = 'Manchester United' LIMIT 1)),
      ('LeBron James', 'Forward', 'lebron.james@example.com', '+1 213 555 0199', 'https://linkedin.com/in/lebronjames', (SELECT id FROM public.teams WHERE name = 'LA Lakers' LIMIT 1)),
      ('Danny Care', 'Scrum-half', 'danny.care@example.com', '+44 20 5555 0101', 'https://linkedin.com/in/dannycare', (SELECT id FROM public.teams WHERE name = 'Harlequins RFC' LIMIT 1)),
      ('Xavi Hernández', 'Manager', 'xavi@example.com', '+34 93 555 0123', 'https://linkedin.com/in/xavihernandez', (SELECT id FROM public.teams WHERE name = 'FC Barcelona' LIMIT 1)),
      ('Aaron Judge', 'Outfielder', 'aaron.judge@example.com', '+1 212 555 0142', 'https://linkedin.com/in/aaronjudge', (SELECT id FROM public.teams WHERE name = 'NY Yankees' LIMIT 1));
  END IF;
END$$;
