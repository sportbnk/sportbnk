
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
    contacts: [
      { name: "Benjamin Adams", position: "Business Operations", email: "b*****@yankees.com" },
      { name: "Victoria Scott", position: "Merchandise Director", email: "v*****@yankees.com" }
    ]
  }
];

export default ContactDatabase;
