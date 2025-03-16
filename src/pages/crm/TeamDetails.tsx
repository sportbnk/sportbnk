
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Mail, Phone, Globe, Facebook, Twitter, Instagram, Linkedin, Users, DollarSign, MapPin } from "lucide-react";
import TeamEmployees from "@/components/database/TeamEmployees";

// Dummy data for teams with expanded country and sport coverage
const teamData = [
  {
    id: 1,
    team: "Manchester United",
    sport: "Football",
    level: "Professional",
    city: "Manchester",
    country: "England",
    revenue: 750000000,
    employees: 1200,
    contacts: [
      {
        name: "John Smith",
        position: "Marketing Director",
        email: "j.smith@manutd.com",
        phone: "+44 7700 900123",
        linkedin: "https://linkedin.com/in/johnsmith"
      },
      {
        name: "Sarah Jones",
        position: "Fan Relations Manager",
        email: "s.jones@manutd.com"
      }
    ],
    logo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    description: "One of the most successful football clubs in England with a global fanbase.",
    founded: 1878,
    website: "https://www.manutd.com",
    social: {
      facebook: "https://facebook.com/manchesterunited",
      twitter: "https://twitter.com/ManUtd",
      instagram: "https://instagram.com/manchesterunited",
      linkedin: "https://linkedin.com/company/manchester-united"
    },
    email: "info@manutd.com",
    phone: "+44 161 868 8000"
  },
  {
    id: 2,
    team: "LA Lakers",
    sport: "Basketball",
    level: "Professional",
    city: "Los Angeles",
    country: "USA",
    revenue: 900000000,
    employees: 850,
    contacts: [
      {
        name: "Michael Johnson",
        position: "Operations Director",
        email: "m.johnson@lakers.com",
        phone: "+1 310-555-1234",
        linkedin: "https://linkedin.com/in/michaeljohnson"
      }
    ],
    logo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    description: "Iconic NBA team based in Los Angeles with a history of championship success.",
    founded: 1947,
    website: "https://www.nba.com/lakers",
    social: {
      facebook: "https://facebook.com/lakers",
      twitter: "https://twitter.com/Lakers",
      instagram: "https://instagram.com/lakers",
      linkedin: "https://linkedin.com/company/los-angeles-lakers"
    },
    email: "info@lakers.com",
    phone: "+1 310-426-6000"
  },
  {
    id: 3,
    team: "Real Madrid",
    sport: "Football",
    level: "Professional",
    city: "Madrid",
    country: "Spain",
    revenue: 820000000,
    employees: 1000,
    contacts: [
      {
        name: "Carlos Rodriguez",
        position: "Commercial Director",
        email: "c.rodriguez@realmadrid.es",
        linkedin: "https://linkedin.com/in/carlosrodriguez"
      }
    ],
    logo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    description: "One of the most successful football clubs worldwide with a rich history.",
    founded: 1902,
    website: "https://www.realmadrid.com",
    social: {
      facebook: "https://facebook.com/realmadrid",
      twitter: "https://twitter.com/realmadrid",
      instagram: "https://instagram.com/realmadrid",
      linkedin: "https://linkedin.com/company/real-madrid-cf"
    },
    email: "info@realmadrid.com",
    phone: "+34 913 984 300"
  },
  {
    id: 4,
    team: "Chicago Bulls",
    sport: "Basketball",
    level: "Professional",
    city: "Chicago",
    country: "USA",
    revenue: 700000000,
    employees: 780,
    contacts: [
      {
        name: "Jennifer Williams",
        position: "PR Director",
        email: "j.williams@bulls.com",
        phone: "+1 312-555-6789",
        linkedin: "https://linkedin.com/in/jenniferwilliams"
      }
    ],
    logo: "/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png",
    description: "Legendary NBA franchise known for its championship dynasty in the 1990s.",
    founded: 1966,
    website: "https://www.nba.com/bulls",
    social: {
      facebook: "https://facebook.com/chicagobulls",
      twitter: "https://twitter.com/chicagobulls",
      instagram: "https://instagram.com/chicagobulls",
      linkedin: "https://linkedin.com/company/chicago-bulls"
    },
    email: "info@bulls.com",
    phone: "+1 312-455-4000"
  },
  {
    id: 5,
    team: "Boston Red Sox",
    sport: "Baseball",
    level: "Professional",
    city: "Boston",
    country: "USA",
    revenue: 650000000,
    employees: 720,
    contacts: [
      {
        name: "David Thompson",
        position: "Marketing Director",
        email: "d.thompson@redsox.com"
      }
    ],
    logo: "/lovable-uploads/53b73771-1565-4d14-87c2-860d6dabe35d.png",
    description: "Historic MLB team with a passionate fanbase and iconic stadium.",
    founded: 1901,
    website: "https://www.mlb.com/redsox",
    social: {
      facebook: "https://facebook.com/redsox",
      twitter: "https://twitter.com/redsox",
      instagram: "https://instagram.com/redsox",
      linkedin: "https://linkedin.com/company/boston-red-sox"
    },
    email: "info@redsox.com",
    phone: "+1 617-267-9440"
  },
  {
    id: 6,
    team: "FC Barcelona",
    sport: "Football",
    level: "Professional",
    city: "Barcelona",
    country: "Spain",
    revenue: 790000000,
    employees: 950,
    contacts: [
      {
        name: "Elena Martinez",
        position: "International Relations Director",
        email: "e.martinez@fcbarcelona.es",
        phone: "+34 695 123 456",
        linkedin: "https://linkedin.com/in/elenamartinez"
      }
    ],
    logo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    description: "Renowned football club with a distinctive style of play and global following.",
    founded: 1899,
    website: "https://www.fcbarcelona.com",
    social: {
      facebook: "https://facebook.com/fcbarcelona",
      twitter: "https://twitter.com/FCBarcelona",
      instagram: "https://instagram.com/fcbarcelona",
      linkedin: "https://linkedin.com/company/fc-barcelona"
    },
    email: "info@fcbarcelona.com",
    phone: "+34 934 964 700"
  },
  {
    id: 7,
    team: "Bayern Munich",
    sport: "Football",
    level: "Professional",
    city: "Munich",
    country: "Germany",
    revenue: 750000000,
    employees: 850,
    contacts: [
      {
        name: "Thomas Weber",
        position: "Commercial Operations Director",
        email: "t.weber@fcbayern.de",
        phone: "+49 89 12345678",
        linkedin: "https://linkedin.com/in/thomasweber"
      }
    ],
    logo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    description: "One of Germany's most successful football clubs with international acclaim.",
    founded: 1900,
    website: "https://www.fcbayern.com",
    social: {
      facebook: "https://facebook.com/FCBayern",
      twitter: "https://twitter.com/FCBayernEN",
      instagram: "https://instagram.com/fcbayern",
      linkedin: "https://linkedin.com/company/fc-bayern-munich"
    },
    email: "info@fcbayern.de",
    phone: "+49 89 699 31-0"
  },
  {
    id: 8,
    team: "Paris Saint-Germain",
    sport: "Football",
    level: "Professional",
    city: "Paris",
    country: "France",
    revenue: 700000000,
    employees: 820,
    contacts: [
      {
        name: "Sophie Dubois",
        position: "Marketing and Partnerships Director",
        email: "s.dubois@psg.fr",
        linkedin: "https://linkedin.com/in/sophiedubois"
      }
    ],
    logo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    description: "Premier French football club with global star players and ambitious vision.",
    founded: 1970,
    website: "https://www.psg.fr",
    social: {
      facebook: "https://facebook.com/PSG",
      twitter: "https://twitter.com/PSG_English",
      instagram: "https://instagram.com/psg",
      linkedin: "https://linkedin.com/company/paris-saint-germain"
    },
    email: "contact@psg.fr",
    phone: "+33 1 41 10 70 00"
  },
  {
    id: 9,
    team: "HC Davos",
    sport: "Ice Hockey",
    level: "Professional",
    city: "Davos",
    country: "Switzerland",
    revenue: 25000000,
    employees: 145,
    contacts: [
      {
        name: "Markus Müller",
        position: "Club Manager",
        email: "m.mueller@hcdavos.ch",
        phone: "+41 81 410 03 03",
        linkedin: "https://linkedin.com/in/markusmueller"
      }
    ],
    logo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    description: "Historic Swiss ice hockey club that hosts the annual Spengler Cup tournament.",
    founded: 1921,
    website: "https://www.hcd.ch",
    social: {
      facebook: "https://facebook.com/HCDavos",
      twitter: "https://twitter.com/HCDavos_off",
      instagram: "https://instagram.com/hcdavos_official",
      linkedin: "https://linkedin.com/company/hc-davos"
    },
    email: "info@hcdavos.ch",
    phone: "+41 81 410 03 03"
  },
  {
    id: 10,
    team: "Juventus FC",
    sport: "Football",
    level: "Professional",
    city: "Turin",
    country: "Italy",
    revenue: 670000000,
    employees: 780,
    contacts: [
      {
        name: "Marco Rossi",
        position: "Corporate Development Director",
        email: "m.rossi@juventus.com",
        linkedin: "https://linkedin.com/in/marcorossi"
      }
    ],
    logo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    description: "Italy's most successful football club with a rich history and global brand.",
    founded: 1897,
    website: "https://www.juventus.com",
    social: {
      facebook: "https://facebook.com/Juventus",
      twitter: "https://twitter.com/juventusfcen",
      instagram: "https://instagram.com/juventus",
      linkedin: "https://linkedin.com/company/juventus-football-club"
    },
    email: "info@juventus.com",
    phone: "+39 011 4530486"
  },
  {
    id: 11,
    team: "INEOS Grenadiers",
    sport: "Cycling",
    level: "Professional",
    city: "Manchester",
    country: "England",
    revenue: 50000000,
    employees: 120,
    contacts: [
      {
        name: "James Wilson",
        position: "Team Principal",
        email: "j.wilson@ineosgrenadiers.com",
        phone: "+44 161 246 8300",
        linkedin: "https://linkedin.com/in/jameswilson"
      }
    ],
    logo: "/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png",
    description: "Leading professional cycling team competing in UCI World Tour events.",
    founded: 2010,
    website: "https://www.ineosgrenadiers.com",
    social: {
      facebook: "https://facebook.com/INEOSGrenadiers",
      twitter: "https://twitter.com/INEOSGrenadiers",
      instagram: "https://instagram.com/ineosgrenadiers",
      linkedin: "https://linkedin.com/company/ineos-grenadiers"
    },
    email: "info@ineosgrenadiers.com",
    phone: "+44 161 246 8300"
  },
  {
    id: 12,
    team: "Dublin GAA",
    sport: "Gaelic Football",
    level: "Amateur",
    city: "Dublin",
    country: "Ireland",
    revenue: 15000000,
    employees: 85,
    contacts: [
      {
        name: "Siobhan O'Connor",
        position: "Commercial Manager",
        email: "s.oconnor@dublingaa.ie",
        linkedin: "https://linkedin.com/in/siobhanoconnor"
      }
    ],
    logo: "/lovable-uploads/53b73771-1565-4d14-87c2-860d6dabe35d.png",
    description: "County Gaelic Athletic Association team representing Dublin in Gaelic football.",
    founded: 1884,
    website: "https://www.dublingaa.ie",
    social: {
      facebook: "https://facebook.com/DublinGAA",
      twitter: "https://twitter.com/DubGAAOfficial",
      instagram: "https://instagram.com/dublingaa",
      linkedin: "https://linkedin.com/company/dublin-gaa"
    },
    email: "info@dublingaa.ie",
    phone: "+353 1 819 2300"
  },
  {
    id: 13,
    team: "Team Jumbo-Visma",
    sport: "Cycling",
    level: "Professional",
    city: "Den Bosch",
    country: "Netherlands",
    revenue: 40000000,
    employees: 110,
    contacts: [
      {
        name: "Jan van der Berg",
        position: "Sports Director",
        email: "j.vandenberg@jumbovisma.com",
        phone: "+31 73 689 5889",
        linkedin: "https://linkedin.com/in/janvandenberg"
      }
    ],
    logo: "/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png",
    description: "Dutch professional cycling team competing in UCI World Tour.",
    founded: 1984,
    website: "https://www.teamjumbovisma.com",
    social: {
      facebook: "https://facebook.com/teamjumbovisma",
      twitter: "https://twitter.com/jumbovisma_road",
      instagram: "https://instagram.com/jumbovisma_road",
      linkedin: "https://linkedin.com/company/team-jumbo-visma"
    },
    email: "info@teamjumbovisma.com",
    phone: "+31 73 689 5889"
  },
  {
    id: 14,
    team: "HIFK",
    sport: "Ice Hockey",
    level: "Professional",
    city: "Helsinki",
    country: "Finland",
    revenue: 18000000,
    employees: 95,
    contacts: [
      {
        name: "Lauri Virtanen",
        position: "General Manager",
        email: "l.virtanen@hifk.fi",
        linkedin: "https://linkedin.com/in/laurivirtanen"
      }
    ],
    logo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    description: "Historic Finnish ice hockey club competing in Liiga, Finland's top professional league.",
    founded: 1897,
    website: "https://www.hifk.fi",
    social: {
      facebook: "https://facebook.com/HIFKHockey",
      twitter: "https://twitter.com/HIFKHockey",
      instagram: "https://instagram.com/hifkhockey",
      linkedin: "https://linkedin.com/company/hifk-hockey"
    },
    email: "info@hifk.fi",
    phone: "+358 9 7515 4400"
  },
  {
    id: 15,
    team: "Racing 92",
    sport: "Rugby Union",
    level: "Professional",
    city: "Paris",
    country: "France",
    revenue: 35000000,
    employees: 110,
    contacts: [
      {
        name: "Pierre Dupont",
        position: "Business Development Manager",
        email: "p.dupont@racing92.fr",
        phone: "+33 1 46 69 92 00",
        linkedin: "https://linkedin.com/in/pierredupont"
      }
    ],
    logo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    description: "Professional rugby union club based in the Paris region competing in Top 14.",
    founded: 1890,
    website: "https://www.racing92.fr",
    social: {
      facebook: "https://facebook.com/Racing92Officiel",
      twitter: "https://twitter.com/racing92",
      instagram: "https://instagram.com/racing92",
      linkedin: "https://linkedin.com/company/racing-92"
    },
    email: "contact@racing92.fr",
    phone: "+33 1 46 69 92 00"
  },
  {
    id: 16,
    team: "Ferrari F1 Team",
    sport: "Formula 1",
    level: "Professional",
    city: "Maranello",
    country: "Italy",
    revenue: 680000000,
    employees: 1200,
    contacts: [
      {
        name: "Luca Bianchi",
        position: "Commercial Partnerships Director",
        email: "l.bianchi@ferrari.com",
        linkedin: "https://linkedin.com/in/lucabianchi"
      }
    ],
    logo: "/lovable-uploads/53b73771-1565-4d14-87c2-860d6dabe35d.png",
    description: "Iconic Formula 1 racing team with a rich history in motorsport.",
    founded: 1929,
    website: "https://www.ferrari.com/en-EN/formula1",
    social: {
      facebook: "https://facebook.com/ScuderiaFerrari",
      twitter: "https://twitter.com/ScuderiaFerrari",
      instagram: "https://instagram.com/scuderiaferrari",
      linkedin: "https://linkedin.com/company/ferrari"
    },
    email: "formula1@ferrari.com",
    phone: "+39 0536 949111"
  },
  {
    id: 17,
    team: "SL Benfica",
    sport: "Football",
    level: "Professional",
    city: "Lisbon",
    country: "Portugal",
    revenue: 175000000,
    employees: 450,
    contacts: [
      {
        name: "André Silva",
        position: "Corporate Relations Manager",
        email: "a.silva@slbenfica.pt",
        phone: "+351 21 721 9500",
        linkedin: "https://linkedin.com/in/andresilva"
      }
    ],
    logo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    description: "One of Portugal's 'Big Three' football clubs with a strong European reputation.",
    founded: 1904,
    website: "https://www.slbenfica.pt",
    social: {
      facebook: "https://facebook.com/SLBenfica",
      twitter: "https://twitter.com/SLBenfica",
      instagram: "https://instagram.com/slbenfica",
      linkedin: "https://linkedin.com/company/sl-benfica"
    },
    email: "info@slbenfica.pt",
    phone: "+351 21 721 9500"
  },
  {
    id: 18,
    team: "RFC Anderlecht",
    sport: "Football",
    level: "Professional",
    city: "Brussels",
    country: "Belgium",
    revenue: 85000000,
    employees: 320,
    contacts: [
      {
        name: "Thomas Vermaelen",
        position: "Sporting Director",
        email: "t.vermaelen@rsca.be",
        linkedin: "https://linkedin.com/in/thomasvermaelen"
      }
    ],
    logo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    description: "Belgium's most successful football club with a strong youth development program.",
    founded: 1908,
    website: "https://www.rsca.be",
    social: {
      facebook: "https://facebook.com/RSCAnderlecht",
      twitter: "https://twitter.com/rscanderlecht",
      instagram: "https://instagram.com/rscanderlecht",
      linkedin: "https://linkedin.com/company/rsc-anderlecht"
    },
    email: "info@rsca.be",
    phone: "+32 2 523 50 00"
  },
  {
    id: 19,
    team: "FC Copenhagen",
    sport: "Football",
    level: "Professional",
    city: "Copenhagen",
    country: "Denmark",
    revenue: 70000000,
    employees: 280,
    contacts: [
      {
        name: "Lars Nielsen",
        position: "Chief Commercial Officer",
        email: "l.nielsen@fck.dk",
        phone: "+45 35 43 31 31",
        linkedin: "https://linkedin.com/in/larsnielsen"
      }
    ],
    logo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    description: "Denmark's most successful football club in recent decades.",
    founded: 1992,
    website: "https://www.fck.dk",
    social: {
      facebook: "https://facebook.com/fckoebenhavn",
      twitter: "https://twitter.com/FCKobenhavn",
      instagram: "https://instagram.com/fckoebenhavn",
      linkedin: "https://linkedin.com/company/fc-copenhagen"
    },
    email: "info@fck.dk",
    phone: "+45 35 43 31 31"
  },
  {
    id: 20,
    team: "AIK",
    sport: "Football",
    level: "Professional",
    city: "Stockholm",
    country: "Sweden",
    revenue: 45000000,
    employees: 195,
    contacts: [
      {
        name: "Erik Andersson",
        position: "CEO",
        email: "e.andersson@aik.se",
        linkedin: "https://linkedin.com/in/erikandersson"
      }
    ],
    logo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    description: "One of Sweden's oldest and most successful football clubs.",
    founded: 1891,
    website: "https://www.aikfotboll.se",
    social: {
      facebook: "https://facebook.com/aikfotboll",
      twitter: "https://twitter.com/aikfotboll",
      instagram: "https://instagram.com/aikfotboll",
      linkedin: "https://linkedin.com/company/aik-fotboll"
    },
    email: "info@aikfotboll.se",
    phone: "+46 8 735 96 50"
  },
  {
    id: 21,
    team: "Celtic FC",
    sport: "Football",
    level: "Professional",
    city: "Glasgow",
    country: "Scotland",
    revenue: 120000000,
    employees: 350,
    contacts: [
      {
        name: "Angus MacDonald",
        position: "Commercial Director",
        email: "a.macdonald@celticfc.co.uk",
        phone: "+44 141 551 4288",
        linkedin: "https://linkedin.com/in/angusmacdonald"
      }
    ],
    logo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    description: "Historic Scottish football club with a passionate global fanbase.",
    founded: 1887,
    website: "https://www.celticfc.com",
    social: {
      facebook: "https://facebook.com/CelticFC",
      twitter: "https://twitter.com/CelticFC",
      instagram: "https://instagram.com/celticfc",
      linkedin: "https://linkedin.com/company/celtic-football-club"
    },
    email: "info@celticfc.co.uk",
    phone: "+44 141 551 4288"
  },
  {
    id: 22,
    team: "Olympiacos BC",
    sport: "Basketball",
    level: "Professional",
    city: "Piraeus",
    country: "Greece",
    revenue: 40000000,
    employees: 120,
    contacts: [
      {
        name: "Giorgos Papadopoulos",
        position: "Marketing Manager",
        email: "g.papadopoulos@olympiacosbc.gr",
        linkedin: "https://linkedin.com/in/giorgospapadopoulos"
      }
    ],
    logo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    description: "Dominant Greek basketball club with multiple EuroLeague championships.",
    founded: 1931,
    website: "https://www.olympiacosbc.gr",
    social: {
      facebook: "https://facebook.com/OlympiacosBC",
      twitter: "https://twitter.com/Olympiacos_BC",
      instagram: "https://instagram.com/olympiacosbc",
      linkedin: "https://linkedin.com/company/olympiacos-bc"
    },
    email: "info@olympiacosbc.gr",
    phone: "+30 210 417 9601"
  },
  {
    id: 23,
    team: "Cardiff Rugby",
    sport: "Rugby Union",
    level: "Professional",
    city: "Cardiff",
    country: "Wales",
    revenue: 25000000,
    employees: 110,
    contacts: [
      {
        name: "Rhys Williams",
        position: "Operations Director",
        email: "r.williams@cardiffrugby.wales",
        phone: "+44 29 2030 2030",
        linkedin: "https://linkedin.com/in/rhyswilliams"
      }
    ],
    logo: "/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png",
    description: "Professional rugby union team competing in the United Rugby Championship.",
    founded: 1876,
    website: "https://www.cardiffrugby.wales",
    social: {
      facebook: "https://facebook.com/CardiffRugby",
      twitter: "https://twitter.com/CardiffRugby",
      instagram: "https://instagram.com/cardiffrugby",
      linkedin: "https://linkedin.com/company/cardiff-rugby"
    },
    email: "info@cardiffrugby.wales",
    phone: "+44 29 2030 2030"
  },
  {
    id: 24,
    team: "Ulster Rugby",
    sport: "Rugby Union",
    level: "Professional",
    city: "Belfast",
    country: "Northern Ireland",
    revenue: 22000000,
    employees: 95,
    contacts: [
      {
        name: "Patrick O'Neill",
        position: "Commercial Director",
        email: "p.oneill@ulsterrugby.com",
        linkedin: "https://linkedin.com/in/patrickoneill"
      }
    ],
    logo: "/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png",
    description: "Professional rugby union team representing the province of Ulster.",
    founded: 1879,
    website: "https://www.ulsterrugby.com",
    social: {
      facebook: "https://facebook.com/UlsterRugby",
      twitter: "https://twitter.com/UlsterRugby",
      instagram: "https://instagram.com/ulsterrugby",
      linkedin: "https://linkedin.com/company/ulster-rugby"
    },
    email: "info@ulsterrugby.com",
    phone: "+44 28 9049 3222"
  },
  {
    id: 25,
    team: "Royal Yacht Club of Belgium",
    sport: "Sailing",
    level: "Amateur",
    city: "Antwerp",
    country: "Belgium",
    revenue: 8000000,
    employees: 45,
    contacts: [
      {
        name: "Luc Janssens",
        position: "Club Secretary",
        email: "l.janssens@rycb.be",
        phone: "+32 3 219 08 38",
        linkedin: "https://linkedin.com/in/lucjanssens"
      }
    ],
    logo: "/lovable-uploads/53b73771-1565-4d14-87c2-860d6dabe35d.png",
    description: "Historic yacht club promoting sailing and maritime sports in Belgium.",
    founded: 1851,
    website: "https://www.rycb.be",
    social: {
      facebook: "https://facebook.com/RoyalYachtClubBelgium",
      twitter: "https://twitter.com/RYCB_official",
      instagram: "https://instagram.com/royalyachtclubbelgium",
      linkedin: "https://linkedin.com/company/royal-yacht-club-of-belgium"
    },
    email: "info@rycb.be",
    phone: "+32 3 219 08 38"
  }
];

