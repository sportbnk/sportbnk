
import React, { useState } from "react";
import CrmLayout from "@/components/crm/CrmLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus, Users } from "lucide-react";
import ContactsFilters from "@/components/database/ContactsFilters";
import ContactsView from "@/components/database/ContactsView";

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
  }
];

const People = () => {
  const [credits, setCredits] = useState(456);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [savedList, setSavedList] = useState<any[]>([]);
  
  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // In a real application, you would filter the data based on the selected filters
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
    }
  };
  
  const removeFromList = (contactId: number) => {
    setSavedList(prev => prev.filter(contact => contact.id !== contactId));
  };
  
  return (
    <CrmLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-sportbnk-navy">People Database</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90 flex items-center gap-1">
              <Plus className="h-4 w-4" /> Add Person
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <ContactsFilters onFilterChange={handleFilterChange} />
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Saved List ({savedList.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {savedList.length > 0 ? (
                  <ContactsView
                    data={savedList}
                    revealedEmails={revealedEmails}
                    revealedPhones={revealedPhones}
                    onRevealEmail={revealEmail}
                    onRevealPhone={revealPhone}
                    onViewTeam={viewTeam}
                    onRemoveFromList={removeFromList}
                    isSavedList={true}
                  />
                ) : (
                  <div className="py-6 px-4 text-center text-muted-foreground">
                    <p>No contacts added to your list yet.</p>
                    <p className="text-sm mt-1">Add contacts to create your export list.</p>
                  </div>
                )}
              </CardContent>
            </Card>
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
            <ContactsView 
              data={contactsData}
              revealedEmails={revealedEmails}
              revealedPhones={revealedPhones}
              onRevealEmail={revealEmail}
              onRevealPhone={revealPhone}
              onViewTeam={viewTeam}
              onAddToList={addToList}
            />
          </div>
        </div>
      </div>
    </CrmLayout>
  );
};

export default People;
