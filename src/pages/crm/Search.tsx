
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
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const context = searchParams.get('context') || 'all';
  const [searchTerm, setSearchTerm] = useState(query);
  const [activeTab, setActiveTab] = useState(context === 'people' ? 'people' : context === 'teams' ? 'teams' : 'all');
  const [isLoading, setIsLoading] = useState(false);
  
  // States for teams and people search results
  const [teamsResults, setTeamsResults] = useState<any[]>([]);
  const [peopleResults, setPeopleResults] = useState<any[]>([]);
  
  // AI Search function
  const performAISearch = async (searchQuery: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query: searchQuery }
      });
      
      if (error) {
        console.error('AI search error:', error);
        toast.error('Search failed. Please try again.');
        return;
      }
      
      // Transform teams data to match expected format
      const transformedTeams = (data.teams || []).map((team: any) => ({
        id: team.id,
        name: team.name,
        sport: team.sports?.name || 'Unknown',
        country: team.cities?.countries?.name || 'Unknown',
        city: team.cities?.name || 'Unknown',
        employees: team.employees || 0,
        level: team.level || 'Unknown',
        revenue: team.revenue || 0,
        verified: true // Default to verified
      }));
      
      // Transform contacts data to match expected format
      const transformedContacts = (data.contacts || []).map((contact: any) => ({
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
        verified: true, // Default to verified
        activeReplier: true, // Default to active replier
        email_credits_consumed: contact.email_credits_consumed || 0,
        phone_credits_consumed: contact.phone_credits_consumed || 0,
        linkedin_credits_consumed: contact.linkedin_credits_consumed || 0
      }));
      
      setTeamsResults(transformedTeams);
      setPeopleResults(transformedContacts);
      
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Search function
  useEffect(() => {
    if (query) {
      performAISearch(query);
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
