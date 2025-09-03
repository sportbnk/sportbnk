-- Secure sensitive tables by removing permissive RLS and allowing only service role access

-- Ensure RLS is enabled
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Drop overly-permissive policies
DROP POLICY IF EXISTS "Authenticated users can access contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can access teams" ON public.teams;

-- Deny-by-default (no other policies). Allow only service_role full access for backend functions
CREATE POLICY "Service role full access to contacts"
ON public.contacts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role full access to teams"
ON public.teams
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Harden functions with explicit search_path to avoid mutable search_path issues
CREATE OR REPLACE FUNCTION public.update_deals_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;