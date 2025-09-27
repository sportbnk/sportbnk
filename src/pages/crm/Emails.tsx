import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Plus, 
  Send, 
  Inbox, 
  Archive, 
  Trash2,
  ExternalLink,
  Settings,
  Clock,
  User,
  Link
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Email {
  id: string;
  subject: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'received' | 'draft';
  isRead: boolean;
  attachments?: string[];
}

interface EmailProvider {
  name: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
}

const Emails = () => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      subject: 'Partnership Proposal - Arsenal FC',
      from: 'partnerships@arsenal.com',
      to: 'deals@sportbnk.com',
      content: 'We are interested in discussing a potential partnership opportunity...',
      timestamp: '2024-01-12T10:30:00',
      status: 'received',
      isRead: false
    },
    {
      id: '2',
      subject: 'Follow-up: Manchester United Meeting',
      from: 'deals@sportbnk.com',
      to: 'commercial@manutd.com',
      content: 'Thank you for the productive meeting yesterday. As discussed, I am attaching...',
      timestamp: '2024-01-11T15:45:00',
      status: 'sent',
      isRead: true
    },
    {
      id: '3',
      subject: 'Cricket Partnership Draft',
      from: 'deals@sportbnk.com',
      to: '',
      content: 'Draft proposal for county cricket partnerships...',
      timestamp: '2024-01-11T09:15:00',
      status: 'draft',
      isRead: true
    }
  ]);

  const [emailProviders, setEmailProviders] = useState<EmailProvider[]>([
    { name: 'Gmail', icon: '📧', connected: false },
    { name: 'Outlook', icon: '📮', connected: false },
    { name: 'Apple Mail', icon: '✉️', connected: false },
  ]);

  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: '',
    content: ''
  });

  const handleSendEmail = () => {
    if (!newEmail.to.trim() || !newEmail.subject.trim()) {
      toast({
        title: "Error",
        description: "Please fill in recipient and subject",
        variant: "destructive",
      });
      return;
    }

    const email: Email = {
      id: Date.now().toString(),
      ...newEmail,
      from: 'deals@sportbnk.com',
      timestamp: new Date().toISOString(),
      status: 'sent',
      isRead: true
    };

    setEmails(prev => [email, ...prev]);
    setNewEmail({ to: '', subject: '', content: '' });
    setIsComposeDialogOpen(false);

    toast({
      title: "Email sent",
      description: "Your email has been sent successfully",
    });
  };

  const connectEmailProvider = (providerName: string) => {
    setEmailProviders(prev => 
      prev.map(provider => 
        provider.name === providerName 
          ? { ...provider, connected: true, lastSync: new Date().toISOString() }
          : provider
      )
    );

    toast({
      title: "Email connected",
      description: `Successfully connected to ${providerName}`,
    });
  };

  const markAsRead = (emailId: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === emailId ? { ...email, isRead: true } : email
      )
    );
  };

  const deleteEmail = (emailId: string) => {
    setEmails(prev => prev.filter(email => email.id !== emailId));
    setSelectedEmail(null);
    toast({
      title: "Email deleted",
      description: "Email has been moved to trash",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const receivedEmails = emails.filter(email => email.status === 'received');
  const sentEmails = emails.filter(email => email.status === 'sent');
  const draftEmails = emails.filter(email => email.status === 'draft');
  const unreadCount = emails.filter(email => !email.isRead && email.status === 'received').length;

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Mail className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Emails</h1>
            <p className="text-muted-foreground">Manage your email communications</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Compose
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Compose Email</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">To</label>
                  <Input
                    value={newEmail.to}
                    onChange={(e) => setNewEmail(prev => ({ ...prev, to: e.target.value }))}
                    placeholder="recipient@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    value={newEmail.subject}
                    onChange={(e) => setNewEmail(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter email subject"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={newEmail.content}
                    onChange={(e) => setNewEmail(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter your message"
                    rows={10}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsComposeDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendEmail}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Email Provider Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Email Integrations
          </CardTitle>
          <CardDescription>
            Connect your email providers to sync and manage emails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emailProviders.map((provider) => (
              <div key={provider.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <div>
                      <h4 className="font-medium">{provider.name}</h4>
                      {provider.connected && provider.lastSync && (
                        <p className="text-xs text-muted-foreground">
                          Last sync: {formatTimestamp(provider.lastSync)}
                        </p>
                      )}
                    </div>
                  </div>
                  {provider.connected ? (
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  ) : (
                    <Badge variant="outline">Not connected</Badge>
                  )}
                </div>
                {!provider.connected && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => connectEmailProvider(provider.name)}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Connect {provider.name}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{emails.length}</p>
                <p className="text-sm text-muted-foreground">Total Emails</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Inbox className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{receivedEmails.length}</p>
                <p className="text-sm text-muted-foreground">Received</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sentEmails.length}</p>
                <p className="text-sm text-muted-foreground">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="inbox" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="inbox">
                    Inbox ({receivedEmails.length})
                  </TabsTrigger>
                  <TabsTrigger value="sent">
                    Sent ({sentEmails.length})
                  </TabsTrigger>
                  <TabsTrigger value="drafts">
                    Drafts ({draftEmails.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="inbox" className="space-y-2 mt-4">
                  {receivedEmails.map((email) => (
                    <div
                      key={email.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                        selectedEmail?.id === email.id ? 'bg-accent' : ''
                      } ${!email.isRead ? 'border-l-4 border-l-primary' : ''}`}
                      onClick={() => {
                        setSelectedEmail(email);
                        markAsRead(email.id);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm truncate ${!email.isRead ? 'font-semibold' : ''}`}>
                            {email.from}
                          </p>
                          <p className={`text-sm truncate ${!email.isRead ? 'font-medium' : 'text-muted-foreground'}`}>
                            {email.subject}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTimestamp(email.timestamp)}
                          </p>
                        </div>
                        {!email.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                  {receivedEmails.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No emails in inbox</p>
                  )}
                </TabsContent>

                <TabsContent value="sent" className="space-y-2 mt-4">
                  {sentEmails.map((email) => (
                    <div
                      key={email.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                        selectedEmail?.id === email.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">To: {email.to}</p>
                          <p className="text-sm text-muted-foreground truncate">{email.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTimestamp(email.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {sentEmails.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No sent emails</p>
                  )}
                </TabsContent>

                <TabsContent value="drafts" className="space-y-2 mt-4">
                  {draftEmails.map((email) => (
                    <div
                      key={email.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                        selectedEmail?.id === email.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate text-muted-foreground">Draft</p>
                          <p className="text-sm truncate">{email.subject || 'No subject'}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTimestamp(email.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {draftEmails.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No draft emails</p>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Email Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedEmail ? selectedEmail.subject : 'Select an email'}
              </CardTitle>
              {selectedEmail && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {selectedEmail.status === 'received' ? (
                        <>From: {selectedEmail.from}</>
                      ) : (
                        <>To: {selectedEmail.to}</>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {formatTimestamp(selectedEmail.timestamp)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Archive className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => selectedEmail && deleteEmail(selectedEmail.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {selectedEmail ? (
                <div className="space-y-4">
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{selectedEmail.content}</p>
                  </div>
                  
                  {selectedEmail.status === 'received' && (
                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm">
                        <Send className="h-3 w-3 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        Forward
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an email to view its content</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Emails;