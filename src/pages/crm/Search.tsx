import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Building2, 
  Plus,
  Filter,
  X,
  Users,
  Mail,
  Phone,
  ExternalLink,
  Eye
} from 'lucide-react';
import { Team, Sport, Country, City } from '@/types/teams';

// Premier League Organizations data
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
  logoUrl?: string;
  description?: string;
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

// Contact type for people view
type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  team_id: string;
  email: string;
  mobile: string;
  phone: string;
  linkedin: string;
  teams?: {
    name: string;
  };
};

// Import team logos
import arsenalLogo from "@/assets/team-logos/arsenal.png";
import chelseaLogo from "@/assets/team-logos/chelsea.png";
import liverpoolLogo from "@/assets/team-logos/liverpool.png";
import manchesterUnitedLogo from "@/assets/team-logos/manchester-united.png";
import manchesterCityLogo from "@/assets/team-logos/manchester-city.png";
import tottenhamLogo from "@/assets/team-logos/tottenham.png";
import newcastleLogo from "@/assets/team-logos/newcastle.png";
import brightonLogo from "@/assets/team-logos/brighton.png";
import astonVillaLogo from "@/assets/team-logos/aston-villa.png";
import brentfordLogo from "@/assets/team-logos/brentford.png";
import bournemouthLogo from "@/assets/team-logos/bournemouth.png";
import burnleyLogo from "@/assets/team-logos/burnley.png";
import cardiffCityLogo from "@/assets/team-logos/cardiff-city.png";
import coventryLogo from "@/assets/team-logos/coventry-city.png";
import crystalPalaceLogo from "@/assets/team-logos/crystal-palace.png";
import derbyCountyLogo from "@/assets/team-logos/derby-county.png";
import evertonLogo from "@/assets/team-logos/everton.png";
import fulhamLogo from "@/assets/team-logos/fulham.png";
import huddersLogo from "@/assets/team-logos/huddersfield-town.png";
import hullCityLogo from "@/assets/team-logos/hull-city.png";
import ipswichLogo from "@/assets/team-logos/ipswich-town.png";
import leedsLogo from "@/assets/team-logos/leeds-united.png";
import leicesterLogo from "@/assets/team-logos/leicester.png";
import lutonLogo from "@/assets/team-logos/luton-town.png";
import middlesbroughLogo from "@/assets/team-logos/middlesbrough.png";
import millwallLogo from "@/assets/team-logos/millwall.png";
import norwichLogo from "@/assets/team-logos/norwich-city.png";
import nottinghamForestLogo from "@/assets/team-logos/nottingham-forest.png";
import plymouthLogo from "@/assets/team-logos/plymouth-argyle.png";
import prestonLogo from "@/assets/team-logos/preston-north-end.png";
import qprLogo from "@/assets/team-logos/queens-park-rangers.png";
import sheffieldUnitedLogo from "@/assets/team-logos/sheffield-united.png";
import sheffieldWedLogo from "@/assets/team-logos/sheffield-wednesday.png";
import stokeLogo from "@/assets/team-logos/stoke-city.png";
import sunderlandLogo from "@/assets/team-logos/sunderland.png";
import swanseaLogo from "@/assets/team-logos/swansea-city.png";
import watfordLogo from "@/assets/team-logos/watford.png";
import westBromLogo from "@/assets/team-logos/west-bromwich-albion.png";
import westHamLogo from "@/assets/team-logos/west-ham.png";
import wolvesLogo from "@/assets/team-logos/wolves.png";
import rotherhamLogo from "@/assets/team-logos/rotherham-united.png";
import readingLogo from "@/assets/team-logos/reading.png";
import blackburnLogo from "@/assets/team-logos/blackburn-rovers.png";
import boltonLogo from "@/assets/team-logos/bolton-wanderers.png";
import charltonLogo from "@/assets/team-logos/charlton-athletic.png";
import birminghamLogo from "@/assets/team-logos/birmingham-city.png";
import bristolCityLogo from "@/assets/team-logos/bristol-city.png";
import barnsley from "@/assets/team-logos/barnsley.png";
import bradfordLogo from "@/assets/team-logos/bradford-city.png";
import blackpoolLogo from "@/assets/team-logos/blackpool.png";
import burtonLogo from "@/assets/team-logos/burton-albion.png";
import bristolRoversLogo from "@/assets/team-logos/bristol-rovers.png";
import carlisleLogo from "@/assets/team-logos/carlisle-united.png";
import cambridgeLogo from "@/assets/team-logos/cambridge-united.png";
import chesterfieldLogo from "@/assets/team-logos/chesterfield.png";
import colchesterLogo from "@/assets/team-logos/colchester-united.png";
import creweAlexLogo from "@/assets/team-logos/crewe-alexandra.png";
import crawleyLogo from "@/assets/team-logos/crawley-town.png";
import cheltenhamLogo from "@/assets/team-logos/cheltenham-town.png";
import doncasterLogo from "@/assets/team-logos/doncaster-rovers.png";
import exeterLogo from "@/assets/team-logos/exeter-city.png";
import fleetwoodLogo from "@/assets/team-logos/fleetwood-town.png";
import gillinghamLogo from "@/assets/team-logos/gillingham.png";
import grimsbyLogo from "@/assets/team-logos/grimsby-town.png";
import harrogatelogo from "@/assets/team-logos/harrogate-town.png";
import leytonOrientLogo from "@/assets/team-logos/leyton-orient.png";
import lincolnLogo from "@/assets/team-logos/lincoln-city.png";
import mkDonsLogo from "@/assets/team-logos/mk-dons.png";
import morecambeLogo from "@/assets/team-logos/morecambe.png";
import newportLogo from "@/assets/team-logos/newport-county.png";
import northamptonLogo from "@/assets/team-logos/northampton-town.png";
import nottsCountyLogo from "@/assets/team-logos/notts-county.png";
import oxfordLogo from "@/assets/team-logos/oxford-united.png";
import peterboroughLogo from "@/assets/team-logos/peterborough-united.png";
import portValeLogo from "@/assets/team-logos/port-vale.png";
import portsmouthLogo from "@/assets/team-logos/portsmouth.png";
import salfordLogo from "@/assets/team-logos/salford-city.png";
import shrewsburyLogo from "@/assets/team-logos/shrewsbury-town.png";
import stevenageLogo from "@/assets/team-logos/stevenage.png";
import stockportLogo from "@/assets/team-logos/stockport-county.png";
import swindonLogo from "@/assets/team-logos/swindon-town.png";
import tranmereLogo from "@/assets/team-logos/tranmere-rovers.png";
import walsallLogo from "@/assets/team-logos/walsall.png";
import wiganLogo from "@/assets/team-logos/wigan-athletic.png";
import wrexhamLogo from "@/assets/team-logos/wrexham.png";
import accringtonLogo from "@/assets/team-logos/accrington-stanley.png";
import afcWimbledonLogo from "@/assets/team-logos/afc-wimbledon.png";
import barrowLogo from "@/assets/team-logos/barrow.png";
import bromleyLogo from "@/assets/team-logos/bromley.png";

