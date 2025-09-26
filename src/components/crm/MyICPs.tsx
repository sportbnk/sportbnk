import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Target, Plus, Edit, Trash2 } from "lucide-react";

const MyICPs = () => {
  const icps = [
    {
      id: "1",
      name: "Premier League Clubs",
      description: "Top-tier English football clubs with high commercial revenue",
      organizations: 20,
      contacts: 145,
      type: "Organizations",
      criteria: ["Revenue > £100M", "Premier League", "England"],
      color: "bg-primary/10 text-primary"
    },
    {
      id: "2", 
      name: "Commercial Directors",
      description: "Senior commercial decision makers in sports organizations",
      organizations: 52,
      contacts: 289,
      type: "Contacts",
      criteria: ["Director level", "Commercial department", "5+ years experience"],
      color: "bg-accent/10 text-accent"
    },
    {
      id: "3",
      name: "Tech Innovators", 
      description: "Sports organizations investing heavily in technology",
      organizations: 35,
      contacts: 167,
      type: "Organizations",
      criteria: ["Tech budget > £5M", "Digital transformation", "Innovation focus"],
      color: "bg-chart-1/10 text-chart-1"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My ICPs</h1>
          <p className="text-muted-foreground">Your Ideal Customer Profiles and saved segments</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create ICP
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total ICPs</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{icps.length}</div>
            <p className="text-xs text-muted-foreground">Active profiles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{icps.reduce((sum, icp) => sum + icp.organizations, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all ICPs</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{icps.reduce((sum, icp) => sum + icp.contacts, 0)}</div>
            <p className="text-xs text-muted-foreground">Total contacts</p>
          </CardContent>
        </Card>
      </div>

      {/* ICPs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {icps.map((icp) => (
          <Card key={icp.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${icp.color}`}>
                    {icp.type === "Organizations" ? (
                      <Building2 className="h-5 w-5" />
                    ) : (
                      <Users className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{icp.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">{icp.type}</Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{icp.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Organizations:</span>
                  <span className="font-medium">{icp.organizations}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Contacts:</span>
                  <span className="font-medium">{icp.contacts}</span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm font-medium">Criteria:</span>
                  <div className="flex flex-wrap gap-1">
                    {icp.criteria.map((criterion, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {criterion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Generate List
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyICPs;