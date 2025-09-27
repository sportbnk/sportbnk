import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  User, 
  X, 
  Mail, 
  Phone, 
  Linkedin,
  TrendingUp,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  UserPlus,
  Users
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
import essexCricketLogo from "@/assets/team-logos/essex-cricket.png";
import surreyCricketLogo from "@/assets/team-logos/surrey-cricket.png";

interface Signal {
  id: string;
  sport: string;
  clubName: string;
  competition: string;
  region: string;
  signalType: "Tender" | "Sponsorship" | "Funding" | "Hiring" | "Procurement";
  budget: string;
  datePosted: string;
  urgency: "New" | "Expiring Soon" | "Normal";
  teamId?: string;
  description: string;
  source?: string;
  matchedICPs?: string[];
}

interface Contact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  linkedin: string;
  department: string;
  revealed: boolean;
  cost: number;
}

// Logo mapping function
const getTeamLogo = (teamName: string) => {
  const logoMap: Record<string, string> = {
    'Arsenal': arsenalLogo,
    'Chelsea': chelseaLogo,
    'Liverpool': liverpoolLogo,
    'Manchester United': manchesterUnitedLogo,
    'Manchester City': manchesterCityLogo,
    'Tottenham Hotspur': tottenhamLogo,
    'Newcastle United': newcastleLogo,
    'Essex CCC': essexCricketLogo,
    'Surrey County Cricket Club': surreyCricketLogo,
    'Real Madrid Basketball': manchesterUnitedLogo,
    'Cork City FC': liverpoolLogo,
    'Leinster Rugby': liverpoolLogo,
  };
  return logoMap[teamName] || arsenalLogo;
};

