-- 1) Create app_role enum and user_roles table for admin authorization
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only service role can manage roles; users can read their own roles (optional)
DROP POLICY IF EXISTS "Service role manages roles" ON public.user_roles;
CREATE POLICY "Service role manages roles"
ON public.user_roles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 2) Security definer function to check roles safely
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id
      and role = _role
  );
$$;

-- 3) Tighten RLS on waitlist_signups to admins (keep public INSERT)
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Keep public insert (already exists, ensure present)
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist_signups;
CREATE POLICY "Anyone can join waitlist"
ON public.waitlist_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins can view/manage waitlist
DROP POLICY IF EXISTS "Admins can view waitlist" ON public.waitlist_signups;
CREATE POLICY "Admins can view waitlist"
ON public.waitlist_signups
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update waitlist" ON public.waitlist_signups;
CREATE POLICY "Admins can update waitlist"
ON public.waitlist_signups
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete waitlist" ON public.waitlist_signups;
CREATE POLICY "Admins can delete waitlist"
ON public.waitlist_signups
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Service role retains backend access for automations
DROP POLICY IF EXISTS "Service role manages waitlist" ON public.waitlist_signups;
CREATE POLICY "Service role manages waitlist"
ON public.waitlist_signups
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);