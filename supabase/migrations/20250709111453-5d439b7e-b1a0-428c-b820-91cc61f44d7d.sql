-- Create deals table for CRM
CREATE TABLE public.deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  deal_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  primary_contact TEXT,
  deal_value BIGINT DEFAULT 0,
  expected_close_date DATE,
  assigned_to TEXT,
  stage TEXT NOT NULL DEFAULT 'Prospecting',
  status TEXT NOT NULL DEFAULT 'Active',
  notes TEXT,
  internal_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own deals" 
ON public.deals 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own deals" 
ON public.deals 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own deals" 
ON public.deals 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own deals" 
ON public.deals 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_deals_updated_at
    BEFORE UPDATE ON public.deals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_deals_updated_at();

-- Create deal activities table for tracking deal timeline
CREATE TABLE public.deal_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id UUID NOT NULL,
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for deal activities
ALTER TABLE public.deal_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for deal activities
CREATE POLICY "Users can view activities for their deals" 
ON public.deal_activities 
FOR SELECT 
USING (deal_id IN (SELECT id FROM public.deals WHERE user_id = auth.uid()));

CREATE POLICY "Users can create activities for their deals" 
ON public.deal_activities 
FOR INSERT 
WITH CHECK (deal_id IN (SELECT id FROM public.deals WHERE user_id = auth.uid()) AND auth.uid() = user_id);

CREATE POLICY "Users can update activities for their deals" 
ON public.deal_activities 
FOR UPDATE 
USING (deal_id IN (SELECT id FROM public.deals WHERE user_id = auth.uid()) AND auth.uid() = user_id);

CREATE POLICY "Users can delete activities for their deals" 
ON public.deal_activities 
FOR DELETE 
USING (deal_id IN (SELECT id FROM public.deals WHERE user_id = auth.uid()) AND auth.uid() = user_id);