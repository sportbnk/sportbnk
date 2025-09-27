import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Plus, 
  Filter,
  Building2,
  MapPin,
  Users,
  ExternalLink,
  Mail,
  Phone,
  LinkedinIcon
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
}

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  organisation: string;
  email: string;
  phone: string;
  linkedin?: string;
  location: string;
  department: string;
}

const premierLeagueTeams: Organisation[] = [
  {
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
    phone: '+44 20 7619 5003'
  },
  {
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
    phone: '+44 121 327 2299'
  },
  {
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
    phone: '+44 1202 726 300'
  },
  {
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
    phone: '+44 20 8847 2511'
  },
  {
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
    phone: '+44 1273 695 400'
  },
  {
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
    phone: '+44 871 984 1955'
  },
  {
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
    phone: '+44 20 8768 6000'
  },
  {
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
    phone: '+44 151 556 1878'
  },
  {
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
    phone: '+44 843 208 1222'
  },
  {
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
    phone: '+44 1473 400 500'
  },
  {
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
    phone: '+44 344 815 5000'
  },
  {
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
    phone: '+44 151 263 2361'
  },
  {
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
    phone: '+44 161 444 1894'
  },
  {
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
    phone: '+44 161 868 8000'
  },
  {
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
    phone: '+44 191 201 8400'
  },
  {
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
    phone: '+44 115 982 4444'
  },
  {
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
    phone: '+44 23 8022 8575'
  },
  {
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
    phone: '+44 344 499 5000'
  },
  {
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
    email: 'info@westhamunited.co.uk',
    phone: '+44 20 8548 2748'
  },
  {
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
    phone: '+44 20 8548 2748'
  },
  {
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
    phone: '+44 871 222 2220'
  }
];

