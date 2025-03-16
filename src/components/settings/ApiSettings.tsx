
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyIcon, EyeIcon, EyeOffIcon, RefreshCwIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const ApiSettings = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [apiKey, setApiKey] = React.useState("sk_live_51KjDWEJFnfHDgTzy6C8WhNhAqQahl4vX");
  
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API key copied",
      description: "API key copied to clipboard",
    });
  };
  
  const handleRegenerateApiKey = () => {
    // In a real application, this would call an API to generate a new key
    const newKey = "sk_live_" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "API key regenerated",
      description: "Your API key has been regenerated",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">API Settings</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Manage your API keys for programmatic access to the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium leading-none mb-2 block">
                Your API Key
              </label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input 
                    value={showApiKey ? apiKey : "•".repeat(apiKey.length)} 
                    readOnly 
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showApiKey ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={handleCopyApiKey}
                  title="Copy API key"
                >
                  <CopyIcon size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleRegenerateApiKey}
                  title="Regenerate API key"
                >
                  <RefreshCwIcon size={16} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                This key grants full access to your account. Keep it secure and never share it publicly.
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">API Usage</h3>
              <div className="text-sm bg-muted rounded-md p-3">
                <div className="flex justify-between mb-2">
                  <span>This month</span>
                  <span className="font-medium">1,204 / 10,000 requests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Resources to help you integrate with our API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <div>
                <h3 className="font-medium">REST API Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guide to our API endpoints
                </p>
              </div>
              <Badge variant="outline" className="ml-auto">v2.0</Badge>
            </div>
            <div className="flex items-start gap-4">
              <div>
                <h3 className="font-medium">Code Examples</h3>
                <p className="text-sm text-muted-foreground">
                  Sample code in various languages
                </p>
              </div>
              <Badge variant="outline" className="ml-auto">Updated</Badge>
            </div>
            <div className="flex items-start gap-4">
              <div>
                <h3 className="font-medium">Webhooks Guide</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to set up and use webhooks
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Visit API Documentation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApiSettings;