const mockSignals: Signal[] = [
  // Manchester United
  {
    id: "1",
    sport: "Football",
    clubName: "Manchester United",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£45k",
    datePosted: "Today",
    urgency: "New",
    teamId: "manchester-united",
    description: "**Signal:** Academy Assistant Performance Analyst (Casual) – MUFC careers portal lists live roles across Football & Performance.\n**Intelligence suggestion:** opens pathway contacts in analysis/medical; good wedge for performance tech & video tooling vendors.",
    source: "Manchester United careers portal",
    matchedICPs: ["High-Budget Premier League Clubs", "Technology Procurement Signals"]
  },
  // Arsenal
  {
    id: "2",
    sport: "Football",
    clubName: "Arsenal",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£65k",
    datePosted: "Today",
    urgency: "New",
    teamId: "arsenal",
    description: "**Signal:** Licensing Manager (Commercial) – active vacancy.\n**Intelligence suggestion:** licensing = merch, retail, IP partners; ideal for fan-merch, ecommerce, and brand collab vendors.",
    source: "Arsenal Football Club jobs board",
    matchedICPs: ["High-Budget Premier League Clubs"]
  },
  // Liverpool
  {
    id: "3",
    sport: "Football",
    clubName: "Liverpool",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£55k",
    datePosted: "1 day ago",
    urgency: "New",
    teamId: "liverpool",
    description: "**Signal:** LFCW Education & Player Care Lead and Casual Physio/Sports Therapist – both just posted.\n**Intelligence suggestion:** direct entry to women's pathway staff; good ICP for player-care, edtech, and medical vendors.",
    source: "jobsearch.liverpoolfc.com",
    matchedICPs: ["High-Budget Premier League Clubs", "Technology Procurement Signals"]
  },
  // Chelsea
  {
    id: "4",
    sport: "Football",
    clubName: "Chelsea",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£50k",
    datePosted: "1 day ago",
    urgency: "New",
    teamId: "chelsea",
    description: "**Signal:** Social Inclusion Manager (Foundation) – active role.\n**Intelligence suggestion:** CSR/community budgets; opens doors for grassroots tech and measurement tools.",
    source: "Jobs In Football",
    matchedICPs: ["High-Budget Premier League Clubs"]
  },
  // Tottenham
  {
    id: "5",
    sport: "Football",
    clubName: "Tottenham Hotspur",
    competition: "Premier League",
    region: "UK",
    signalType: "Funding",
    budget: "£500M",
    datePosted: "Today",
    urgency: "New",
    teamId: "tottenham",
    description: "**Signal:** Club publicly rebuffed US consortium takeover approach; must clarify by 24 Oct 2025.\n**Intelligence suggestion:** stability/strategy signal; potential governance, finance, and advisory ICPs.",
    source: "The Guardian",
    matchedICPs: ["High-Budget Premier League Clubs"]
  },
  // Manchester City
  {
    id: "6",
    sport: "Football",
    clubName: "Manchester City",
    competition: "Premier League",
    region: "UK",
    signalType: "Sponsorship",
    budget: "£1B",
    datePosted: "2 months ago",
    urgency: "Normal",
    teamId: "manchester-city",
    description: "**Signal:** New 10-year £1bn Puma kit deal reported this summer; OKX sleeve partnership confirmed/ongoing.\n**Intelligence suggestion:** mega commercial cycle; procurement & hospitality scale-up often follows.",
    source: "The Guardian",
    matchedICPs: ["High-Budget Premier League Clubs"]
  },
  // Newcastle United
  {
    id: "7",
    sport: "Football",
    clubName: "Newcastle United",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£35k",
    datePosted: "3 days ago",
    urgency: "Expiring Soon",
    teamId: "newcastle",
    description: "**Signal:** Security Officer (closing 30 Sept 2025) & Principal Scientist – both live.\n**Intelligence suggestion:** direct ops & performance-science contacts.",
    source: "careers.newcastleunited.com",
    matchedICPs: ["High-Budget Premier League Clubs", "Technology Procurement Signals"]
  },
  // Aston Villa
  {
    id: "8",
    sport: "Football",
    clubName: "Aston Villa",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£30k",
    datePosted: "Today",
    urgency: "New",
    teamId: "aston-villa",
    description: "**Signal:** Multiple live roles incl. Maintenance Technician (Plumbing) and Retail Supervisors.\n**Intelligence suggestion:** FM/estates procurement and retail systems conversations.",
    source: "careers.avfc.co.uk",
    matchedICPs: ["High-Budget Premier League Clubs"]
  },
  // West Ham United
  {
    id: "9",
    sport: "Football",
    clubName: "West Ham United",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£2M",
    datePosted: "Today",
    urgency: "New",
    teamId: "west-ham",
    description: "**Signal:** Head coach change – Nuno Espírito Santo appointed on 3-year deal.\n**Intelligence suggestion:** backroom rebuild → analyst/med/ops hires, new vendor evaluations.",
    source: "The Guardian",
    matchedICPs: ["High-Budget Premier League Clubs", "Technology Procurement Signals"]
  },
  // Everton
  {
    id: "10",
    sport: "Football",
    clubName: "Everton",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£40k",
    datePosted: "Today",
    urgency: "New",
    teamId: "everton",
    description: "**Signal:** Club & Foundation vacancies page listing current roles.\n**Intelligence suggestion:** community programs + matchday ops = event tech, ticketing, workforce mgmt.",
    source: "Everton FC",
    matchedICPs: ["High-Budget Premier League Clubs", "Technology Procurement Signals"]
  },
  // Brentford
  {
    id: "11",
    sport: "Football",
    clubName: "Brentford",
    competition: "Premier League",
    region: "UK",
    signalType: "Sponsorship",
    budget: "£2M",
    datePosted: "3 months ago",
    urgency: "Normal",
    teamId: "brentford",
    description: "**Signal:** New multi-year Joma kit partnership began July 2025; current openings include Academy Director (closes 3 Oct).\n**Intelligence suggestion:** fresh merchandise cycle + academy leadership hire = apparel/retail and pathway tech ICP.",
    source: "Brentford FC",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Brighton
  {
    id: "12",
    sport: "Football",
    clubName: "Brighton & Hove Albion",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£60k",
    datePosted: "2 days ago",
    urgency: "New",
    teamId: "brighton",
    description: "**Signal:** Technology Project & Governance Manager (FT) listed this week.\n**Intelligence suggestion:** strong wedge for SaaS/infrastructure vendors.",
    source: "Jobs In Football",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Crystal Palace
  {
    id: "13",
    sport: "Football",
    clubName: "Crystal Palace",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£50k",
    datePosted: "1 day ago",
    urgency: "Expiring Soon",
    teamId: "crystal-palace",
    description: "**Signal:** Head of Academy Player Recruitment (deadline 28 Sept 2025) + Women's Lead Physiotherapist.\n**Intelligence suggestion:** direct recruitment/med contacts in academy & women's program.",
    source: "Crystal Palace F.C.",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Fulham
  {
    id: "14",
    sport: "Football",
    clubName: "Fulham",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£45k",
    datePosted: "Today",
    urgency: "New",
    teamId: "fulham",
    description: "**Signal:** Multiple open roles incl. Academy Nutritionist and PDP Physiotherapist.\n**Intelligence suggestion:** pathway science/performance ICP.",
    source: "careers.fulhamfc.com",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Nottingham Forest
  {
    id: "15",
    sport: "Football",
    clubName: "Nottingham Forest",
    competition: "Premier League",
    region: "UK",
    signalType: "Hiring",
    budget: "£35k",
    datePosted: "Today",
    urgency: "New",
    teamId: "nottingham-forest",
    description: "**Signal:** IT Support Technician + multiple academy coaching roles live on club careers.\n**Intelligence suggestion:** IT & academy procurement lines open.",
    source: "Nottingham Forest Football Club",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Leeds United
  {
    id: "16",
    sport: "Football",
    clubName: "Leeds United",
    competition: "Championship",
    region: "UK",
    signalType: "Sponsorship",
    budget: "£15M",
    datePosted: "1 month ago",
    urgency: "Normal",
    teamId: "leeds-united",
    description: "**Signal:** New Red Bull front-of-shirt partner and Parimatch sleeve extension for 2025/26.\n**Intelligence suggestion:** sponsor ecosystem refresh → brand activations & hospitality spend.",
    source: "Wikipedia",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Burnley
  {
    id: "17",
    sport: "Football",
    clubName: "Burnley",
    competition: "Championship",
    region: "UK",
    signalType: "Sponsorship",
    budget: "£8M",
    datePosted: "Today",
    urgency: "New",
    teamId: "burnley",
    description: "**Signal:** Castore kit deal + new front-of-shirt partner 96.com (both 2024); brand activity with Sure For Men (Sept 2025).\n**Intelligence suggestion:** apparel & brand activation cycles in flight.",
    source: "Wikipedia",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Sunderland
  {
    id: "18",
    sport: "Football",
    clubName: "Sunderland",
    competition: "Championship",
    region: "UK",
    signalType: "Sponsorship",
    budget: "£5M",
    datePosted: "1 month ago",
    urgency: "Normal",
    teamId: "sunderland",
    description: "**Signal:** Hummel kit; W88 front-of-shirt listed for 2025/26 season summaries.\n**Intelligence suggestion:** sponsorship stack suggests active commercial team; good entry for betting/alcohol-alt compliance tech or replacements.",
    source: "Wikipedia",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Wolves
  {
    id: "19",
    sport: "Football",
    clubName: "Wolverhampton Wanderers",
    competition: "Premier League",
    region: "UK",
    signalType: "Tender",
    budget: "£500k",
    datePosted: "1 week ago",
    urgency: "Normal",
    teamId: "wolves",
    description: "**Signal:** Club in poor run of form per season data; likely pressure on staff changes (watchlist).\n**Intelligence suggestion:** pre-trigger for hiring & vendor reshuffles.",
    source: "Wikipedia",
    matchedICPs: ["High-Budget Premier League Clubs", "Technology Procurement Signals"]
  },
  // Bournemouth
  {
    id: "20",
    sport: "Football",
    clubName: "Bournemouth",
    competition: "Premier League",
    region: "UK",
    signalType: "Procurement",
    budget: "£200k",
    datePosted: "1 week ago",
    urgency: "Normal",
    teamId: "bournemouth",
    description: "**Signal:** Club comms highlight Umbro kit and recent commercial partners; keep warm for retail & stadium ops hiring cycles.\n**Intelligence suggestion:** ongoing commercial activity suggests openness to partnerships.",
    source: "Wikipedia",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // ECB
  {
    id: "21",
    sport: "Cricket",
    clubName: "ECB",
    competition: "England Cricket",
    region: "UK",
    signalType: "Hiring",
    budget: "£75k",
    datePosted: "1 month ago",
    urgency: "Normal",
    teamId: "ecb",
    description: "**Signal:** Central careers hub and long-list of board/club roles; updated Governing Body Endorsement criteria for International Sportsperson route (effective 1 Sept 2025).\n**Intelligence suggestion:** HR & compliance contacts; immigration policy update affects staffing workflows and support vendors.",
    source: "ECB",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Surrey CCC
  {
    id: "22",
    sport: "Cricket",
    clubName: "Surrey County Cricket Club",
    competition: "England Cricket",
    region: "UK",
    signalType: "Hiring",
    budget: "£80k",
    datePosted: "1 week ago",
    urgency: "Normal",
    teamId: "surrey-ccc",
    description: "**Signal:** Director of Operations (recent LinkedIn listing) plus multiple pathway roles on club careers.\n**Intelligence suggestion:** operations + pathway = procurement across venues, scheduling, performance.",
    source: "Kia Oval",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Somerset CCC
  {
    id: "23",
    sport: "Cricket",
    clubName: "Somerset CCC",
    competition: "England Cricket",
    region: "UK",
    signalType: "Hiring",
    budget: "£50k",
    datePosted: "4 days ago",
    urgency: "Expiring Soon",
    teamId: "somerset-ccc",
    description: "**Signal:** Women's Head Coach (closes 1 Oct 2025) and Consultant Nutritionist on the Somerset careers hub.\n**Intelligence suggestion:** direct performance & coaching contacts.",
    source: "The PCA",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Hampshire Cricket
  {
    id: "24",
    sport: "Cricket",
    clubName: "Hampshire Cricket",
    competition: "England Cricket",
    region: "UK",
    signalType: "Hiring",
    budget: "£65k",
    datePosted: "2 days ago",
    urgency: "New",
    teamId: "hampshire-cricket",
    description: "**Signal:** Group Financial Controller listed this week via venue careers page.\n**Intelligence suggestion:** senior finance owner for multi-entity group → strong procurement gatekeeper.",
    source: "Utilita Bowl",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Middlesex Cricket
  {
    id: "25",
    sport: "Cricket",
    clubName: "Middlesex Cricket",
    competition: "England Cricket",
    region: "UK",
    signalType: "Hiring",
    budget: "£45k",
    datePosted: "2 days ago",
    urgency: "New",
    teamId: "middlesex-cricket",
    description: "**Signal:** Player Pathway Physiotherapist posted 2 days ago; club also in advanced talks to fund new Uxbridge ground (Aug 2025).\n**Intelligence suggestion:** hiring + capex project → suppliers across performance, venue, and financing.",
    source: "Middlesex County Cricket Club",
    matchedICPs: ["Technology Procurement Signals"]
  },
  // Warwickshire CCC
  {
    id: "26",
    sport: "Cricket",
    clubName: "Warwickshire CCC",
    competition: "England Cricket",
    region: "UK",
    signalType: "Hiring",
    budget: "£55k",
    datePosted: "3 days ago",
    urgency: "Normal",
    teamId: "warwickshire-cricket",
    description: "**Signal:** Commercial Partnerships Manager – The Hundred, Birmingham Phoenix (recruiter-led); Community Schools Coach on Edgbaston site.\n**Intelligence suggestion:** direct partnership & community budget owners.",
    source: "LinkedIn",
    matchedICPs: ["Technology Procurement Signals"]
  }
];

const SignalsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [selectedGeography, setSelectedGeography] = useState<string>("all");
  const [selectedSignalType, setSelectedSignalType] = useState<string>("all");
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [showContactsSidebar, setShowContactsSidebar] = useState(false);
  const [revealedContacts, setRevealedContacts] = useState<string[]>([]);

  // Mock contacts data for each signal
  const getContactsForSignal = (signalId: string): Contact[] => {
    const contactsMap: Record<string, Contact[]> = {
      // Manchester United - Academy Assistant Performance Analyst
      "1": [
        {
          id: "c1",
          name: "Dr. Sarah Mitchell",
          position: "Head of Academy Performance",
          email: "s.mitchell@manutd.com",
          phone: "+44 161 868 8000",
          linkedin: "https://linkedin.com/in/sarahmitchell",
          department: "Academy",
          revealed: false,
          cost: 5
        },
        {
          id: "c2", 
          name: "James Richardson",
          position: "Performance Analysis Manager",
          email: "j.richardson@manutd.com",
          phone: "+44 161 868 8001",
          linkedin: "https://linkedin.com/in/jamesrichardson",
          department: "Performance",
          revealed: false,
          cost: 4
        }
      ],
      // Arsenal - Licensing Manager
      "2": [
        {
          id: "c4",
          name: "Emma Thompson",
          position: "Commercial Director",
          email: "e.thompson@arsenal.com",
          phone: "+44 20 7619 5000",
          linkedin: "https://linkedin.com/in/emmathompson",
          department: "Commercial",
          revealed: false,
          cost: 5
        },
        {
          id: "c5",
          name: "Mark Davies",
          position: "Head of Licensing",
          email: "m.davies@arsenal.com",
          phone: "+44 20 7619 5001",
          linkedin: "https://linkedin.com/in/markdavies",
          department: "Licensing",
          revealed: false,
          cost: 4
        }
      ],
      // Liverpool - LFCW Education & Player Care
      "3": [
        {
          id: "c6",
          name: "Dr. Claire Wilson",
          position: "Women's Football Director",
          email: "c.wilson@liverpoolfc.com",
          phone: "+44 151 263 2361",
          linkedin: "https://linkedin.com/in/clairewilson",
          department: "Women's Football",
          revealed: false,
          cost: 5
        },
        {
          id: "c7",
          name: "Rachel Green",
          position: "Player Care Manager",
          email: "r.green@liverpoolfc.com",
          phone: "+44 151 263 2362",
          linkedin: "https://linkedin.com/in/rachelgreen",
          department: "Player Care",
          revealed: false,
          cost: 4
        }
      ],
      // Chelsea - Social Inclusion Manager
      "4": [
        {
          id: "c8",
          name: "Michael Foster",
          position: "Foundation Director",
          email: "m.foster@chelseafc.com",
          phone: "+44 20 7386 9373",
          linkedin: "https://linkedin.com/in/michaelfoster",
          department: "Foundation",
          revealed: false,
          cost: 5
        },
        {
          id: "c9",
          name: "Sophie Turner",
          position: "Community Manager",
          email: "s.turner@chelseafc.com",
          phone: "+44 20 7386 9374",
          linkedin: "https://linkedin.com/in/sophieturner",
          department: "Community",
          revealed: false,
          cost: 3
        }
      ],
      // Tottenham - Corporate/Ownership
      "5": [
        {
          id: "c10",
          name: "Jonathan Stevens",
          position: "Chief Financial Officer",
          email: "j.stevens@tottenhamhotspur.com",
          phone: "+44 20 8365 5000",
          linkedin: "https://linkedin.com/in/jonathanstevens",
          department: "Finance",
          revealed: false,
          cost: 6
        },
        {
          id: "c11",
          name: "David Miller",
          position: "Head of Corporate Affairs",
          email: "d.miller@tottenhamhotspur.com",
          phone: "+44 20 8365 5001",
          linkedin: "https://linkedin.com/in/davidmiller",
          department: "Corporate",
          revealed: false,
          cost: 5
        }
      ],
      // Manchester City - Sponsorship
      "6": [
        {
          id: "c12",
          name: "Lisa Chapman",
          position: "Chief Commercial Officer",
          email: "l.chapman@mancity.com",
          phone: "+44 161 444 1894",
          linkedin: "https://linkedin.com/in/lisachapman",
          department: "Commercial",
          revealed: false,
          cost: 6
        },
        {
          id: "c13",
          name: "Paul Roberts",
          position: "Partnerships Director",
          email: "p.roberts@mancity.com",
          phone: "+44 161 444 1895",
          linkedin: "https://linkedin.com/in/paulroberts",
          department: "Partnerships",
          revealed: false,
          cost: 5
        }
      ],
      // Newcastle United - Security & Science
      "7": [
        {
          id: "c14",
          name: "Andrew Bell",
          position: "Head of Security",
          email: "a.bell@nufc.co.uk",
          phone: "+44 191 201 8400",
          linkedin: "https://linkedin.com/in/andrewbell",
          department: "Security",
          revealed: false,
          cost: 3
        },
        {
          id: "c15",
          name: "Dr. Helen Clark",
          position: "Principal Scientist",
          email: "h.clark@nufc.co.uk",
          phone: "+44 191 201 8401",
          linkedin: "https://linkedin.com/in/helenclark",
          department: "Sports Science",
          revealed: false,
          cost: 5
        }
      ],
      // Aston Villa - Maintenance & Retail
      "8": [
        {
          id: "c16",
          name: "Tony Williams",
          position: "Facilities Manager",
          email: "t.williams@avfc.co.uk",
          phone: "+44 121 327 2299",
          linkedin: "https://linkedin.com/in/tonywilliams",
          department: "Facilities",
          revealed: false,
          cost: 3
        },
        {
          id: "c17",
          name: "Karen Jones",
          position: "Retail Operations Manager",
          email: "k.jones@avfc.co.uk",
          phone: "+44 121 327 2300",
          linkedin: "https://linkedin.com/in/karenjones",
          department: "Retail",
          revealed: false,
          cost: 4
        }
      ],
      // West Ham - Head Coach Change
      "9": [
        {
          id: "c18",
          name: "Graham Potter",
          position: "Director of Football",
          email: "g.potter@whufc.com",
          phone: "+44 20 8548 2748",
          linkedin: "https://linkedin.com/in/grahampotter",
          department: "Football Operations",
          revealed: false,
          cost: 6
        },
        {
          id: "c19",
          name: "Sarah Edwards",
          position: "Head of Recruitment",
          email: "s.edwards@whufc.com",
          phone: "+44 20 8548 2749",
          linkedin: "https://linkedin.com/in/sarahedwards",
          department: "Recruitment",
          revealed: false,
          cost: 5
        }
      ],
      // Everton - Club & Foundation
      "10": [
        {
          id: "c20",
          name: "Kevin Thelwell",
          position: "Director of Football",
          email: "k.thelwell@evertonfc.com",
          phone: "+44 151 556 1878",
          linkedin: "https://linkedin.com/in/kevinthelwell",
          department: "Football",
          revealed: false,
          cost: 5
        },
        {
          id: "c21",
          name: "Claire Morgan",
          position: "Foundation Manager",
          email: "c.morgan@evertonfc.com",
          phone: "+44 151 556 1879",
          linkedin: "https://linkedin.com/in/clairemorgan",
          department: "Foundation",
          revealed: false,
          cost: 4
        }
      ],
      // Brentford - Joma Kit & Academy
      "11": [
        {
          id: "c22",
          name: "Jon Varney",
          position: "Chief Executive",
          email: "j.varney@brentfordfc.com",
          phone: "+44 20 8847 2511",
          linkedin: "https://linkedin.com/in/jonvarney",
          department: "Executive",
          revealed: false,
          cost: 6
        },
        {
          id: "c23",
          name: "Gary Bowyer",
          position: "Academy Director",
          email: "g.bowyer@brentfordfc.com",
          phone: "+44 20 8847 2512",
          linkedin: "https://linkedin.com/in/garybowyer",
          department: "Academy",
          revealed: false,
          cost: 5
        }
      ],
      // Brighton - Technology Project Manager
      "12": [
        {
          id: "c24",
          name: "Dan Ashworth",
          position: "Technical Director",
          email: "d.ashworth@brightonandhovealbion.com",
          phone: "+44 1273 695 400",
          linkedin: "https://linkedin.com/in/danashworth",
          department: "Technology",
          revealed: false,
          cost: 6
        },
        {
          id: "c25",
          name: "Rebecca Harrison",
          position: "IT Director",
          email: "r.harrison@brightonandhovealbion.com",
          phone: "+44 1273 695 401",
          linkedin: "https://linkedin.com/in/rebeccaharrison",
          department: "IT",
          revealed: false,
          cost: 5
        }
      ],
      // Crystal Palace - Academy Recruitment
      "13": [
        {
          id: "c26",
          name: "Gary Issott",
          position: "Academy Director",
          email: "g.issott@cpfc.co.uk",
          phone: "+44 20 8768 6000",
          linkedin: "https://linkedin.com/in/garyissott",
          department: "Academy",
          revealed: false,
          cost: 5
        },
        {
          id: "c27",
          name: "Dr. Emma Lewis",
          position: "Lead Physiotherapist",
          email: "e.lewis@cpfc.co.uk",
          phone: "+44 20 8768 6001",
          linkedin: "https://linkedin.com/in/emmalewis",
          department: "Medical",
          revealed: false,
          cost: 4
        }
      ],
      // Fulham - Academy Nutritionist
      "14": [
        {
          id: "c28",
          name: "Huw Jennings",
          position: "Academy Director",
          email: "h.jennings@fulhamfc.com",
          phone: "+44 20 7893 8383",
          linkedin: "https://linkedin.com/in/huwjennings",
          department: "Academy",
          revealed: false,
          cost: 5
        },
        {
          id: "c29",
          name: "Dr. Kate Robinson",
          position: "Head of Performance",
          email: "k.robinson@fulhamfc.com",
          phone: "+44 20 7893 8384",
          linkedin: "https://linkedin.com/in/katerobinson",
          department: "Performance",
          revealed: false,
          cost: 4
        }
      ],
      // Nottingham Forest - IT Support
      "15": [
        {
          id: "c30",
          name: "Mark Crossley",
          position: "IT Director",
          email: "m.crossley@nottinghamforest.co.uk",
          phone: "+44 115 982 4444",
          linkedin: "https://linkedin.com/in/markcrossley",
          department: "IT",
          revealed: false,
          cost: 4
        },
        {
          id: "c31",
          name: "Warren Joyce",
          position: "Academy Manager",
          email: "w.joyce@nottinghamforest.co.uk",
          phone: "+44 115 982 4445",
          linkedin: "https://linkedin.com/in/warrenjoyce",
          department: "Academy",
          revealed: false,
          cost: 5
        }
      ],
      // ECB - Hiring/Policy
      "21": [
        {
          id: "c60",
          name: "Tom Harrison",
          position: "Chief Executive",
          email: "t.harrison@ecb.co.uk",
          phone: "+44 20 7432 1200",
          linkedin: "https://linkedin.com/in/tomharrison",
          department: "Executive",
          revealed: false,
          cost: 6
        },
        {
          id: "c61",
          name: "Kate Miller",
          position: "Head of HR",
          email: "k.miller@ecb.co.uk",
          phone: "+44 20 7432 1201",
          linkedin: "https://linkedin.com/in/katemiller",
          department: "HR",
          revealed: false,
          cost: 4
        }
      ],
      // Surrey CCC - Director of Operations
      "22": [
        {
          id: "c62",
          name: "Steve Elworthy",
          position: "Chief Executive",
          email: "s.elworthy@surreyccc.co.uk",
          phone: "+44 20 7582 7764",
          linkedin: "https://linkedin.com/in/steveelworthy",
          department: "Executive",
          revealed: false,
          cost: 6
        },
        {
          id: "c63",
          name: "Richard Thompson",
          position: "Director of Operations",
          email: "r.thompson@surreyccc.co.uk",
          phone: "+44 20 7582 7765",
          linkedin: "https://linkedin.com/in/richardthompson",
          department: "Operations",
          revealed: false,
          cost: 5
        }
      ],
      // Somerset CCC - Women's Head Coach
      "23": [
        {
          id: "c64",
          name: "Andy Hurry",
          position: "Chief Executive",
          email: "a.hurry@somersetccc.co.uk",
          phone: "+44 1823 425301",
          linkedin: "https://linkedin.com/in/andyhurry",
          department: "Executive",
          revealed: false,
          cost: 5
        },
        {
          id: "c65",
          name: "Sarah Lewis",
          position: "Head Coach Women",
          email: "s.lewis@somersetccc.co.uk",
          phone: "+44 1823 425302",
          linkedin: "https://linkedin.com/in/sarahlewis",
          department: "Coaching",
          revealed: false,
          cost: 4
        }
      ],
      // Hampshire Cricket - Financial Controller
      "24": [
        {
          id: "c66",
          name: "David Mann",
          position: "Chief Executive",
          email: "d.mann@ageasbowl.com",
          phone: "+44 23 8047 2002",
          linkedin: "https://linkedin.com/in/davidmann",
          department: "Executive",
          revealed: false,
          cost: 6
        },
        {
          id: "c67",
          name: "Jane Cooper",
          position: "Group Financial Controller",
          email: "j.cooper@ageasbowl.com",
          phone: "+44 23 8047 2003",
          linkedin: "https://linkedin.com/in/janecooper",
          department: "Finance",
          revealed: false,
          cost: 5
        }
      ],
      // Middlesex Cricket - Player Pathway Physiotherapist
      "25": [
        {
          id: "c68",
          name: "Andrew Cornish",
          position: "Chief Executive",
          email: "a.cornish@middlesexccc.com",
          phone: "+44 20 7289 1300",
          linkedin: "https://linkedin.com/in/andrewcornish",
          department: "Executive",
          revealed: false,
          cost: 5
        },
        {
          id: "c69",
          name: "Dr. Mark Phillips",
          position: "Head of Medical",
          email: "m.phillips@middlesexccc.com",
          phone: "+44 20 7289 1301",
          linkedin: "https://linkedin.com/in/markphillips",
          department: "Medical",
          revealed: false,
          cost: 4
        }
      ],
      // Warwickshire CCC - Commercial Partnerships
      "26": [
        {
          id: "c70",
          name: "Stuart Cain",
          position: "Chief Executive",
          email: "s.cain@edgbaston.com",
          phone: "+44 121 369 1994",
          linkedin: "https://linkedin.com/in/stuartcain",
          department: "Executive",
          revealed: false,
          cost: 6
        },
        {
          id: "c71",
          name: "Helen Watson",
          position: "Commercial Partnerships Manager",
          email: "h.watson@edgbaston.com",
          phone: "+44 121 369 1995",
          linkedin: "https://linkedin.com/in/helenwatson",
          department: "Commercial",
          revealed: false,
          cost: 5
        }
      ]
    };
    
    return contactsMap[signalId] || [
      {
        id: "default1",
        name: "Michael Brown",
        position: "Commercial Manager",
        email: "***@club.com",
        phone: "+44 20 *** ****",
        linkedin: "https://linkedin.com/in/***",
        department: "Commercial",
        revealed: false,
        cost: 4
      },
      {
        id: "default2",
        name: "Lisa Davis",
        position: "Operations Director",
        email: "***@club.com", 
        phone: "+44 20 *** ****",
        linkedin: "https://linkedin.com/in/***",
        department: "Operations",
        revealed: false,
        cost: 5
      }
    ];
  };

  const handleRevealContacts = (signal: Signal) => {
    setSelectedSignal(signal);
    setShowContactsSidebar(true);
  };

  const handleRevealContact = (contactId: string) => {
    setRevealedContacts([...revealedContacts, contactId]);
    toast({
      title: "Contact Revealed",
      description: "Contact details have been revealed. 5 credits used.",
    });
  };

  const handleAddToList = (contact: Contact) => {
    toast({
      title: "Added to List",
      description: `${contact.name} has been added to your contact list.`,
    });
  };

  const handleEmailContact = (contact: Contact) => {
    if (!revealedContacts.includes(contact.id)) {
      toast({
        title: "Contact Not Revealed",
        description: "Please reveal the contact first to email them.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Email Draft Created",
      description: `Email draft created for ${contact.name}.`,
    });
  };

  const filteredSignals = mockSignals.filter(signal => {
    const matchesSearch = signal.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.signalType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === "all" || signal.sport === selectedSport;
    const matchesGeography = selectedGeography === "all" || signal.region === selectedGeography;
    const matchesSignalType = selectedSignalType === "all" || signal.signalType === selectedSignalType;
    
    return matchesSearch && matchesSport && matchesGeography && matchesSignalType;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "New": return "bg-green-100 text-green-800 border-green-200";
      case "Expiring Soon": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getSignalTypeColor = (type: string) => {
    switch (type) {
      case "Tender": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Sponsorship": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Funding": return "bg-green-100 text-green-800 border-green-200";
      case "Hiring": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Procurement": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${showContactsSidebar ? 'mr-96' : ''}`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Global Sports Signals Feed
              </h1>
              <p className="text-gray-600">Real-time opportunities across global sports organizations</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {filteredSignals.length} signals today
              </Badge>
              <Avatar className="h-9 w-9">
                <AvatarFallback style={{ backgroundColor: '#0b1a51', color: 'white' }}>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex gap-4 items-center flex-wrap">
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Rugby">Rugby</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedBudget} onValueChange={setSelectedBudget}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="low">Under £100k</SelectItem>
                <SelectItem value="medium">£100k - £1M</SelectItem>
                <SelectItem value="high">Over £1M</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedGeography} onValueChange={setSelectedGeography}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Geography" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="Ireland">Ireland</SelectItem>
                <SelectItem value="Spain">Spain</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSignalType} onValueChange={setSelectedSignalType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Signal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Tender">Tender</SelectItem>
                <SelectItem value="Sponsorship">Sponsorship</SelectItem>
                <SelectItem value="Funding">Funding</SelectItem>
                <SelectItem value="Hiring">Hiring</SelectItem>
                <SelectItem value="Procurement">Procurement</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search signals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Signals Feed */}
        <div className="px-6 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredSignals.map((signal) => (
              <Card key={signal.id} className="hover:shadow-lg transition-shadow border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Club Logo */}
                    <div className="flex-shrink-0">
                      <img 
                        src={getTeamLogo(signal.clubName)} 
                        alt={`${signal.clubName} logo`}
                        className="w-12 h-12 object-contain rounded-lg border border-gray-200"
                      />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {signal.clubName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building2 className="h-4 w-4" />
                            <span>{signal.competition}</span>
                            <span>•</span>
                            <MapPin className="h-4 w-4" />
                            <span>{signal.region}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getSignalTypeColor(signal.signalType)}>
                            {signal.signalType}
                          </Badge>
                          {signal.urgency !== "Normal" && (
                            <Badge variant="outline" className={getUrgencyColor(signal.urgency)}>
                              {signal.urgency}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Matched ICPs */}
                      {signal.matchedICPs && signal.matchedICPs.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-green-700">Matches your ICPs:</span>
                            {signal.matchedICPs.map((icp, index) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                {icp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        {signal.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-lg font-bold text-green-600">
                              {signal.budget}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Posted {signal.datePosted}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white font-medium gap-2"
                          onClick={() => handleRevealContacts(signal)}
                        >
                          <Users className="h-4 w-4" />
                          Reveal Contacts
                        </Button>
                      </div>

                      {signal.source && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Source: {signal.source}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredSignals.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No signals found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contacts Sidebar */}
      {showContactsSidebar && selectedSignal && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Key Contacts</h3>
                <p className="text-sm text-gray-600">{selectedSignal.clubName}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactsSidebar(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Contacts List */}
            <div className="space-y-4">
              {getContactsForSignal(selectedSignal.id).map((contact) => {
                const isRevealed = revealedContacts.includes(contact.id);
                
                return (
                  <Card key={contact.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.position}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {contact.department}
                          </Badge>
                        </div>
                        {!isRevealed && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            {contact.cost} credits
                          </Badge>
                        )}
                      </div>

                      {isRevealed ? (
                        <div className="space-y-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                                {contact.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-700">{contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Linkedin className="h-4 w-4 text-gray-400" />
                              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                LinkedIn Profile
                              </a>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleAddToList(contact)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 gap-1"
                            >
                              <Plus className="h-3 w-3" />
                              Add to List
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEmailContact(contact)}
                              className="flex-1 gap-1"
                            >
                              <Mail className="h-3 w-3" />
                              Email
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>***@{selectedSignal.clubName.toLowerCase().replace(/\s+/g, '')}.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>+44 *** *** ****</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Linkedin className="h-4 w-4" />
                              <span>LinkedIn Profile</span>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            onClick={() => handleRevealContact(contact.id)}
                            className="w-full bg-green-600 hover:bg-green-700 gap-2"
                          >
                            <UserPlus className="h-3 w-3" />
                            Reveal Contact ({contact.cost} credits)
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Credit Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                Credits are used to reveal contact details. Each contact costs 3-5 credits depending on seniority.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignalsPage;