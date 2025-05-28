
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CsvUpload = () => {
  const [uploadType, setUploadType] = useState<"teams" | "contacts" | "">("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvText, setCsvText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setCsvText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleProcessCsv = async () => {
    if (!uploadType || !csvText) {
      toast({
        title: "Error",
        description: "Please select upload type and provide CSV data",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // For now, just show a success message
      // The actual CSV processing logic will be implemented later
      toast({
        title: "CSV Processing Started",
        description: `Processing ${uploadType} data. This functionality will be fully implemented soon.`,
      });
      
      console.log(`Processing ${uploadType} CSV:`, csvText.split('\n').slice(0, 5));
      
      // Reset form
      setCsvFile(null);
      setCsvText("");
      setUploadType("");
      
    } catch (error) {
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
        <div className="max-w-4xl mx-auto">
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
                    onChange={(e) => setCsvText(e.target.value)}
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

                <Button
                  onClick={handleProcessCsv}
                  disabled={!csvText || isProcessing}
                  className="w-full bg-sportbnk-green hover:bg-sportbnk-green/90"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Process CSV
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CsvUpload;
