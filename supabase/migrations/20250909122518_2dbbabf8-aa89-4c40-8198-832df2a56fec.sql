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
INSERT INTO public.sports (id, name) VALUES 
('11111111-1111-1111-1111-111111111111', 'Football');

-- Insert countries data
INSERT INTO public.countries (id, name, code) VALUES 
('22222222-2222-2222-2222-222222222222', 'England', 'ENG');

-- Insert cities data with proper IDs
INSERT INTO public.cities (id, name, country_id) VALUES 
('33333333-3333-3333-3333-333333333333', 'London', '22222222-2222-2222-2222-222222222222'),
('44444444-4444-4444-4444-444444444444', 'Liverpool', '22222222-2222-2222-2222-222222222222'),
('55555555-5555-5555-5555-555555555555', 'Manchester', '22222222-2222-2222-2222-222222222222'),
('66666666-6666-6666-6666-666666666666', 'Newcastle', '22222222-2222-2222-2222-222222222222'),
('77777777-7777-7777-7777-777777777777', 'Brighton', '22222222-2222-2222-2222-222222222222'),
('88888888-8888-8888-8888-888888888888', 'Birmingham', '22222222-2222-2222-2222-222222222222');

-- Insert teams data with cities and levels
INSERT INTO public.teams (id, name, sport_id, country_id, city_id, league, level, founded_year, website) VALUES 
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Arsenal', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Premier League', 'Professional', 1886, 'https://www.arsenal.com'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Chelsea', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Premier League', 'Professional', 1905, 'https://www.chelseafc.com'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Liverpool', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', 'Premier League', 'Professional', 1892, 'https://www.liverpoolfc.com'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Manchester United', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'Premier League', 'Professional', 1878, 'https://www.manutd.com'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Manchester City', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'Premier League', 'Professional', 1880, 'https://www.mancity.com'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Tottenham Hotspur', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Premier League', 'Professional', 1882, 'https://www.tottenhamhotspur.com'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Newcastle United', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '66666666-6666-6666-6666-666666666666', 'Premier League', 'Professional', 1892, 'https://www.nufc.co.uk'),
('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Brighton & Hove Albion', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'Premier League', 'Professional', 1901, 'https://www.brightonandhovealbion.com'),
('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Aston Villa', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '88888888-8888-8888-8888-888888888888', 'Premier League', 'Professional', 1874, 'https://www.avfc.co.uk'),
('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'West Ham United', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Premier League', 'Professional', 1895, 'https://www.whufc.com');