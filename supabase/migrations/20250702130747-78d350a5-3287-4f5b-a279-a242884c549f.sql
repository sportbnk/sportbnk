
-- Enable RLS on revealed_details table and create user-specific policies
ALTER TABLE public.revealed_details ENABLE ROW LEVEL SECURITY;

-- Users can only view their own revealed details
CREATE POLICY "Users can view their own revealed details" 
  ON public.revealed_details 
  FOR SELECT 
  USING (user_id = auth.uid());

-- Users can only insert their own revealed details
CREATE POLICY "Users can create their own revealed details" 
  ON public.revealed_details 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

-- Users can only update their own revealed details
CREATE POLICY "Users can update their own revealed details" 
  ON public.revealed_details 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Users can only delete their own revealed details
CREATE POLICY "Users can delete their own revealed details" 
  ON public.revealed_details 
  FOR DELETE 
  USING (user_id = auth.uid());

-- Enable RLS on contacts table - authenticated users only
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access contacts" 
  ON public.contacts 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Enable RLS on teams table - authenticated users only
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access teams" 
  ON public.teams 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Enable RLS on sports table - authenticated users only
ALTER TABLE public.sports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access sports" 
  ON public.sports 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Enable RLS on countries table - authenticated users only
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access countries" 
  ON public.countries 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Enable RLS on cities table - authenticated users only
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access cities" 
  ON public.cities 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Enable RLS on departments table - authenticated users only
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access departments" 
  ON public.departments 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Enable RLS on opening_hours table - authenticated users only
ALTER TABLE public.opening_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access opening_hours" 
  ON public.opening_hours 
  FOR ALL 
  TO authenticated 
  USING (true);

-- Enable RLS on team_social_links table - authenticated users only
ALTER TABLE public.team_social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can access team_social_links" 
  ON public.team_social_links 
  FOR ALL 
  TO authenticated 
  USING (true);
