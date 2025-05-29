
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Users, User, Loader } from 'lucide-react';
import ContactsView from '@/components/database/ContactsView';
import { RevealProvider } from '@/contexts/RevealContext';

// Sample data for teams
const teamsData = [
  {
    id: 1,
    name: "Manchester United",
    sport: "Football",
    country: "United Kingdom",
    logo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    employees: 24,
    verified: true
  },
  {
    id: 2,
    name: "LA Lakers",
    sport: "Basketball",
    country: "United States",
    logo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    employees: 18,
    verified: true
  },
  {
    id: 3,
    name: "Real Madrid",
    sport: "Football",
    country: "Spain",
    logo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    employees: 22,
    verified: true
  }
];

// Sample data for people
const peopleData = [
  {
    id: "1",
    name: "John Smith",
    position: "Marketing Director",
    team: "Manchester United",
    teamId: 1,
    sport: "Football",
    email: "j.s******@manutd.com",
    phone: "+44 77** *** ***",
    teamLogo: "/lovable-uploads/1eb7dc35-8f3d-4a53-8727-249a31db0275.png",
    verified: true,
    activeReplier: true,
    email_credits_consumed: 2,
    phone_credits_consumed: 3,
    linkedin_credits_consumed: 0
  },
  {
    id: "2",
    name: "Michael Johnson",
    position: "Operations Director",
    team: "LA Lakers",
    teamId: 2,
    sport: "Basketball",
    email: "m.j******@lakers.com",
    phone: "+1 31*-***-****",
    teamLogo: "/lovable-uploads/b95abe05-7dc8-449e-91a1-c17046b01f5e.png",
    verified: true,
    email_credits_consumed: 1,
    phone_credits_consumed: 0,
    linkedin_credits_consumed: 2
  },
  {
    id: "3",
    name: "James Miller",
    position: "Sponsorship Director",
    team: "Real Madrid",
    teamId: 3,
    sport: "Football",
    email: "j.m*****@realmadrid.es",
    teamLogo: "/lovable-uploads/5de360aa-8105-490e-bf75-94ff7ac0832d.png",
    verified: true,
    activeReplier: true,
    email_credits_consumed: 0,
    phone_credits_consumed: 3,
    linkedin_credits_consumed: 1
  }
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const context = searchParams.get('context') || 'all';
  const [searchTerm, setSearchTerm] = useState(query);
  const [activeTab, setActiveTab] = useState(context === 'people' ? 'people' : context === 'teams' ? 'teams' : 'all');
  const [isLoading, setIsLoading] = useState(false);
  
  // States for teams and people search results
  const [teamsResults, setTeamsResults] = useState<typeof teamsData>([]);
  const [peopleResults, setPeopleResults] = useState<typeof peopleData>([]);
  
  // Search function
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      
      // Simulate API search delay
      setTimeout(() => {
        // Search in teams
        const filteredTeams = teamsData.filter(team => 
          team.name.toLowerCase().includes(query.toLowerCase()) ||
          team.sport.toLowerCase().includes(query.toLowerCase()) ||
          team.country.toLowerCase().includes(query.toLowerCase())
        );
        setTeamsResults(filteredTeams);
        
        // Search in people
        const filteredPeople = peopleData.filter(person => 
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.position.toLowerCase().includes(query.toLowerCase()) ||
          person.team.toLowerCase().includes(query.toLowerCase())
        );
        setPeopleResults(filteredPeople);
        
        setIsLoading(false);
      }, 800);
    } else {
      setTeamsResults([]);
      setPeopleResults([]);
    }
  }, [query]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim(), context: activeTab });
    }
  };
  
  const handleViewTeam = (teamId: number) => {
    // Navigate to team details page
    window.location.href = `/crm/teams/${teamId}`;
  };
  
  const handleAddToList = (contact: any, listId: string, listName: string) => {
    // Placeholder function
  };
  
  const handleRemoveFromList = () => {
    // Placeholder function
  };
  
  // Calculate total results
  const totalResults = 
    (activeTab === 'all' || activeTab === 'teams' ? teamsResults.length : 0) + 
    (activeTab === 'all' || activeTab === 'people' ? peopleResults.length : 0);

  return (
    <RevealProvider>
      <div className="container max-w-full px-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-sportbnk-navy">Search Results</h1>
        </div>
        
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search teams or people..." 
                className="pl-9 focus-visible:ring-sportbnk-green"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-sportbnk-green hover:bg-sportbnk-green/90">
              Search
            </Button>
          </form>
        </div>
        
        {query && (
          <div className="mb-4">
            <p className="text-muted-foreground">
              {isLoading 
                ? 'Searching...' 
                : totalResults === 0 
                  ? 'No results found' 
                  : `Found ${totalResults} results for "${query}"`}
            </p>
          </div>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              All Results
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-1">
              <Users className="h-4 w-4" /> Teams ({teamsResults.length})
            </TabsTrigger>
            <TabsTrigger value="people" className="flex items-center gap-1">
              <User className="h-4 w-4" /> People ({peopleResults.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4 space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 animate-spin text-sportbnk-green" />
              </div>
            ) : (
              <>
                {teamsResults.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Teams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {teamsResults.map(team => (
                        <Card key={team.id} className="overflow-hidden">
                          <Link to={`/crm/teams/${team.id}`} className="block h-full">
                            <div className="flex items-center p-4">
                              <img 
                                src={team.logo} 
                                alt={team.name} 
                                className="w-16 h-16 object-contain mr-3"
                              />
                              <div>
                                <CardTitle className="text-base">{team.name}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{team.sport}</Badge>
                                  <Badge variant="outline">{team.country}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                  {team.employees} team members
                                </p>
                              </div>
                            </div>
                          </Link>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {peopleResults.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-3">People</h2>
                    <Card>
                      <CardContent className="p-0">
                        <ContactsView 
                          data={peopleResults}
                          onViewTeam={handleViewTeam}
                          onAddToList={handleAddToList}
                          onRemoveFromList={handleRemoveFromList}
                        />
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {teamsResults.length === 0 && peopleResults.length === 0 && !isLoading && (
                  <div className="py-8 text-center">
                    <h3 className="text-lg font-medium mb-2">No results found for "{query}"</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or browse our database directly.
                    </p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="teams" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 animate-spin text-sportbnk-green" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamsResults.map(team => (
                  <Card key={team.id} className="overflow-hidden">
                    <Link to={`/crm/teams/${team.id}`} className="block h-full">
                      <div className="flex items-center p-4">
                        <img 
                          src={team.logo} 
                          alt={team.name} 
                          className="w-16 h-16 object-contain mr-3"
                        />
                        <div>
                          <CardTitle className="text-base">{team.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{team.sport}</Badge>
                            <Badge variant="outline">{team.country}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {team.employees} team members
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
                
                {teamsResults.length === 0 && !isLoading && (
                  <div className="col-span-full py-8 text-center">
                    <h3 className="text-lg font-medium mb-2">No teams found for "{query}"</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or browse our teams database directly.
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="people" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 animate-spin text-sportbnk-green" />
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <ContactsView 
                    data={peopleResults}
                    onViewTeam={handleViewTeam}
                    onAddToList={handleAddToList}
                    onRemoveFromList={handleRemoveFromList}
                  />
                </CardContent>
              </Card>
            )}
            
            {peopleResults.length === 0 && !isLoading && (
              <div className="py-8 text-center">
                <h3 className="text-lg font-medium mb-2">No people found for "{query}"</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse our people database directly.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </RevealProvider>
  );
};

export default Search;
