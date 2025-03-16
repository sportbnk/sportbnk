import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactsFilters from "@/components/database/ContactsFilters";
import ContactsView from "@/components/database/ContactsView";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Dummy data for contacts
const contactsData = [
  {
    id: 1,
    name: "John Smith",
    position: "Marketing Director",
    team: "Manchester United",
    teamId: 1,
    sport: "Football",
    email: "j.s******@manutd.com",
    phone: "+44 77** *** ***",
    linkedin: "https://linkedin.com/in/johnsmith",
    teamLogo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    verified: true,
    activeReplier: true
  },
  {
    id: 2,
    name: "Sarah Jones",
    position: "Fan Relations Manager",
    team: "Manchester United",
    teamId: 1,
    sport: "Football",
    email: "s.j****@manutd.com",
    teamLogo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    verified: true
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Operations Director",
    team: "LA Lakers",
    teamId: 2,
    sport: "Basketball",
    email: "m.j******@lakers.com",
    phone: "+1 31*-***-****",
    linkedin: "https://linkedin.com/in/michaeljohnson",
    teamLogo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    verified: true
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    position: "Commercial Director",
    team: "Real Madrid",
    teamId: 3,
    sport: "Football",
    email: "c.r********@realmadrid.es",
    linkedin: "https://linkedin.com/in/carlosrodriguez",
    teamLogo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png"
  },
  {
    id: 5,
    name: "Jennifer Williams",
    position: "PR Director",
    team: "Chicago Bulls",
    teamId: 4,
    sport: "Basketball",
    email: "j.w******@bulls.com",
    phone: "+1 31*-***-****",
    linkedin: "https://linkedin.com/in/jenniferwilliams",
    teamLogo: "/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png",
    activeReplier: true
  },
  {
    id: 6,
    name: "David Thompson",
    position: "Marketing Director",
    team: "Boston Red Sox",
    teamId: 5,
    sport: "Baseball",
    email: "d.t******@redsox.com",
    teamLogo: "/lovable-uploads/53b73771-1565-4d14-87c2-860d6dabe35d.png",
    verified: true
  },
  {
    id: 7,
    name: "Emma Wilson",
    position: "Digital Strategy Director",
    team: "LA Lakers",
    teamId: 2,
    sport: "Basketball",
    email: "e.w****@lakers.com",
    phone: "+1 32*-***-****",
    teamLogo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png"
  },
  {
    id: 8,
    name: "James Miller",
    position: "Sponsorship Director",
    team: "Real Madrid",
    teamId: 3,
    sport: "Football",
    email: "j.m*****@realmadrid.es",
    linkedin: "https://linkedin.com/in/jamesmiller",
    teamLogo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    verified: true,
    activeReplier: true
  },
  {
    id: 9,
    name: "Rachel Green",
    position: "Community Relations Manager",
    team: "Chicago Bulls",
    teamId: 4,
    sport: "Basketball",
    email: "r.g****@bulls.com",
    phone: "+1 31*-***-****",
    teamLogo: "/lovable-uploads/b0f94fb5-f923-4243-b466-86aa2a7738d0.png",
    verified: true
  },
  {
    id: 10,
    name: "Daniel Lee",
    position: "Data Analytics Director",
    team: "Boston Red Sox",
    teamId: 5,
    sport: "Baseball",
    email: "d.l**@redsox.com",
    linkedin: "https://linkedin.com/in/daniellee",
    teamLogo: "/lovable-uploads/53b73771-1565-4d14-87c2-860d6dabe35d.png",
    activeReplier: true
  },
  {
    id: 11,
    name: "Olivia Parker",
    position: "Ticket Sales Manager",
    team: "Manchester United",
    teamId: 1,
    sport: "Football",
    email: "o.p*****@manutd.com",
    phone: "+44 78** *** ***",
    teamLogo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png"
  },
  {
    id: 12,
    name: "Kevin Zhang",
    position: "International Development Director",
    team: "LA Lakers",
    teamId: 2,
    sport: "Basketball",
    email: "k.z****@lakers.com",
    linkedin: "https://linkedin.com/in/kevinzhang",
    teamLogo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    verified: true,
    activeReplier: true
  }
];

const People = () => {
  const navigate = useNavigate();
  const [credits, setCredits] = useState(456);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [savedList, setSavedList] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    position: "all",
    team: "all",
    sport: "all",
  });
  
  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    setActiveFilters(filters);
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
  
  const viewTeam = (teamId: number) => {
    console.log("View team:", teamId);
    // In a real application, you would navigate to the team detail page
  };
  
  const addToList = (contact: any) => {
    if (!savedList.some(item => item.id === contact.id)) {
      setSavedList(prev => [...prev, contact]);
      navigate("/database/lists");
      toast.success(`${contact.name} added to your list! Redirecting to Lists page.`);
    }
  };
  
  const removeFromList = (contactId: number) => {
    setSavedList(prev => prev.filter(contact => contact.id !== contactId));
  };

  // Apply filters to the data
  const filteredData = [...contactsData].filter(contact => {
    // Filter by position
    if (activeFilters.position !== "all" && contact.position !== activeFilters.position) {
      return false;
    }
    
    // Filter by team
    if (activeFilters.team !== "all" && contact.team !== activeFilters.team) {
      return false;
    }
    
    // Filter by sport
    if (activeFilters.sport !== "all" && contact.sport !== activeFilters.sport) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="container max-w-full px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sportbnk-navy">People Database</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-1">
          <Card className="shadow-md mb-4">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold">Filters</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <ContactsFilters onFilterChange={handleFilterChange} showTeamFilters={false} />
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold">Credits</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <p className="text-2xl font-bold text-sportbnk-green">{credits}</p>
              <p className="text-sm text-muted-foreground">Credits remaining</p>
              <Button className="w-full mt-4 bg-sportbnk-navy hover:bg-sportbnk-navy/90 text-base">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <Card className="shadow-md h-full">
            <CardHeader className="pb-3 border-b pt-4 px-4">
              <CardTitle className="text-lg font-semibold">People List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <ContactsView 
                  data={filteredData}
                  revealedEmails={revealedEmails}
                  revealedPhones={revealedPhones}
                  onRevealEmail={revealEmail}
                  onRevealPhone={revealPhone}
                  onViewTeam={viewTeam}
                  onAddToList={addToList}
                  onRemoveFromList={removeFromList}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default People;
