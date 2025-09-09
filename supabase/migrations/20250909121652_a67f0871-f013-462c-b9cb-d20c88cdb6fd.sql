-- Create unique constraint on sports name for the ON CONFLICT clause
ALTER TABLE sports ADD CONSTRAINT sports_name_unique UNIQUE (name);

-- Create unique constraint on countries name for the ON CONFLICT clause  
ALTER TABLE countries ADD CONSTRAINT countries_name_unique UNIQUE (name);