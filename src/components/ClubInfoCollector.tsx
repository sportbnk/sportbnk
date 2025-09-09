import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Database, ExternalLink } from 'lucide-react';

interface CollectionResult {
  team: string;
  status: 'success' | 'no_data' | 'error';
  data?: any;
  message?: string;
  error?: string;
}

export const ClubInfoCollector = () => {
  const [isCollecting, setIsCollecting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<CollectionResult[]>([]);
  const { toast } = useToast();

  const handleCollectInfo = async () => {
    setIsCollecting(true);
    setProgress(0);
    setResults([]);

    try {
      toast({
        title: "Starting AI Search",
        description: "Collecting information for all professional clubs...",
      });

      const { data, error } = await supabase.functions.invoke('collect-club-info');

      if (error) {
        throw error;
      }

      setResults(data.results || []);
      setProgress(100);

      const successCount = data.results?.filter((r: CollectionResult) => r.status === 'success').length || 0;
      
      toast({
        title: "Collection Complete",
        description: `Successfully updated ${successCount} out of ${data.total_processed} clubs`,
      });

    } catch (error) {
      console.error('Error collecting club info:', error);
      toast({
        title: "Collection Failed",
        description: "There was an error collecting club information",
        variant: "destructive",
      });
    } finally {
      setIsCollecting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'no_data':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'no_data':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          AI Club Information Collection
        </CardTitle>
        <CardDescription>
          Use AI to search and collect official information for all professional clubs including websites, 
          contact details, and social media links.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleCollectInfo}
            disabled={isCollecting}
            className="flex items-center gap-2"
          >
            <Database className="h-4 w-4" />
            {isCollecting ? 'Collecting...' : 'Start AI Collection'}
          </Button>
          
          {isCollecting && (
            <div className="flex-1">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-1">
                Searching for club information...
              </p>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Collection Results</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getStatusIcon(result.status)}</span>
                    <div>
                      <p className="font-medium">{result.team}</p>
                      {result.status === 'success' && result.data && (
                        <div className="text-sm text-muted-foreground">
                          {result.data.website && (
                            <span className="inline-flex items-center gap-1 mr-3">
                              <ExternalLink className="h-3 w-3" />
                              Website
                            </span>
                          )}
                          {result.data.email && <span className="mr-3">📧 Email</span>}
                          {result.data.phone && <span className="mr-3">📞 Phone</span>}
                          {result.data.social_media?.length > 0 && (
                            <span>📱 {result.data.social_media.length} social</span>
                          )}
                        </div>
                      )}
                      {result.message && (
                        <p className={`text-sm ${getStatusColor(result.status)}`}>
                          {result.message}
                        </p>
                      )}
                      {result.error && (
                        <p className="text-sm text-red-600">{result.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {results.filter(r => r.status === 'success').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Successfully Updated</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {results.filter(r => r.status === 'no_data').length}
                  </p>
                  <p className="text-sm text-muted-foreground">No Data Found</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {results.filter(r => r.status === 'error').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Errors</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};