-- Remove the public read access to contacts table and implement proper user-based access control

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Contacts are publicly readable" ON public.contacts;

-- Create new policy that requires authentication and proper user access
-- Allow authenticated users to read contacts only if they have a valid profile
CREATE POLICY "Authenticated users can view contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid()
  )
);

-- Allow authenticated users to create contacts if they have a valid profile  
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

-- Allow authenticated users to update contacts if they have a valid profile
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

-- Allow authenticated users to delete contacts if they have a valid profile
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