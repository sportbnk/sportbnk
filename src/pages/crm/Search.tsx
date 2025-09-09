import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, User, Building2, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Contact, Team } from "@/types/teams";
import { useToast } from "@/components/ui/use-toast";

interface SearchResult {
  type: 'contact' | 'team';
  data: Contact | Team;
  relevance?: number;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const { toast } = useToast();

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      // Search contacts
      const { data: contacts, error: contactsError } = await supabase
        .from('contacts')
        .select(`
          *,
          team:teams(*),
          department:departments(*)
        `)
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,position.ilike.%${query}%`);

      if (contactsError) throw contactsError;

      // Search teams
      const { data: teams, error: teamsError } = await supabase
        .from('teams')
        .select(`
          *,
          sport:sports(*),
          city:cities(*),
          country:countries(*)
        `)
        .or(`name.ilike.%${query}%,league.ilike.%${query}%,division.ilike.%${query}%`);

      if (teamsError) throw teamsError;

      // Combine results
      const searchResults: SearchResult[] = [
        ...(contacts || []).map(contact => ({ type: 'contact' as const, data: contact })),
        ...(teams || []).map(team => ({ type: 'team' as const, data: team }))
      ];

      setResults(searchResults);
    } catch (error) {
      console.error('Error performing search:', error);
      toast({
        title: "Error",
        description: "Failed to perform search",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const performAISearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }

    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query: searchQuery }
      });

      if (error) throw error;

      if (data?.results) {
        setResults(data.results);
        toast({
          title: "AI Search Complete",
          description: `Found ${data.results.length} relevant results`,
        });
      }
    } catch (error) {
      console.error('Error performing AI search:', error);
      toast({
        title: "Error",
        description: "AI search is currently unavailable",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  return (
    <div className="space-y-6 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Search</h1>
        <Badge variant="secondary">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SearchIcon className="h-5 w-5" />
            Search Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search contacts, teams, or use natural language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={performAISearch}
                disabled={aiLoading || !searchQuery.trim()}
                className="flex items-center gap-2"
              >
                {aiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                AI Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {results.length > 0 && !loading && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <Card key={`${result.type}-${result.data.id}-${index}`} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {result.type === 'contact' ? (
                      <User className="h-5 w-5 text-primary" />
                    ) : (
                      <Building2 className="h-5 w-5 text-primary" />
                    )}
                    {result.type === 'contact' ? (
                      `${(result.data as Contact).first_name} ${(result.data as Contact).last_name}`
                    ) : (
                      (result.data as Team).name
                    )}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {result.type === 'contact' ? 'Contact' : 'Team'}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {result.type === 'contact' ? (
                      <>
                        {(result.data as Contact).position && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Position:</strong> {(result.data as Contact).position}
                          </p>
                        )}
                        {(result.data as Contact).email && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Email:</strong> {(result.data as Contact).email}
                          </p>
                        )}
                        {(result.data as Contact).team && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Team:</strong> {(result.data as Contact).team.name}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        {(result.data as Team).sport && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Sport:</strong> {(result.data as Team).sport.name}
                          </p>
                        )}
                        {(result.data as Team).league && (
                          <p className="text-sm text-muted-foreground">
                            <strong>League:</strong> {(result.data as Team).league}
                          </p>
                        )}
                        {(result.data as Team).city && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Location:</strong> {(result.data as Team).city.name}
                            {(result.data as Team).country && `, ${(result.data as Team).country.name}`}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && !loading && searchQuery && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground text-center">
              Try searching with different keywords or use AI search for more intelligent results.
            </p>
          </CardContent>
        </Card>
      )}

      {!searchQuery && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start searching</h3>
            <p className="text-muted-foreground text-center">
              Enter keywords to search through contacts and teams, or try AI search for natural language queries.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Search;