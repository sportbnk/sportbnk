import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface CollectionResult {
  success: boolean;
  message: string;
  stats: {
    totalExecutives: number;
    insertedCount: number;
    errorCount: number;
    teamsFound: number;
    departmentsFound: number;
  };
  errors?: string[];
}

export const ExecutiveDataCollector = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CollectionResult | null>(null);
  const { toast } = useToast();

  const collectExecutiveData = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log('Calling collect-club-executives function...');
      
      const { data, error } = await supabase.functions.invoke('collect-club-executives', {
        body: {}
      });

      if (error) {
        console.error('Function call error:', error);
        throw new Error(error.message);
      }

      console.log('Function response:', data);
      setResult(data);

      if (data.success) {
        toast({
          title: "Success!",
          description: `Added ${data.stats.insertedCount} executives to the database`,
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to collect executive data",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Error collecting executive data:', error);
      toast({
        title: "Error",
        description: "Failed to collect executive data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Club Executives Data Collection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>This will automatically collect and add executive data for all Premier League clubs in your database, including:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>CEO, COO, Chairman positions</li>
            <li>Commercial Directors</li>
            <li>Directors of Football</li>
            <li>Other senior executives</li>
          </ul>
        </div>

        {isLoading && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Progress value={50} className="flex-1" />
              <span className="text-sm">Processing...</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Collecting executive data from Premier League clubs...
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-3">
            <Alert className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <div className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription>
                  {result.message}
                </AlertDescription>
              </div>
            </Alert>

            {result.success && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Executives:</span>
                    <span className="font-medium">{result.stats.totalExecutives}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Successfully Added:</span>
                    <span className="font-medium text-green-600">{result.stats.insertedCount}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Teams Found:</span>
                    <span className="font-medium">{result.stats.teamsFound}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Departments Found:</span>
                    <span className="font-medium">{result.stats.departmentsFound}</span>
                  </div>
                </div>
              </div>
            )}

            {result.errors && result.errors.length > 0 && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">Some issues occurred:</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {result.errors.slice(0, 5).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                      {result.errors.length > 5 && (
                        <li>... and {result.errors.length - 5} more</li>
                      )}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <Button 
          onClick={collectExecutiveData} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Collecting Data...' : 'Collect Executive Data'}
        </Button>
      </CardContent>
    </Card>
  );
};