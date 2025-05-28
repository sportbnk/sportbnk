
export interface Contact {
  name: string;
  position: string;
  email: string;
  phone?: string;
  linkedin?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface TeamData {
  id: string; // Changed from number to string (UUID)
  team: string; // This should be 'name' from the database
  sport: string;
  level: string;
  city: string;
  country: string;
  revenue: number;
  employees: number;
  logo: string;
  description: string;
  founded?: string; // Changed from number to string
  website?: string;
  email?: string;
  phone?: string;
  contacts: Contact[];
  social: SocialLink[];
}
