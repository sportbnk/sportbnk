import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  Users,
  Calendar,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Plus,
  UserPlus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import team logos
import arsenalLogo from "@/assets/team-logos/arsenal.png";
import chelseaLogo from "@/assets/team-logos/chelsea.png";
import liverpoolLogo from "@/assets/team-logos/liverpool.png";
import manchesterUnitedLogo from "@/assets/team-logos/manchester-united.png";
import manchesterCityLogo from "@/assets/team-logos/manchester-city.png";
import tottenhamLogo from "@/assets/team-logos/tottenham.png";
import newcastleLogo from "@/assets/team-logos/newcastle.png";
import astonVillaLogo from "@/assets/team-logos/aston-villa.png";
import bournemouthLogo from "@/assets/team-logos/bournemouth.png";
import brentfordLogo from "@/assets/team-logos/brentford.png";
import brightonLogo from "@/assets/team-logos/brighton.png";
import crystalPalaceLogo from "@/assets/team-logos/crystal-palace.png";
import evertonLogo from "@/assets/team-logos/everton.png";
import fulhamLogo from "@/assets/team-logos/fulham.png";
import ipswichLogo from "@/assets/team-logos/ipswich-town.png";
import leicesterLogo from "@/assets/team-logos/leicester.png";
import nottinghamForestLogo from "@/assets/team-logos/nottingham-forest.png";
import southamptonLogo from "@/assets/team-logos/west-ham.png"; // Using as placeholder
import westHamLogo from "@/assets/team-logos/west-ham.png";
import wolvesLogo from "@/assets/team-logos/wolves.png";

interface Organisation {
  id: string;
  name: string;
  type: string;
  sport: string;
  league: string;
  location: string;
  country: string;
  foundedYear: number;
  employees: string;
  website?: string;
  email?: string;
  phone?: string;
  description?: string;
  stadium?: string;
  capacity?: number;
  manager?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  linkedin?: string;
  joinedDate: string;
  isKeyContact: boolean;
}