// Cricket logos
import bedfordshireCricketLogo from "@/assets/team-logos/bedfordshire-cricket.png";
import berkshireCricketLogo from "@/assets/team-logos/berkshire-cricket.png";
import buckinghamshireCricketLogo from "@/assets/team-logos/buckinghamshire-cricket.png";
import cambridgeshireCricketLogo from "@/assets/team-logos/cambridgeshire-cricket.png";
import cheshireCricketLogo from "@/assets/team-logos/cheshire-cricket.png";
import cornwallCricketLogo from "@/assets/team-logos/cornwall-cricket.png";
import cumberlandCricketLogo from "@/assets/team-logos/cumberland-cricket.png";
import derbyshireCricketLogo from "@/assets/team-logos/derbyshire-cricket.png";
import devonCricketLogo from "@/assets/team-logos/devon-cricket.png";
import dorsetCricketLogo from "@/assets/team-logos/dorset-cricket.png";
import durhamCricketLogo from "@/assets/team-logos/durham-cricket.png";
import essexCricketLogo from "@/assets/team-logos/essex-cricket.png";
import glamorganCricketLogo from "@/assets/team-logos/glamorgan-cricket.png";
import gloucestershireCricketLogo from "@/assets/team-logos/gloucestershire-cricket.png";
import hampshireCricketLogo from "@/assets/team-logos/hampshire-cricket.png";
import hertfordshireCricketLogo from "@/assets/team-logos/hertfordshire-cricket.png";
import kentCricketLogo from "@/assets/team-logos/kent-cricket.png";
import lancashireCricketLogo from "@/assets/team-logos/lancashire-cricket.png";
import leicestershireCricketLogo from "@/assets/team-logos/leicestershire-cricket.png";
import leinsterLightningCricketLogo from "@/assets/team-logos/leinster-lightning-cricket.png";
import lincolnshireCricketLogo from "@/assets/team-logos/lincolnshire-cricket.png";
import middlesexCricketLogo from "@/assets/team-logos/middlesex-cricket.png";
import munsterCricketLogo from "@/assets/team-logos/munster-cricket.png";
import ncuCricketLogo from "@/assets/team-logos/ncu-cricket.png";
import norfolkCricketLogo from "@/assets/team-logos/norfolk-cricket.png";
import northWestWarriorsCricketLogo from "@/assets/team-logos/north-west-warriors-cricket.png";
import northamptonshireCricketLogo from "@/assets/team-logos/northamptonshire-cricket.png";
import northumberlandCricketLogo from "@/assets/team-logos/northumberland-cricket.png";
import nottinghamshireCricketLogo from "@/assets/team-logos/nottinghamshire-cricket.png";
import oxfordshireCricketLogo from "@/assets/team-logos/oxfordshire-cricket.png";
import shropshireCricketLogo from "@/assets/team-logos/shropshire-cricket.png";
import somersetCricketLogo from "@/assets/team-logos/somerset-cricket.png";
import staffordshireCricketLogo from "@/assets/team-logos/staffordshire-cricket.png";
import suffolkCricketLogo from "@/assets/team-logos/suffolk-cricket.png";
import surreyCricketLogo from "@/assets/team-logos/surrey-cricket.png";
import sussexCricketLogo from "@/assets/team-logos/sussex-cricket.png";
import walesMinorCountiesCricketLogo from "@/assets/team-logos/wales-minor-counties-cricket.png";
import warwickshireCricketLogo from "@/assets/team-logos/warwickshire-cricket.png";
import wiltshireCricketLogo from "@/assets/team-logos/wiltshire-cricket.png";
import worcestershireCricketLogo from "@/assets/team-logos/worcestershire-cricket.png";
import yorkshireCricketLogo from "@/assets/team-logos/yorkshire-cricket.png";