// Import employee data from OrganisationDetail
const employeesData: Record<string, any[]> = {
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

// Function to convert employee data to Person format
const convertEmployeesToPeople = (): Person[] => {
  const people: Person[] = [];
  
  Object.entries(employeesData).forEach(([orgId, employees]) => {
    const organization = premierLeagueTeams.find(org => org.id === orgId);
    if (!organization) return;
    
    employees.forEach((employee) => {
      const [firstName, ...lastNameParts] = employee.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      people.push({
        id: employee.id,
        firstName,
        lastName,
        position: employee.position,
        organisation: organization.name,
        email: employee.email,
        phone: employee.phone,
        linkedin: employee.linkedin,
        location: organization.location,
        department: employee.department
      });
    });
  });
  
  return people;
};

const mockPeople: Person[] = convertEmployeesToPeople();

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

const Discover = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganisations, setSelectedOrganisations] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('organisations');

  const filteredOrganisations = premierLeagueTeams.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPeople = mockPeople.filter(person =>
    `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.organisation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectOrganisation = (orgId: string) => {
    setSelectedOrganisations(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  const handleSelectPerson = (personId: string) => {
    setSelectedPeople(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handleSelectAllOrganisations = () => {
    if (selectedOrganisations.length === filteredOrganisations.length) {
      setSelectedOrganisations([]);
    } else {
      setSelectedOrganisations(filteredOrganisations.map(org => org.id));
    }
  };

  const handleSelectAllPeople = () => {
    if (selectedPeople.length === filteredPeople.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(filteredPeople.map(person => person.id));
    }
  };

  const handleAddToList = () => {
    const selectedCount = activeTab === 'organisations' ? selectedOrganisations.length : selectedPeople.length;
    const itemType = activeTab === 'organisations' ? 'organisation' : 'person';
    
    if (selectedCount === 0) {
      toast({
        title: "No Selection",
        description: `Please select ${itemType}s to add to your list.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to List",
      description: `Successfully added ${selectedCount} ${selectedCount === 1 ? itemType : `${itemType}s`} to your list.`,
    });
    
    if (activeTab === 'organisations') {
      setSelectedOrganisations([]);
    } else {
      setSelectedPeople([]);
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Football Club': 'bg-green-100 text-green-800',
      'Cricket Club': 'bg-blue-100 text-blue-800',
      'Rugby Club': 'bg-purple-100 text-purple-800',
      'Basketball Club': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Executive': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-blue-100 text-blue-800',
      'Commercial': 'bg-green-100 text-green-800',
      'Communications': 'bg-orange-100 text-orange-800',
      'Operations': 'bg-gray-100 text-gray-800',
      'Academy': 'bg-yellow-100 text-yellow-800',
      'Football Operations': 'bg-red-100 text-red-800',
      'Finance': 'bg-indigo-100 text-indigo-800'
    };
    return colors[department] || 'bg-gray-100 text-gray-800';
  };

  const selectedCount = activeTab === 'organisations' ? selectedOrganisations.length : selectedPeople.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discover</h1>
            <p className="text-gray-600 mt-1">Explore and discover Premier League football teams and contacts</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleAddToList}
              disabled={selectedCount === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to My List ({selectedCount})
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={activeTab === 'organisations' 
                    ? "Search organisations by name, type, sport, league, or location..." 
                    : "Search people by name, position, organisation, or department..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="organisations">Organisations</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>
          
          <TabsContent value="organisations" className="mt-6">
            <Card>
              <CardContent className="p-0">
                {filteredOrganisations.length > 0 && (
                  <div className="flex items-center gap-4 p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all-orgs"
                        checked={selectedOrganisations.length === filteredOrganisations.length}
                        onCheckedChange={handleSelectAllOrganisations}
                      />
                      <label htmlFor="select-all-orgs" className="text-sm font-medium">
                        Select All ({filteredOrganisations.length})
                      </label>
                    </div>
                    {selectedOrganisations.length > 0 && (
                      <Badge variant="secondary">
                        {selectedOrganisations.length} selected
                      </Badge>
                    )}
                  </div>
                )}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedOrganisations.length === filteredOrganisations.length && filteredOrganisations.length > 0}
                          onCheckedChange={handleSelectAllOrganisations}
                        />
                      </TableHead>
                      <TableHead>Organisation</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>League</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrganisations.map((org) => (
                      <TableRow key={org.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox
                            checked={selectedOrganisations.includes(org.id)}
                            onCheckedChange={() => handleSelectOrganisation(org.id)}
                          />
                        </TableCell>
                         <TableCell>
                           <div className="flex items-center gap-3">
                             <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-white">
                               <img 
                                 src={getTeamLogo(org.name)} 
                                 alt={`${org.name} logo`}
                                 className="w-8 h-8 object-contain"
                               />
                             </div>
                             <div>
                               <button 
                                 onClick={() => navigate(`/crm/discover/organisation/${org.id}`)}
                                 className="font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer text-left"
                               >
                                 {org.name}
                               </button>
                               <div className="text-sm text-gray-500">Est. {org.foundedYear}</div>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getTypeColor(org.type)}`}>
                            {org.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {org.sport}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700">{org.league}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{org.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{org.employees}</span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {org.email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600 truncate max-w-32">
                                  {org.email}
                                </span>
                              </div>
                            )}
                            {org.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-600">
                                  {org.phone}
                                </span>
                              </div>
                            )}
                            {org.website && (
                              <div className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3 text-gray-400" />
                                <a 
                                  href={org.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Website
                                </a>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredOrganisations.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No organisations found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="people" className="mt-6">
            <Card>
              <CardContent className="p-0">
                {filteredPeople.length > 0 && (
                  <div className="flex items-center gap-4 p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all-people"
                        checked={selectedPeople.length === filteredPeople.length}
                        onCheckedChange={handleSelectAllPeople}
                      />
                      <label htmlFor="select-all-people" className="text-sm font-medium">
                        Select All ({filteredPeople.length})
                      </label>
                    </div>
                    {selectedPeople.length > 0 && (
                      <Badge variant="secondary">
                        {selectedPeople.length} selected
                      </Badge>
                    )}
                  </div>
                )}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedPeople.length === filteredPeople.length && filteredPeople.length > 0}
                          onCheckedChange={handleSelectAllPeople}
                        />
                      </TableHead>
                      <TableHead>Person</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Organisation</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPeople.map((person) => (
                      <TableRow key={person.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox
                            checked={selectedPeople.includes(person.id)}
                            onCheckedChange={() => handleSelectPerson(person.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {person.firstName[0]}{person.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">
                                {person.firstName} {person.lastName}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-700">{person.position}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">{person.organisation}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getDepartmentColor(person.department)}`}>
                            {person.department}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">{person.location}</span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600 truncate max-w-32">
                                {person.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {person.phone}
                              </span>
                            </div>
                            {person.linkedin && (
                              <div className="flex items-center gap-1">
                                <LinkedinIcon className="h-3 w-3 text-gray-400" />
                                <a 
                                  href={person.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  LinkedIn
                                </a>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredPeople.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No people found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Discover;