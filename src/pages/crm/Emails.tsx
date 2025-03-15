
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Emails = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Email Tracking</h1>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Connect Your Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Integrate your email account to track messages, schedule follow-ups, and monitor engagement.
          </p>
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect Email Account
          </Button>
          <div className="h-48 flex items-center justify-center border rounded-md mt-6 bg-muted/20">
            <p className="text-muted-foreground">No email accounts connected</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Emails;
