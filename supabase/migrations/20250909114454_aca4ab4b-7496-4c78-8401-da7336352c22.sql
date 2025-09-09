-- Restore all database tables with proper structure but empty data

-- Create sports table
CREATE TABLE public.sports (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name character varying NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create countries table  
CREATE TABLE public.countries (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name character varying NOT NULL,
    code character varying,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create cities table
CREATE TABLE public.cities (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name character varying NOT NULL,
    country_id uuid REFERENCES public.countries(id),
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create departments table
CREATE TABLE public.departments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name character varying NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create teams table
CREATE TABLE public.teams (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name character varying NOT NULL,
    sport_id uuid REFERENCES public.sports(id),
    city_id uuid REFERENCES public.cities(id),
    country_id uuid REFERENCES public.countries(id),
    league character varying,
    division character varying,
    website character varying,
    email character varying,
    phone character varying,
    address text,
    founded_year integer,
    description text,
    logo_url text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create team_social_links table
CREATE TABLE public.team_social_links (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    platform character varying NOT NULL,
    url character varying NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create opening_hours table
CREATE TABLE public.opening_hours (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    open_time time without time zone,
    close_time time without time zone,
    is_closed boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create contacts table
CREATE TABLE public.contacts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id uuid REFERENCES public.teams(id),
    department_id uuid REFERENCES public.departments(id),
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying,
    phone character varying,
    mobile character varying,
    position character varying,
    linkedin character varying,
    twitter character varying,
    instagram character varying,
    facebook character varying,
    notes text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create lists table (already exists, keeping it)

-- Create list_items table
CREATE TABLE public.list_items (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    list_id uuid NOT NULL REFERENCES public.lists(id) ON DELETE CASCADE,
    contact_id uuid REFERENCES public.contacts(id) ON DELETE CASCADE,
    team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create revealed_details table
CREATE TABLE public.revealed_details (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    contact_id uuid REFERENCES public.contacts(id) ON DELETE CASCADE,
    team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE,
    field_name character varying NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revealed_details ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for sports (public read)
CREATE POLICY "Sports are publicly readable" ON public.sports FOR SELECT USING (true);
CREATE POLICY "Admins can manage sports" ON public.sports FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for countries (public read)
CREATE POLICY "Countries are publicly readable" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Admins can manage countries" ON public.countries FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for cities (public read)
CREATE POLICY "Cities are publicly readable" ON public.cities FOR SELECT USING (true);
CREATE POLICY "Admins can manage cities" ON public.cities FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for departments (public read)
CREATE POLICY "Departments are publicly readable" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Admins can manage departments" ON public.departments FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for teams (public read)
CREATE POLICY "Teams are publicly readable" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Admins can manage teams" ON public.teams FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for team_social_links (public read)
CREATE POLICY "Team social links are publicly readable" ON public.team_social_links FOR SELECT USING (true);
CREATE POLICY "Admins can manage team social links" ON public.team_social_links FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for opening_hours (public read)
CREATE POLICY "Opening hours are publicly readable" ON public.opening_hours FOR SELECT USING (true);
CREATE POLICY "Admins can manage opening hours" ON public.opening_hours FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for contacts (public read)
CREATE POLICY "Contacts are publicly readable" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Admins can manage contacts" ON public.contacts FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for list_items (user-specific)
CREATE POLICY "Users can view their own list items" ON public.list_items FOR SELECT USING (list_id IN (SELECT id FROM public.lists WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));
CREATE POLICY "Users can create their own list items" ON public.list_items FOR INSERT WITH CHECK (list_id IN (SELECT id FROM public.lists WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));
CREATE POLICY "Users can update their own list items" ON public.list_items FOR UPDATE USING (list_id IN (SELECT id FROM public.lists WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));
CREATE POLICY "Users can delete their own list items" ON public.list_items FOR DELETE USING (list_id IN (SELECT id FROM public.lists WHERE profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())));

-- Create RLS policies for revealed_details (user-specific)
CREATE POLICY "Users can view their own revealed details" ON public.revealed_details FOR SELECT USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can create their own revealed details" ON public.revealed_details FOR INSERT WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can update their own revealed details" ON public.revealed_details FOR UPDATE USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete their own revealed details" ON public.revealed_details FOR DELETE USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Create triggers for updated_at columns
CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON public.teams
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_revealed_details_updated_at
    BEFORE UPDATE ON public.revealed_details
    FOR EACH ROW
    EXECUTE FUNCTION public.update_revealed_details_updated_at();