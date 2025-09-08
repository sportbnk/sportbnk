import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  CheckCircle, 
  Circle, 
  ExternalLink,
  Zap,
  Shield,
  Users,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

interface CRMIntegration {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  status: 'connected' | 'available' | 'coming-soon';
  features: string[];
  color: string;
}

const crmIntegrations: CRMIntegration[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'World\'s #1 CRM platform for sales, service, and marketing automation',
    logo: 'https://logos-world.net/wp-content/uploads/2020/08/Salesforce-Logo.png',
    category: 'CRM & Sales',
    status: 'available',
    features: ['Lead Management', 'Sales Pipeline', 'Email Integration', 'Analytics'],
    color: 'bg-blue-600'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Inbound marketing, sales, and service software that helps companies attract visitors',
    logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png',
    category: 'CRM & Marketing',
    status: 'connected',
    features: ['Contact Management', 'Email Marketing', 'Lead Scoring', 'Reporting'],
    color: 'bg-orange-500'
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    description: 'Sales CRM and pipeline management tool designed to help small sales teams',
    logo: 'https://cdn.worldvectorlogo.com/logos/pipedrive.svg',
    category: 'Sales Management',
    status: 'available',
    features: ['Pipeline Management', 'Deal Tracking', 'Activity Reminders', 'Mobile App'],
    color: 'bg-green-600'
  },
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Customer service platform that brings organizations and customers together',
    logo: 'https://d1eipm3vz40hy0.cloudfront.net/images/AMER/zendesk%20logo.png',
    category: 'Customer Support',
    status: 'available',
    features: ['Ticket Management', 'Customer Support', 'Knowledge Base', 'Live Chat'],
    color: 'bg-emerald-600'
  },
  {
    id: 'monday',
    name: 'Monday.com',
    description: 'Work operating system that powers teams to run projects and workflows',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Monday.com_logo.svg/2560px-Monday.com_logo.svg.png',
    category: 'Project Management',
    status: 'coming-soon',
    features: ['Project Tracking', 'Team Collaboration', 'Workflow Automation', 'Time Tracking'],
    color: 'bg-purple-600'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'All-in-one marketing platform for small businesses to grow their audience',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Mailchimp_Logo.svg/2560px-Mailchimp_Logo.svg.png',
    category: 'Email Marketing',
    status: 'available',
    features: ['Email Campaigns', 'Audience Management', 'Marketing Automation', 'Analytics'],
    color: 'bg-yellow-500'
  }
];

const Integrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(['hubspot']);

  const handleConnect = (integrationId: string) => {
    if (connectedIntegrations.includes(integrationId)) {
      setConnectedIntegrations(prev => prev.filter(id => id !== integrationId));
      toast.success('Integration disconnected');
    } else {
      setConnectedIntegrations(prev => [...prev, integrationId]);
      toast.success('Integration connected successfully');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>;
      case 'available':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Available</Badge>;
      case 'coming-soon':
        return <Badge className="bg-gray-100 text-gray-600 border-gray-200">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">CRM & Sales Tools</h1>
        <p className="text-muted-foreground mt-2">
          Connect your favorite tools to streamline your sales process and boost productivity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold text-foreground">{connectedIntegrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-foreground">{crmIntegrations.filter(i => i.status === 'available').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-foreground">{new Set(crmIntegrations.map(i => i.category)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security</p>
                <p className="text-lg font-semibold text-foreground">Enterprise</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crmIntegrations.map((integration) => {
          const isConnected = connectedIntegrations.includes(integration.id);
          const isComingSoon = integration.status === 'coming-soon';
          
          return (
            <Card key={integration.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg ${integration.color} flex items-center justify-center p-2`}>
                      <img 
                        src={integration.logo} 
                        alt={`${integration.name} logo`}
                        className="w-full h-full object-contain filter brightness-0 invert"
                        onError={(e) => {
                          // Fallback to first letter if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-white font-bold text-lg">${integration.name[0]}</span>`;
                        }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{integration.category}</p>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
                <CardDescription className="text-sm leading-relaxed mt-2">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Features */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Connect Button */}
                  <div className="flex items-center justify-between pt-2">
                    {isComingSoon ? (
                      <Button disabled className="w-full">
                        Coming Soon
                      </Button>
                    ) : (
                      <div className="flex items-center space-x-2 w-full">
                        <Switch
                          checked={isConnected}
                          onCheckedChange={() => handleConnect(integration.id)}
                          disabled={isComingSoon}
                        />
                        <span className="text-sm font-medium">
                          {isConnected ? 'Connected' : 'Connect'}
                        </span>
                        {isConnected && (
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Settings className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Need a custom integration?</h3>
              <p className="text-muted-foreground mt-1">
                We can build custom integrations for your specific tools and workflows.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Contact Sales
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;