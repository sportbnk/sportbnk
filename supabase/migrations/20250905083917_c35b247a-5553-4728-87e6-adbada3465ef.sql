-- Create table for newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source_page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure unique emails (prevents duplicates)
CREATE UNIQUE INDEX IF NOT EXISTS uniq_newsletter_subscriptions_email 
  ON public.newsletter_subscriptions (email);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous users) to insert
CREATE POLICY IF NOT EXISTS "Anyone can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
TO public
WITH CHECK (true);

-- Admin-only read access
CREATE POLICY IF NOT EXISTS "Admins can view newsletter subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin-only update access
CREATE POLICY IF NOT EXISTS "Admins can update newsletter subscriptions"
ON public.newsletter_subscriptions
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin-only delete access
CREATE POLICY IF NOT EXISTS "Admins can delete newsletter subscriptions"
ON public.newsletter_subscriptions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));