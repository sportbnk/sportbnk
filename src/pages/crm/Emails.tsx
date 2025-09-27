import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Plus, Settings } from 'lucide-react';

const Emails = () => {
  const handleConnectMailbox = () => {
    // Placeholder for mailbox connection functionality
    console.log('Connect mailbox clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Emails</h1>
          <p className="text-gray-600 mt-1">Connect your mailbox to manage emails</p>
        </div>

        {/* Connect Mailbox Card */}
        <Card className="text-center">
          <CardContent className="p-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Mail className="h-10 w-10 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Connect Your Mailbox
              </h2>
              
              <p className="text-gray-600 mb-8 max-w-md">
                Connect your email account to start managing your email communications directly from your CRM.
              </p>
              
              <Button 
                onClick={handleConnectMailbox}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                Connect Mailbox
              </Button>
              
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span>Easy setup</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>Gmail, Outlook & more</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emails;