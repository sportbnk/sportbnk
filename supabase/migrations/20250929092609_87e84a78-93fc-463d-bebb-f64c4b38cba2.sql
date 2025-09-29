-- Add user ownership to contacts table and implement user-specific access control

-- First, add user_id column to track contact ownership
ALTER TABLE public.contacts 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Update existing contacts to have a default user_id (you may want to adjust this)
-- For now, we'll leave them null and handle in application logic
-- UPDATE public.contacts SET user_id = (SELECT id FROM auth.users LIMIT 1) WHERE user_id IS NULL;

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can create contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can delete contacts" ON public.contacts;

-- Create user-specific policies that only allow access to contacts owned by the user
CREATE POLICY "Users can view their own contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (
  user_id = auth.uid()
);

-- Allow users to create contacts (will be automatically owned by them)
CREATE POLICY "Users can create their own contacts"
ON public.contacts
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
);

-- Allow users to update only their own contacts
CREATE POLICY "Users can update their own contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Allow users to delete only their own contacts
CREATE POLICY "Users can delete their own contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- For backward compatibility during transition period, allow viewing contacts without user_id
-- This should be removed after data migration is complete
CREATE POLICY "Temporary access to legacy contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (
  user_id IS NULL AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);