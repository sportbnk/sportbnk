
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Meetings = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Meetings & Calls</h1>
      <div className="flex justify-end">
        <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Meetings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
            <p className="text-muted-foreground">No upcoming meetings scheduled</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Meetings;