// National team logos
import englandNationalLogo from "@/assets/team-logos/england-national.png";
import englandCricketNationalLogo from "@/assets/team-logos/england-cricket-national.png";
import irelandNationalLogo from "@/assets/team-logos/ireland-national.png";
import irelandCricketNationalLogo from "@/assets/team-logos/ireland-cricket-national.png";
import northernIrelandNationalLogo from "@/assets/team-logos/northern-ireland-national.png";
import scotlandNationalLogo from "@/assets/team-logos/scotland-national.png";
import scotlandCricketNationalLogo from "@/assets/team-logos/scotland-cricket-national.png";
import walesNationalLogo from "@/assets/team-logos/wales-national.png";

// Team logo mapping function
const getTeamLogo = (teamName: string): string | null => {
  const logoMap: { [key: string]: string } = {
    // Premier League and Championship teams
    "Arsenal": arsenalLogo,
    "Chelsea": chelseaLogo,
    "Liverpool": liverpoolLogo,
    "Manchester United": manchesterUnitedLogo,
    "Manchester City": manchesterCityLogo,
    "Tottenham Hotspur": tottenhamLogo,
    "Newcastle United": newcastleLogo,
    "Brighton & Hove Albion": brightonLogo,
    "Aston Villa": astonVillaLogo,
    "Brentford": brentfordLogo,
    "AFC Bournemouth": bournemouthLogo,
    "Burnley": burnleyLogo,
    "Cardiff City": cardiffCityLogo,
    "Coventry City": coventryLogo,
    "Crystal Palace": crystalPalaceLogo,
    "Derby County": derbyCountyLogo,
    "Everton": evertonLogo,
    "Fulham": fulhamLogo,
    "Huddersfield Town": huddersLogo,
    "Hull City": hullCityLogo,
    "Ipswich Town": ipswichLogo,
    "Leeds United": leedsLogo,
    "Leicester City": leicesterLogo,
    "Luton Town": lutonLogo,
    "Middlesbrough": middlesbroughLogo,
    "Millwall": millwallLogo,
    "Norwich City": norwichLogo,
    "Nottingham Forest": nottinghamForestLogo,
    "Plymouth Argyle": plymouthLogo,
    "Preston North End": prestonLogo,
    "Queens Park Rangers": qprLogo,
    "Sheffield United": sheffieldUnitedLogo,
    "Sheffield Wednesday": sheffieldWedLogo,
    "Stoke City": stokeLogo,
    "Sunderland": sunderlandLogo,
    "Swansea City": swanseaLogo,
    "Watford": watfordLogo,
    "West Bromwich Albion": westBromLogo,
    "West Ham United": westHamLogo,
    "Wolverhampton Wanderers": wolvesLogo,
    "Rotherham United": rotherhamLogo,
    "Reading": readingLogo,
    "Blackburn Rovers": blackburnLogo,
    "Bolton Wanderers": boltonLogo,
    "Charlton Athletic": charltonLogo,
    "Birmingham City": birminghamLogo,
    "Bristol City": bristolCityLogo,
    "Barnsley": barnsley,
    "Bradford City": bradfordLogo,
    "Blackpool": blackpoolLogo,
    "Burton Albion": burtonLogo,
    "Bristol Rovers": bristolRoversLogo,
    "Carlisle United": carlisleLogo,
    "Cambridge United": cambridgeLogo,
    "Chesterfield": chesterfieldLogo,
    "Colchester United": colchesterLogo,
    "Crewe Alexandra": creweAlexLogo,
    "Crawley Town": crawleyLogo,
    "Cheltenham Town": cheltenhamLogo,
    "Doncaster Rovers": doncasterLogo,
    "Exeter City": exeterLogo,
    "Fleetwood Town": fleetwoodLogo,
    "Gillingham": gillinghamLogo,
    "Grimsby Town": grimsbyLogo,
    "Harrogate Town": harrogatelogo,
    "Leyton Orient": leytonOrientLogo,
    "Lincoln City": lincolnLogo,
    "MK Dons": mkDonsLogo,
    "Morecambe": morecambeLogo,
    "Newport County": newportLogo,
    "Northampton Town": northamptonLogo,
    "Notts County": nottsCountyLogo,
    "Oxford United": oxfordLogo,
    "Peterborough United": peterboroughLogo,
    "Port Vale": portValeLogo,
    "Portsmouth": portsmouthLogo,
    "Salford City": salfordLogo,
    "Shrewsbury Town": shrewsburyLogo,
    "Stevenage": stevenageLogo,
    "Stockport County": stockportLogo,
    "Swindon Town": swindonLogo,
    "Tranmere Rovers": tranmereLogo,
    "Walsall": walsallLogo,
    "Wigan Athletic": wiganLogo,
    "Wrexham": wrexhamLogo,
    "Accrington Stanley": accringtonLogo,
    "AFC Wimbledon": afcWimbledonLogo,
    "Barrow": barrowLogo,
    "Bromley": bromleyLogo,

    // Cricket teams
    "Bedfordshire Cricket": bedfordshireCricketLogo,
    "Berkshire Cricket": berkshireCricketLogo,
    "Buckinghamshire Cricket": buckinghamshireCricketLogo,
    "Cambridgeshire Cricket": cambridgeshireCricketLogo,
    "Cheshire Cricket": cheshireCricketLogo,
    "Cornwall Cricket": cornwallCricketLogo,
    "Cumberland Cricket": cumberlandCricketLogo,
    "Derbyshire Cricket": derbyshireCricketLogo,
    "Devon Cricket": devonCricketLogo,
    "Dorset Cricket": dorsetCricketLogo,
    "Durham Cricket": durhamCricketLogo,
    "Essex Cricket": essexCricketLogo,
    "Glamorgan Cricket": glamorganCricketLogo,
    "Gloucestershire Cricket": gloucestershireCricketLogo,
    "Hampshire Cricket": hampshireCricketLogo,
    "Hertfordshire Cricket": hertfordshireCricketLogo,
    "Kent Cricket": kentCricketLogo,
    "Lancashire Cricket": lancashireCricketLogo,
    "Leicestershire Cricket": leicestershireCricketLogo,
    "Leinster Lightning Cricket": leinsterLightningCricketLogo,
    "Lincolnshire Cricket": lincolnshireCricketLogo,
    "Middlesex Cricket": middlesexCricketLogo,
    "Munster Cricket": munsterCricketLogo,
    "NCU Cricket": ncuCricketLogo,
    "Norfolk Cricket": norfolkCricketLogo,
    "North West Warriors Cricket": northWestWarriorsCricketLogo,
    "Northamptonshire Cricket": northamptonshireCricketLogo,
    "Northumberland Cricket": northumberlandCricketLogo,
    "Nottinghamshire Cricket": nottinghamshireCricketLogo,
    "Oxfordshire Cricket": oxfordshireCricketLogo,
    "Shropshire Cricket": shropshireCricketLogo,
    "Somerset Cricket": somersetCricketLogo,
    "Staffordshire Cricket": staffordshireCricketLogo,
    "Suffolk Cricket": suffolkCricketLogo,
    "Surrey Cricket": surreyCricketLogo,
    "Sussex Cricket": sussexCricketLogo,
    "Wales Minor Counties Cricket": walesMinorCountiesCricketLogo,
    "Warwickshire Cricket": warwickshireCricketLogo,
    "Wiltshire Cricket": wiltshireCricketLogo,
    "Worcestershire Cricket": worcestershireCricketLogo,
    "Yorkshire Cricket": yorkshireCricketLogo,

    // National teams
    "England National Team": englandNationalLogo,
    "England Cricket National Team": englandCricketNationalLogo,
    "Ireland National Team": irelandNationalLogo,
    "Ireland Cricket National Team": irelandCricketNationalLogo,
    "Northern Ireland National Team": northernIrelandNationalLogo,
    "Scotland National Team": scotlandNationalLogo,
    "Scotland Cricket National Team": scotlandCricketNationalLogo,
    "Wales National Team": walesNationalLogo,
  };

  return logoMap[teamName] || null;
};

