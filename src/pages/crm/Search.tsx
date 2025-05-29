
import React, { useState } from "react";
import CrmLayout from "@/components/crm/CrmLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Eye, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactsView from "@/components/database/ContactsView";
import { toast } from "sonner";

// Mock data for contacts
const mockContacts = [
  {
    id: "1",
    name: "John Smith",
    position: "Marketing Director",
    team: "Acme Corp",
    teamId: 1,
    email: "john.smith@acme.com",
    phone: "+15551234567",
    linkedin: "https://www.linkedin.com/in/johnsmith",
    verified: true,
    activeReplier: true,
    email_credits_consumed: 1,
    phone_credits_consumed: 2,
    linkedin_credits_consumed: 0
  },
  {
    id: "2",
    name: "Alice Johnson",
    position: "Sales Manager",
    team: "Beta Inc",
    teamId: 2,
    email: "alice.johnson@beta.com",
    phone: "+15557890123",
    linkedin: "https://www.linkedin.com/in/alicejohnson",
    verified: false,
    activeReplier: false,
    email_credits_consumed: 1,
    phone_credits_consumed: 2,
    linkedin_credits_consumed: 0
  },
];

// Mock data for teams
const mockTeams = [
  {
    id: 1,
    name: "Acme Corp",
    sport: "Basketball",
    level: "Professional",
    city: "New York",
    country: "USA",
    revenue: 1000000,
    logo: "https://via.placeholder.com/100",
    description: "Leading basketball organization",
    founded: "1950",
    website: "https://www.acmecorp.com",
    email: "info@acmecorp.com",
    phone: "+15551112222",
    contacts: [],
    social: [],
    employees: [
      {
        id: "3",
        name: "Bob Williams",
        position: "Team Coach",
        team: "Acme Corp",
        teamId: 1,
        email: "bob.williams@acme.com",
        phone: "+15553334444",
        linkedin: "https://www.linkedin.com/in/bobwilliams",
        verified: true,
        activeReplier: true,
        email_credits_consumed: 1,
        phone_credits_consumed: 2,
        linkedin_credits_consumed: 0
      },
    ]
  },
  {
    id: 2,
    name: "Beta Inc",
    sport: "Football",
    level: "Amateur",
    city: "Los Angeles",
    country: "USA",
    revenue: 500000,
    employees: 250,
    logo: "https://via.placeholder.com/100",
    description: "Amateur football organization",
    founded: "1980",
    website: "https://www.betainc.com",
    email: "info@betainc.com",
    phone: "+15555556666",
    contacts: [],
    social: [],
    employees: [
      {
        id: "4",
        name: "Charlie Brown",
        position: "Team Manager",
        team: "Beta Inc",
        teamId: 2,
        email: "charlie.brown@beta.com",
        phone: "+15557778888",
        linkedin: "https://www.linkedin.com/in/charliebrown",
        verified: false,
        activeReplier: false,
        email_credits_consumed: 1,
        phone_credits_consumed: 2,
        linkedin_credits_consumed: 0
      },
    ]
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("contacts");
  const [showEmployees, setShowEmployees] = useState<{ [key: number]: boolean }>({});

  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [revealedLinkedIns, setRevealedLinkedIns] = useState<Record<string, boolean>>({});

  const handleRevealEmail = (email: string, credits: number) => {
    setRevealedEmails(prev => ({ ...prev, [email]: true }));
    toast.success(`Email revealed! ${credits} credits used.`);
  };

  const handleRevealPhone = (phone: string, credits: number) => {
    setRevealedPhones(prev => ({ ...prev, [phone]: true }));
    toast.success(`Phone revealed! ${credits} credits used.`);
  };

  const handleRevealLinkedIn = (linkedin: string, credits: number) => {
    setRevealedLinkedIns(prev => ({ ...prev, [linkedin]: true }));
    toast.success(`LinkedIn revealed! ${credits} credits used.`);
  };

  const handleViewTeam = (teamId: number) => {
    setShowEmployees(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const handleAddToList = (contact: any, listId: string, listName: string) => {
    toast.success(`${contact.name} added to ${listName}`, {
      description: "You can manage all your lists in the Lists section"
    });
  };

  return (
    <CrmLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Search</h1>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Add Contact
          </Button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts or teams..."
              className="pl-9 focus-visible:ring-sportbnk-green"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contacts">Contacts ({mockContacts.length})</TabsTrigger>
            <TabsTrigger value="teams">Teams ({mockTeams.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-4">
            <ContactsView
              data={mockContacts}
              revealedEmails={revealedEmails}
              revealedPhones={revealedPhones}
              revealedLinkedIns={revealedLinkedIns}
              onRevealEmail={handleRevealEmail}
              onRevealPhone={handleRevealPhone}
              onRevealLinkedIn={handleRevealLinkedIn}
              onViewTeam={handleViewTeam}
              onAddToList={handleAddToList}
              onRemoveFromList={() => {}}
            />
          </TabsContent>

          <TabsContent value="teams" className="space-y-4">
            {mockTeams.map((team) => (
              <Card key={team.id} className="p-4">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{team.name}</CardTitle>
                    <Badge variant="secondary">{team.sport}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{team.description}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>
                    <span className="font-semibold">Level:</span> {team.level}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> {team.city}, {team.country}
                  </p>
                  <Button variant="link" size="sm" onClick={() => handleViewTeam(team.id)}>
                    {showEmployees[team.id] ? "Hide Employees" : "View Employees"}
                  </Button>
                </CardContent>
                
                {showEmployees[team.id] && (
                  <div className="mt-4 border-t pt-4">
                    <ContactsView
                      data={team.employees}
                      revealedEmails={revealedEmails}
                      revealedPhones={revealedPhones}
                      revealedLinkedIns={revealedLinkedIns}
                      onRevealEmail={handleRevealEmail}
                      onRevealPhone={handleRevealPhone}
                      onRevealLinkedIn={handleRevealLinkedIn}
                      onViewTeam={handleViewTeam}
                      onAddToList={handleAddToList}
                      onRemoveFromList={() => {}}
                    />
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </CrmLayout>
  );
};

export default Search;
