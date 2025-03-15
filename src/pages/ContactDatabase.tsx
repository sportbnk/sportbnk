
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import DatabaseFilters from "@/components/database/DatabaseFilters";
import ContactsTable from "@/components/database/ContactsTable";
import CreditDisplay from "@/components/database/CreditDisplay";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ContactDatabase = () => {
  const [filteredData, setFilteredData] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [credits, setCredits] = useState(100);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredData(dummyData);
      return;
    }
    
    const filtered = dummyData.filter(
      (item) =>
        item.team.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.sport.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.country.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let results = [...dummyData];
    
    if (filters.sport && filters.sport !== "all") {
      results = results.filter(item => item.sport === filters.sport);
    }
    
    if (filters.level && filters.level !== "all") {
      results = results.filter(item => item.level === filters.level);
    }
    
    if (filters.country && filters.country !== "all") {
      results = results.filter(item => item.country === filters.country);
    }
    
    if (filters.revenue) {
      if (filters.revenue === "less1m") {
        results = results.filter(item => item.revenue < 1000000);
      } else if (filters.revenue === "1m-10m") {
        results = results.filter(item => item.revenue >= 1000000 && item.revenue < 10000000);
      } else if (filters.revenue === "10m-50m") {
        results = results.filter(item => item.revenue >= 10000000 && item.revenue < 50000000);
      } else if (filters.revenue === "more50m") {
        results = results.filter(item => item.revenue >= 50000000);
      }
    }
    
    if (filters.employees) {
      if (filters.employees === "less50") {
        results = results.filter(item => item.employees < 50);
      } else if (filters.employees === "50-200") {
        results = results.filter(item => item.employees >= 50 && item.employees < 200);
      } else if (filters.employees === "200-1000") {
        results = results.filter(item => item.employees >= 200 && item.employees < 1000);
      } else if (filters.employees === "more1000") {
        results = results.filter(item => item.employees >= 1000);
      }
    }
    
    setFilteredData(results);
  };

  const useCredits = (amount: number) => {
    setCredits(prevCredits => Math.max(0, prevCredits - amount));
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Sports Contact Database | Sportbnk</title>
        <meta name="description" content="Find key contacts in sports teams with our powerful database" />
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-sportbnk-navy">Sports Contact Database</h1>
            <CreditDisplay credits={credits} />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search teams, sports, locations..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <DatabaseFilters onFilterChange={handleFilterChange} />
            </div>
            <div className="lg:col-span-3">
              <ContactsTable data={filteredData} useCredits={useCredits} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// Dummy data for development
const dummyData = [
  {
    id: 1,
    team: "Manchester United",
    sport: "Football",
    level: "Professional",
    city: "Manchester",
    country: "United Kingdom",
    revenue: 120000000,
    employees: 1200,
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
    founded: 1878,
    website: "https://www.manutd.com",
    description: "Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England. The club competes in the Premier League, the top flight of English football.",
    social: {
      facebook: "https://www.facebook.com/manchesterunited",
      twitter: "https://twitter.com/ManUtd",
      instagram: "https://www.instagram.com/manchesterunited",
      linkedin: "https://www.linkedin.com/company/manchester-united"
    },
    contacts: [
      { name: "John Smith", position: "Marketing Director", email: "j********@manutd.com" },
      { name: "Sarah Johnson", position: "Head of Operations", email: "s*******@manutd.com" },
      { name: "Mark Wilson", position: "Sponsorship Manager", email: "m******@manutd.com" }
    ]
  },
  {
    id: 2,
    team: "LA Lakers",
    sport: "Basketball",
    level: "Professional",
    city: "Los Angeles",
    country: "USA",
    revenue: 150000000,
    employees: 800,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
    founded: 1947,
    website: "https://www.nba.com/lakers",
    description: "The Los Angeles Lakers are an American professional basketball team based in Los Angeles. The Lakers compete in the National Basketball Association as a member of the league's Western Conference Pacific Division.",
    social: {
      facebook: "https://www.facebook.com/losangeleslakers",
      twitter: "https://twitter.com/Lakers",
      instagram: "https://www.instagram.com/lakers"
    },
    contacts: [
      { name: "Michael Brown", position: "Team Manager", email: "m*****@lakers.com" },
      { name: "Jessica Davis", position: "PR Director", email: "j*****@lakers.com" }
    ]
  },
  {
    id: 3,
    team: "Boston Red Sox",
    sport: "Baseball",
    level: "Professional",
    city: "Boston",
    country: "USA",
    revenue: 95000000,
    employees: 650,
    logo: "https://upload.wikimedia.org/wikipedia/en/6/6d/RedSoxPrimary_HangingSocks.svg",
    founded: 1901,
    website: "https://www.mlb.com/redsox",
    description: "The Boston Red Sox are an American professional baseball team based in Boston. The Red Sox compete in Major League Baseball as a member club of the American League East division.",
    social: {
      facebook: "https://www.facebook.com/RedSox",
      twitter: "https://twitter.com/RedSox",
      instagram: "https://www.instagram.com/redsox"
    },
    contacts: [
      { name: "Robert Wilson", position: "Operations Director", email: "r******@redsox.com" },
      { name: "Emma Garcia", position: "Fan Relations Manager", email: "e*****@redsox.com" }
    ]
  },
  {
    id: 4,
    team: "Wasps RFC",
    sport: "Rugby",
    level: "Professional",
    city: "Coventry",
    country: "United Kingdom",
    revenue: 25000000,
    employees: 220,
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4b/Wasps_RFC_logo.svg",
    founded: 1867,
    website: "https://www.wasps.co.uk",
    description: "Wasps Rugby Football Club is an English professional rugby union team. Originally playing in London, the club is now based in Coventry, England and competes in Premiership Rugby.",
    social: {
      facebook: "https://www.facebook.com/waspsrugby",
      twitter: "https://twitter.com/WaspsRugby"
    },
    contacts: [
      { name: "James Thompson", position: "Commercial Director", email: "j*******@wasps.co.uk" }
    ]
  },
  {
    id: 5,
    team: "Sydney Swans",
    sport: "Australian Football",
    level: "Professional",
    city: "Sydney",
    country: "Australia",
    revenue: 40000000,
    employees: 300,
    logo: "https://upload.wikimedia.org/wikipedia/en/2/21/Sydney_Swans_logo.svg",
    founded: 1874,
    website: "https://www.sydneyswans.com.au",
    description: "The Sydney Swans are a professional Australian rules football club which plays in the Australian Football League. Established in Melbourne as the South Melbourne Football Club in 1874, the Swans relocated to Sydney in 1982.",
    social: {
      facebook: "https://www.facebook.com/sydneyswans",
      instagram: "https://www.instagram.com/sydneyswans"
    },
    contacts: [
      { name: "David Miller", position: "Sponsorship Director", email: "d*****@swans.com.au" },
      { name: "Olivia Brown", position: "Community Engagement", email: "o*****@swans.com.au" }
    ]
  },
  {
    id: 6,
    team: "Chicago Bulls",
    sport: "Basketball",
    level: "Professional",
    city: "Chicago",
    country: "USA",
    revenue: 115000000,
    employees: 710,
    logo: "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg",
    founded: 1966,
    website: "https://www.nba.com/bulls",
    description: "The Chicago Bulls are an American professional basketball team based in Chicago. The Bulls compete in the National Basketball Association as a member of the league's Eastern Conference Central Division.",
    social: {
      facebook: "https://www.facebook.com/chicagobulls",
      twitter: "https://twitter.com/chicagobulls",
      instagram: "https://www.instagram.com/chicagobulls"
    },
    contacts: [
      { name: "Thomas Anderson", position: "Marketing VP", email: "t********@bulls.com" }
    ]
  },
  {
    id: 7,
    team: "Real Madrid",
    sport: "Football",
    level: "Professional",
    city: "Madrid",
    country: "Spain",
    revenue: 180000000,
    employees: 950,
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    founded: 1902,
    website: "https://www.realmadrid.com",
    description: "Real Madrid Club de Fútbol, commonly referred to as Real Madrid, is a Spanish professional football club based in Madrid. The club competes in La Liga, the top tier of Spanish football.",
    social: {
      facebook: "https://www.facebook.com/RealMadrid",
      twitter: "https://twitter.com/realmadrid",
      instagram: "https://www.instagram.com/realmadrid"
    },
    contacts: [
      { name: "Carlos Rodriguez", position: "International Relations", email: "c********@realmadrid.com" },
      { name: "Isabella Martinez", position: "Digital Strategy Director", email: "i********@realmadrid.com" }
    ]
  },
  {
    id: 8,
    team: "Oxford University RFC",
    sport: "Rugby",
    level: "Amateur",
    city: "Oxford",
    country: "United Kingdom",
    revenue: 750000,
    employees: 35,
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3a/Oxford_University_RFC_logo.svg",
    founded: 1869,
    website: "https://www.ourfc.org",
    description: "Oxford University Rugby Football Club is the rugby union club of the University of Oxford. The club contests The Varsity Match every year against Cambridge University at Twickenham Stadium, London.",
    social: {
      facebook: "https://www.facebook.com/OURFCblues",
      twitter: "https://twitter.com/OURFC_Tweet"
    },
    contacts: [
      { name: "William Barnes", position: "Club Secretary", email: "w*****@ourfc.org" }
    ]
  },
  {
    id: 9,
    team: "Toronto Raptors",
    sport: "Basketball",
    level: "Professional",
    city: "Toronto",
    country: "Canada",
    revenue: 90000000,
    employees: 520,
    logo: "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg",
    founded: 1995,
    website: "https://www.nba.com/raptors",
    description: "The Toronto Raptors are a Canadian professional basketball team based in Toronto. The Raptors compete in the National Basketball Association as a member of the league's Eastern Conference Atlantic Division.",
    social: {
      facebook: "https://www.facebook.com/torontoraptors",
      twitter: "https://twitter.com/Raptors",
      instagram: "https://www.instagram.com/raptors"
    },
    contacts: [
      { name: "Alexander Lee", position: "Operations Manager", email: "a***@raptors.com" }
    ]
  },
  {
    id: 10,
    team: "Liverpool FC",
    sport: "Football",
    level: "Professional",
    city: "Liverpool",
    country: "United Kingdom",
    revenue: 140000000,
    employees: 880,
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    founded: 1892,
    website: "https://www.liverpoolfc.com",
    description: "Liverpool Football Club is a professional football club based in Liverpool, England. The club competes in the Premier League, the top tier of English football.",
    social: {
      facebook: "https://www.facebook.com/LiverpoolFC",
      twitter: "https://twitter.com/LFC",
      instagram: "https://www.instagram.com/liverpoolfc"
    },
    contacts: [
      { name: "Daniel Wright", position: "Commercial Director", email: "d*****@liverpoolfc.com" },
      { name: "Sophie Turner", position: "Fan Engagement Lead", email: "s*****@liverpoolfc.com" }
    ]
  },
  {
    id: 11,
    team: "Brooklyn Nets",
    sport: "Basketball",
    level: "Professional",
    city: "New York",
    country: "USA",
    revenue: 85000000,
    employees: 490,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg",
    founded: 1967,
    website: "https://www.nba.com/nets",
    description: "The Brooklyn Nets are an American professional basketball team based in the New York City borough of Brooklyn. The Nets compete in the National Basketball Association as a member of the Atlantic Division of the Eastern Conference.",
    social: {
      facebook: "https://www.facebook.com/BrooklynNets",
      twitter: "https://twitter.com/BrooklynNets",
      instagram: "https://www.instagram.com/brooklynnets"
    },
    contacts: [
      { name: "Christopher Johnson", position: "Business Development", email: "c*******@nets.com" }
    ]
  },
  {
    id: 12,
    team: "Manchester City",
    sport: "Football",
    level: "Professional",
    city: "Manchester",
    country: "United Kingdom",
    revenue: 160000000,
    employees: 920,
    logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    founded: 1880,
    website: "https://www.mancity.com",
    description: "Manchester City Football Club is an English football club based in Manchester that competes in the Premier League, the top flight of English football.",
    social: {
      facebook: "https://www.facebook.com/mancity",
      twitter: "https://twitter.com/ManCity",
      instagram: "https://www.instagram.com/mancity"
    },
    contacts: [
      { name: "Elizabeth Parker", position: "Partnerships Director", email: "e*******@mancity.com" }
    ]
  },
  {
    id: 13,
    team: "University of Texas Athletics",
    sport: "Multiple",
    level: "Amateur",
    city: "Austin",
    country: "USA",
    revenue: 15000000,
    employees: 185,
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Texas_Longhorns_logo.svg",
    founded: 1893,
    website: "https://texassports.com",
    description: "The Texas Longhorns are the athletic teams that represent The University of Texas at Austin. The teams are sometimes referred to as the 'Horns and take their name from Longhorn cattle.",
    social: {
      facebook: "https://www.facebook.com/TexasLonghorns",
      twitter: "https://twitter.com/TexasLonghorns",
      instagram: "https://www.instagram.com/texaslonghorns"
    },
    contacts: [
      { name: "Richard Martinez", position: "Athletic Director", email: "r********@utexas.edu" },
      { name: "Amanda Wilson", position: "Alumni Relations", email: "a******@utexas.edu" }
    ]
  },
  {
    id: 14,
    team: "Bayern Munich",
    sport: "Football",
    level: "Professional",
    city: "Munich",
    country: "Germany",
    revenue: 155000000,
    employees: 840,
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
    founded: 1900,
    website: "https://fcbayern.com",
    description: "Fußball-Club Bayern München e.V., commonly known as FC Bayern München, FCB, Bayern Munich, or simply Bayern, is a German professional sports club based in Munich, Bavaria.",
    social: {
      facebook: "https://www.facebook.com/FCBayern",
      twitter: "https://twitter.com/FCBayern",
      instagram: "https://www.instagram.com/fcbayern"
    },
    contacts: [
      { name: "Hans Mueller", position: "International Marketing", email: "h******@fcbayern.com" }
    ]
  },
  {
    id: 15,
    team: "New York Yankees",
    sport: "Baseball",
    level: "Professional",
    city: "New York",
    country: "USA",
    revenue: 175000000,
    employees: 780,
    logo: "https://upload.wikimedia.org/wikipedia/en/2/25/NewYorkYankees_PrimaryLogo.svg",
    founded: 1901,
    website: "https://www.mlb.com/yankees",
    description: "The New York Yankees are an American professional baseball team based in the New York City borough of the Bronx. The Yankees compete in Major League Baseball as a member club of the American League East division.",
    social: {
      facebook: "https://www.facebook.com/Yankees",
      twitter: "https://twitter.com/Yankees",
      instagram: "https://www.instagram.com/yankees"
    },
    contacts: [
      { name: "Benjamin Adams", position: "Business Operations", email: "b*****@yankees.com" },
      { name: "Victoria Scott", position: "Merchandise Director", email: "v*****@yankees.com" }
    ]
  }
];

export default ContactDatabase;
