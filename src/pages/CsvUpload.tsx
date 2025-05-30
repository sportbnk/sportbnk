
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Users, Building2, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CsvUploadService, BatchProcessResult } from "@/services/csvUploadService";

const CsvUpload = () => {
  const [teamsCsv, setTeamsCsv] = useState("");
  const [contactsCsv, setContactsCsv] = useState("");
  const [isProcessingTeams, setIsProcessingTeams] = useState(false);
  const [isProcessingContacts, setIsProcessingContacts] = useState(false);
  const [teamsProgress, setTeamsProgress] = useState<BatchProcessResult | null>(null);
  const [contactsProgress, setContactsProgress] = useState<BatchProcessResult | null>(null);
  const { toast } = useToast();

  const handleTeamsUpload = async () => {
    if (!teamsCsv.trim()) {
      toast({
        title: "Error",
        description: "Please enter teams CSV data",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingTeams(true);
    setTeamsProgress(null);

    try {
      await CsvUploadService.processTeamsCsv(
        teamsCsv,
        100, // batch size
        (progress) => {
          setTeamsProgress(progress);
        }
      );

      toast({
        title: "Teams Upload Complete",
        description: "All teams have been processed successfully",
      });
    } catch (error) {
      console.error('Teams upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload teams",
        variant: "destructive",
      });
    } finally {
      setIsProcessingTeams(false);
    }
  };

  const handleContactsUpload = async () => {
    if (!contactsCsv.trim()) {
      toast({
        title: "Error",
        description: "Please enter contacts CSV data",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingContacts(true);
    setContactsProgress(null);

    try {
      await CsvUploadService.processContactsCsv(
        contactsCsv,
        [], // conflict resolutions
        50, // batch size
        (progress) => {
          setContactsProgress(progress);
        }
      );

      toast({
        title: "Contacts Upload Complete",
        description: "All contacts have been processed successfully",
      });
    } catch (error) {
      console.error('Contacts upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload contacts",
        variant: "destructive",
      });
    } finally {
      setIsProcessingContacts(false);
    }
  };

  const renderProgress = (progress: BatchProcessResult | null, type: string) => {
    if (!progress) return null;

    const progressPercentage = progress.totalRows > 0 
      ? Math.round((progress.processed / progress.totalRows) * 100) 
      : 0;

    return (
      <div className="space-y-3 mt-4">
        <div className="flex items-center justify-between text-sm">
          <span>Processing {type}...</span>
          <span>{progress.processed}/{progress.totalRows} rows</span>
        </div>
        
        <Progress value={progressPercentage} className="w-full" />
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Successful: {progress.successful}</span>
          </div>
          
          {progress.skipped !== undefined && (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span>Skipped: {progress.skipped}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>Errors: {progress.errors.length}</span>
          </div>
        </div>

        {progress.errors.length > 0 && (
          <details className="text-sm">
            <summary className="cursor-pointer text-red-600 hover:text-red-800">
              View errors ({progress.errors.length})
            </summary>
            <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
              {progress.errors.map((error, index) => (
                <div key={index} className="text-red-600 text-xs">
                  {error}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">CSV Data Upload</h1>
          <p className="text-gray-600">
            Upload teams and contacts data via CSV. Large files are processed in batches automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teams Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Teams Upload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">CSV Data</label>
                <Textarea
                  placeholder="Paste your teams CSV data here..."
                  value={teamsCsv}
                  onChange={(e) => setTeamsCsv(e.target.value)}
                  className="min-h-32"
                />
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Expected columns:</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Name", "Sport", "Level", "Street", "Postal", "City", 
                    "Country", "Website", "Phone", "Email", "Founded", 
                    "Revenue", "Employees", "Socials", "Hours"
                  ].map((col) => (
                    <Badge key={col} variant="outline" className="text-xs">
                      {col}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleTeamsUpload}
                disabled={isProcessingTeams || !teamsCsv.trim()}
                className="w-full"
              >
                {isProcessingTeams ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Teams
                  </>
                )}
              </Button>

              {renderProgress(teamsProgress, "teams")}
            </CardContent>
          </Card>

          {/* Contacts Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Contacts Upload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">CSV Data</label>
                <Textarea
                  placeholder="Paste your contacts CSV data here..."
                  value={contactsCsv}
                  onChange={(e) => setContactsCsv(e.target.value)}
                  className="min-h-32"
                />
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Expected columns:</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Name", "Role", "Email", "Is_Email_Verified", "Phone", 
                    "LinkedIn", "Team", "Department"
                  ].map((col) => (
                    <Badge key={col} variant="outline" className="text-xs">
                      {col}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleContactsUpload}
                disabled={isProcessingContacts || !contactsCsv.trim()}
                className="w-full"
              >
                {isProcessingContacts ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Contacts
                  </>
                )}
              </Button>

              {renderProgress(contactsProgress, "contacts")}
            </CardContent>
          </Card>
        </div>

        {/* Documentation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>CSV Format Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Teams CSV Format:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Name</strong> (required): Team name</li>
                <li>• <strong>Sport, Level, City, Country</strong>: Optional team details</li>
                <li>• <strong>Revenue, Employees</strong>: Numeric values</li>
                <li>• <strong>Socials</strong>: Format as "platform:url;platform:url"</li>
                <li>• <strong>Hours</strong>: Format as "day:start-end;day:start-end"</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Contacts CSV Format:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Name, Team</strong> (required): Contact name and team name</li>
                <li>• <strong>Role, Email, Phone, LinkedIn</strong>: Contact details</li>
                <li>• <strong>Department</strong>: Will be created if it doesn't exist</li>
                <li>• <strong>Is_Email_Verified</strong>: true/false, 1/0, or yes/no</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Large CSV files are automatically processed in batches to prevent timeouts. 
                You can monitor the progress in real-time above.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CsvUpload;
