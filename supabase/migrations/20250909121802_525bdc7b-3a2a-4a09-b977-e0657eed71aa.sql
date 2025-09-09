-- Clean existing data and add English football teams (with proper constraints in place)
DELETE FROM teams WHERE sport_id IN (SELECT id FROM sports WHERE name = 'Football');

-- Insert or update Football sport
INSERT INTO sports (name) VALUES ('Football')
ON CONFLICT (name) DO NOTHING;

-- Insert or update England country
INSERT INTO countries (name, code) VALUES ('England', 'EN')
ON CONFLICT (name) DO NOTHING;

-- Get the sport and country IDs and insert teams
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

    -- EFL Championship teams (24 teams)
    INSERT INTO teams (name, sport_id, country_id, league, level) VALUES
        ('Birmingham City', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Blackburn Rovers', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Bristol City', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Cardiff City', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Coventry City', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Hull City', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Leeds United', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Middlesbrough', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Millwall', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Norwich City', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Plymouth Argyle', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Portsmouth', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Preston North End', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Queens Park Rangers', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Sheffield Wednesday', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Stoke City', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Sunderland', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Swansea City', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Watford', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('West Bromwich Albion', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Derby County', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Luton Town', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Oxford United', football_sport_id, england_country_id, 'EFL Championship', 'Professional'),
        ('Sheffield United', football_sport_id, england_country_id, 'EFL Championship', 'Professional');

    -- EFL League One teams (22 teams - avoiding duplicates)
    INSERT INTO teams (name, sport_id, country_id, league, level) VALUES
        ('Barnsley', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Blackpool', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Bolton Wanderers', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Bristol Rovers', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Burton Albion', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Cambridge United', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Charlton Athletic', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Chesterfield', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Exeter City', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Huddersfield Town', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Leyton Orient', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Lincoln City', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Milton Keynes Dons', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Northampton Town', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Peterborough United', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Port Vale', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Reading', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Shrewsbury Town', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Stevenage', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Stockport County', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Walsall', football_sport_id, england_country_id, 'EFL League One', 'Professional'),
        ('Wycombe Wanderers', football_sport_id, england_country_id, 'EFL League One', 'Professional');

    -- EFL League Two teams (21 teams - avoiding duplicates)
    INSERT INTO teams (name, sport_id, country_id, league, level) VALUES
        ('Accrington Stanley', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('AFC Wimbledon', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Barrow', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Bradford City', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Bromley', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Carlisle United', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Colchester United', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Crewe Alexandra', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Doncaster Rovers', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Forest Green Rovers', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Gillingham', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Grimsby Town', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Harrogate Town', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Mansfield Town', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Morecambe', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Newport County', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Notts County', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Salford City', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Sutton United', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Swindon Town', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Tranmere Rovers', football_sport_id, england_country_id, 'EFL League Two', 'Professional'),
        ('Wrexham', football_sport_id, england_country_id, 'EFL League Two', 'Professional');
END $$;