
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AISearchBarProps {
  onResults: (results: any[], query: string) => void;
  onLoading: (loading: boolean) => void;
}

const AISearchBar: React.FC<AISearchBarProps> = ({ onResults, onLoading }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsSearching(true);
    onLoading(true);

    try {
      console.log('Searching with AI query:', query);
      
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query: query.trim() }
      });

      if (error) {
        console.error('AI search error:', error);
        throw new Error(error.message || 'Failed to process search');
      }

      console.log('AI search results:', data);
      
      if (data?.results) {
        onResults(data.results, query);
        toast.success(`Found ${data.results.length} results for "${query}"`);
      } else {
        onResults([], query);
        toast.info('No results found for your query');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search. Please try again.');
      onResults([], query);
    } finally {
      setIsSearching(false);
      onLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    onResults([], '');
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything... (e.g., 'Find cricket clubs in London')"
            className="pl-10 pr-4 py-3 text-base rounded-lg border-2 border-gray-200 focus:border-sportbnk-green transition-colors"
            disabled={isSearching}
          />
        </div>
        
        <Button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="px-6 py-3 text-white rounded-lg transition-colors"
          style={{ backgroundColor: '#00ce7c' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00b96b'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00ce7c'}
        >
          {isSearching ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Searching...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Search
            </>
          )}
        </Button>

        {query && (
          <Button
            onClick={handleClear}
            variant="outline"
            className="px-4 py-3"
          >
            Clear
          </Button>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Sparkles className="h-3 w-3" />
          <span>Powered by AI</span>
        </div>
        
        <div className="text-xs text-gray-400">
          Try: "Professional football teams" or "Marketing roles in Dublin"
        </div>
      </div>
    </div>
  );
};

export default AISearchBar;