// Mock data for Premier League teams
const organisationsData: Record<string, Organisation> = {
  '1': {
    id: '1',
    name: 'Arsenal FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1886,
    employees: '500-1000',
    website: 'https://www.arsenal.com',
    email: 'info@arsenal.co.uk',
    phone: '+44 20 7619 5003',
    description: 'Arsenal Football Club is a professional football club based in Islington, London, England. The club plays in the Premier League, the top flight of English football. The club has won 13 league titles, a record 14 FA Cups, two League Cups, 16 FA Community Shields, one European Cup Winners\' Cup, and one Inter-Cities Fairs Cup.',
    stadium: 'Emirates Stadium',
    capacity: 60704,
    manager: 'Mikel Arteta',
    socialMedia: {
      twitter: 'https://twitter.com/Arsenal',
      facebook: 'https://facebook.com/Arsenal',
      instagram: 'https://instagram.com/arsenal',
      linkedin: 'https://linkedin.com/company/arsenal-football-club',
      youtube: 'https://youtube.com/user/ArsenalTour'
    }
  },
  '2': {
    id: '2',
    name: 'Aston Villa FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Birmingham',
    country: 'England',
    foundedYear: 1874,
    employees: '200-500',
    website: 'https://www.avfc.co.uk',
    email: 'enquiries@avfc.co.uk',
    phone: '+44 121 327 2299',
    description: 'Aston Villa Football Club is a professional football club based in Aston, Birmingham, England. The club competes in the Premier League and is one of the oldest and most successful clubs in English football, having won seven league titles and seven FA Cups.',
    stadium: 'Villa Park',
    capacity: 42682,
    manager: 'Unai Emery',
    socialMedia: {
      twitter: 'https://twitter.com/AVFCOfficial',
      facebook: 'https://facebook.com/OfficialAVFC',
      instagram: 'https://instagram.com/avfcofficial',
      linkedin: 'https://linkedin.com/company/aston-villa-football-club',
      youtube: 'https://youtube.com/user/AVFCOfficial'
    }
  },
  '3': {
    id: '3',
    name: 'AFC Bournemouth',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Bournemouth',
    country: 'England',
    foundedYear: 1899,
    employees: '100-200',
    website: 'https://www.afcb.co.uk',
    email: 'enquiries@afcb.co.uk',
    phone: '+44 1202 726 300',
    description: 'AFC Bournemouth is a professional football club based in Kings Park, Boscombe, a suburb of Bournemouth, Dorset, England. The club competes in the Premier League and has experienced a remarkable rise through the English football pyramid.',
    stadium: 'Vitality Stadium',
    capacity: 11379,
    manager: 'Andoni Iraola',
    socialMedia: {
      twitter: 'https://twitter.com/afcbournemouth',
      facebook: 'https://facebook.com/OfficialAFCB',
      instagram: 'https://instagram.com/afcbournemouth',
      linkedin: 'https://linkedin.com/company/afc-bournemouth',
      youtube: 'https://youtube.com/user/AFCBournemouthTV'
    }
  },
  '4': {
    id: '4',
    name: 'Brentford FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1889,
    employees: '100-200',
    website: 'https://www.brentfordfc.com',
    email: 'enquiries@brentfordfc.com',
    phone: '+44 20 8847 2511',
    description: 'Brentford Football Club is a professional football club based in Brentford, West London, England. The club competes in the Premier League and is known for its innovative approach to football analytics and player recruitment.',
    stadium: 'Brentford Community Stadium',
    capacity: 17250,
    manager: 'Thomas Frank',
    socialMedia: {
      twitter: 'https://twitter.com/BrentfordFC',
      facebook: 'https://facebook.com/BrentfordFC',
      instagram: 'https://instagram.com/brentfordfc',
      linkedin: 'https://linkedin.com/company/brentford-fc',
      youtube: 'https://youtube.com/user/BrentfordFCOfficial'
    }
  },
  '5': {
    id: '5',
    name: 'Brighton & Hove Albion FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Brighton',
    country: 'England',
    foundedYear: 1901,
    employees: '200-500',
    website: 'https://www.brightonandhovealbion.com',
    email: 'seagulls@brightonandhovealbion.com',
    phone: '+44 1273 695 400',
    description: 'Brighton & Hove Albion Football Club, commonly referred to as Brighton, is a professional football club based in Brighton and Hove, East Sussex, England. The club competes in the Premier League and plays at the American Express Community Stadium.',
    stadium: 'American Express Community Stadium',
    capacity: 31800,
    manager: 'Fabian Hürzeler',
    socialMedia: {
      twitter: 'https://twitter.com/OfficialBHAFC',
      facebook: 'https://facebook.com/BrightonHoveAlbionFC',
      instagram: 'https://instagram.com/officialbhafc',
      linkedin: 'https://linkedin.com/company/brighton-hove-albion-fc',
      youtube: 'https://youtube.com/user/OfficialBHAFC'
    }
  },
  '6': {
    id: '6',
    name: 'Chelsea FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1905,
    employees: '500-1000',
    website: 'https://www.chelseafc.com',
    email: 'info@chelseafc.com',
    phone: '+44 871 984 1955',
    description: 'Chelsea Football Club is an English professional football club based in Fulham, West London. Founded in 1905, they play their home games at Stamford Bridge. The club competes in the Premier League and has won six league titles, eight FA Cups, five League Cups, and two UEFA Champions League titles.',
    stadium: 'Stamford Bridge',
    capacity: 40341,
    manager: 'Enzo Maresca',
    socialMedia: {
      twitter: 'https://twitter.com/ChelseaFC',
      facebook: 'https://facebook.com/ChelseaFC',
      instagram: 'https://instagram.com/chelseafc',
      linkedin: 'https://linkedin.com/company/chelsea-football-club',
      youtube: 'https://youtube.com/user/chelseafc'
    }
  },
  '7': {
    id: '7',
    name: 'Crystal Palace FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1905,
    employees: '200-500',
    website: 'https://www.cpfc.co.uk',
    email: 'info@cpfc.co.uk',
    phone: '+44 20 8768 6000',
    description: 'Crystal Palace Football Club is a professional football club based in Selhurst, South London, England. The club competes in the Premier League and is known for its passionate fanbase and impressive academy system.',
    stadium: 'Selhurst Park',
    capacity: 25486,
    manager: 'Oliver Glasner',
    socialMedia: {
      twitter: 'https://twitter.com/CPFC',
      facebook: 'https://facebook.com/OfficialCPFC',
      instagram: 'https://instagram.com/cpfc',
      linkedin: 'https://linkedin.com/company/crystal-palace-fc',
      youtube: 'https://youtube.com/user/CPFCOfficial'
    }
  },
  '8': {
    id: '8',
    name: 'Everton FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Liverpool',
    country: 'England',
    foundedYear: 1878,
    employees: '200-500',
    website: 'https://www.evertonfc.com',
    email: 'info@evertonfc.com',
    phone: '+44 151 556 1878',
    description: 'Everton Football Club is an English professional football club based in Liverpool that competes in the Premier League. The club has competed in the top division for a record 121 seasons and has won nine league titles, five FA Cups, and one European Cup Winners\' Cup.',
    stadium: 'Goodison Park',
    capacity: 39414,
    manager: 'Sean Dyche',
    socialMedia: {
      twitter: 'https://twitter.com/Everton',
      facebook: 'https://facebook.com/Everton',
      instagram: 'https://instagram.com/everton',
      linkedin: 'https://linkedin.com/company/everton-football-club',
      youtube: 'https://youtube.com/user/EvertonTV'
    }
  },
  '9': {
    id: '9',
    name: 'Fulham FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1879,
    employees: '200-500',
    website: 'https://www.fulhamfc.com',
    email: 'enquiries@fulhamfc.com',
    phone: '+44 843 208 1222',
    description: 'Fulham Football Club is a professional football club based in Fulham, West London, England. The club competes in the Premier League and is known for its historic Craven Cottage stadium, located on the banks of the River Thames.',
    stadium: 'Craven Cottage',
    capacity: 19359,
    manager: 'Marco Silva',
    socialMedia: {
      twitter: 'https://twitter.com/FulhamFC',
      facebook: 'https://facebook.com/FulhamFootballClub',
      instagram: 'https://instagram.com/fulhamfc',
      linkedin: 'https://linkedin.com/company/fulham-football-club',
      youtube: 'https://youtube.com/user/FulhamFCOfficial'
    }
  },
  '10': {
    id: '10',
    name: 'Ipswich Town FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Ipswich',
    country: 'England',
    foundedYear: 1878,
    employees: '100-200',
    website: 'https://www.itfc.co.uk',
    email: 'enquiries@itfc.co.uk',
    phone: '+44 1473 400 500',
    description: 'Ipswich Town Football Club is a professional football club based in Ipswich, Suffolk, England. The club competes in the Premier League and has won the First Division once, the FA Cup once, and the UEFA Cup once.',
    stadium: 'Portman Road',
    capacity: 30311,
    manager: 'Kieran McKenna',
    socialMedia: {
      twitter: 'https://twitter.com/IpswichTown',
      facebook: 'https://facebook.com/IpswichTown',
      instagram: 'https://instagram.com/ipswichtown',
      linkedin: 'https://linkedin.com/company/ipswich-town-fc',
      youtube: 'https://youtube.com/user/IpswichTownTV'
    }
  },
  '11': {
    id: '11',
    name: 'Leicester City FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Leicester',
    country: 'England',
    foundedYear: 1884,
    employees: '200-500',
    website: 'https://www.lcfc.com',
    email: 'reception@lcfc.co.uk',
    phone: '+44 344 815 5000',
    description: 'Leicester City Football Club is an English professional football club based in Leicester in the East Midlands. The club competes in the Premier League and famously won their first Premier League title in the 2015-16 season against 5000-1 odds.',
    stadium: 'King Power Stadium',
    capacity: 32312,
    manager: 'Steve Cooper',
    socialMedia: {
      twitter: 'https://twitter.com/LCFC',
      facebook: 'https://facebook.com/LCFCOfficial',
      instagram: 'https://instagram.com/lcfc',
      linkedin: 'https://linkedin.com/company/leicester-city-football-club',
      youtube: 'https://youtube.com/user/LCFCOfficial'
    }
  },
  '12': {
    id: '12',
    name: 'Liverpool FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Liverpool',
    country: 'England',
    foundedYear: 1892,
    employees: '1000+',
    website: 'https://www.liverpoolfc.com',
    email: 'info@liverpoolfc.com',
    phone: '+44 151 263 2361',
    description: 'Liverpool Football Club is a professional football club based in Liverpool, England. The club competes in the Premier League and is one of the most successful clubs in English football history, having won 19 league titles, 8 FA Cups, 10 League Cups, and 6 European Cups.',
    stadium: 'Anfield',
    capacity: 61276,
    manager: 'Arne Slot',
    socialMedia: {
      twitter: 'https://twitter.com/LFC',
      facebook: 'https://facebook.com/LiverpoolFC',
      instagram: 'https://instagram.com/liverpoolfc',
      linkedin: 'https://linkedin.com/company/liverpool-football-club',
      youtube: 'https://youtube.com/user/LiverpoolFC'
    }
  },
  '13': {
    id: '13',
    name: 'Manchester City FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Manchester',
    country: 'England',
    foundedYear: 1880,
    employees: '500-1000',
    website: 'https://www.mancity.com',
    email: 'mancity@mancity.com',
    phone: '+44 161 444 1894',
    description: 'Manchester City Football Club is an English football club based in Manchester that competes in the Premier League. The club has won nine league titles, seven FA Cups, and one UEFA Champions League title.',
    stadium: 'Etihad Stadium',
    capacity: 55097,
    manager: 'Pep Guardiola',
    socialMedia: {
      twitter: 'https://twitter.com/ManCity',
      facebook: 'https://facebook.com/mcfcofficial',
      instagram: 'https://instagram.com/mancity',
      linkedin: 'https://linkedin.com/company/manchester-city-football-club',
      youtube: 'https://youtube.com/user/mcfcofficial'
    }
  },
  '14': {
    id: '14',
    name: 'Manchester United FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Manchester',
    country: 'England',
    foundedYear: 1878,
    employees: '1000+',
    website: 'https://www.manutd.com',
    email: 'info@manutd.com',
    phone: '+44 161 868 8000',
    description: 'Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England. The club competes in the Premier League and is one of the most successful clubs in English football, having won 20 league titles, 12 FA Cups, and 3 European Cups.',
    stadium: 'Old Trafford',
    capacity: 74310,
    manager: 'Erik ten Hag',
    socialMedia: {
      twitter: 'https://twitter.com/ManUtd',
      facebook: 'https://facebook.com/ManchesterUnited',
      instagram: 'https://instagram.com/manchesterunited',
      linkedin: 'https://linkedin.com/company/manchester-united',
      youtube: 'https://youtube.com/user/manutd'
    }
  },
  '15': {
    id: '15',
    name: 'Newcastle United FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Newcastle',
    country: 'England',
    foundedYear: 1892,
    employees: '200-500',
    website: 'https://www.nufc.co.uk',
    email: 'admin@nufc.co.uk',
    phone: '+44 191 201 8400',
    description: 'Newcastle United Football Club is an English professional football club based in Newcastle upon Tyne. The club competes in the Premier League and has won four league titles, six FA Cups, and one UEFA Intertoto Cup.',
    stadium: 'St. James\' Park',
    capacity: 52305,
    manager: 'Eddie Howe',
    socialMedia: {
      twitter: 'https://twitter.com/NUFC',
      facebook: 'https://facebook.com/NewcastleUnited',
      instagram: 'https://instagram.com/nufc',
      linkedin: 'https://linkedin.com/company/newcastle-united-football-club',
      youtube: 'https://youtube.com/user/NUFCTV'
    }
  },
  '16': {
    id: '16',
    name: 'Nottingham Forest FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Nottingham',
    country: 'England',
    foundedYear: 1865,
    employees: '100-200',
    website: 'https://www.nottinghamforest.co.uk',
    email: 'info@nottinghamforest.co.uk',
    phone: '+44 115 982 4444',
    description: 'Nottingham Forest Football Club is a professional football club based in West Bridgford, Nottinghamshire, England. The club competes in the Premier League and has won one league title, two FA Cups, and two European Cups.',
    stadium: 'The City Ground',
    capacity: 30445,
    manager: 'Nuno Espírito Santo',
    socialMedia: {
      twitter: 'https://twitter.com/NFFC',
      facebook: 'https://facebook.com/OfficialNottinghamForest',
      instagram: 'https://instagram.com/nottinghamforest',
      linkedin: 'https://linkedin.com/company/nottingham-forest-fc',
      youtube: 'https://youtube.com/user/OfficialNFFC'
    }
  },
  '17': {
    id: '17',
    name: 'Southampton FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Southampton',
    country: 'England',
    foundedYear: 1885,
    employees: '200-500',
    website: 'https://www.southamptonfc.com',
    email: 'sfc@southamptonfc.com',
    phone: '+44 23 8022 8575',
    description: 'Southampton Football Club is an English professional football club based in Southampton, Hampshire. The club competes in the Premier League and has won one FA Cup and is known for its excellent youth academy.',
    stadium: 'St. Mary\'s Stadium',
    capacity: 32384,
    manager: 'Russell Martin',
    socialMedia: {
      twitter: 'https://twitter.com/SouthamptonFC',
      facebook: 'https://facebook.com/SouthamptonFC',
      instagram: 'https://instagram.com/southamptonfc',
      linkedin: 'https://linkedin.com/company/southampton-football-club',
      youtube: 'https://youtube.com/user/SouthamptonFC'
    }
  },
  '18': {
    id: '18',
    name: 'Tottenham Hotspur FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1882,
    employees: '500-1000',
    website: 'https://www.tottenhamhotspur.com',
    email: 'customer.care@tottenhamhotspur.com',
    phone: '+44 344 499 5000',
    description: 'Tottenham Hotspur Football Club is an English professional football club based in Tottenham, North London. The club competes in the Premier League and has won two league titles, eight FA Cups, and two UEFA Cups.',
    stadium: 'Tottenham Hotspur Stadium',
    capacity: 62850,
    manager: 'Ange Postecoglou',
    socialMedia: {
      twitter: 'https://twitter.com/SpursOfficial',
      facebook: 'https://facebook.com/TottenhamHotspur',
      instagram: 'https://instagram.com/spursofficial',
      linkedin: 'https://linkedin.com/company/tottenham-hotspur',
      youtube: 'https://youtube.com/user/spursofficial'
    }
  },
  '19': {
    id: '19',
    name: 'West Ham United FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'London',
    country: 'England',
    foundedYear: 1895,
    employees: '200-500',
    website: 'https://www.whufc.com',
    email: 'info@whufc.com',
    phone: '+44 20 8548 2748',
    description: 'West Ham United Football Club is an English professional football club based in Stratford, East London. The club competes in the Premier League and has won three FA Cups and one European Cup Winners\' Cup.',
    stadium: 'London Stadium',
    capacity: 66000,
    manager: 'Julen Lopetegui',
    socialMedia: {
      twitter: 'https://twitter.com/WestHam',
      facebook: 'https://facebook.com/WestHamUnited',
      instagram: 'https://instagram.com/westham',
      linkedin: 'https://linkedin.com/company/west-ham-united',
      youtube: 'https://youtube.com/user/WestHamUnited'
    }
  },
  '20': {
    id: '20',
    name: 'Wolverhampton Wanderers FC',
    type: 'Football Club',
    sport: 'Football',
    league: 'Premier League',
    location: 'Wolverhampton',
    country: 'England',
    foundedYear: 1877,
    employees: '200-500',
    website: 'https://www.wolves.co.uk',
    email: 'info@wolves.co.uk',
    phone: '+44 871 222 2220',
    description: 'Wolverhampton Wanderers Football Club, commonly known as Wolves, is a professional football club based in Wolverhampton, England. The club competes in the Premier League and has won three league titles and four FA Cups.',
    stadium: 'Molineux Stadium',
    capacity: 31700,
    manager: 'Gary O\'Neil',
    socialMedia: {
      twitter: 'https://twitter.com/Wolves',
      facebook: 'https://facebook.com/OfficialWolves',
      instagram: 'https://instagram.com/wolves',
      linkedin: 'https://linkedin.com/company/wolverhampton-wanderers-fc',
      youtube: 'https://youtube.com/user/OfficialWolves'
    }
  }
};

