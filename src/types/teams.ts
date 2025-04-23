
export interface Contact {
  name: string;
  position: string;
  email: string;
  phone?: string;
  linkedin?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface TeamData {
  id: number;
  team: string;
  sport: string;
  level: string;
  city: string;
  country: string;
  revenue: number;
  employees: number;
  logo: string;
  description: string;
  founded?: number;
  website?: string;
  email?: string;
  phone?: string;
  contacts: Contact[];
  social: SocialLinks;
}
