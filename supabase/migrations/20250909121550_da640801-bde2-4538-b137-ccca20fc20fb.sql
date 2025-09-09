-- Clean existing data and add English football teams
DELETE FROM teams WHERE sport_id IN (SELECT id FROM sports WHERE name = 'Football');

-- Insert or update Football sport
INSERT INTO sports (name) VALUES ('Football')
ON CONFLICT (name) DO NOTHING;

-- Insert or update England country
INSERT INTO countries (name, code) VALUES ('England', 'EN')
ON CONFLICT (name) DO NOTHING;

-- Get the sport and country IDs
DO $$
DECLARE
    football_sport_id uuid;
    england_country_id uuid;
BEGIN
    SELECT id INTO football_sport_id FROM sports WHERE name = 'Football';
    SELECT id INTO england_country_id FROM countries WHERE name = 'England';

    -- Premier League teams
    INSERT INTO teams (name, sport_id, country_id, league, level, logo_url) VALUES
        ('Arsenal', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/arsenal.png'),
        ('Aston Villa', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/aston-villa.png'),
        ('Bournemouth', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/bournemouth.png'),
        ('Brentford', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/brentford.png'),
        ('Brighton & Hove Albion', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/brighton.png'),
        ('Chelsea', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/chelsea.png'),
        ('Crystal Palace', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/crystal-palace.png'),
        ('Everton', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/everton.png'),
        ('Fulham', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/fulham.png'),
        ('Ipswich Town', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/ipswich.png'),
        ('Leicester City', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/leicester.png'),
        ('Liverpool', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/liverpool.png'),
        ('Manchester City', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/manchester-city.png'),
        ('Manchester United', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/manchester-united.png'),
        ('Newcastle United', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/newcastle.png'),
        ('Nottingham Forest', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/nottingham-forest.png'),
        ('Southampton', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/southampton.png'),
        ('Tottenham Hotspur', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/tottenham.png'),
        ('West Ham United', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/west-ham.png'),
        ('Wolverhampton Wanderers', football_sport_id, england_country_id, 'Premier League', 'Professional', 'https://logos.oxidized.dev/wolves.png');

    -- EFL Championship teams
    INSERT INTO teams (name, sport_id, country_id, league, level, logo_url) VALUES
        ('Birmingham City', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Blackburn Rovers', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Bristol City', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Cardiff City', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Coventry City', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Hull City', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Leeds United', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Middlesbrough', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Millwall', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Norwich City', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Plymouth Argyle', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Portsmouth', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Preston North End', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Queens Park Rangers', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Sheffield Wednesday', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Stoke City', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Sunderland', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Swansea City', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Watford', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('West Bromwich Albion', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Derby County', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Luton Town', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Oxford United', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL),
        ('Sheffield United', football_sport_id, england_country_id, 'EFL Championship', 'Professional', NULL);

    -- EFL League One teams
    INSERT INTO teams (name, sport_id, country_id, league, level, logo_url) VALUES
        ('Barnsley', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Blackpool', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Bolton Wanderers', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Bristol Rovers', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Burton Albion', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Cambridge United', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Charlton Athletic', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Chesterfield', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Exeter City', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Huddersfield Town', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Leyton Orient', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Lincoln City', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Milton Keynes Dons', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Northampton Town', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Peterborough United', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Port Vale', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Reading', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Shrewsbury Town', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Stevenage', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Stockport County', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Walsall', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL),
        ('Wycombe Wanderers', football_sport_id, england_country_id, 'EFL League One', 'Professional', NULL);

    -- EFL League Two teams
    INSERT INTO teams (name, sport_id, country_id, league, level, logo_url) VALUES
        ('Accrington Stanley', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('AFC Wimbledon', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Barrow', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Bradford City', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Bromley', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Carlisle United', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Colchester United', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Crewe Alexandra', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Doncaster Rovers', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Forest Green Rovers', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Gillingham', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Grimsby Town', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Harrogate Town', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Mansfield Town', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Morecambe', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Newport County', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Notts County', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Salford City', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Sutton United', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Swindon Town', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Tranmere Rovers', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL),
        ('Wrexham', football_sport_id, england_country_id, 'EFL League Two', 'Professional', NULL);
END $$;