// Mock employees data
const employeesData: Record<string, Employee[]> = {
  '1': [
    {
      id: 'e1',
      name: 'Richard Garlick',
      position: 'Managing Director',
      department: 'Executive',
      email: 'r.garlick@arsenal.co.uk',
      phone: '+44 20 7619 5001',
      linkedin: 'https://linkedin.com/in/richardgarlick',
      joinedDate: 'Jan 2022',
      isKeyContact: true
    },
    {
      id: 'e2',
      name: 'Peter Silverstone',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'p.silverstone@arsenal.co.uk',
      phone: '+44 20 7619 5002',
      linkedin: 'https://linkedin.com/in/petersilverstone',
      joinedDate: 'Mar 2021',
      isKeyContact: true
    },
    {
      id: 'e3',
      name: 'Mark Gonella',
      position: 'Communications Director',
      department: 'Marketing',
      email: 'm.gonella@arsenal.co.uk',
      phone: '+44 20 7619 5003',
      joinedDate: 'Jun 2020',
      isKeyContact: false
    },
    {
      id: 'e4',
      name: 'Catherine Davies',
      position: 'Head of Partnerships',
      department: 'Commercial',
      email: 'c.davies@arsenal.co.uk',
      phone: '+44 20 7619 5004',
      linkedin: 'https://linkedin.com/in/catherinedavies',
      joinedDate: 'Sep 2019',
      isKeyContact: true
    },
    {
      id: 'e5',
      name: 'Tim Lewis',
      position: 'Operations Director',
      department: 'Operations',
      email: 't.lewis@arsenal.co.uk',
      phone: '+44 20 7619 5005',
      joinedDate: 'Feb 2020',
      isKeyContact: false
    }
  ],
  '2': [
    {
      id: 'e6',
      name: 'Monchi',
      position: 'President of Football Operations',
      department: 'Executive',
      email: 'monchi@avfc.co.uk',
      phone: '+44 121 327 2201',
      linkedin: 'https://linkedin.com/in/monchi',
      joinedDate: 'Oct 2022',
      isKeyContact: true
    },
    {
      id: 'e7',
      name: 'Chris Heck',
      position: 'Chief Commercial Officer',
      department: 'Commercial',
      email: 'c.heck@avfc.co.uk',
      phone: '+44 121 327 2202',
      joinedDate: 'Jul 2021',
      isKeyContact: true
    }
  ],
  '3': [
    {
      id: 'e8',
      name: 'Neill Blake',
      position: 'Chief Executive',
      department: 'Executive',
      email: 'n.blake@afcb.co.uk',
      phone: '+44 1202 726 301',
      joinedDate: 'Jun 2019',
      isKeyContact: true
    },
    {
      id: 'e9',
      name: 'Rob Mitchell',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'r.mitchell@afcb.co.uk',
      phone: '+44 1202 726 302',
      joinedDate: 'Aug 2020',
      isKeyContact: true
    }
  ],
  '4': [
    {
      id: 'e10',
      name: 'Jon Varney',
      position: 'Chief Executive',
      department: 'Executive',
      email: 'j.varney@brentfordfc.com',
      phone: '+44 20 8847 2501',
      joinedDate: 'May 2017',
      isKeyContact: true
    },
    {
      id: 'e11',
      name: 'Susie Louis',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 's.louis@brentfordfc.com',
      phone: '+44 20 8847 2502',
      joinedDate: 'Jan 2019',
      isKeyContact: true
    }
  ],
  '5': [
    {
      id: 'e12',
      name: 'Paul Barber',
      position: 'Chief Executive',
      department: 'Executive',
      email: 'p.barber@brightonandhovealbion.com',
      phone: '+44 1273 695 401',
      linkedin: 'https://linkedin.com/in/paulbarber',
      joinedDate: 'Aug 2012',
      isKeyContact: true
    },
    {
      id: 'e13',
      name: 'Richard Hebberd',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'r.hebberd@brightonandhovealbion.com',
      phone: '+44 1273 695 402',
      joinedDate: 'Mar 2018',
      isKeyContact: true
    }
  ],
  '6': [
    {
      id: 'e14',
      name: 'Chris Jurasek',
      position: 'Chief Executive',
      department: 'Executive',
      email: 'c.jurasek@chelseafc.com',
      phone: '+44 871 984 1901',
      linkedin: 'https://linkedin.com/in/chrisjurasek',
      joinedDate: 'Aug 2023',
      isKeyContact: true
    },
    {
      id: 'e15',
      name: 'David Barnard',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'd.barnard@chelseafc.com',
      phone: '+44 871 984 1902',
      joinedDate: 'Jan 2021',
      isKeyContact: true
    },
    {
      id: 'e16',
      name: 'Steve Atkins',
      position: 'Communications Director',
      department: 'Marketing',
      email: 's.atkins@chelseafc.com',
      phone: '+44 871 984 1903',
      linkedin: 'https://linkedin.com/in/steveatkins',
      joinedDate: 'May 2018',
      isKeyContact: false
    }
  ],
  '7': [
    {
      id: 'e17',
      name: 'Barry Webber',
      position: 'Chairman',
      department: 'Executive',
      email: 'b.webber@cpfc.co.uk',
      phone: '+44 20 8768 6001',
      joinedDate: 'Nov 2018',
      isKeyContact: true
    },
    {
      id: 'e18',
      name: 'Jim Rodwell',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'j.rodwell@cpfc.co.uk',
      phone: '+44 20 8768 6002',
      joinedDate: 'Feb 2020',
      isKeyContact: true
    }
  ],
  '8': [
    {
      id: 'e19',
      name: 'Colin Chong',
      position: 'Chief Executive',
      department: 'Executive',
      email: 'c.chong@evertonfc.com',
      phone: '+44 151 556 1801',
      joinedDate: 'Jan 2021',
      isKeyContact: true
    },
    {
      id: 'e20',
      name: 'Richard Kenyon',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'r.kenyon@evertonfc.com',
      phone: '+44 151 556 1802',
      joinedDate: 'Jun 2019',
      isKeyContact: true
    }
  ],
  '9': [
    {
      id: 'e21',
      name: 'Alistair Mackintosh',
      position: 'Chief Executive',
      department: 'Executive',
      email: 'a.mackintosh@fulhamfc.com',
      phone: '+44 843 208 1201',
      joinedDate: 'Jul 2017',
      isKeyContact: true
    },
    {
      id: 'e22',
      name: 'Jon Don-Carolis',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'j.doncarolis@fulhamfc.com',
      phone: '+44 843 208 1202',
      joinedDate: 'Sep 2020',
      isKeyContact: true
    }
  ],
  '10': [
    {
      id: 'e23',
      name: 'Mark Ashton',
      position: 'Chief Executive',
      department: 'Executive',
      email: 'm.ashton@itfc.co.uk',
      phone: '+44 1473 400 501',
      joinedDate: 'Nov 2021',
      isKeyContact: true
    },
    {
      id: 'e24',
      name: 'Mike Noye',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'm.noye@itfc.co.uk',
      phone: '+44 1473 400 502',
      joinedDate: 'Mar 2019',
      isKeyContact: true
    }
  ],
  '11': [
    {
      id: 'e25',
      name: 'Susan Whelan',
      position: 'Chief Executive',
      department: 'Executive',
      email: 's.whelan@lcfc.co.uk',
      phone: '+44 344 815 5001',
      linkedin: 'https://linkedin.com/in/susanwhelan',
      joinedDate: 'Jun 2021',
      isKeyContact: true
    },
    {
      id: 'e26',
      name: 'Louise Rushen',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'l.rushen@lcfc.co.uk',
      phone: '+44 344 815 5002',
      joinedDate: 'Jan 2020',
      isKeyContact: true
    }
  ],
  '12': [
    {
      id: 'e27',
      name: 'Billy Hogan',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'b.hogan@liverpoolfc.com',
      phone: '+44 151 263 2301',
      linkedin: 'https://linkedin.com/in/billyhogan',
      joinedDate: 'Sep 2020',
      isKeyContact: true
    },
    {
      id: 'e28',
      name: 'Drew Crisp',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'd.crisp@liverpoolfc.com',
      phone: '+44 151 263 2302',
      joinedDate: 'Mar 2019',
      isKeyContact: true
    },
    {
      id: 'e29',
      name: 'Matt McCann',
      position: 'Communications Director',
      department: 'Marketing',
      email: 'm.mccann@liverpoolfc.com',
      phone: '+44 151 263 2303',
      linkedin: 'https://linkedin.com/in/mattmccann',
      joinedDate: 'Jul 2017',
      isKeyContact: false
    }
  ],
  '13': [
    {
      id: 'e30',
      name: 'Ferran Soriano',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'f.soriano@mancity.com',
      phone: '+44 161 444 1801',
      linkedin: 'https://linkedin.com/in/ferransoriano',
      joinedDate: 'Sep 2012',
      isKeyContact: true
    },
    {
      id: 'e31',
      name: 'Tom Glick',
      position: 'Chief Operating Officer',
      department: 'Operations',
      email: 't.glick@mancity.com',
      phone: '+44 161 444 1802',
      joinedDate: 'Oct 2019',
      isKeyContact: true
    },
    {
      id: 'e32',
      name: 'Nuria Tarre',
      position: 'Marketing Director',
      department: 'Marketing',
      email: 'n.tarre@mancity.com',
      phone: '+44 161 444 1803',
      joinedDate: 'May 2021',
      isKeyContact: false
    }
  ],
  '14': [
    {
      id: 'e33',
      name: 'Omar Berrada',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'o.berrada@manutd.com',
      phone: '+44 161 868 8001',
      linkedin: 'https://linkedin.com/in/omarberrada',
      joinedDate: 'Jan 2024',
      isKeyContact: true
    },
    {
      id: 'e34',
      name: 'Collette Roche',
      position: 'Chief Operating Officer',
      department: 'Operations',
      email: 'c.roche@manutd.com',
      phone: '+44 161 868 8002',
      joinedDate: 'Nov 2019',
      isKeyContact: true
    },
    {
      id: 'e35',
      name: 'Victoria Timpson',
      position: 'Chief Communications Officer',
      department: 'Marketing',
      email: 'v.timpson@manutd.com',
      phone: '+44 161 868 8003',
      linkedin: 'https://linkedin.com/in/victoriatimpson',
      joinedDate: 'Jun 2021',
      isKeyContact: false
    }
  ],
  '15': [
    {
      id: 'e36',
      name: 'Darren Eales',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'd.eales@nufc.co.uk',
      phone: '+44 191 201 8401',
      linkedin: 'https://linkedin.com/in/darreneales',
      joinedDate: 'Jun 2022',
      isKeyContact: true
    },
    {
      id: 'e37',
      name: 'Peter Silverstone',
      position: 'Chief Commercial Officer',
      department: 'Commercial',
      email: 'p.silverstone@nufc.co.uk',
      phone: '+44 191 201 8402',
      joinedDate: 'Jan 2023',
      isKeyContact: true
    }
  ],
  '16': [
    {
      id: 'e38',
      name: 'Dane Murphy',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'd.murphy@nottinghamforest.co.uk',
      phone: '+44 115 982 4401',
      joinedDate: 'Aug 2020',
      isKeyContact: true
    },
    {
      id: 'e39',
      name: 'David Cook',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'd.cook@nottinghamforest.co.uk',
      phone: '+44 115 982 4402',
      joinedDate: 'Feb 2021',
      isKeyContact: true
    }
  ],
  '17': [
    {
      id: 'e40',
      name: 'Phil Parsons',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'p.parsons@southamptonfc.com',
      phone: '+44 23 8022 8501',
      joinedDate: 'Mar 2022',
      isKeyContact: true
    },
    {
      id: 'e41',
      name: 'David Thomas',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'd.thomas@southamptonfc.com',
      phone: '+44 23 8022 8502',
      joinedDate: 'Sep 2020',
      isKeyContact: true
    }
  ],
  '18': [
    {
      id: 'e42',
      name: 'Daniel Levy',
      position: 'Chairman',
      department: 'Executive',
      email: 'd.levy@tottenhamhotspur.com',
      phone: '+44 344 499 5001',
      linkedin: 'https://linkedin.com/in/daniellevy',
      joinedDate: 'Feb 2001',
      isKeyContact: true
    },
    {
      id: 'e43',
      name: 'Todd Kline',
      position: 'Chief Commercial Officer',
      department: 'Commercial',
      email: 't.kline@tottenhamhotspur.com',
      phone: '+44 344 499 5002',
      joinedDate: 'Jul 2019',
      isKeyContact: true
    },
    {
      id: 'e44',
      name: 'Simon Felstein',
      position: 'Communications Director',
      department: 'Marketing',
      email: 's.felstein@tottenhamhotspur.com',
      phone: '+44 344 499 5003',
      joinedDate: 'Jan 2018',
      isKeyContact: false
    }
  ],
  '19': [
    {
      id: 'e45',
      name: 'Nathan Thompson',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'n.thompson@whufc.com',
      phone: '+44 20 8548 2701',
      joinedDate: 'May 2023',
      isKeyContact: true
    },
    {
      id: 'e46',
      name: 'Karim Virani',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'k.virani@whufc.com',
      phone: '+44 20 8548 2702',
      joinedDate: 'Nov 2020',
      isKeyContact: true
    }
  ],
  '20': [
    {
      id: 'e47',
      name: 'Russell Jones',
      position: 'Chief Executive Officer',
      department: 'Executive',
      email: 'r.jones@wolves.co.uk',
      phone: '+44 871 222 2201',
      joinedDate: 'Jun 2016',
      isKeyContact: true
    },
    {
      id: 'e48',
      name: 'Laurie Dalrymple',
      position: 'Commercial Director',
      department: 'Commercial',
      email: 'l.dalrymple@wolves.co.uk',
      phone: '+44 871 222 2202',
      joinedDate: 'Aug 2019',
      isKeyContact: true
    }
  ]
};

