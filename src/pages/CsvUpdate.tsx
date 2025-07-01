import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Upload, FileText, Users, Building2, AlertCircle, CheckCircle, Clock, Plus, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CsvUpdateService, BatchUpdateResult } from "@/services/csvUpdateService";
import * as XLSX from 'xlsx';

const CsvUpdate = () => {
  const [teamsCsv, setTeamsCsv] = useState("");
  const [teamsFileType, setTeamsFileType] = useState<'csv' | 'xlsx'>('csv');
  const [contactsCsv, setContactsCsv] = useState("");
  const [contactsFileType, setContactsFileType] = useState<'csv' | 'xlsx'>('csv');
  const [isProcessingTeams, setIsProcessingTeams] = useState(false);
  const [isProcessingContacts, setIsProcessingContacts] = useState(false);
  const [teamsProgress, setTeamsProgress] = useState<BatchUpdateResult | null>(null);
  const [contactsProgress, setContactsProgress] = useState<BatchUpdateResult | null>(null);
  const [teamsDropActive, setTeamsDropActive] = useState(false);
  const [contactsDropActive, setContactsDropActive] = useState(false);
  const [teamsAbortController, setTeamsAbortController] = useState<AbortController | null>(null);
  const [contactsAbortController, setContactsAbortController] = useState<AbortController | null>(null);
  const [teamsStartingRow, setTeamsStartingRow] = useState(1);
  const [contactsStartingRow, setContactsStartingRow] = useState(1);
  const [teamsNullifyEmpty, setTeamsNullifyEmpty] = useState(false);
  const [contactsNullifyEmpty, setContactsNullifyEmpty] = useState(false);
  const [teamsSelectedColumns, setTeamsSelectedColumns] = useState<Record<string, boolean>>({});
  const [contactsSelectedColumns, setContactsSelectedColumns] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Function to convert Excel to CSV
  const convertExcelToCsv = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const csv = XLSX.utils.sheet_to_csv(worksheet);
          resolve(csv);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Function to parse CSV and get headers
  const getCsvHeaders = (csvData: string) => {
    try {
      const lines = csvData.split('\n');
      if (lines.length === 0) return [];
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      return headers;
    } catch (error) {
      console.error('Error parsing CSV headers:', error);
      return [];
    }
  };

  // Initialize column selection when CSV data changes
  const initializeColumnSelection = (csvData: string, setSelectedColumns: (cols: Record<string, boolean>) => void) => {
    const headers = getCsvHeaders(csvData);
    const initialSelection: Record<string, boolean> = {};
    headers.forEach(header => {
      // Enable all columns except 'Name' which acts as primary key
      initialSelection[header] = header.toLowerCase() !== 'name';
    });
    setSelectedColumns(initialSelection);
  };

  const handleFileRead = async (file: File, setData: (data: string) => void, setFileType?: (type: 'csv' | 'xlsx') => void, setSelectedColumns?: (cols: Record<string, boolean>) => void) => {
    const fileName = file.name.toLowerCase();
    const isExcelFile = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
    const isCsvFile = fileName.endsWith('.csv');

    if (!isExcelFile && !isCsvFile) {
      toast({
        title: "Invalid file",
        description: "Please select a CSV or Excel file",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isExcelFile) {
        const csvData = await convertExcelToCsv(file);
        setData(csvData);
        if (setFileType) setFileType('csv');
        if (setSelectedColumns) initializeColumnSelection(csvData, setSelectedColumns);
        
        toast({
          title: "Excel file converted",
          description: "Excel file converted to CSV format successfully.",
        });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setData(text);
          if (setFileType) setFileType('csv');
          if (setSelectedColumns) initializeColumnSelection(text, setSelectedColumns);
        };
        reader.readAsText(file);
        
        toast({
          title: "CSV file loaded",
          description: "CSV file loaded successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "File processing error",
        description: "Failed to process the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTeamsFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileRead(file, setTeamsCsv, setTeamsFileType, setTeamsSelectedColumns);
    }
  };

  const handleContactsFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileRead(file, setContactsCsv, setContactsFileType, setContactsSelectedColumns);
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
      handleFileRead(file, setTeamsCsv, setTeamsFileType, setTeamsSelectedColumns);
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
      handleFileRead(file, setContactsCsv, setContactsFileType, setContactsSelectedColumns);
    }
  };

  const renderDropZone = (
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onDragOver: (e: React.DragEvent) => void,
    onDragLeave: (e: React.DragEvent) => void,
    onDrop: (e: React.DragEvent) => void,
    isDropActive: boolean,
    acceptId: string,
    acceptTypes: string = ".csv,.xlsx,.xls"
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
        accept={acceptTypes}
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
            Drag and drop your CSV or Excel file here
          </p>
          <p className="text-sm text-gray-500 mt-2">
            or click to browse files
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supports .csv, .xlsx, .xls files
          </p>
        </div>
      </div>
    </div>
  );

  const renderColumnSelector = (csvData: string, selectedColumns: Record<string, boolean>, setSelectedColumns: (cols: Record<string, boolean>) => void) => {
    const headers = getCsvHeaders(csvData);
    if (headers.length === 0) return null;

    return (
      <div className="space-y-3">
        <h4 className="font-medium">Select columns to update:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {headers.map((header) => {
            const isNameColumn = header.toLowerCase() === 'name';
            return (
              <div key={header} className="flex items-center space-x-2">
                <Checkbox
                  id={header}
                  checked={selectedColumns[header] || false}
                  disabled={isNameColumn}
                  onCheckedChange={(checked) => {
                    setSelectedColumns({
                      ...selectedColumns,
                      [header]: !!checked
                    });
                  }}
                />
                <label 
                  htmlFor={header} 
                  className={`text-sm ${isNameColumn ? 'text-gray-400' : 'text-gray-700'}`}
                >
                  {header} {isNameColumn && '(Primary Key)'}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleStopTeamsUpdate = () => {
    if (teamsAbortController) {
      teamsAbortController.abort();
      setTeamsAbortController(null);
      setIsProcessingTeams(false);
      toast({
        title: "Update Stopped",
        description: "Teams update has been cancelled",
        variant: "destructive",
      });
    }
  };

  const handleStopContactsUpdate = () => {
    if (contactsAbortController) {
      contactsAbortController.abort();
      setContactsAbortController(null);
      setIsProcessingContacts(false);
      toast({
        title: "Update Stopped",
        description: "Contacts update has been cancelled",
        variant: "destructive",
      });
    }
  };

  const handleTeamsUpdate = async () => {
    if (!teamsCsv.trim()) {
      toast({
        title: "Error",
        description: "Please upload a teams file or enter CSV data",
        variant: "destructive",
      });
      return;
    }

    const selectedColumnsList = Object.entries(teamsSelectedColumns)
      .filter(([_, selected]) => selected)
      .map(([column]) => column);

    if (selectedColumnsList.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one column to update",
        variant: "destructive",
      });
      return;
    }

    const abortController = new AbortController();
    setTeamsAbortController(abortController);
    setIsProcessingTeams(true);
    setTeamsProgress(null);

    try {
      await CsvUpdateService.updateTeamsCsv(
        teamsCsv,
        selectedColumnsList,
        teamsNullifyEmpty,
        100,
        (progress) => {
          setTeamsProgress(progress);
        },
        abortController.signal,
        teamsStartingRow
      );

      toast({
        title: "Teams Update Complete",
        description: "All teams have been updated successfully",
      });
    } catch (error) {
      console.error('Teams update error:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update teams",
        variant: "destructive",
      });
    } finally {
      setIsProcessingTeams(false);
      setTeamsAbortController(null);
    }
  };

  const handleContactsUpdate = async () => {
    if (!contactsCsv.trim()) {
      toast({
        title: "Error",
        description: "Please upload a contacts file or enter CSV data",
        variant: "destructive",
      });
      return;
    }

    const selectedColumnsList = Object.entries(contactsSelectedColumns)
      .filter(([_, selected]) => selected)
      .map(([column]) => column);

    if (selectedColumnsList.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one column to update",
        variant: "destructive",
      });
      return;
    }

    const abortController = new AbortController();
    setContactsAbortController(abortController);
    setIsProcessingContacts(true);
    setContactsProgress(null);

    try {
      await CsvUpdateService.updateContactsCsv(
        contactsCsv,
        selectedColumnsList,
        contactsNullifyEmpty,
        50,
        (progress) => {
          setContactsProgress(progress);
        },
        abortController.signal,
        contactsStartingRow
      );

      toast({
        title: "Contacts Update Complete",
        description: "All contacts have been updated successfully",
      });
    } catch (error) {
      console.error('Contacts update error:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update contacts",
        variant: "destructive",
      });
    } finally {
      setIsProcessingContacts(false);
      setContactsAbortController(null);
    }
  };

  const renderProgress = (progress: BatchUpdateResult | null, type: string) => {
    if (!progress) return null;

    const progressPercentage = progress.totalRows > 0 
      ? Math.round((progress.processed / progress.totalRows) * 100) 
      : 0;

    return (
      <div className="space-y-3 mt-4">
        <div className="flex items-center justify-between text-sm">
          <span>Updating {type}...</span>
          <span>{progress.processed}/{progress.totalRows} rows</span>
        </div>
        
        <Progress value={progressPercentage} className="w-full" />
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Updated: {progress.successful}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span>Not Found: {progress.notFound || 0}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>Errors: {progress.errors.length}</span>
          </div>
        </div>

        {progress.notFoundNames && progress.notFoundNames.length > 0 && (
          <details className="text-sm">
            <summary className="cursor-pointer text-yellow-600 hover:text-yellow-800">
              View not found names ({progress.notFoundNames.length})
            </summary>
            <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
              {progress.notFoundNames.map((name, index) => (
                <div key={index} className="text-yellow-600 text-xs">
                  {name}
                </div>
              ))}
            </div>
          </details>
        )}

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
          <h1 className="text-3xl font-bold mb-4">CSV/Excel Data Update</h1>
          <p className="text-gray-600">
            Update existing teams and contacts data via CSV or Excel files. Records are matched by name and updated based on your selection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teams Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Teams Update</span>
                {teamsFileType === 'xlsx' && (
                  <Badge variant="secondary" className="ml-2">Excel → CSV</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Upload CSV or Excel File</label>
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
                  onChange={(e) => {
                    setTeamsCsv(e.target.value);
                    setTeamsFileType('csv');
                    initializeColumnSelection(e.target.value, setTeamsSelectedColumns);
                  }}
                  className="min-h-32"
                />
              </div>

              {teamsCsv && renderColumnSelector(teamsCsv, teamsSelectedColumns, setTeamsSelectedColumns)}

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Nullify if empty</span>
                <Switch
                  checked={teamsNullifyEmpty}
                  onCheckedChange={setTeamsNullifyEmpty}
                />
              </div>
              <p className="text-xs text-gray-500">
                When enabled, empty CSV fields will set database values to null. When disabled, empty fields will be ignored and preserve existing database values.
              </p>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Starting Row:</label>
                <Input
                  type="number"
                  min="1"
                  value={teamsStartingRow}
                  onChange={(e) => setTeamsStartingRow(parseInt(e.target.value) || 1)}
                  className="w-20"
                />
                <span className="text-xs text-gray-500">(1 = header, 2 = first data row)</span>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleTeamsUpdate}
                  disabled={isProcessingTeams || !teamsCsv.trim()}
                  className="flex-1"
                >
                  {isProcessingTeams ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Update Teams
                    </>
                  )}
                </Button>

                {isProcessingTeams && (
                  <Button
                    onClick={handleStopTeamsUpdate}
                    variant="destructive"
                    size="sm"
                  >
                    <StopCircle className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                )}
              </div>

              {renderProgress(teamsProgress, "teams")}
            </CardContent>
          </Card>

          {/* Contacts Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Contacts Update</span>
                {contactsFileType === 'xlsx' && (
                  <Badge variant="secondary" className="ml-2">Excel → CSV</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-3 block">Upload CSV or Excel File</label>
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
                  onChange={(e) => {
                    setContactsCsv(e.target.value);
                    setContactsFileType('csv');
                    initializeColumnSelection(e.target.value, setContactsSelectedColumns);
                  }}
                  className="min-h-32"
                />
              </div>

              {contactsCsv && renderColumnSelector(contactsCsv, contactsSelectedColumns, setContactsSelectedColumns)}

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Nullify if empty</span>
                <Switch
                  checked={contactsNullifyEmpty}
                  onCheckedChange={setContactsNullifyEmpty}
                />
              </div>
              <p className="text-xs text-gray-500">
                When enabled, empty CSV fields will set database values to null. When disabled, empty fields will be ignored and preserve existing database values.
              </p>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Starting Row:</label>
                <Input
                  type="number"
                  min="1"
                  value={contactsStartingRow}
                  onChange={(e) => setContactsStartingRow(parseInt(e.target.value) || 1)}
                  className="w-20"
                />
                <span className="text-xs text-gray-500">(1 = header, 2 = first data row)</span>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleContactsUpdate}
                  disabled={isProcessingContacts || !contactsCsv.trim()}
                  className="flex-1"
                >
                  {isProcessingContacts ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Update Contacts
                    </>
                  )}
                </Button>

                {isProcessingContacts && (
                  <Button
                    onClick={handleStopContactsUpdate}
                    variant="destructive"
                    size="sm"
                  >
                    <StopCircle className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                )}
              </div>

              {renderProgress(contactsProgress, "contacts")}
            </CardContent>
          </Card>
        </div>

        {/* Documentation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Update Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">📝 How Updates Work</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Records are matched by the <strong>Name</strong> field (case-insensitive)</li>
                <li>• Only selected columns will be updated in the database</li>
                <li>• The <strong>Name</strong> field cannot be updated (acts as primary key)</li>
                <li>• Use "Nullify if empty" to control how empty CSV fields are handled</li>
                <li>• Records not found in the database will be reported but skipped</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">✅ Best Practices</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Name matching is case-insensitive for better flexibility</li>
                <li>• Select only the columns you want to modify</li>
                <li>• Use Excel files for data with special characters or complex formatting</li>
                <li>• Review the "Not Found" count to identify missing records</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-2">⚠️ Important Notes</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Updates are permanent and cannot be undone</li>
                <li>• Test with a small dataset first</li>
                <li>• Backup your data before large updates</li>
                <li>• Empty fields behavior depends on "Nullify if empty" setting</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CsvUpdate;
