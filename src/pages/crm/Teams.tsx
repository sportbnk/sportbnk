
import React, { useState } from "react";
import CrmLayout from "@/components/crm/CrmLayout";
import ContactsTable from "@/components/database/ContactsTable";
import ContactsFilters from "@/components/database/ContactsFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

// Dummy data for teams
const teamData = [
  {
    id: 1,
    team: "Manchester United",
    sport: "Football",
    level: "Professional",
    city: "Manchester",
    country: "United Kingdom",
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
      instagram: "https://instagram.com/manchesterunited"
    }
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
      instagram: "https://instagram.com/lakers"
    }
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
      instagram: "https://instagram.com/realmadrid"
    }
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
      instagram: "https://instagram.com/chicagobulls"
    }
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
      instagram: "https://instagram.com/redsox"
    }
  }
];

const Teams = () => {
  const [credits, setCredits] = useState(456);
  
  const useCredits = (amount: number) => {
    setCredits(prev => Math.max(0, prev - amount));
  };
  
  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // In a real application, you would filter the data based on the selected filters
  };
  
  return (
    <CrmLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-sportbnk-navy">Teams Database</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Team
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ContactsFilters onFilterChange={handleFilterChange} />
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sportbnk-green">{credits}</p>
                <p className="text-sm text-muted-foreground">Credits remaining</p>
                <Button className="w-full mt-4 bg-sportbnk-navy hover:bg-sportbnk-navy/90">
                  Buy More Credits
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <ContactsTable 
              data={teamData}
              useCredits={useCredits}
            />
          </div>
        </div>
      </div>
    </CrmLayout>
  );
};

export default Teams;
