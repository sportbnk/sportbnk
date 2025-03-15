
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Calls = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Call Tracking</h1>
      <div className="flex justify-end">
        <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90">
          <Plus className="h-4 w-4 mr-2" />
          Log Call
        </Button>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <PhoneCall className="h-5 w-5" />
            Recent Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
            <p className="text-muted-foreground">No calls logged yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calls;
