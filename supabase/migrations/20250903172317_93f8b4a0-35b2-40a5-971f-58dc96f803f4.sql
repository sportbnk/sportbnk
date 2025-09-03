-- Create waitlist_signups table to collect leads without requiring auth

-- 1) Create enum for status
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'waitlist_status') THEN
    CREATE TYPE public.waitlist_status AS ENUM ('new','contacted','qualified','unsubscribed');
  END IF;
END$$;

-- 2) Create table
CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status public.waitlist_status NOT NULL DEFAULT 'new',
  consent BOOLEAN NOT NULL DEFAULT true
);

-- 3) Helpful indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at ON public.waitlist_signups (created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_signups_email_unique ON public.waitlist_signups (lower(email));

-- 4) Enable RLS and add policies
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated clients to insert (join waitlist) only
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist_signups;
CREATE POLICY "Anyone can join waitlist"
ON public.waitlist_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Service role (backend) can manage everything
DROP POLICY IF EXISTS "Service role manages waitlist" ON public.waitlist_signups;
CREATE POLICY "Service role manages waitlist"
ON public.waitlist_signups
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
