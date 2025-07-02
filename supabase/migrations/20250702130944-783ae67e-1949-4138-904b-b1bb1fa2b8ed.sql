
-- Fix security warnings by setting immutable search_path on all functions

-- Update delete_all_data function
CREATE OR REPLACE FUNCTION public.delete_all_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Delete in order to respect foreign key constraints
  DELETE FROM list_items;
  DELETE FROM revealed_details;
  DELETE FROM contacts;
  DELETE FROM opening_hours;
  DELETE FROM team_social_links;
  DELETE FROM teams;
  DELETE FROM cities;
  DELETE FROM countries;
  DELETE FROM sports;
  DELETE FROM departments;
  DELETE FROM lists;
  DELETE FROM profiles;
END;
$$;

-- Update truncate_all_tables function
CREATE OR REPLACE FUNCTION public.truncate_all_tables()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Temporarily disable foreign key constraints
  SET session_replication_role = replica;
  
  -- Truncate all tables
  TRUNCATE TABLE list_items, revealed_details, contacts, opening_hours, 
                 team_social_links, teams, cities, countries, sports, 
                 departments, lists, profiles RESTART IDENTITY CASCADE;
  
  -- Re-enable foreign key constraints
  SET session_replication_role = DEFAULT;
END;
$$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, job_title)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'job_title', '')
  );
  RETURN NEW;
END;
$$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Update update_revealed_details_updated_at function
CREATE OR REPLACE FUNCTION public.update_revealed_details_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;