// Employee data mapped to teams
const employeesByTeam = [
  {
    id: 1,
    team: "Manchester United",
    teamLogo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    employees: [
      {
        id: 1,
        name: "John Smith",
        position: "Marketing Director",
        email: "j.s******@manutd.com",
        phone: "+44 77** *** ***",
        linkedin: "https://linkedin.com/in/johnsmith",
        verified: true,
        activeReplier: true
      },
      {
        id: 2,
        name: "Sarah Jones",
        position: "Fan Relations Manager",
        email: "s.j****@manutd.com",
        verified: true
      },
      {
        id: 11,
        name: "Olivia Parker",
        position: "Ticket Sales Manager",
        email: "o.p*****@manutd.com",
        phone: "+44 78** *** ***"
      }
    ]
  },
  {
    id: 2,
    team: "LA Lakers",
    teamLogo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    employees: [
      {
        id: 3,
        name: "Michael Johnson",
        position: "Operations Director",
        email: "m.j******@lakers.com",
        phone: "+1 31*-***-****",
        linkedin: "https://linkedin.com/in/michaeljohnson",
        verified: true
      },
      {
        id: 7,
        name: "Emma Wilson",
        position: "Digital Strategy Director",
        email: "e.w****@lakers.com",
        phone: "+1 32*-***-****"
      },
      {
        id: 12,
        name: "Kevin Zhang",
        position: "International Development Director",
        email: "k.z****@lakers.com",
        linkedin: "https://linkedin.com/in/kevinzhang",
        verified: true,
        activeReplier: true
      }
    ]
  },
  {
    id: 3,
    team: "Real Madrid",
    teamLogo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    employees: [
      {
        id: 4,
        name: "Carlos Rodriguez",
        position: "Commercial Director",
        email: "c.r********@realmadrid.es",
        linkedin: "https://linkedin.com/in/carlosrodriguez"
      },
      {
        id: 8,
        name: "James Miller",
        position: "Sponsorship Director",
        email: "j.m*****@realmadrid.es",
        linkedin: "https://linkedin.com/in/jamesmiller",
        verified: true,
        activeReplier: true
      }
    ]
  },
  {
    id: 4,
    team: "Chicago Bulls",
    teamLogo: "/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png",
    employees: [
      {
        id: 5,
        name: "Jennifer Williams",
        position: "PR Director",
        email: "j.w******@bulls.com",
        phone: "+1 31*-***-****",
        linkedin: "https://linkedin.com/in/jenniferwilliams",
        activeReplier: true
      },
      {
        id: 9,
        name: "Rachel Green",
        position: "Community Relations Manager",
        email: "r.g****@bulls.com",
        phone: "+1 31*-***-****",
        verified: true
      }
    ]
  },
  {
    id: 5,
    team: "Boston Red Sox",
    teamLogo: "/lovable-uploads/53b73771-1565-4d14-87c2-860d6dabe35d.png",
    employees: [
      {
        id: 6,
        name: "David Thompson",
        position: "Marketing Director",
        email: "d.t******@redsox.com",
        verified: true
      },
      {
        id: 10,
        name: "Daniel Lee",
        position: "Data Analytics Director",
        email: "d.l**@redsox.com",
        linkedin: "https://linkedin.com/in/daniellee",
        activeReplier: true
      }
    ]
  }
];

