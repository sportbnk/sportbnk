import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText, Users, Building2, AlertCircle, CheckCircle, Clock, Plus, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CsvUploadService, BatchProcessResult } from "@/services/csvUploadService";

const CsvUpload = () => {
  const [teamsCsv, setTeamsCsv] = useState("");
  const [contactsCsv, setContactsCsv] = useState("");
  const [isProcessingTeams, setIsProcessingTeams] = useState(false);
  const [isProcessingContacts, setIsProcessingContacts] = useState(false);
  const [teamsProgress, setTeamsProgress] = useState<BatchProcessResult | null>(null);
  const [contactsProgress, setContactsProgress] = useState<BatchProcessResult | null>(null);
  const [teamsDropActive, setTeamsDropActive] = useState(false);
  const [contactsDropActive, setContactsDropActive] = useState(false);
  const [teamsAbortController, setTeamsAbortController] = useState<AbortController | null>(null);
  const [contactsAbortController, setContactsAbortController] = useState<AbortController | null>(null);
  const { toast } = useToast();

  // Function to parse CSV and get specific row data
  const getCsvRowData = (csvData: string, rowNumber: number) => {
    try {
      const lines = csvData.split('\n');
      if (rowNumber >= lines.length) return null;
      
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const rowData = lines[rowNumber].split(',').map(cell => cell.trim().replace(/"/g, ''));
      
      return { headers, rowData };
    } catch (error) {
      console.error('Error parsing CSV row:', error);
      return null;
    }
  };

  const handleFileRead = (file: File, setData: (data: string) => void) => {
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setData(text);
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a CSV file",
        variant: "destructive",
      });
    }
  };

  const handleTeamsFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileRead(file, setTeamsCsv);
    }
  };

  const handleContactsFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileRead(file, setContactsCsv);
    }
  };

  const handleTeamsDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setTeamsDropActive(true);
  };

  const handleTeamsDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setTeamsDropActive(false);
  };

  const handleTeamsDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setTeamsDropActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileRead(file, setTeamsCsv);
    }
  };

  const handleContactsDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setContactsDropActive(true);
  };

  const handleContactsDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setContactsDropActive(false);
  };

  const handleContactsDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setContactsDropActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileRead(file, setContactsCsv);
    }
  };

  const renderDropZone = (
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onDragOver: (e: React.DragEvent) => void,
    onDragLeave: (e: React.DragEvent) => void,
    onDrop: (e: React.DragEvent) => void,
    isDropActive: boolean,
    acceptId: string
  ) => (
    <div
      className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer hover:border-primary/50 ${
        isDropActive ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => document.getElementById(acceptId)?.click()}
    >
      <input
        id={acceptId}
        type="file"
        accept=".csv"
        onChange={onFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center transition-colors ${
          isDropActive ? 'border-primary text-primary' : 'border-gray-400 text-gray-400'
        }`}>
          <Plus className="h-8 w-8" />
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700">
            Drag and drop your CSV file here
          </p>
          <p className="text-sm text-gray-500 mt-2">
            or click to browse files
          </p>
        </div>
      </div>
    </div>
  );

  const handleStopTeamsUpload = () => {
    if (teamsAbortController) {
      teamsAbortController.abort();
      setTeamsAbortController(null);
      setIsProcessingTeams(false);
      toast({
        title: "Upload Stopped",
        description: "Teams upload has been cancelled",
        variant: "destructive",
      });
    }
  };

  const handleStopContactsUpload = () => {
    if (contactsAbortController) {
      contactsAbortController.abort();
      setContactsAbortController(null);
      setIsProcessingContacts(false);
      toast({
        title: "Upload Stopped",
        description: "Contacts upload has been cancelled",
        variant: "destructive",
      });
    }
  };

  const handleTeamsUpload = async () => {
    if (!teamsCsv.trim()) {
      toast({
        title: "Error",
        description: "Please upload a teams CSV file or enter CSV data",
        variant: "destructive",
      });
      return;
    }

    const abortController = new AbortController();
    setTeamsAbortController(abortController);
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
      if (error instanceof Error && error.name === 'AbortError') {
        // Upload was cancelled, don't show error toast
        return;
      }
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload teams",
        variant: "destructive",
      });
    } finally {
      setIsProcessingTeams(false);
      setTeamsAbortController(null);
    }
  };

  const handleContactsUpload = async () => {
    if (!contactsCsv.trim()) {
      toast({
        title: "Error",
        description: "Please upload a contacts CSV file or enter CSV data",
        variant: "destructive",
      });
      return;
    }

    const abortController = new AbortController();
    setContactsAbortController(abortController);
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
      if (error instanceof Error && error.name === 'AbortError') {
        // Upload was cancelled, don't show error toast
        return;
      }
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload contacts",
        variant: "destructive",
      });
    } finally {
      setIsProcessingContacts(false);
      setContactsAbortController(null);
    }
  };

  const renderProgress = (progress: BatchProcessResult | null, type: string, csvData: string) => {
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
            <div className="mt-2 space-y-3 max-h-64 overflow-y-auto">
              {progress.errors.map((error, index) => {
                // Extract row number from error message
                const rowMatch = error.match(/Row (\d+):/);
                const rowNumber = rowMatch ? parseInt(rowMatch[1]) : null;
                const rowData = rowNumber ? getCsvRowData(csvData, rowNumber) : null;
                
                return (
                  <div key={index} className="border border-red-200 rounded-lg p-3 bg-red-50">
                    <div className="text-red-600 text-xs font-medium mb-2">
                      {error}
                    </div>
                    {rowData && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-600 mb-1">CSV Row Preview:</div>
                        <div className="w-full overflow-x-auto">
                          <div className="flex space-x-2 pb-2" style={{ minWidth: 'max-content' }}>
                            {rowData.headers.map((header, idx) => (
                              <div key={idx} className="flex-shrink-0 min-w-24 p-2 border border-gray-200 rounded bg-white">
                                <div className="text-xs font-medium text-gray-700 mb-1 truncate">
                                  {header}
                                </div>
                                <div className="text-xs text-gray-900 break-all">
                                  {rowData.rowData[idx] || ''}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
                <label className="text-sm font-medium mb-3 block">Upload CSV File</label>
                {renderDropZone(
                  handleTeamsFileUpload,
                  handleTeamsDragOver,
                  handleTeamsDragLeave,
                  handleTeamsDrop,
                  teamsDropActive,
                  "teams-file-input"
                )}
              </div>

              <div className="text-center text-gray-500">or</div>

              <div>
                <label className="text-sm font-medium mb-2 block">Paste CSV Data</label>
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

              <div className="flex space-x-2">
                <Button
                  onClick={handleTeamsUpload}
                  disabled={isProcessingTeams || !teamsCsv.trim()}
                  className="flex-1"
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

                {isProcessingTeams && (
                  <Button
                    onClick={handleStopTeamsUpload}
                    variant="destructive"
                    size="sm"
                  >
                    <StopCircle className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                )}
              </div>

              {renderProgress(teamsProgress, "teams", teamsCsv)}
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
                <label className="text-sm font-medium mb-3 block">Upload CSV File</label>
                {renderDropZone(
                  handleContactsFileUpload,
                  handleContactsDragOver,
                  handleContactsDragLeave,
                  handleContactsDrop,
                  contactsDropActive,
                  "contacts-file-input"
                )}
              </div>

              <div className="text-center text-gray-500">or</div>

              <div>
                <label className="text-sm font-medium mb-2 block">Paste CSV Data</label>
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

              <div className="flex space-x-2">
                <Button
                  onClick={handleContactsUpload}
                  disabled={isProcessingContacts || !contactsCsv.trim()}
                  className="flex-1"
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

                {isProcessingContacts && (
                  <Button
                    onClick={handleStopContactsUpload}
                    variant="destructive"
                    size="sm"
                  >
                    <StopCircle className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                )}
              </div>

              {renderProgress(contactsProgress, "contacts", contactsCsv)}
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
