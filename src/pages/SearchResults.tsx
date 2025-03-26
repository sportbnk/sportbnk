
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader } from 'lucide-react';

// Mock search results data
// In a real app, this would come from an API call
const mockSearchData = [
  {
    id: 1,
    title: 'Football Performance Analysis',
    category: 'Article',
    url: '/resources/articles/football-performance-analysis',
    description: 'Learn how data is transforming football tactics and player development.'
  },
  {
    id: 2,
    title: 'Basketball Scout Report',
    category: 'Product',
    url: '/products/discover',
    description: 'Comprehensive scouting reports for basketball talent identification.'
  },
  {
    id: 3,
    title: 'Rugby Match Analysis Software',
    category: 'Product',
    url: '/products/boost',
    description: 'Advanced analytics platform for rugby teams and coaches.'
  },
  {
    id: 4,
    title: 'Tennis Performance Data',
    category: 'Dataset',
    url: '/data',
    description: 'Access historical and real-time tennis match statistics.'
  },
  {
    id: 5,
    title: 'Cricket Player Metrics',
    category: 'Dataset',
    url: '/data',
    description: 'Comprehensive cricket player performance metrics and analysis.'
  }
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState<typeof mockSearchData>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulating search functionality
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      
      // Simulate API call with timeout
      const timeoutId = setTimeout(() => {
        const filteredResults = mockSearchData.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto mt-24 px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Search Results</h1>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
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
                : results.length === 0 
                  ? 'No results found' 
                  : `Found ${results.length} results for "${query}"`}
            </p>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 animate-spin text-sportbnk-green" />
          </div>
        ) : (
          <div className="space-y-4">
            {results.map(item => (
              <Card key={item.id} className="transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>
                      <a href={item.url} className="text-sportbnk-navy hover:text-sportbnk-green hover:underline">
                        {item.title}
                      </a>
                    </CardTitle>
                    <span className="text-xs bg-sportbnk-lightGrey px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                  <a href={item.url} className="mt-2 inline-block text-sm text-sportbnk-green hover:underline">
                    View details →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {query && results.length === 0 && !isLoading && (
          <div className="py-8 text-center">
            <h3 className="text-lg font-medium mb-2">No results found for "{query}"</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse our categories in the navigation menu.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default SearchResults;
