import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, List, TrendingUp, Clock, Star, FileText, Zap, Calendar, DollarSign, AlertTriangle, Target, ExternalLink, Eye } from 'lucide-react';

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

  const recentTenders = [
    {
      title: "Stadium Lighting System Upgrade",
      organization: "Arsenal FC",
      budget: "£2.5M - £3.2M",
      deadline: "Oct 15, 2024",
      status: "Open"
    },
    {
      title: "Digital Marketing Platform",
      organization: "England Cricket Board", 
      budget: "£800K - £1.2M",
      deadline: "Sep 30, 2024",
      status: "Closing Soon"
    },
    {
      title: "Player Performance Analytics",
      organization: "Liverpool FC",
      budget: "£500K - £750K", 
      deadline: "Sep 25, 2024",
      status: "Closing Soon"
    }
  ];

  const recentSignals = [
    {
      title: "Stadium Expansion Planning",
      organization: "Newcastle United",
      type: "Opportunity",
      priority: "High",
      confidence: 85,
      value: "£200M+"
    },
    {
      title: "Sponsorship Deal Renewal Risk",
      organization: "Manchester City",
      type: "Risk", 
      priority: "Medium",
      confidence: 72,
      value: "£50M/year"
    },
    {
      title: "Youth Academy Investment",
      organization: "Chelsea FC",
      type: "Trend",
      priority: "Medium", 
      confidence: 90,
      value: "£25M"
    }
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

      {/* Tenders & Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tenders/RFPs */}
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Tenders & RFPs
            </CardTitle>
            <CardDescription>
              Active procurement opportunities in sports industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTenders.map((tender, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{tender.title}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{tender.organization}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{tender.budget}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{tender.deadline}</span>
                      </div>
                      <Badge 
                        className={`text-xs ${
                          tender.status === "Open" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }`}
                      >
                        {tender.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                View All Tenders
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Market Signals */}
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Market Signals
            </CardTitle>
            <CardDescription>
              AI-powered insights and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSignals.map((signal, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{signal.title}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{signal.organization}</span>
                      </div>
                      {signal.value && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{signal.value}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        className={`text-xs ${
                          signal.type === "Opportunity" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : signal.type === "Risk"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {signal.type === "Opportunity" && <TrendingUp className="h-3 w-3 mr-1" />}
                        {signal.type === "Risk" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {signal.type === "Trend" && <Target className="h-3 w-3 mr-1" />}
                        {signal.type}
                      </Badge>
                      <Badge 
                        className={`text-xs ${
                          signal.priority === "High" 
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {signal.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{signal.confidence}% confidence</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-3 w-3" />
                    Details
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Button variant="outline" className="w-full gap-2">
                <Zap className="h-4 w-4" />
                View All Signals
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;