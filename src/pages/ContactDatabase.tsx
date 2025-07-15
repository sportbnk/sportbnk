
import React, { useState } from "react";
import ContactsView from "@/components/database/ContactsView";
import ContactsFilters from "@/components/database/ContactsFilters";
import AISearchBar from "@/components/database/AISearchBar";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { RevealProvider } from "@/contexts/RevealContext";

// Mock data for testing - updated to use string IDs
const dummyData = [
  {
    id: "1",
    name: "John Smith",
    position: "Marketing Director",
    team: "Forest Green Rovers FC",
    teamId: 2,
    sport: "Football",
    email: "j.smith@fgr.co.uk",
    phone: "+44123456789",
    linkedin: "https://linkedin.com/in/johnsmith",
    teamLogo: "https://placehold.co/100x100?text=FGR",
    verified: true,
    activeReplier: true,
    email_credits_consumed: 0,
    phone_credits_consumed: 3,
    linkedin_credits_consumed: 2
  },
  {
    id: "2",
    name: "Sarah Johnson",
    position: "Operations Manager",
    team: "Aberavon Rugby",
    teamId: 1,
    sport: "Rugby",
    email: "s.johnson@aberavonrugby.co.uk",
    teamLogo: "https://placehold.co/100x100?text=AR",
    verified: true,
    email_credits_consumed: 2,
    phone_credits_consumed: 0,
    linkedin_credits_consumed: 0
  },
  {
    id: "3",
    name: "Michael Chen",
    position: "Head Coach",
    team: "ZAG SKIS",
    teamId: 3,
    sport: "Ski",
    email: "m.chen@zagskis.com",
    phone: "+33612345678",
    teamLogo: "https://placehold.co/100x100?text=ZAG",
    activeReplier: true,
    email_credits_consumed: 1,
    phone_credits_consumed: 0,
    linkedin_credits_consumed: 0
  }
];

const ContactDatabase = () => {
  const [savedList, setSavedList] = useState<Array<typeof dummyData[0]>>([]);
  
  // State for filters
  const [activeFilters, setActiveFilters] = useState({
    position: "all",
    team: "all",
    sport: "all",
    level: "all",
    country: "all",
    city: "all",
    revenue: "all",
    employees: "all"
  });
  
  // State for showing/hiding filters on mobile
  const [showFilters, setShowFilters] = useState(false);
  
  // State for credits
  const [credits, setCredits] = useState(250);
  
  // State for AI search
  const [aiSearchResults, setAiSearchResults] = useState<any[]>([]);
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [isAiSearchLoading, setIsAiSearchLoading] = useState(false);
  const [showAiResults, setShowAiResults] = useState(false);

  // Handler for viewing team details
  const handleViewTeam = (teamId: number) => {
    toast.info(`Viewing team ID: ${teamId}`);
    // In a real app, this would navigate to the team's profile page
  };

  // Handler for adding a contact to a list
  const handleAddToList = (contact: typeof dummyData[0], listId: string, listName: string) => {
    const isAlreadyInList = savedList.some(item => item.id === contact.id);
    
    if (!isAlreadyInList) {
      setSavedList([...savedList, contact]);
      toast.success(`${contact.name} added to ${listName}!`);
    } else {
      toast.error(`${contact.name} is already in your list!`);
    }
  };

  // Handler for removing a contact from a list - updated to accept string ID
  const handleRemoveFromList = (contactId: string) => {
    setSavedList(savedList.filter(contact => contact.id !== contactId));
    toast.info("Contact removed from your list.");
  };

  // Handler for AI search results
  const handleAiSearchResults = (results: any[], query: string) => {
    console.log('AI search raw results:', results);
    console.log('AI search query:', query);
    
    // Transform the results to match the expected format for ContactsView
    const transformedResults = results.map((contact: any) => {
      console.log('Transforming contact:', contact);
      return {
        id: contact.id,
        name: contact.name,
        position: contact.role || 'Unknown',
        team: contact.teams?.name || 'Unknown',
        teamId: contact.teams?.id || null,
        sport: contact.teams?.sports?.name || 'Unknown',
        email: contact.email || null,
        phone: contact.phone || null,
        linkedin: contact.linkedin || null,
        city: contact.teams?.cities?.name || 'Unknown',
        country: contact.teams?.cities?.countries?.name || 'Unknown',
        verified: true,
        activeReplier: true,
        email_credits_consumed: contact.email_credits_consumed || 0,
        phone_credits_consumed: contact.phone_credits_consumed || 0,
        linkedin_credits_consumed: contact.linkedin_credits_consumed || 0
      };
    });
    
    console.log('Transformed results:', transformedResults);
    console.log('Table data for display:', transformedResults);
    
    setAiSearchResults(transformedResults);
    setAiSearchQuery(query);
    setShowAiResults(true);
  };

  // Handler for AI search loading
  const handleAiSearchLoading = (loading: boolean) => {
    setIsAiSearchLoading(loading);
  };

  // Handler for filter changes
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    // Clear AI search results when filters change
    if (showAiResults) {
      setShowAiResults(false);
      setAiSearchResults([]);
      setAiSearchQuery('');
    }
  };

  // Apply filters to the data
  const filteredData = dummyData.filter(contact => {
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
    
    // If all filters passed, include this contact
    return true;
  });

  // Choose which data to display
  const displayData = showAiResults ? aiSearchResults : filteredData;
  const displayTitle = showAiResults ? `AI Search Results for "${aiSearchQuery}"` : 'Contact List';
  const displayCount = showAiResults ? aiSearchResults.length : filteredData.length;

  return (
    <RevealProvider>
      <div className="container max-w-full px-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Teams & Contacts Database</h1>
          <div className="flex gap-2">
            <Button className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" /> Add Contact
            </Button>
          </div>
        </div>
        
        {/* AI Search Bar */}
        <div className="mb-6">
          <AISearchBar 
            onResults={handleAiSearchResults}
            onLoading={handleAiSearchLoading}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-1">
            <Card className="shadow-md mb-4">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-base font-semibold">Filters</CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <ContactsFilters 
                  onFilterChange={handleFilterChange} 
                  filters={activeFilters}
                  totalResults={displayCount}
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-base font-semibold">Credits</CardTitle>
              </CardHeader>
              <CardContent className="px-4 py-3">
                <p className="text-2xl font-bold text-green-600">{credits}</p>
                <p className="text-sm text-muted-foreground">Credits remaining</p>
                <Button className="w-full mt-4 bg-blue-800 hover:bg-blue-900 text-base">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-5">
            <Card className="shadow-md">
              <CardHeader className="pb-3 border-b pt-4 px-4">
                <CardTitle className="text-lg font-semibold">
                  {displayTitle} ({displayCount} results)
                </CardTitle>
                {showAiResults && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setShowAiResults(false);
                      setAiSearchResults([]);
                      setAiSearchQuery('');
                    }}
                    className="mt-2"
                  >
                    Clear AI Search
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <ContactsView 
                  data={displayData}
                  onViewTeam={handleViewTeam}
                  onAddToList={handleAddToList}
                  onRemoveFromList={handleRemoveFromList}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RevealProvider>
  );
};

export default ContactDatabase;
