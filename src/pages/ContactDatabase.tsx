
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import DatabaseFilters from "@/components/database/DatabaseFilters";
import ContactsFilters from "@/components/database/ContactsFilters";
import ContactsTable from "@/components/database/ContactsTable";
import ContactsView from "@/components/database/ContactsView";
import CreditDisplay from "@/components/database/CreditDisplay";
import { Input } from "@/components/ui/input";
import { Search, DatabaseIcon, Users, FileDown, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamProfile from "@/components/database/TeamProfile";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Contact {
  id: number;
  name: string;
  position: string;
  team: string;
  teamId: number;
  sport: string;
  email: string;
  phone?: string;
  linkedin?: string;
  teamLogo: string;
  verified?: boolean;
  activeReplier?: boolean;
}

const ContactDatabase = () => {
  const [activeTab, setActiveTab] = useState("teams");
  const [filteredTeamData, setFilteredTeamData] = useState(dummyData);
  const [filteredContactData, setFilteredContactData] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [credits, setCredits] = useState(100);
  const [selectedTeam, setSelectedTeam] = useState<typeof dummyData[0] | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [savedList, setSavedList] = useState<Contact[]>([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showActiveRepliersOnly, setShowActiveRepliersOnly] = useState(false);

  useEffect(() => {
    const contacts: Contact[] = [];
    dummyData.forEach(team => {
      team.contacts.forEach((contact, index) => {
        // Randomly assign verified and activeReplier status for demo purposes
        const isVerified = Math.random() > 0.5;
        const isActiveReplier = Math.random() > 0.7;
        
        contacts.push({
          id: team.id * 100 + index,
          name: contact.name,
          position: contact.position,
          team: team.team,
          teamId: team.id,
          sport: team.sport,
          email: contact.email,
          phone: contact.phone,
          linkedin: contact.linkedin,
          teamLogo: team.logo,
          verified: isVerified,
          activeReplier: isActiveReplier
        });
      });
    });
    setFilteredContactData(contacts);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredTeamData(dummyData);
      
      const allContacts: Contact[] = [];
      dummyData.forEach(team => {
        team.contacts.forEach((contact, index) => {
          // Maintain verified and activeReplier status
          const isVerified = Math.random() > 0.5;
          const isActiveReplier = Math.random() > 0.7;
          
          allContacts.push({
            id: team.id * 100 + index,
            name: contact.name,
            position: contact.position,
            team: team.team,
            teamId: team.id,
            sport: team.sport,
            email: contact.email,
            phone: contact.phone,
            linkedin: contact.linkedin,
            teamLogo: team.logo,
            verified: isVerified,
            activeReplier: isActiveReplier
          });
        });
      });
      setFilteredContactData(allContacts);
      return;
    }
    
    const searchTermLower = e.target.value.toLowerCase();
    
    const filteredTeams = dummyData.filter(
      (item) =>
        item.team.toLowerCase().includes(searchTermLower) ||
        item.sport.toLowerCase().includes(searchTermLower) ||
        item.city.toLowerCase().includes(searchTermLower) ||
        item.country.toLowerCase().includes(searchTermLower)
    );
    setFilteredTeamData(filteredTeams);
    
    const filteredContacts: Contact[] = [];
    dummyData.forEach(team => {
      team.contacts.forEach((contact, index) => {
        if (
          contact.name.toLowerCase().includes(searchTermLower) ||
          contact.position.toLowerCase().includes(searchTermLower) ||
          team.team.toLowerCase().includes(searchTermLower) ||
          team.sport.toLowerCase().includes(searchTermLower)
        ) {
          // Maintain verified and activeReplier status
          const isVerified = Math.random() > 0.5;
          const isActiveReplier = Math.random() > 0.7;
          
          filteredContacts.push({
            id: team.id * 100 + index,
            name: contact.name,
            position: contact.position,
            team: team.team,
            teamId: team.id,
            sport: team.sport,
            email: contact.email,
            phone: contact.phone,
            linkedin: contact.linkedin,
            teamLogo: team.logo,
            verified: isVerified,
            activeReplier: isActiveReplier
          });
        }
      });
    });
    setFilteredContactData(filteredContacts);
  };

  const handleTeamFilterChange = (filters: any) => {
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
    
    if (filters.city && filters.city !== "all") {
      results = results.filter(item => item.city === filters.city);
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
    
    setFilteredTeamData(results);
  };

  const handleContactFilterChange = (filters: any) => {
    const allContacts: Contact[] = [];
    dummyData.forEach(team => {
      team.contacts.forEach((contact, index) => {
        // Maintain verified and activeReplier status
        const isVerified = Math.random() > 0.5;
        const isActiveReplier = Math.random() > 0.7;
        
        allContacts.push({
          id: team.id * 100 + index,
          name: contact.name,
          position: contact.position,
          team: team.team,
          teamId: team.id,
          sport: team.sport,
          email: contact.email,
          phone: contact.phone,
          linkedin: contact.linkedin,
          teamLogo: team.logo,
          verified: isVerified,
          activeReplier: isActiveReplier
        });
      });
    });
    
    let results = [...allContacts];
    
    if (filters.position && filters.position !== "all") {
      results = results.filter(item => item.position === filters.position);
    }
    
    if (filters.team && filters.team !== "all") {
      results = results.filter(item => item.team === filters.team);
    }
    
    if (filters.sport && filters.sport !== "all") {
      results = results.filter(item => item.sport === filters.sport);
    }
    
    if (filters.country && filters.country !== "all") {
      results = results.filter(item => {
        const teamData = dummyData.find(team => team.id === item.teamId);
        return teamData && teamData.country === filters.country;
      });
    }

    // Filter by verified emails if the toggle is on
    if (showVerifiedOnly) {
      results = results.filter(item => item.verified);
    }
    
    // Filter by active repliers if the toggle is on
    if (showActiveRepliersOnly) {
      results = results.filter(item => item.activeReplier);
    }
    
    setFilteredContactData(results);
  };

  const toggleVerifiedFilter = () => {
    setShowVerifiedOnly(!showVerifiedOnly);
    // Re-apply filters with the new verified setting
    handleContactFilterChange({});
  };

  const toggleActiveRepliersFilter = () => {
    setShowActiveRepliersOnly(!showActiveRepliersOnly);
    // Re-apply filters with the new active repliers setting
    handleContactFilterChange({});
  };

  const useCredits = (amount: number) => {
    setCredits(prevCredits => Math.max(0, prevCredits - amount));
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowSavedList(false);
  };

  const handleViewTeam = (teamId: number) => {
    const team = dummyData.find(t => t.id === teamId) || null;
    setSelectedTeam(team);
    setProfileOpen(true);
  };

  const revealEmail = (email: string) => {
    if (revealedEmails[email]) return;
    
    useCredits(2);
    
    setRevealedEmails({
      ...revealedEmails,
      [email]: true
    });
    
    toast.success("Email revealed! 2 credits used.");
  };

  const revealPhone = (phone: string) => {
    if (revealedPhones[phone]) return;
    
    useCredits(3);
    
    setRevealedPhones({
      ...revealedPhones,
      [phone]: true
    });
    
    toast.success("Phone number revealed! 3 credits used.");
  };

  const addToList = (contact: Contact) => {
    if (!savedList.some(item => item.id === contact.id)) {
      setSavedList([...savedList, contact]);
      toast.success(`Added ${contact.name} to saved list`);
    } else {
      toast.info(`${contact.name} is already in your list`);
    }
  };

  const removeFromList = (contactId: number) => {
    setSavedList(savedList.filter(contact => contact.id !== contactId));
    toast.success("Contact removed from list");
  };

  const exportToCsv = () => {
    if (savedList.length === 0) {
      toast.error("Your list is empty");
      return;
    }

    const headers = ["Name", "Position", "Team", "Sport", "Email", "Phone", "LinkedIn"];
    const csvContent = [
      headers.join(","),
      ...savedList.map(contact => {
        const email = revealedEmails[contact.email] ? contact.email.replace(/\*/g, "") : "Not revealed";
        const phone = contact.phone && revealedPhones[contact.phone] ? contact.phone : "Not revealed";
        return [
          `"${contact.name}"`,
          `"${contact.position}"`,
          `"${contact.team}"`,
          `"${contact.sport}"`,
          `"${email}"`,
          `"${phone || "Not available"}"`,
          `"${contact.linkedin || "Not available"}"`
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "contacts-list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Export successful");
  };

  const toggleSavedList = () => {
    setShowSavedList(!showSavedList);
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Sports Contact Database | Sportbnk</title>
        <meta name="description" content="Find key contacts in sports teams with our powerful database" />
      </Helmet>

      <div className="w-full py-8">
        <div className="flex flex-col space-y-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-sportbnk-navy">Sports Contact Database</h1>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={toggleSavedList}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                {showSavedList ? "Back to Results" : `Saved List (${savedList.length})`}
              </Button>
              {showSavedList && (
                <Button 
                  onClick={exportToCsv}
                  className="flex items-center gap-2 bg-sportbnk-navy text-white hover:bg-sportbnk-darkBlue"
                  disabled={savedList.length === 0}
                >
                  <FileDown className="h-4 w-4" />
                  Export CSV
                </Button>
              )}
              <CreditDisplay credits={credits} />
            </div>
          </div>

          {!showSavedList && (
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search teams, contacts, sports, locations..."
                className="pl-10 h-12"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          )}

          {showSavedList ? (
            <div className="bg-white rounded-lg shadow">
              <h2 className="text-xl font-bold p-4 border-b">Saved Contacts List</h2>
              <ContactsView 
                data={savedList} 
                revealedEmails={revealedEmails}
                revealedPhones={revealedPhones}
                onRevealEmail={revealEmail}
                onRevealPhone={revealPhone}
                onViewTeam={handleViewTeam}
                onAddToList={addToList}
                onRemoveFromList={removeFromList}
                isSavedList={true}
              />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="teams" className="flex items-center gap-2">
                  <DatabaseIcon className="h-5 w-5" />
                  Teams
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Contacts
                </TabsTrigger>
              </TabsList>

              <div className="grid grid-cols-5 gap-6">
                <div className="col-span-1">
                  {activeTab === "teams" ? (
                    <DatabaseFilters onFilterChange={handleTeamFilterChange} />
                  ) : (
                    <>
                      <ContactsFilters onFilterChange={handleContactFilterChange} />
                      <div className="mt-4 space-y-4 bg-white p-4 rounded-lg border">
                        <h3 className="font-medium text-sm text-gray-700">Additional Filters</h3>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="verified-only" 
                            checked={showVerifiedOnly}
                            onCheckedChange={toggleVerifiedFilter}
                          />
                          <Label htmlFor="verified-only" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Verified emails only
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="active-repliers" 
                            checked={showActiveRepliersOnly}
                            onCheckedChange={toggleActiveRepliersFilter}
                          />
                          <Label htmlFor="active-repliers" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Active repliers only
                          </Label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="col-span-4">
                  {activeTab === "teams" ? (
                    <ContactsTable 
                      data={filteredTeamData} 
                      useCredits={useCredits} 
                    />
                  ) : (
                    <ContactsView 
                      data={filteredContactData} 
                      revealedEmails={revealedEmails}
                      revealedPhones={revealedPhones}
                      onRevealEmail={revealEmail}
                      onRevealPhone={revealPhone}
                      onViewTeam={handleViewTeam}
                      onAddToList={addToList}
                      onRemoveFromList={removeFromList}
                      isSavedList={false}
                    />
                  )}
                </div>
              </div>
            </Tabs>
          )}
        </div>
      </div>

      <TeamProfile 
        team={selectedTeam} 
        open={profileOpen} 
        onOpenChange={setProfileOpen} 
        revealedEmails={revealedEmails}
        revealedPhones={revealedPhones}
        onRevealEmail={revealEmail}
        onRevealPhone={revealPhone}
      />
    </PageLayout>
  );
};

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
      { name: "John Smith", position: "Marketing Director", email: "j********@manutd.com", phone: "+44-123-456-7890", linkedin: "https://www.linkedin.com/in/john-smith-manutd" },
      { name: "Sarah Johnson", position: "Head of Operations", email: "s*******@manutd.com", phone: "+44-123-456-7891", linkedin: "https://www.linkedin.com/in/sarah-johnson-manutd" },
      { name: "Mark Wilson", position: "Sponsorship Manager", email: "m******@manutd.com", phone: "+44-123-456-7892" }
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
      { name: "Michael Brown", position: "Team Manager", email: "m*****@lakers.com", phone: "+1-323-456-7890", linkedin: "https://www.linkedin.com/in/michael-brown-lakers" },
      { name: "Jessica Davis", position: "PR Director", email: "j*****@lakers.com", phone: "+1-323-456-7891" }
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
      { name: "Robert Wilson", position: "Operations Director", email: "r******@redsox.com", phone: "+1-617-555-1234", linkedin: "https://www.linkedin.com/in/robert-wilson-redsox" },
      { name: "Emma Garcia", position: "Fan Relations Manager", email: "e*****@redsox.com", phone: "+1-617-555-5678" }
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
      { name: "James Thompson", position: "Commercial Director", email: "j*******@wasps.co.uk", phone: "+44-207-123-4567", linkedin: "https://www.linkedin.com/in/james-thompson-wasps" }
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
      { name: "David Miller", position: "Sponsorship Director", email: "d*****@swans.com.au", phone: "+61-2-9212-3456", linkedin: "https://www.linkedin.com/in/david-miller-swans" },
      { name: "Olivia Brown", position: "Community Engagement", email: "o*****@swans.com.au", phone: "+61-2-9212-7890" }
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
      { name: "Thomas Anderson", position: "Marketing VP", email: "t********@bulls.com", phone: "+1-312-555-1234", linkedin: "https://www.linkedin.com/in/thomas-anderson-bulls" }
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
      { name: "Carlos Rodriguez", position: "International Relations", email: "c********@realmadrid.com", phone: "+34-91-234-5678", linkedin: "https://www.linkedin.com/in/carlos-rodriguez-realmadrid" },
      { name: "Isabella Martinez", position: "Digital Strategy Director", email: "i********@realmadrid.com", phone: "+34-91-234-5679" }
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
      { name: "William Barnes", position: "Club Secretary", email: "w*****@ourfc.org", phone: "+44-020-7123-4567", linkedin: "https://www.linkedin.com/in/william-barnes-ourfc" }
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
    description: "The Toronto Raptors are a Canadian professional basketball team based in Toronto. The Raptors compete in the National Basketball Association as a member of the Eastern Conference Atlantic Division.",
    social: {
      facebook: "https://www.facebook.com/torontoraptors",
      twitter: "https://twitter.com/Raptors",
      instagram: "https://www.instagram.com/raptors"
    },
    contacts: [
      { name: "Alexander Lee", position: "Operations Manager", email: "a***@raptors.com", phone: "+1-416-555-1234", linkedin: "https://www.linkedin.com/in/alexander-lee-raptors" }
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
      { name: "Daniel Wright", position: "Commercial Director", email: "d*****@liverpoolfc.com", phone: "+44-151-555-1234", linkedin: "https://www.linkedin.com/in/daniel-wright-liverpool" },
      { name: "Sophie Turner", position: "Fan Engagement Lead", email: "s*****@liverpoolfc.com", phone: "+44-151-555-5678" }
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
      { name: "Christopher Johnson", position: "Business Development", email: "c*******@nets.com", phone: "+1-718-555-1234", linkedin: "https://www.linkedin.com/in/christopher-johnson-nets" }
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
      { name: "Elizabeth Parker", position: "Partnerships Director", email: "e*******@mancity.com", phone: "+44-020-7123-4567", linkedin: "https://www.linkedin.com/in/elizabeth-parker-mancity" }
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
      { name: "Richard Martinez", position: "Athletic Director", email: "r********@utexas.edu", phone: "+1-512-555-1234", linkedin: "https://www.linkedin.com/in/richard-martinez-utexas" },
      { name: "Amanda Wilson", position: "Alumni Relations", email: "a******@utexas.edu", phone: "+1-512-555-5678" }
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
      { name: "Hans Mueller", position: "International Marketing", email: "h******@fcbayern.com", phone: "+49-89-123-4567", linkedin: "https://www.linkedin.com/in/hans-mueller-fcb" }
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
      { name: "Benjamin Adams", position: "Business Operations", email: "b*****@yankees.com", phone: "+1-212-555-1234", linkedin: "https://www.linkedin.com/in/benjamin-adams-yankees" },
      { name: "Victoria Scott", position: "Merchandise Director", email: "v*****@yankees.com", phone: "+1-212-555-5678" }
    ]
  },
  {
    id: 16,
    team: "Aberavon Rugby",
    sport: "Rugby",
    level: "Amateur",
    city: "Port Talbot",
    country: "United Kingdom",
    revenue: 25413000,
    employees: 19,
    logo: "https://upload.wikimedia.org/wikipedia/en/8/87/Aberavon_RFC_logo.png",
    founded: 1876,
    website: "http://www.aberavonrugby.co.uk",
    description: "Aberavon Rugby is a Welsh rugby union team based in Port Talbot, Wales.",
    social: {
      facebook: "https://www.facebook.com/aberavonrugby",
      twitter: "https://twitter.com/AberavonRFC",
      linkedin: "http://www.linkedin.com/company/aberavon-rugby"
    },
    contacts: [
      { name: "Club Secretary", position: "Administration", email: "s******@aberavonrugby.co.uk", phone: "+44-1639-123456" },
      { name: "Head Coach", position: "Coaching Staff", email: "c****@aberavonrugby.co.uk", phone: "+44-1639-654321" }
    ]
  },
  {
    id: 17,
    team: "Forest Green Rovers FC",
    sport: "Football",
    level: "Amateur",
    city: "Stroud",
    country: "United Kingdom",
    revenue: 2900000,
    employees: 130,
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7f/Forest_Green_Rovers_logo.svg",
    founded: 1889,
    website: "http://www.fgr.co.uk",
    description: "Forest Green Rovers Football Club is an English football club based in Stroud, Gloucestershire.",
    social: {
      facebook: "https://www.facebook.com/fgrfc/",
      twitter: "https://twitter.com/fgrfc_official",
      linkedin: "http://www.linkedin.com/company/forest-green-rovers-football-club"
    },
    contacts: [
      { name: "Club Manager", position: "Management", email: "m******@fgr.co.uk", phone: "+44-1453-123456" },
      { name: "Marketing Director", position: "Marketing", email: "m******@fgr.co.uk", phone: "+44-1453-654321" }
    ]
  },
  {
    id: 18,
    team: "ZAG SKIS",
    sport: "Ski",
    level: "Amateur",
    city: "Chamonix",
    country: "France",
    revenue: 5000000,
    employees: 30,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ski_trail_rating_symbol-blue_square.svg/240px-Ski_trail_rating_symbol-blue_square.svg.png",
    founded: 2002,
    website: "http://www.zagskis.com",
    description: "ZAG SKIS is a premium ski equipment manufacturer based in Chamonix, France.",
    social: {
      facebook: "https://www.facebook.com/zagskischamonix/",
      twitter: "https://twitter.com/zagskis",
      linkedin: "http://www.linkedin.com/company/zag-skis"
    },
    contacts: [
      { name: "Product Manager", position: "Product Development", email: "p******@zagskis.com", phone: "+33-450-123456" }
    ]
  },
  {
    id: 19,
    team: "Cymru Football Foundation",
    sport: "Football",
    level: "Amateur",
    city: "Newport",
    country: "United Kingdom",
    revenue: 1500000,
    employees: 56,
    logo: "https://upload.wikimedia.org/wikipedia/en/5/5b/Wales_football_team_logo.svg",
    founded: 2022,
    website: "https://faw.cymru/cff/",
    description: "Cymru Football Foundation is an organization dedicated to promoting football in Wales.",
    social: {
      linkedin: "http://www.linkedin.com/company/cymru-football-foundation"
    },
    contacts: [
      { name: "Foundation Director", position: "Management", email: "d******@cymruff.org", phone: "+44-1633-123456" }
    ]
  },
  {
    id: 20,
    team: "Guildford City FC",
    sport: "Football",
    level: "Amateur",
    city: "Guildford",
    country: "United Kingdom",
    revenue: 500000,
    employees: 9,
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e5/Guildford_City_F.C._logo.png",
    founded: 1996,
    website: "http://www.guildfordcityfc.co.uk",
    description: "Guildford City Football Club is a football club based in Guildford, Surrey, England.",
    social: {
      facebook: "https://www.facebook.com/guildfordcity",
      twitter: "https://twitter.com/guildfordcity",
      linkedin: "http://www.linkedin.com/company/guildford-city-football-club"
    },
    contacts: [
      { name: "Club Secretary", position: "Administration", email: "s******@guildfordcityfc.co.uk", phone: "+44-1483-123456" }
    ]
  },
  {
    id: 21,
    team: "Kingston Grammar School",
    sport: "School Sports",
    level: "Amateur",
    city: "Kingston upon Thames",
    country: "United Kingdom",
    revenue: 10000000,
    employees: 160,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Mortarboard_icon.svg/240px-Mortarboard_icon.svg.png",
    founded: 1561,
    website: "http://www.kgs.org.uk",
    description: "Kingston Grammar School is an independent co-educational school in Kingston upon Thames, London with a strong focus on sports.",
    social: {
      linkedin: "http://www.linkedin.com/school/kingston-grammar-school"
    },
    contacts: [
      { name: "Sports Director", position: "Sports Department", email: "s******@kgs.org.uk", phone: "+44-20-8546-5875" }
    ]
  },
  {
    id: 22,
    team: "Simply Golf Ltd",
    sport: "Golf",
    level: "Amateur",
    city: "Dublin",
    country: "Ireland",
    revenue: 387000,
    employees: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Golf_flag.svg/240px-Golf_flag.svg.png",
    founded: 2014,
    website: "http://www.simplygolf.com",
    description: "Simply Golf Ltd is a golf services company based in Dublin, Ireland.",
    social: {
      facebook: "https://www.facebook.com/simplygolf1",
      twitter: "https://twitter.com/simplygolf1",
      linkedin: "http://www.linkedin.com/company/simply-golf-ltd"
    },
    contacts: [
      { name: "Company Director", position: "Management", email: "d******@simplygolf.com", phone: "+353-1-123-4567" }
    ]
  },
  {
    id: 23,
    team: "Gilbert Rugby",
    sport: "Rugby",
    level: "Professional",
    city: "Robertsbridge",
    country: "United Kingdom",
    revenue: 52588000,
    employees: 59,
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Gilbert_Rugby_logo.svg/240px-Gilbert_Rugby_logo.svg.png",
    founded: 1823,
    website: "http://www.gilbertrugby.com",
    description: "Gilbert is a manufacturer of rugby balls and equipment, and the official ball supplier for many international tournaments.",
    social: {
      facebook: "https://www.facebook.com/GILBERTRUGBY/",
      twitter: "https://twitter.com/GILBERT_RUGBY",
      linkedin: "http://www.linkedin.com/company/gilbert-rugby"
    },
    contacts: [
      { name: "Marketing Director", position: "Marketing", email: "m******@gilbertrugby.com", phone: "+44-1580-880357" },
      { name: "Sales Manager", position: "Sales", email: "s******@gilbertrugby.com", phone: "+44-1580-880358" }
    ]
  },
  {
    id: 24,
    team: "Cisalfa Sport",
    sport: "Multiple",
    level: "Professional",
    city: "Curno",
    country: "Italy",
    revenue: 645000000,
    employees: 1600,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Shopping_cart_icon.svg/240px-Shopping_cart_icon.svg.png",
    founded: 1988,
    website: "http://www.cisalfasport.it",
    description: "Cisalfa Sport is one of Italy's largest sports retail chains, offering a wide range of sportswear and equipment.",
    social: {
      facebook: "https://www.facebook.com/CisalfaSport",
      twitter: "https://twitter.com/CisalfaSport",
      linkedin: "http://www.linkedin.com/company/cisalfa-sport"
    },
    contacts: [
      { name: "Commercial Director", position: "Management", email: "c******@cisalfasport.it", phone: "+39-035-611747" },
      { name: "Marketing Manager", position: "Marketing", email: "m******@cisalfasport.it", phone: "+39-035-611748" }
    ]
  },
  {
    id: 25,
    team: "Stoke Park",
    sport: "Golf",
    level: "Professional",
    city: "Stoke Poges",
    country: "United Kingdom",
    revenue: 19482000,
    employees: 130,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Golf_flag.svg/240px-Golf_flag.svg.png",
    founded: 1908,
    website: "http://www.stokepark.com",
    description: "Stoke Park is a luxury hotel, spa and golf course in Buckinghamshire, England.",
    social: {
      facebook: "https://www.facebook.com/stokepark",
      twitter: "https://twitter.com/StokePark",
      linkedin: "http://www.linkedin.com/company/stoke-park"
    },
    contacts: [
      { name: "Golf Director", position: "Golf Operations", email: "g******@stokepark.com", phone: "+44-1753-717171" },
      { name: "Events Manager", position: "Events", email: "e******@stokepark.com", phone: "+44-1753-717172" }
    ]
  },
  {
    id: 26,
    team: "Edenmore Golf & Country Club",
    sport: "Golf",
    level: "Professional",
    city: "Craigavon",
    country: "United Kingdom",
    revenue: 19962000,
    employees: 17,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Golf_flag.svg/240px-Golf_flag.svg.png",
    founded: 1992,
    website: "http://www.edenmore.com",
    description: "Edenmore Golf & Country Club is a premier golf destination in Northern Ireland.",
    social: {
      facebook: "https://www.facebook.com/edenmorecountryclubandrestaurant/",
      twitter: "https://twitter.com/edenmore_club",
      linkedin: "http://www.linkedin.com/company/edenmore-golf-&-country-club"
    },
    contacts: [
      { name: "Club Manager", position: "Management", email: "m******@edenmore.com", phone: "+44-28-9261-9241" },
      { name: "Golf Pro", position: "Golf Operations", email: "g******@edenmore.com", phone: "+44-28-9261-9242" }
    ]
  },
  {
    id: 27,
    team: "ZOGGS",
    sport: "Swimming",
    level: "Professional",
    city: "Camberley",
    country: "United Kingdom",
    revenue: 3574000,
    employees: 88,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Swimming_pictogram.svg/240px-Swimming_pictogram.svg.png",
    founded: 1992,
    website: "http://www.zoggs.com",
    description: "ZOGGS is a leading swimming equipment and swimwear brand.",
    social: {
      facebook: "https://facebook.com/ZoggsUK",
      twitter: "https://twitter.com/zoggsuk",
      linkedin: "http://www.linkedin.com/company/zoggs"
    },
    contacts: [
      { name: "Brand Manager", position: "Marketing", email: "b******@zoggs.com", phone: "+44-1276-489089" },
      { name: "Sales Director", position: "Sales", email: "s******@zoggs.com", phone: "+44-1276-489090" }
    ]
  },
  {
    id: 28,
    team: "Gill Marine",
    sport: "Sailing",
    level: "Professional",
    city: "Nottingham",
    country: "United Kingdom",
    revenue: 25380000,
    employees: 50,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sailing_pictogram.svg/240px-Sailing_pictogram.svg.png",
    founded: 1975,
    website: "http://www.gillmarine.com",
    description: "Gill Marine is a leading manufacturer of technical sailing clothing and accessories.",
    social: {
      facebook: "https://www.facebook.com/GillMarine/",
      twitter: "https://twitter.com/gillmarine",
      linkedin: "http://www.linkedin.com/company/douglas-gill-international-ltd"
    },
    contacts: [
      { name: "Product Director", position: "Product Development", email: "p******@gillmarine.com", phone: "+44-115-946-3000" },
      { name: "Marketing Manager", position: "Marketing", email: "m******@gillmarine.com", phone: "+44-115-946-3001" }
    ]
  },
  {
    id: 29,
    team: "Rudding Park",
    sport: "Golf",
    level: "Professional",
    city: "Follifoot",
    country: "United Kingdom",
    revenue: 447000,
    employees: 250,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Golf_flag.svg/240px-Golf_flag.svg.png",
    founded: 1972,
    website: "http://www.ruddingpark.co.uk",
    description: "Rudding Park is a luxury hotel, spa and golf resort in North Yorkshire, England.",
    social: {
      facebook: "https://facebook.com/ruddingparkhotel",
      twitter: "https://twitter.com/ruddingpark",
      linkedin: "http://www.linkedin.com/company/rudding-park"
    },
    contacts: [
      { name: "Golf Manager", position: "Golf Operations", email: "g******@ruddingpark.co.uk", phone: "+44-1423-871350" },
      { name: "Events Director", position: "Events", email: "e******@ruddingpark.co.uk", phone: "+44-1423-871351" }
    ]
  },
  {
    id: 30,
    team: "Old Thorns Hotel & Resort",
    sport: "Golf",
    level: "Professional",
    city: "Liphook",
    country: "United Kingdom",
    revenue: 27580000,
    employees: 110,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Golf_flag.svg/240px-Golf_flag.svg.png",
    founded: 1980,
    website: "http://www.oldthorns.com",
    description: "Old Thorns is a luxury golf hotel and spa in Hampshire, England.",
    social: {
      facebook: "https://www.facebook.com/OldThornsHotel",
      twitter: "https://twitter.com/oldthornshotel",
      linkedin: "http://www.linkedin.com/company/old-thorns-hotel-resort"
    },
    contacts: [
      { name: "General Manager", position: "Management", email: "g******@oldthorns.com", phone: "+44-1428-724555" },
      { name: "Golf Director", position: "Golf Operations", email: "g******@oldthorns.com", phone: "+44-1428-724556" }
    ]
  }
];

export default ContactDatabase;
