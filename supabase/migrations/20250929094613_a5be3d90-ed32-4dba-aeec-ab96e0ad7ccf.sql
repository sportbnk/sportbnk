-- Revert contacts RLS policies to allow shared access for all authenticated users
-- Contacts are meant to be a shared resource

-- Drop the restrictive user-specific policies
DROP POLICY IF EXISTS "Users can view their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can create their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can update their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can delete their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Temporary access to legacy contacts" ON public.contacts;

-- Create policies that allow all authenticated users to access all contacts
CREATE POLICY "Authenticated users can view all contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Authenticated users can create contacts"
ON public.contacts
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Authenticated users can update contacts"
ON public.contacts
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

CREATE POLICY "Authenticated users can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);