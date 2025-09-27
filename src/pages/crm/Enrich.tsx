import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  FileText, 
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Enrich = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for processing`,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const event = { target: { files: [file] } } as any;
      handleFileUpload(event);
    }
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center gap-4">
        <Upload className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Data Upload</h1>
          <p className="text-muted-foreground">Upload CSV files for data processing</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload CSV File
          </CardTitle>
          <CardDescription>
            Upload a CSV or Excel file containing your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-green-600">File Uploaded Successfully</h3>
                  <p className="text-muted-foreground">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setUploadedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Upload Different File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Drop your CSV file here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            )}
            
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span>CSV files (.csv)</span>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span>Excel files (.xlsx)</span>
              </div>
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span>Excel files (.xls)</span>
              </div>
            </div>
          </div>

          {uploadedFile && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">File Ready</h4>
              <p className="text-sm text-muted-foreground">
                Your file has been uploaded and is ready for processing. This is a prototype interface for CSV data handling.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Enrich;