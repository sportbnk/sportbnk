-- Clean existing data and add English football teams (without level column)
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
    INSERT INTO teams (name, sport_id, country_id, league, logo_url) VALUES
        ('Arsenal', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/arsenal.png'),
        ('Aston Villa', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/aston-villa.png'),
        ('Bournemouth', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/bournemouth.png'),
        ('Brentford', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/brentford.png'),
        ('Brighton & Hove Albion', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/brighton.png'),
        ('Chelsea', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/chelsea.png'),
        ('Crystal Palace', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/crystal-palace.png'),
        ('Everton', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/everton.png'),
        ('Fulham', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/fulham.png'),
        ('Ipswich Town', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/ipswich.png'),
        ('Leicester City', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/leicester.png'),
        ('Liverpool', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/liverpool.png'),
        ('Manchester City', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/manchester-city.png'),
        ('Manchester United', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/manchester-united.png'),
        ('Newcastle United', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/newcastle.png'),
        ('Nottingham Forest', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/nottingham-forest.png'),
        ('Southampton', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/southampton.png'),
        ('Tottenham Hotspur', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/tottenham.png'),
        ('West Ham United', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/west-ham.png'),
        ('Wolverhampton Wanderers', football_sport_id, england_country_id, 'Premier League', 'https://logos.oxidized.dev/wolves.png');

    -- EFL Championship teams
    INSERT INTO teams (name, sport_id, country_id, league) VALUES
        ('Birmingham City', football_sport_id, england_country_id, 'EFL Championship'),
        ('Blackburn Rovers', football_sport_id, england_country_id, 'EFL Championship'),
        ('Bristol City', football_sport_id, england_country_id, 'EFL Championship'),
        ('Cardiff City', football_sport_id, england_country_id, 'EFL Championship'),
        ('Coventry City', football_sport_id, england_country_id, 'EFL Championship'),
        ('Hull City', football_sport_id, england_country_id, 'EFL Championship'),
        ('Leeds United', football_sport_id, england_country_id, 'EFL Championship'),
        ('Middlesbrough', football_sport_id, england_country_id, 'EFL Championship'),
        ('Millwall', football_sport_id, england_country_id, 'EFL Championship'),
        ('Norwich City', football_sport_id, england_country_id, 'EFL Championship'),
        ('Plymouth Argyle', football_sport_id, england_country_id, 'EFL Championship'),
        ('Portsmouth', football_sport_id, england_country_id, 'EFL Championship'),
        ('Preston North End', football_sport_id, england_country_id, 'EFL Championship'),
        ('Queens Park Rangers', football_sport_id, england_country_id, 'EFL Championship'),
        ('Sheffield Wednesday', football_sport_id, england_country_id, 'EFL Championship'),
        ('Stoke City', football_sport_id, england_country_id, 'EFL Championship'),
        ('Sunderland', football_sport_id, england_country_id, 'EFL Championship'),
        ('Swansea City', football_sport_id, england_country_id, 'EFL Championship'),
        ('Watford', football_sport_id, england_country_id, 'EFL Championship'),
        ('West Bromwich Albion', football_sport_id, england_country_id, 'EFL Championship'),
        ('Derby County', football_sport_id, england_country_id, 'EFL Championship'),
        ('Luton Town', football_sport_id, england_country_id, 'EFL Championship'),
        ('Oxford United', football_sport_id, england_country_id, 'EFL Championship'),
        ('Sheffield United', football_sport_id, england_country_id, 'EFL Championship');

    -- EFL League One teams
    INSERT INTO teams (name, sport_id, country_id, league) VALUES
        ('Barnsley', football_sport_id, england_country_id, 'EFL League One'),
        ('Blackpool', football_sport_id, england_country_id, 'EFL League One'),
        ('Bolton Wanderers', football_sport_id, england_country_id, 'EFL League One'),
        ('Bristol Rovers', football_sport_id, england_country_id, 'EFL League One'),
        ('Burton Albion', football_sport_id, england_country_id, 'EFL League One'),
        ('Cambridge United', football_sport_id, england_country_id, 'EFL League One'),
        ('Charlton Athletic', football_sport_id, england_country_id, 'EFL League One'),
        ('Chesterfield', football_sport_id, england_country_id, 'EFL League One'),
        ('Exeter City', football_sport_id, england_country_id, 'EFL League One'),
        ('Huddersfield Town', football_sport_id, england_country_id, 'EFL League One'),
        ('Leyton Orient', football_sport_id, england_country_id, 'EFL League One'),
        ('Lincoln City', football_sport_id, england_country_id, 'EFL League One'),
        ('Milton Keynes Dons', football_sport_id, england_country_id, 'EFL League One'),
        ('Northampton Town', football_sport_id, england_country_id, 'EFL League One'),
        ('Peterborough United', football_sport_id, england_country_id, 'EFL League One'),
        ('Port Vale', football_sport_id, england_country_id, 'EFL League One'),
        ('Reading', football_sport_id, england_country_id, 'EFL League One'),
        ('Shrewsbury Town', football_sport_id, england_country_id, 'EFL League One'),
        ('Stevenage', football_sport_id, england_country_id, 'EFL League One'),
        ('Stockport County', football_sport_id, england_country_id, 'EFL League One'),
        ('Walsall', football_sport_id, england_country_id, 'EFL League One'),
        ('Wycombe Wanderers', football_sport_id, england_country_id, 'EFL League One');

    -- EFL League Two teams
    INSERT INTO teams (name, sport_id, country_id, league) VALUES
        ('Accrington Stanley', football_sport_id, england_country_id, 'EFL League Two'),
        ('AFC Wimbledon', football_sport_id, england_country_id, 'EFL League Two'),
        ('Barrow', football_sport_id, england_country_id, 'EFL League Two'),
        ('Bradford City', football_sport_id, england_country_id, 'EFL League Two'),
        ('Bromley', football_sport_id, england_country_id, 'EFL League Two'),
        ('Carlisle United', football_sport_id, england_country_id, 'EFL League Two'),
        ('Colchester United', football_sport_id, england_country_id, 'EFL League Two'),
        ('Crewe Alexandra', football_sport_id, england_country_id, 'EFL League Two'),
        ('Doncaster Rovers', football_sport_id, england_country_id, 'EFL League Two'),
        ('Forest Green Rovers', football_sport_id, england_country_id, 'EFL League Two'),
        ('Gillingham', football_sport_id, england_country_id, 'EFL League Two'),
        ('Grimsby Town', football_sport_id, england_country_id, 'EFL League Two'),
        ('Harrogate Town', football_sport_id, england_country_id, 'EFL League Two'),
        ('Mansfield Town', football_sport_id, england_country_id, 'EFL League Two'),
        ('Morecambe', football_sport_id, england_country_id, 'EFL League Two'),
        ('Newport County', football_sport_id, england_country_id, 'EFL League Two'),
        ('Notts County', football_sport_id, england_country_id, 'EFL League Two'),
        ('Salford City', football_sport_id, england_country_id, 'EFL League Two'),
        ('Sutton United', football_sport_id, england_country_id, 'EFL League Two'),
        ('Swindon Town', football_sport_id, england_country_id, 'EFL League Two'),
        ('Tranmere Rovers', football_sport_id, england_country_id, 'EFL League Two'),
        ('Wrexham', football_sport_id, england_country_id, 'EFL League Two');
END $$;