-- Add level field to teams and update with professional level
ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS level character varying;

-- Update existing teams to be "Professional" level
UPDATE public.teams SET level = 'Professional' WHERE level IS NULL;

-- Clear existing data and insert teams with cities and levels
DELETE FROM public.teams;
DELETE FROM public.cities;
DELETE FROM public.countries;
DELETE FROM public.sports;

-- Insert sports data
INSERT INTO public.sports (name) VALUES ('Football');

-- Insert countries data
INSERT INTO public.countries (name, code) VALUES ('England', 'ENG');

-- Get the country ID for England
DO $$
DECLARE
    england_id UUID;
    football_id UUID;
    london_id UUID;
    liverpool_id UUID;
    manchester_id UUID;
    newcastle_id UUID;
    brighton_id UUID;
    birmingham_id UUID;
BEGIN
    -- Get IDs
    SELECT id INTO england_id FROM public.countries WHERE name = 'England';
    SELECT id INTO football_id FROM public.sports WHERE name = 'Football';
    
    -- Insert cities
    INSERT INTO public.cities (name, country_id) VALUES 
    ('London', england_id),
    ('Liverpool', england_id),
    ('Manchester', england_id),
    ('Newcastle', england_id),
    ('Brighton', england_id),
    ('Birmingham', england_id);
    
    -- Get city IDs
    SELECT id INTO london_id FROM public.cities WHERE name = 'London';
    SELECT id INTO liverpool_id FROM public.cities WHERE name = 'Liverpool';
    SELECT id INTO manchester_id FROM public.cities WHERE name = 'Manchester';
    SELECT id INTO newcastle_id FROM public.cities WHERE name = 'Newcastle';
    SELECT id INTO brighton_id FROM public.cities WHERE name = 'Brighton';
    SELECT id INTO birmingham_id FROM public.cities WHERE name = 'Birmingham';
    
    -- Insert teams with proper relationships
    INSERT INTO public.teams (name, sport_id, country_id, city_id, league, level, founded_year, website) VALUES 
    ('Arsenal', football_id, england_id, london_id, 'Premier League', 'Professional', 1886, 'https://www.arsenal.com'),
    ('Chelsea', football_id, england_id, london_id, 'Premier League', 'Professional', 1905, 'https://www.chelseafc.com'),
    ('Liverpool', football_id, england_id, liverpool_id, 'Premier League', 'Professional', 1892, 'https://www.liverpoolfc.com'),
    ('Manchester United', football_id, england_id, manchester_id, 'Premier League', 'Professional', 1878, 'https://www.manutd.com'),
    ('Manchester City', football_id, england_id, manchester_id, 'Premier League', 'Professional', 1880, 'https://www.mancity.com'),
    ('Tottenham Hotspur', football_id, england_id, london_id, 'Premier League', 'Professional', 1882, 'https://www.tottenhamhotspur.com'),
    ('Newcastle United', football_id, england_id, newcastle_id, 'Premier League', 'Professional', 1892, 'https://www.nufc.co.uk'),
    ('Brighton & Hove Albion', football_id, england_id, brighton_id, 'Premier League', 'Professional', 1901, 'https://www.brightonandhovealbion.com'),
    ('Aston Villa', football_id, england_id, birmingham_id, 'Premier League', 'Professional', 1874, 'https://www.avfc.co.uk'),
    ('West Ham United', football_id, england_id, london_id, 'Premier League', 'Professional', 1895, 'https://www.whufc.com');
END $$;