const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [credits, setCredits] = useState(456);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  
  // Find the team based on the teamId parameter
  const team = teamData.find(t => t.id.toString() === teamId);
  const teamEmployees = employeesByTeam.find(t => t.id.toString() === teamId);
  
  // Handle if team not found
  if (!team) {
    useEffect(() => {
      navigate("/crm/teams");
    }, [navigate]);
    return null;
  }
  
  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`;
    }
    if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(1)}K`;
    }
    return `$${revenue}`;
  };
  
  const revealEmail = (email: string) => {
    if (revealedEmails[email]) return;
    setCredits(prev => Math.max(0, prev - 2));
    setRevealedEmails(prev => ({ ...prev, [email]: true }));
  };
  
  const revealPhone = (phone: string) => {
    if (revealedPhones[phone]) return;
    setCredits(prev => Math.max(0, prev - 3));
    setRevealedPhones(prev => ({ ...prev, [phone]: true }));
  };
  
  return (
    <div className="container mx-auto px-0">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/crm/teams")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-sportbnk-navy">Team Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Team Header Card */}
        <Card className="shadow-md lg:col-span-4">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={team.logo} alt={team.team} />
                <AvatarFallback>{team.team.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-2 flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h2 className="text-3xl font-bold">{team.team}</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500">{team.sport}</Badge>
                    <Badge variant="outline">{team.level}</Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  {team.city}, {team.country}
                </p>
                
                <p className="max-w-3xl">{team.description}</p>
              </div>
              
              <div className="flex flex-col gap-2 self-start">
                <p className="text-sm text-muted-foreground">Credits remaining</p>
                <p className="text-2xl font-bold text-sportbnk-green">{credits}</p>
                <Button className="mt-2 bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-sm">
                  Upgrade
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Team Information Tabs */}
        <div className="lg:col-span-4">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Location</CardTitle>
                    </div>
                    <p className="mt-2">{team.city}, {team.country}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Employees</CardTitle>
                    </div>
                    <p className="mt-2">{team.employees}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
                    </div>
                    <p className="mt-2">{formatRevenue(team.revenue)}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Founded</CardTitle>
                    </div>
                    <p className="mt-2">{team.founded}</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About {team.team}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{team.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Email</CardTitle>
                    </div>
                    <a href={`mailto:${team.email}`} className="text-blue-600 hover:underline">{team.email}</a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Phone</CardTitle>
                    </div>
                    <a href={`tel:${team.phone}`} className="text-blue-600 hover:underline">{team.phone}</a>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">Website</CardTitle>
                    </div>
                    <a href={team.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {team.website.replace(/^https?:\/\//, '')}
                    </a>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="social" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {team.social.facebook && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <CardTitle className="text-sm font-medium">Facebook</CardTitle>
                      </div>
                      <a href={team.social.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Visit Page
                      </a>
                    </CardContent>
                  </Card>
                )}
                
                {team.social.twitter && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Twitter className="h-4 w-4 text-sky-500" />
                        <CardTitle className="text-sm font-medium">Twitter</CardTitle>
                      </div>
                      <a href={team.social.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
                        Visit Profile
                      </a>
                    </CardContent>
                  </Card>
                )}
                
                {team.social.instagram && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Instagram className="h-4 w-4 text-pink-600" />
                        <CardTitle className="text-sm font-medium">Instagram</CardTitle>
                      </div>
                      <a href={team.social.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                        Visit Profile
                      </a>
                    </CardContent>
                  </Card>
                )}
                
                {team.social.linkedin && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        <CardTitle className="text-sm font-medium">LinkedIn</CardTitle>
                      </div>
                      <a href={team.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                        Visit Page
                      </a>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Team Employees Section */}
        <div className="lg:col-span-4 mt-6">
          <Card className="shadow-md">
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Team Employees</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {teamEmployees && (
                <TeamEmployees
                  selectedTeam={teamEmployees}
                  revealedEmails={revealedEmails}
                  revealedPhones={revealedPhones}
                  onRevealEmail={revealEmail}
                  onRevealPhone={revealPhone}
                  onCloseEmployees={() => {}}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;

