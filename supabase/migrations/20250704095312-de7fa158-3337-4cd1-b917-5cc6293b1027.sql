
-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  lead_status TEXT NOT NULL DEFAULT 'New' CHECK (lead_status IN ('New', 'Contacted', 'In Progress', 'Converted', 'Lost', 'Follow Up')),
  next_action TEXT,
  assigned_to TEXT,
  lead_source TEXT,
  tags TEXT[],
  notes TEXT,
  date_added TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_contacted TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users NOT NULL
);

-- Create activities table for lead activity tracking
CREATE TABLE public.lead_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('call', 'email', 'meeting', 'note', 'status_change')),
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users NOT NULL
);

-- Add Row Level Security (RLS) for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies for leads
CREATE POLICY "Users can view their own leads" 
  ON public.leads 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" 
  ON public.leads 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads" 
  ON public.leads 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add Row Level Security (RLS) for lead activities
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for lead activities
CREATE POLICY "Users can view activities for their leads" 
  ON public.lead_activities 
  FOR SELECT 
  USING (lead_id IN (SELECT id FROM public.leads WHERE user_id = auth.uid()));

CREATE POLICY "Users can create activities for their leads" 
  ON public.lead_activities 
  FOR INSERT 
  WITH CHECK (lead_id IN (SELECT id FROM public.leads WHERE user_id = auth.uid()) AND auth.uid() = user_id);

CREATE POLICY "Users can update activities for their leads" 
  ON public.lead_activities 
  FOR UPDATE 
  USING (lead_id IN (SELECT id FROM public.leads WHERE user_id = auth.uid()) AND auth.uid() = user_id);

CREATE POLICY "Users can delete activities for their leads" 
  ON public.lead_activities 
  FOR DELETE 
  USING (lead_id IN (SELECT id FROM public.leads WHERE user_id = auth.uid()) AND auth.uid() = user_id);

-- Create trigger to update updated_at column for leads
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.update_leads_updated_at();
