import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Download, 
  FileText, 
  Users, 
  Building2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Sparkles,
  Database
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

interface EnrichmentData {
  id: string;
  type: 'person' | 'company';
  originalData: any;
  enrichedData?: any;
  status: 'pending' | 'enriched' | 'failed';
  confidence?: number;
}

const Enrich = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [enrichmentQueue, setEnrichmentQueue] = useState<EnrichmentData[]>([]);
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichmentProgress, setEnrichmentProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('upload');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        setCsvData(jsonData);
        
        // Process data for enrichment queue
        const queue: EnrichmentData[] = jsonData.map((row: any, index) => ({
          id: `item-${index}`,
          type: detectDataType(row),
          originalData: row,
          status: 'pending'
        }));
        
        setEnrichmentQueue(queue);
        setActiveTab('preview');
        
        toast({
          title: "File uploaded successfully",
          description: `Loaded ${jsonData.length} records for enrichment`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to parse CSV file. Please check the format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const detectDataType = (row: any): 'person' | 'company' => {
    // Simple heuristic to detect if it's a person or company
    const hasPersonFields = row.firstName || row.first_name || row.lastname || row.last_name;
    const hasCompanyFields = row.company || row.companyName || row.organization;
    
    if (hasPersonFields && !hasCompanyFields) return 'person';
    if (hasCompanyFields && !hasPersonFields) return 'company';
    
    // Default to person if unclear
    return 'person';
  };

  const startEnrichment = async () => {
    setIsEnriching(true);
    setEnrichmentProgress(0);
    
    // Simulate enrichment process
    for (let i = 0; i < enrichmentQueue.length; i++) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const enrichedItem = { ...enrichmentQueue[i] };
      
      // Mock enrichment data
      if (enrichedItem.type === 'person') {
        enrichedItem.enrichedData = {
          ...enrichedItem.originalData,
          linkedin: `https://linkedin.com/in/${enrichedItem.originalData.firstName?.toLowerCase()}-${enrichedItem.originalData.lastName?.toLowerCase()}`,
          jobTitle: enrichedItem.originalData.jobTitle || 'Sales Manager',
          company: enrichedItem.originalData.company || 'Tech Corp',
          email: enrichedItem.originalData.email || `${enrichedItem.originalData.firstName?.toLowerCase()}@${enrichedItem.originalData.company?.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: enrichedItem.originalData.phone || '+44 20 7946 0958'
        };
      } else {
        enrichedItem.enrichedData = {
          ...enrichedItem.originalData,
          website: enrichedItem.originalData.website || `https://${enrichedItem.originalData.company?.toLowerCase().replace(/\s+/g, '')}.com`,
          industry: enrichedItem.originalData.industry || 'Technology',
          employees: enrichedItem.originalData.employees || '50-200',
          location: enrichedItem.originalData.location || 'London, UK',
          description: enrichedItem.originalData.description || 'Leading technology company'
        };
      }
      
      enrichedItem.status = 'enriched';
      enrichedItem.confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
      
      setEnrichmentQueue(prev => 
        prev.map(item => item.id === enrichedItem.id ? enrichedItem : item)
      );
      
      setEnrichmentProgress(((i + 1) / enrichmentQueue.length) * 100);
    }
    
    setIsEnriching(false);
    setActiveTab('results');
    
    toast({
      title: "Enrichment completed",
      description: `Successfully enriched ${enrichmentQueue.length} records`,
    });
  };

  const exportEnrichedData = () => {
    const enrichedItems = enrichmentQueue.filter(item => item.status === 'enriched');
    const exportData = enrichedItems.map(item => item.enrichedData);
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enriched Data");
    
    const date = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `enriched_data_${date}.xlsx`);
    
    toast({
      title: "Export successful",
      description: "Enriched data exported successfully",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enriched':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center gap-4">
        <Sparkles className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Data Enrichment</h1>
          <p className="text-muted-foreground">Import CSV files and enrich your contact and company data</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload CSV</TabsTrigger>
          <TabsTrigger value="preview">Preview & Enrich</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload CSV File
              </CardTitle>
              <CardDescription>
                Upload a CSV file containing contact or company data to be enriched
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop your CSV file here</h3>
                <p className="text-muted-foreground mb-4">or click to browse</p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Supported file formats:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">People Data</p>
                      <p className="text-sm text-muted-foreground">firstName, lastName, email, company</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Company Data</p>
                      <p className="text-sm text-muted-foreground">company, website, industry, location</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Preview
              </CardTitle>
              <CardDescription>
                Review your data before starting enrichment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {enrichmentQueue.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <Badge variant="outline">
                        {enrichmentQueue.filter(item => item.type === 'person').length} People
                      </Badge>
                      <Badge variant="outline">
                        {enrichmentQueue.filter(item => item.type === 'company').length} Companies
                      </Badge>
                    </div>
                    <Button 
                      onClick={startEnrichment} 
                      disabled={isEnriching}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isEnriching ? 'Enriching...' : 'Start Enrichment'}
                    </Button>
                  </div>

                  {isEnriching && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Enriching data...</span>
                        <span>{Math.round(enrichmentProgress)}%</span>
                      </div>
                      <Progress value={enrichmentProgress} className="w-full" />
                    </div>
                  )}

                  <div className="border rounded-lg max-h-96 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
                      {enrichmentQueue.slice(0, 9).map((item) => (
                        <div key={item.id} className="flex items-center gap-2 p-2 border rounded">
                          {item.type === 'person' ? <Users className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.type === 'person' 
                                ? `${item.originalData.firstName || ''} ${item.originalData.lastName || ''}`.trim()
                                : item.originalData.company || 'Unknown'
                              }
                            </p>
                          </div>
                          {getStatusIcon(item.status)}
                        </div>
                      ))}
                    </div>
                    {enrichmentQueue.length > 9 && (
                      <div className="text-center p-2 border-t text-sm text-muted-foreground">
                        +{enrichmentQueue.length - 9} more items
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No data uploaded yet. Go to the Upload tab to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Enrichment Results
              </CardTitle>
              <CardDescription>
                Review and export your enriched data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {enrichmentQueue.some(item => item.status === 'enriched') ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <Badge variant="default" className="bg-green-500">
                        {enrichmentQueue.filter(item => item.status === 'enriched').length} Enriched
                      </Badge>
                      <Badge variant="secondary">
                        {enrichmentQueue.filter(item => item.status === 'failed').length} Failed
                      </Badge>
                    </div>
                    <Button onClick={exportEnrichedData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                  </div>

                  <div className="border rounded-lg max-h-96 overflow-auto">
                    <div className="space-y-2 p-4">
                      {enrichmentQueue.filter(item => item.status === 'enriched').map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {item.type === 'person' ? <Users className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                            <div>
                              <p className="font-medium">
                                {item.type === 'person' 
                                  ? `${item.enrichedData?.firstName || ''} ${item.enrichedData?.lastName || ''}`.trim()
                                  : item.enrichedData?.company || 'Unknown'
                                }
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.type === 'person' 
                                  ? item.enrichedData?.jobTitle || 'No title'
                                  : item.enrichedData?.industry || 'No industry'
                                }
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {item.confidence}% confidence
                            </Badge>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No enriched data yet. Complete the enrichment process first.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Enrich;