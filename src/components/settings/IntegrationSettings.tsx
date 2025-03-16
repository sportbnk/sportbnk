
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  logo: string;
  category: "crm" | "analytics" | "communication" | "other";
  status?: "new" | "updated";
}

const IntegrationSettings = () => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = React.useState<Integration[]>([
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sync meetings and events with Google Calendar",
      connected: true,
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
      category: "communication"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Get notifications and updates in your Slack workspace",
      connected: false,
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      category: "communication",
      status: "new"
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Sync contacts with your Mailchimp lists",
      connected: false,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Mailchimp_official_logo.svg/1200px-Mailchimp_official_logo.svg.png",
      category: "crm"
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Connect with thousands of apps through Zapier",
      connected: true,
      logo: "https://cdn.zapier.com/zapier/images/logos/zapier-logo.svg",
      category: "other"
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Track website traffic and user behavior",
      connected: false,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Google_Analytics_logo.svg/1200px-Google_Analytics_logo.svg.png",
      category: "analytics",
      status: "updated"
    },
  ]);
  
  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        const newStatus = !integration.connected;
        
        toast({
          title: newStatus ? `Connected to ${integration.name}` : `Disconnected from ${integration.name}`,
          description: newStatus 
            ? `Successfully connected to ${integration.name}`
            : `Successfully disconnected from ${integration.name}`,
        });
        
        return { ...integration, connected: newStatus };
      }
      return integration;
    }));
  };
  
  const categories = [
    { id: "all", name: "All Integrations" },
    { id: "crm", name: "CRM" },
    { id: "analytics", name: "Analytics" },
    { id: "communication", name: "Communication" },
    { id: "other", name: "Other" },
  ];
  
  const [activeCategory, setActiveCategory] = React.useState("all");
  
  const filteredIntegrations = activeCategory === "all" 
    ? integrations 
    : integrations.filter(i => i.category === activeCategory);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Integrations</h2>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {filteredIntegrations.map(integration => (
          <Card key={integration.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded overflow-hidden flex items-center justify-center bg-gray-100">
                  <img 
                    src={integration.logo} 
                    alt={integration.name} 
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <CardTitle className="text-md flex items-center">
                    {integration.name}
                    {integration.status && (
                      <Badge className="ml-2" variant={integration.status === "new" ? "default" : "outline"}>
                        {integration.status}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {integration.description}
                  </CardDescription>
                </div>
              </div>
              <Switch 
                checked={integration.connected}
                onCheckedChange={() => toggleIntegration(integration.id)}
              />
            </CardHeader>
            <CardFooter className="pt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Configuration opened",
                    description: `Opening ${integration.name} configuration`,
                  });
                }}
              >
                {integration.connected ? "Configure" : "Connect"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button variant="outline">
          Browse Integration Marketplace
        </Button>
      </div>
    </div>
  );
};

export default IntegrationSettings;
