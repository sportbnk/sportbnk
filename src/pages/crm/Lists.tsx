
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List } from "lucide-react";

const Lists = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Lists</h1>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <List className="h-5 w-5" />
            Manage Your Lists
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Create and manage your contact lists for targeted campaigns and outreach.
          </p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
            <p className="text-muted-foreground">No lists created yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lists;
