import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Upload, FileText, Users, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ParsedTeam {
  name: string;
  sport: string;
  level: string;
  street: string;
  postal: string;
  city: string;
  country: string;
  website: string;
  phone: string;
  email: string;
  founded: string;
  revenue: string;
  employees: string;
  socials: Array<{ platform: string; url: string }>;
  hours: Array<{ day: string; startHour: string; endHour: string }>;
}

const CsvUpload = () => {
  const [uploadType, setUploadType] = useState<"teams" | "contacts" | "">("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvText, setCsvText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedTeam[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvText(text);
        setIsVerified(false);
        setParsedData([]);
        setErrors([]);
      };
      reader.readAsText(file);
    }
  };

  const parseSocials = (socialsText: string): Array<{ platform: string; url: string }> => {
    console.log('=== PARSING SOCIALS ===');
    console.log('Input socialsText:', socialsText);
    console.log('Type of socialsText:', typeof socialsText);
    console.log('Is empty or null?', !socialsText?.trim());
    
    if (!socialsText?.trim()) {
      console.log('Returning empty array - no social text');
      return [];
    }
    
    console.log('Splitting by comma...');
    const socialPairs = socialsText.split(',');
    console.log('Social pairs after split:', socialPairs);
    console.log('Number of pairs:', socialPairs.length);
    
    const socials: Array<{ platform: string; url: string }> = [];
    
    for (let i = 0; i < socialPairs.length; i++) {
      const pair = socialPairs[i];
      console.log(`Processing pair ${i}:`, pair);
      
      const colonSplit = pair.split(':');
      console.log(`Pair ${i} split by colon:`, colonSplit);
      
      if (colonSplit.length >= 2) {
        const platform = colonSplit[0].trim();
        const url = colonSplit.slice(1).join(':').trim(); // Handle URLs with multiple colons
        
        console.log(`Pair ${i} - Platform:`, platform);
        console.log(`Pair ${i} - URL:`, url);
        
        if (platform && url) {
          const socialEntry = { platform: platform.toLowerCase(), url };
          console.log(`Adding social entry ${i}:`, socialEntry);
          socials.push(socialEntry);
        } else {
          console.log(`Skipping pair ${i} - empty platform or URL`);
        }
      } else {
        console.log(`Skipping pair ${i} - no colon found`);
      }
    }
    
    console.log('Final socials array:', socials);
    console.log('=== END PARSING SOCIALS ===\n');
    return socials;
  };

  const parseHours = (hoursText: string): Array<{ day: string; startHour: string; endHour: string }> => {
    console.log('=== PARSING HOURS ===');
    console.log('Input hoursText:', hoursText);
    console.log('Type of hoursText:', typeof hoursText);
    console.log('Is empty or null?', !hoursText?.trim());
    
    if (!hoursText?.trim()) {
      console.log('Returning empty array - no hours text');
      return [];
    }
    
    console.log('Splitting by comma...');
    const hourPairs = hoursText.split(',');
    console.log('Hour pairs after split:', hourPairs);
    console.log('Number of pairs:', hourPairs.length);
    
    const hours: Array<{ day: string; startHour: string; endHour: string }> = [];
    
    for (let i = 0; i < hourPairs.length; i++) {
      const pair = hourPairs[i];
      console.log(`Processing hour pair ${i}:`, pair);
      
      const colonSplit = pair.split(':');
      console.log(`Hour pair ${i} split by colon:`, colonSplit);
      
      if (colonSplit.length >= 2) {
        const day = colonSplit[0].trim();
        const timeRange = colonSplit.slice(1).join(':').trim(); // Handle time ranges with multiple colons
        
        console.log(`Hour pair ${i} - Day:`, day);
        console.log(`Hour pair ${i} - Time range:`, timeRange);
        
        if (day && timeRange) {
          console.log(`Splitting time range by dash: "${timeRange}"`);
          const dashSplit = timeRange.split('-');
          console.log(`Time range split by dash:`, dashSplit);
          
          if (dashSplit.length >= 2) {
            const startHour = dashSplit[0].trim();
            const endHour = dashSplit.slice(1).join('-').trim(); // Handle end times with dashes
            
            console.log(`Hour pair ${i} - Start hour:`, startHour);
            console.log(`Hour pair ${i} - End hour:`, endHour);
            
            if (startHour && endHour) {
              const hourEntry = { 
                day: day.toLowerCase(), 
                startHour: startHour.toLowerCase(), 
                endHour: endHour.toLowerCase() 
              };
              console.log(`Adding hour entry ${i}:`, hourEntry);
              hours.push(hourEntry);
            } else {
              console.log(`Skipping hour pair ${i} - empty start or end hour`);
            }
          } else {
            console.log(`Skipping hour pair ${i} - no dash found in time range`);
          }
        } else {
          console.log(`Skipping hour pair ${i} - empty day or time range`);
        }
      } else {
        console.log(`Skipping hour pair ${i} - no colon found`);
      }
    }
    
    console.log('Final hours array:', hours);
    console.log('=== END PARSING HOURS ===\n');
    return hours;
  };

  const handleVerifyCsv = () => {
    if (!uploadType || !csvText) {
      toast({
        title: "Error",
        description: "Please select upload type and provide CSV data",
        variant: "destructive",
      });
      return;
    }

    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      setErrors(["CSV must have at least a header row and one data row"]);
      return;
    }

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    console.log('CSV headers:', headers);

    if (uploadType === "teams") {
      const requiredColumns = ['name', 'sport', 'level', 'street', 'postal', 'city', 'country', 'website', 'phone', 'email', 'founded', 'revenue', 'employees', 'socials', 'hours'];
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        setErrors([`Missing required columns: ${missingColumns.join(', ')}`]);
        return;
      }

      const parsed: ParsedTeam[] = [];
      const newErrors: string[] = [];

      // Parse first 10 rows for preview
      for (let i = 1; i < Math.min(11, lines.length); i++) {
        try {
          console.log(`\n=== PROCESSING ROW ${i} ===`);
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          console.log('Raw values:', values);
          
          const row: any = {};
          
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });

          console.log('Row object:', row);
          console.log('Raw socials from CSV:', row.socials);
          console.log('Raw hours from CSV:', row.hours);

          if (!row.name) {
            newErrors.push(`Row ${i}: Team name is required`);
            continue;
          }

          const socials = parseSocials(row.socials);
          const hours = parseHours(row.hours);

          const parsedTeam = {
            name: row.name,
            sport: row.sport,
            level: row.level,
            street: row.street,
            postal: row.postal,
            city: row.city,
            country: row.country,
            website: row.website,
            phone: row.phone,
            email: row.email,
            founded: row.founded,
            revenue: row.revenue,
            employees: row.employees,
            socials,
            hours
          };

          console.log('Final parsed team:', parsedTeam);
          parsed.push(parsedTeam);
          console.log(`=== END ROW ${i} ===\n`);
        } catch (error) {
          console.error(`Error parsing row ${i}:`, error);
          newErrors.push(`Row ${i}: Error parsing data - ${error}`);
        }
      }

      if (newErrors.length === 0) {
        setParsedData(parsed);
        setIsVerified(true);
        setErrors([]);
        toast({
          title: "Verification Successful",
          description: `Found ${lines.length - 1} teams to import. Preview shows first ${parsed.length} teams.`,
        });
      } else {
        setErrors(newErrors);
        setParsedData([]);
        setIsVerified(false);
      }
    }
  };

  const handleProcessCsv = async () => {
    if (!uploadType || !csvText || !isVerified) {
      toast({
        title: "Error",
        description: "Please verify CSV data first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('process-teams-csv', {
        body: { csvData: csvText }
      });

      if (error) throw error;

      toast({
        title: "CSV Processing Complete",
        description: `Successfully processed ${data.successful} out of ${data.processed} rows. ${data.errors.length > 0 ? `Errors: ${data.errors.length}` : ''}`,
      });
      
      console.log('Processing results:', data);
      
      // Reset form
      setCsvFile(null);
      setCsvText("");
      setUploadType("");
      setIsVerified(false);
      setParsedData([]);
      
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast({
        title: "Error",
        description: "Failed to process CSV file",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const teamsColumns = [
    "Name", "Sport", "Level", "Street", "Postal", "City", "Country", 
    "Website", "Phone", "Email", "Founded", "Revenue", "Employees", "Socials", "Hours"
  ];

  const contactsColumns = [
    "Name", "Email", "Phone", "LinkedIn", "Role", "Department", "Team"
  ];

  return (
    <PageLayout pageTitle="CSV Upload">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-sportbnk-navy mb-4">
              Data Import Center
            </h1>
            <p className="text-gray-600">
              Upload CSV files to import teams and contacts data into the system
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
                  onClick={() => setUploadType("teams")}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-sportbnk-green" />
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">Upload Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-4">
                  Import organization/team data from CSV files
                </p>
                <Button 
                  className={`w-full ${uploadType === "teams" ? "bg-sportbnk-green" : "bg-sportbnk-navy"} hover:opacity-90`}
                  onClick={() => setUploadType("teams")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Select Teams Upload
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setUploadType("contacts")}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-sportbnk-green/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-sportbnk-green" />
                </div>
                <CardTitle className="text-xl text-sportbnk-navy">Upload Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-4">
                  Import contact/people data from CSV files
                </p>
                <Button 
                  className={`w-full ${uploadType === "contacts" ? "bg-sportbnk-green" : "bg-sportbnk-navy"} hover:opacity-90`}
                  onClick={() => setUploadType("contacts")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Select Contacts Upload
                </Button>
              </CardContent>
            </Card>
          </div>

          {uploadType && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-sportbnk-navy">
                  Upload {uploadType === "teams" ? "Teams" : "Contacts"} CSV
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="upload-type">Upload Type</Label>
                  <Select value={uploadType} onValueChange={(value: "teams" | "contacts") => setUploadType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select upload type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teams">Teams/Organizations</SelectItem>
                      <SelectItem value="contacts">Contacts/People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="csv-file">CSV File</Label>
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="csv-text">CSV Data</Label>
                  <Textarea
                    id="csv-text"
                    placeholder={`Paste your CSV data here or upload a file above...`}
                    value={csvText}
                    onChange={(e) => {
                      setCsvText(e.target.value);
                      setIsVerified(false);
                      setParsedData([]);
                      setErrors([]);
                    }}
                    rows={10}
                    className="mt-2"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-sportbnk-navy mb-2">
                    Expected CSV Columns for {uploadType}:
                  </h3>
                  <div className="text-sm text-gray-600">
                    {uploadType === "teams" ? (
                      <div>
                        <p className="mb-2">Required columns (case insensitive):</p>
                        <div className="grid grid-cols-3 gap-2">
                          {teamsColumns.map((col) => (
                            <span key={col} className="bg-white px-2 py-1 rounded border text-xs">
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-2">Required columns (case insensitive):</p>
                        <div className="grid grid-cols-3 gap-2">
                          {contactsColumns.map((col) => (
                            <span key={col} className="bg-white px-2 py-1 rounded border text-xs">
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Errors Display */}
                {errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <h4 className="font-semibold text-red-800">Validation Errors</h4>
                    </div>
                    <ul className="text-sm text-red-700 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Verification Status */}
                {isVerified && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">Format Verified!</h4>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      CSV format is valid. Preview shows first {parsedData.length} entries.
                    </p>
                  </div>
                )}

                {/* Verify Button */}
                {!isVerified && (
                  <Button
                    onClick={handleVerifyCsv}
                    disabled={!csvText}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify CSV Format
                  </Button>
                )}

                {/* Preview Table */}
                {isVerified && parsedData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Preview - First {parsedData.length} Teams</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Sport</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>Country</TableHead>
                            <TableHead>Social Links</TableHead>
                            <TableHead>Opening Hours</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {parsedData.map((team, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{team.name}</TableCell>
                              <TableCell>{team.sport}</TableCell>
                              <TableCell className="capitalize">{team.level}</TableCell>
                              <TableCell>{team.city}</TableCell>
                              <TableCell>{team.country}</TableCell>
                              <TableCell>
                                {team.socials.length > 0 ? (
                                  <Select>
                                    <SelectTrigger className="w-40">
                                      <SelectValue placeholder={`${team.socials.length} links`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {team.socials.map((social, idx) => (
                                        <SelectItem key={idx} value={`${social.platform}-${idx}`}>
                                          {social.platform}: {social.url}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <span className="text-gray-400">No social links</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {team.hours.length > 0 ? (
                                  <Select>
                                    <SelectTrigger className="w-40">
                                      <SelectValue placeholder={`${team.hours.length} days`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {team.hours.map((hour, idx) => (
                                        <SelectItem key={idx} value={`${hour.day}-${idx}`}>
                                          {hour.day}: {hour.startHour} - {hour.endHour}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <span className="text-gray-400">No hours</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}

                {/* Continue Button */}
                {isVerified && (
                  <Button
                    onClick={handleProcessCsv}
                    disabled={isProcessing}
                    className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90"
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Continue - Process CSV
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CsvUpload;
