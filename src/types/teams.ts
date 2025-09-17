export interface Sport {
  id: string;
  name: string;
  created_at: string;
}

export interface Country {
  id: string;
  name: string;
  code?: string;
  created_at: string;
}

export interface City {
  id: string;
  name: string;
  country_id?: string;
  country?: Country;
  created_at: string;
}

export interface Department {
  id: string;
  name: string;
  created_at: string;
}

export interface TeamSocialLink {
  id: string;
  team_id: string;
  platform: string;
  url: string;
  created_at: string;
}

export interface OpeningHours {
  id: string;
  team_id: string;
  day_of_week: number;
  open_time?: string;
  close_time?: string;
  is_closed: boolean;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  sport_id?: string;
  city_id?: string;
  country_id?: string;
  league?: string;
  division?: string;
  level?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  founded_year?: number;
  description?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
  sport?: Sport;
  city?: City;
  country?: Country;
  team_social_links?: TeamSocialLink[];
  opening_hours?: OpeningHours[];
  contacts?: Contact[];
}

export interface Contact {
  id: string;
  team_id?: string;
  department_id?: string;
  sport_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  position?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  team?: Team;
  department?: Department;
  sport?: Sport;
}

export interface ListItem {
  id: string;
  list_id: string;
  contact_id?: string;
  team_id?: string;
  created_at: string;
  contact?: Contact;
  team?: Team;
}

export interface RevealedDetail {
  id: string;
  profile_id: string;
  contact_id?: string;
  team_id?: string;
  field_name: string;
  created_at: string;
  updated_at: string;
}

export interface List {
  id: string;
  profile_id: string;
  name: string;
  description?: string;
  created_at: string;
  list_items?: ListItem[];
}