import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Users, 
  Settings, 
  Plug, 
  Webhook,
  Key,
  RefreshCw,
  ExternalLink 
} from 'lucide-react';

const Integrations = () => {
  const integrations = [
    {
      name: 'HubSpot',
      description: 'Sync contacts and organizations with HubSpot CRM',
      icon: Building2,
      status: 'Connected',
      lastSync: '2 hours ago',
      color: 'bg-orange-500'
    },
    {
      name: 'Salesforce',
      description: 'Integrate with Salesforce for comprehensive CRM management',
      icon: Users,
      status: 'Available',
      lastSync: null,
      color: 'bg-blue-500'
    },
    {
      name: 'Pipedrive',
      description: 'Connect your sales pipeline with Pipedrive',
      icon: Building2,
      status: 'Available',
      lastSync: null,
      color: 'bg-green-500'
    },
    {
      name: 'Slack',
      description: 'Get notifications and updates in your Slack channels',
      icon: Users,
      status: 'Connected',
      lastSync: '1 day ago',
      color: 'bg-purple-500'
    }
  ];

  const webhooks = [
    {
      name: 'Team Updates',
      url: 'https://api.example.com/webhooks/teams',
      events: ['team.created', 'team.updated'],
      status: 'Active'
    },
    {
      name: 'Contact Sync',
      url: 'https://api.example.com/webhooks/contacts',
      events: ['contact.created', 'contact.updated'],
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
        <p className="text-muted-foreground mt-2">
          Connect Sportbnk with your favorite tools and services to streamline your workflow.
        </p>
      </div>

      {/* CRM Integrations */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">CRM & Sales Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration, index) => (
              <Card key={index} className="shadow-soft border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                        <integration.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={integration.status === 'Connected' ? 'default' : 'secondary'}
                      className={integration.status === 'Connected' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {integration.lastSync ? (
                        <span className="flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" />
                          Last sync: {integration.lastSync}
                        </span>
                      ) : (
                        <span>Not connected</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {integration.status === 'Connected' ? (
                        <>
                          <Button variant="outline" size="sm">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Sync Now
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                          <Plug className="h-3 w-3 mr-1" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Webhooks Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Webhooks</h2>
            <Button className="shadow-soft">
              <Webhook className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </div>
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5 text-primary" />
                Webhook Endpoints
              </CardTitle>
              <CardDescription>
                Configure webhooks to receive real-time updates about your data changes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{webhook.name}</p>
                      <p className="text-sm text-muted-foreground font-mono">{webhook.url}</p>
                      <div className="flex gap-1">
                        {webhook.events.map((event, eventIndex) => (
                          <Badge key={eventIndex} variant="outline" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={webhook.status === 'Active' ? 'default' : 'secondary'}
                        className={webhook.status === 'Active' ? 'bg-accent text-accent-foreground' : ''}
                      >
                        {webhook.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Keys Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">API Access</h2>
            <Button variant="outline" className="shadow-soft">
              <Key className="h-4 w-4 mr-2" />
              Generate API Key
            </Button>
          </div>
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                API Keys & Documentation
              </CardTitle>
              <CardDescription>
                Access the Sportbnk API to build custom integrations and automations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Production API Key</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      sb_prod_••••••••••••••••••••••••••••••••
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">API Documentation</p>
                    <p className="text-sm text-muted-foreground">
                      Complete reference for all Sportbnk API endpoints
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Docs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Integrations;