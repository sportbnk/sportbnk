-- Add sport_id column to contacts table
ALTER TABLE public.contacts 
ADD COLUMN sport_id uuid REFERENCES public.sports(id);