const getTeamLogo = (teamName: string) => {
  const logoMap: Record<string, string> = {
    'Arsenal FC': arsenalLogo,
    'Chelsea FC': chelseaLogo,
    'Liverpool FC': liverpoolLogo,
    'Manchester United FC': manchesterUnitedLogo,
    'Manchester City FC': manchesterCityLogo,
    'Tottenham Hotspur FC': tottenhamLogo,
    'Newcastle United FC': newcastleLogo,
    'Aston Villa FC': astonVillaLogo,
    'AFC Bournemouth': bournemouthLogo,
    'Brentford FC': brentfordLogo,
    'Brighton & Hove Albion FC': brightonLogo,
    'Crystal Palace FC': crystalPalaceLogo,
    'Everton FC': evertonLogo,
    'Fulham FC': fulhamLogo,
    'Ipswich Town FC': ipswichLogo,
    'Leicester City FC': leicesterLogo,
    'Nottingham Forest FC': nottinghamForestLogo,
    'Southampton FC': southamptonLogo,
    'West Ham United FC': westHamLogo,
    'Wolverhampton Wanderers FC': wolvesLogo
  };
  return logoMap[teamName] || arsenalLogo;
};

const OrganisationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addedToList, setAddedToList] = useState<string[]>([]);

  const organisation = id ? organisationsData[id] : null;
  const employees = id ? employeesData[id] || [] : [];

  if (!organisation) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Organisation Not Found</h2>
          <p className="text-gray-600 mb-4">The organisation you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/crm/discover')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discover
          </Button>
        </Card>
      </div>
    );
  }

  const handleAddEmployeeToList = (employee: Employee) => {
    setAddedToList([...addedToList, employee.id]);
    toast({
      title: "Added to List",
      description: `${employee.name} has been added to your contact list.`,
    });
  };

  const handleAddAllToList = () => {
    const newEmployeeIds = employees.map(emp => emp.id);
    setAddedToList([...addedToList, ...newEmployeeIds]);
    toast({
      title: "Added to List",
      description: `All ${employees.length} employees have been added to your contact list.`,
    });
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Executive': 'bg-purple-100 text-purple-800',
      'Commercial': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-green-100 text-green-800',
      'Operations': 'bg-orange-100 text-orange-800',
      'Finance': 'bg-indigo-100 text-indigo-800',
      'Technology': 'bg-gray-100 text-gray-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'hover:bg-blue-50 hover:text-blue-600';
      case 'facebook':
        return 'hover:bg-blue-50 hover:text-blue-800';
      case 'instagram':
        return 'hover:bg-pink-50 hover:text-pink-600';
      case 'linkedin':
        return 'hover:bg-blue-50 hover:text-blue-700';
      case 'youtube':
        return 'hover:bg-red-50 hover:text-red-600';
      default:
        return 'hover:bg-gray-50 hover:text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/crm/discover')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Discover
          </Button>
        </div>

        {/* Organization Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={getTeamLogo(organisation.name)} 
                  alt={`${organisation.name} logo`}
                  className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                />
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{organisation.name}</h1>
                    <div className="flex items-center gap-4 mb-3">
                      <Badge className="bg-green-100 text-green-800">{organisation.type}</Badge>
                      <Badge variant="outline">{organisation.sport}</Badge>
                      <Badge variant="outline">{organisation.league}</Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Founded {organisation.foundedYear}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{organisation.location}, {organisation.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{organisation.employees} employees</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stadium Info */}
                {organisation.stadium && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Stadium Information</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span><strong>Home:</strong> {organisation.stadium}</span>
                      {organisation.capacity && <span><strong>Capacity:</strong> {organisation.capacity.toLocaleString()}</span>}
                      {organisation.manager && <span><strong>Manager:</strong> {organisation.manager}</span>}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="flex items-center gap-6 mb-4">
                  {organisation.website && (
                    <a 
                      href={organisation.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Website</span>
                    </a>
                  )}
                  {organisation.email && (
                    <a 
                      href={`mailto:${organisation.email}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                  )}
                  {organisation.phone && (
                    <a 
                      href={`tel:${organisation.phone}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{organisation.phone}</span>
                    </a>
                  )}
                </div>

                {/* Social Media */}
                {organisation.socialMedia && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
                    <div className="flex items-center gap-3">
                      {Object.entries(organisation.socialMedia).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg border border-gray-200 transition-colors ${getSocialColor(platform)}`}
                          title={`Follow on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                        >
                          {getSocialIcon(platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        {organisation.description && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About {organisation.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{organisation.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Employees Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Key Employees ({employees.length})
                </CardTitle>
                <p className="text-gray-600 mt-1">Decision makers and key contacts at {organisation.name}</p>
              </div>
              <Button 
                onClick={handleAddAllToList}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
                disabled={employees.every(emp => addedToList.includes(emp.id))}
              >
                <UserPlus className="h-4 w-4" />
                Add All to List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <Card key={employee.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{employee.name}</h4>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                        </div>
                      </div>
                      {employee.isKeyContact && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          Key Contact
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <Badge className={`text-xs ${getDepartmentColor(employee.department)}`}>
                        {employee.department}
                      </Badge>
                      <p className="text-xs text-gray-500">Joined {employee.joinedDate}</p>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <a href={`mailto:${employee.email}`} className="text-blue-600 hover:underline text-xs">
                          {employee.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <a href={`tel:${employee.phone}`} className="text-gray-600 text-xs">
                          {employee.phone}
                        </a>
                      </div>
                      {employee.linkedin && (
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-3 w-3 text-gray-400" />
                          <a 
                            href={employee.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>

                    <Button 
                      size="sm" 
                      onClick={() => handleAddEmployeeToList(employee)}
                      disabled={addedToList.includes(employee.id)}
                      className="w-full gap-2"
                    >
                      <Plus className="h-3 w-3" />
                      {addedToList.includes(employee.id) ? 'Added to List' : 'Add to List'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {employees.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Employee Data Available</h3>
                <p className="text-gray-600">Employee information for this organization is not currently available.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganisationDetail;