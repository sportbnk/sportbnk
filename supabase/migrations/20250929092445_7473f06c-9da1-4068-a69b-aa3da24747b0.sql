-- Remove public read access to teams table and implement proper authentication-based access control

-- Drop the existing public read policy for teams
DROP POLICY IF EXISTS "Teams are publicly readable" ON public.teams;

-- Create new policy that requires authentication and proper user access
-- Allow authenticated users to read teams only if they have a valid profile
CREATE POLICY "Authenticated users can view teams" 
ON public.teams 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);

-- Allow authenticated users to create teams if they have a valid profile  
CREATE POLICY "Authenticated users can create teams"
ON public.teams
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);

-- Allow authenticated users to update teams if they have a valid profile
CREATE POLICY "Authenticated users can update teams"
ON public.teams
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);

-- Allow authenticated users to delete teams if they have a valid profile
CREATE POLICY "Authenticated users can delete teams"
ON public.teams
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);