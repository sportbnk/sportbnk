import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, List, TrendingUp, Clock, Star } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Total Organisations",
      value: "140",
      description: "Active sports clubs",
      icon: Building2,
      color: "text-primary"
    },
    {
      title: "Employees",
      value: "700",
      description: "Sports professionals",
      icon: Users,
      color: "text-accent"
    },
    {
      title: "Lists",
      value: "23",
      description: "Saved lists",
      icon: List,
      color: "text-chart-1"
    },
    {
      title: "Activity",
      value: "156",
      description: "This week",
      icon: TrendingUp,
      color: "text-chart-2"
    }
  ];

  const recentActivity = [
    { action: "Brighton's Head of Commercial moved to Crystal Palace", time: "2 hours ago", icon: Users },
    { action: "Manchester United hiring new Director of Football", time: "4 hours ago", icon: Building2 },
    { action: "Leicester City announces CFO departure", time: "6 hours ago", icon: TrendingUp },
    { action: "Arsenal expanding commercial team with 3 new hires", time: "8 hours ago", icon: Star },
    { action: "Chelsea's COO transitions to advisory role", time: "1 day ago", icon: Users },
    { action: "Tottenham actively recruiting Head of Analytics", time: "1 day ago", icon: Building2 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your sports intelligence platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-soft border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Insights in Sports World
            </CardTitle>
            <CardDescription>
              Latest industry movements and hiring trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <activity.icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to get you started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <Building2 className="h-6 w-6 text-primary mb-2" />
                <p className="font-medium text-sm">Add or Edit Organisation</p>
                <p className="text-xs text-muted-foreground">Create new club profile and earn more credits</p>
              </div>
              <div className="p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <Users className="h-6 w-6 text-accent mb-2" />
                <p className="font-medium text-sm">Add or Edit Contact</p>
                <p className="text-xs text-muted-foreground">Import new person and earn more credits</p>
              </div>
              <div className="p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <List className="h-6 w-6 text-chart-1 mb-2" />
                <p className="font-medium text-sm">Create List</p>
                <p className="text-xs text-muted-foreground">Organize your data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;