// Fetch data function
const fetchData = async () => {
  try {
    const [teamsResult, contactsResult, sportsResult, countriesResult, citiesResult] = await Promise.all([
      supabase
        .from('teams')
        .select(`
          *,
          sports(name),
          countries(name),
          cities(name, countries(name))
        `),
      supabase
        .from('contacts')
        .select(`
          *,
          teams(name)
        `),
      supabase.from('sports').select('*'),
      supabase.from('countries').select('*'),
      supabase.from('cities').select('*, countries(name)')
    ]);

    if (teamsResult.error) throw teamsResult.error;
    if (contactsResult.error) throw contactsResult.error;
    if (sportsResult.error) throw sportsResult.error;
    if (countriesResult.error) throw countriesResult.error;
    if (citiesResult.error) throw citiesResult.error;

    return {
      teams: teamsResult.data || [],
      contacts: contactsResult.data || [],
      sports: sportsResult.data || [],
      countries: countriesResult.data || [],
      cities: citiesResult.data || []
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      teams: [],
      contacts: [],
      sports: [],
      countries: [],
      cities: []
    };
  }
};

const Discover = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("organizations");
  const [teams, setTeams] = useState<Organisation[]>(premierLeagueTeams);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Organisation[]>(premierLeagueTeams);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filter states for organizations
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  
  // Filter states for people
  const [peopleSearchQuery, setPeopleSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  
  // Individual reveal states for each field
  const [revealedEmails, setRevealedEmails] = useState<Set<string>>(new Set());
  const [revealedPhones, setRevealedPhones] = useState<Set<string>>(new Set());
  const [revealedLinkedIns, setRevealedLinkedIns] = useState<Set<string>>(new Set());

  // Pagination for organizations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  // Pagination for people
  const [peopleCurrentPage, setPeopleCurrentPage] = useState(1);

  // Load data on component mount
  useEffect(() => {
    // No need to fetch data since we're using static Premier League data
    setLoading(false);
  }, []);

  // Filter teams effect
  useEffect(() => {
    let filtered = teams;

    if (searchQuery) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTeams(filtered);
    setCurrentPage(1);
  }, [teams, searchQuery]);

  // Filter contacts effect
  useEffect(() => {
    let filtered = contacts;

    if (peopleSearchQuery) {
      filtered = filtered.filter(contact =>
        `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(peopleSearchQuery.toLowerCase()) ||
        contact.position?.toLowerCase().includes(peopleSearchQuery.toLowerCase()) ||
        contact.email?.toLowerCase().includes(peopleSearchQuery.toLowerCase()) ||
        contact.teams?.name?.toLowerCase().includes(peopleSearchQuery.toLowerCase())
      );
    }

    if (selectedTeam && selectedTeam !== "all") {
      filtered = filtered.filter(contact => contact.team_id === selectedTeam);
    }

    if (selectedRole && selectedRole !== "all") {
      filtered = filtered.filter(contact => 
        contact.position?.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
    setPeopleCurrentPage(1);
  }, [contacts, peopleSearchQuery, selectedTeam, selectedRole]);

  // Pagination calculations for organizations
  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTeams = filteredTeams.slice(startIndex, endIndex);

  // Pagination calculations for people  
  const peopleTotalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const peopleStartIndex = (peopleCurrentPage - 1) * itemsPerPage;
  const peopleEndIndex = peopleStartIndex + itemsPerPage;
  const paginatedContacts = filteredContacts.slice(peopleStartIndex, peopleEndIndex);

  // Clear filters functions
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSport("all");
    setSelectedCountry("all");
    setSelectedCity("all");
    setSelectedLevel("all");
  };

  const clearPeopleFilters = () => {
    setPeopleSearchQuery("");
    setSelectedTeam("all");
    setSelectedRole("all");
  };

  const hasActiveFilters = searchQuery || (selectedSport && selectedSport !== "all") || (selectedCountry && selectedCountry !== "all") || (selectedCity && selectedCity !== "all") || (selectedLevel && selectedLevel !== "all");
  const hasPeopleActiveFilters = peopleSearchQuery || (selectedTeam && selectedTeam !== "all") || (selectedRole && selectedRole !== "all");

  // Get unique roles from contacts
  const uniqueRoles = Array.from(new Set(contacts.map(contact => contact.position).filter(Boolean)));
  
  // Generate dummy phone and LinkedIn data
  const generateDummyPhone = (contactId: string) => {
    const phones = ['+44 7700 900123', '+44 7700 900456', '+44 7700 900789', '+44 7700 900012'];
    const hash = contactId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return phones[hash % phones.length];
  };
  
  const generateDummyLinkedIn = (firstName: string, lastName: string) => {
    return `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
  };
  
  // Individual toggle functions
  const toggleEmailReveal = (contactId: string) => {
    const newRevealed = new Set(revealedEmails);
    if (newRevealed.has(contactId)) {
      newRevealed.delete(contactId);
    } else {
      newRevealed.add(contactId);
    }
    setRevealedEmails(newRevealed);
  };
  
  const togglePhoneReveal = (contactId: string) => {
    const newRevealed = new Set(revealedPhones);
    if (newRevealed.has(contactId)) {
      newRevealed.delete(contactId);
    } else {
      newRevealed.add(contactId);
    }
    setRevealedPhones(newRevealed);
  };
  
  const toggleLinkedInReveal = (contactId: string) => {
    const newRevealed = new Set(revealedLinkedIns);
    if (newRevealed.has(contactId)) {
      newRevealed.delete(contactId);
    } else {
      newRevealed.add(contactId);
    }
    setRevealedLinkedIns(newRevealed);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="organizations" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Organizations
                  </TabsTrigger>
                  <TabsTrigger value="people" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    People
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="organizations" className="space-y-4 mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search organizations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedSport} onValueChange={setSelectedSport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sports</SelectItem>
                      {sports.filter(sport => sport.name.toLowerCase() !== 'rugby').map((sport) => (
                        <SelectItem key={sport.id} value={sport.id}>
                          {sport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.filter(country => country.name.toLowerCase() !== 'multi nation').map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Semi-Professional">Semi-Professional</SelectItem>
                      <SelectItem value="Amateur">Amateur</SelectItem>
                      <SelectItem value="Youth">Youth</SelectItem>
                      <SelectItem value="Academy">Academy</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="w-full flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Clear Filters
                    </Button>
                  )}
                </TabsContent>

                <TabsContent value="people" className="space-y-4 mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search people..."
                      value={peopleSearchQuery}
                      onChange={(e) => setPeopleSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {uniqueRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {hasPeopleActiveFilters && (
                    <Button 
                      variant="outline" 
                      onClick={clearPeopleFilters}
                      className="w-full flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Clear Filters
                    </Button>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="organizations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organizations ({filteredTeams.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {paginatedTeams.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No organizations found matching your criteria.
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-16">Logo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Sport</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>City</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedTeams.map((team) => {
                            const logoUrl = getTeamLogo(team.name);
                            return (
                              <TableRow 
                                key={team.id} 
                                className="cursor-pointer hover:bg-muted/50"
                                onClick={() => navigate(`/crm/teams/${team.id}`)}
                              >
                                <TableCell>
                                  <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                                    {logoUrl ? (
                                      <img 
                                        src={logoUrl} 
                                        alt={`${team.name} logo`}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <Building2 className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{team.name}</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">
                                    {team.sport || 'Football'}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {team.league || 'Premier League'}
                                  </Badge>
                                </TableCell>
                                <TableCell>{team.country || 'England'}</TableCell>
                                <TableCell>{team.location || 'Unknown'}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Organizations Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </TabsContent>

            <TabsContent value="people" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    People ({filteredContacts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {paginatedContacts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No people found matching your criteria.
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Team</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>LinkedIn</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedContacts.map((contact) => {
                            const dummyPhone = generateDummyPhone(contact.id);
                            const dummyLinkedIn = generateDummyLinkedIn(contact.first_name, contact.last_name);
                            const isEmailRevealed = revealedEmails.has(contact.id);
                            const isPhoneRevealed = revealedPhones.has(contact.id);
                            const isLinkedInRevealed = revealedLinkedIns.has(contact.id);
                            
                            return (
                              <TableRow key={contact.id} className="hover:bg-muted/50">
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.first_name}${contact.last_name}`} />
                                      <AvatarFallback className="text-xs">
                                        {contact.first_name[0]}{contact.last_name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{contact.first_name} {contact.last_name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">
                                    {contact.position || 'Not specified'}
                                  </Badge>
                                </TableCell>
                                <TableCell>{contact.teams?.name || 'Unknown'}</TableCell>
                                <TableCell>
                                  {isEmailRevealed ? (
                                    contact.email ? (
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="truncate max-w-[200px]">{contact.email}</span>
                                      </div>
                                    ) : (
                                      <span className="text-muted-foreground">-</span>
                                    )
                                  ) : (
                                    <button 
                                      onClick={() => toggleEmailReveal(contact.id)}
                                      className="flex items-center gap-2 bg-accent/30 px-2 py-1 rounded text-xs hover:bg-accent/50 transition-colors"
                                    >
                                      <Eye className="h-3 w-3" />
                                      <span>Reveal Email</span>
                                    </button>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {isPhoneRevealed ? (
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <span>{dummyPhone}</span>
                                    </div>
                                  ) : (
                                    <button 
                                      onClick={() => togglePhoneReveal(contact.id)}
                                      className="flex items-center gap-2 bg-accent/30 px-2 py-1 rounded text-xs hover:bg-accent/50 transition-colors"
                                    >
                                      <Eye className="h-3 w-3" />
                                      <span>Reveal Phone</span>
                                    </button>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {isLinkedInRevealed ? (
                                    <Button variant="ghost" size="sm" asChild>
                                      <a href={dummyLinkedIn} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  ) : (
                                    <button 
                                      onClick={() => toggleLinkedInReveal(contact.id)}
                                      className="flex items-center gap-2 bg-accent/30 px-2 py-1 rounded text-xs hover:bg-accent/50 transition-colors"
                                    >
                                      <Eye className="h-3 w-3" />
                                      <span>Reveal LinkedIn</span>
                                    </button>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add to List
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* People Pagination */}
              {peopleTotalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (peopleCurrentPage > 1) setPeopleCurrentPage(peopleCurrentPage - 1);
                          }}
                          className={peopleCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, peopleTotalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPeopleCurrentPage(page);
                              }}
                              isActive={peopleCurrentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (peopleCurrentPage < peopleTotalPages) setPeopleCurrentPage(peopleCurrentPage + 1);
                          }}
                          className={peopleCurrentPage === peopleTotalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Discover;