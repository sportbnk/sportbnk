import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, TrendingUp, TrendingDown, AlertTriangle, Target, Building2, Calendar, Eye, Zap, Users, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface Signal {
  id: string;
  title: string;
  organization: string;
  sport: string;
  type: "Opportunity" | "Risk" | "Trend" | "Alert";
  priority: "High" | "Medium" | "Low";
  confidence: number;
  description: string;
  date: Date;
  value?: string;
  category: string;
}

const mockSignals: Signal[] = [
  {
    id: "1",
    title: "Stadium Expansion Planning",
    organization: "Newcastle United",
    sport: "Football",
    type: "Opportunity",
    priority: "High",
    confidence: 85,
    description: "Sources indicate active planning for 15,000 seat expansion project",
    date: new Date("2024-09-20"),
    value: "£200M+",
    category: "Infrastructure"
  },
  {
    id: "2",
    title: "Sponsorship Deal Renewal Risk",
    organization: "Manchester City",
    sport: "Football",
    type: "Risk",
    priority: "Medium",
    confidence: 72,
    description: "Main sponsor contract expires next season, no renewal discussions reported",
    date: new Date("2024-09-19"),
    value: "£50M/year",
    category: "Commercial"
  },
  {
    id: "3",
    title: "Youth Academy Investment",
    organization: "Chelsea FC",
    sport: "Football",
    type: "Trend",
    priority: "Medium",
    confidence: 90,
    description: "Increased investment in youth development facilities and coaching staff",
    date: new Date("2024-09-18"),
    value: "£25M",
    category: "Development"
  },
  {
    id: "4",
    title: "Management Change Alert",
    organization: "Tottenham Hotspur",
    sport: "Football",
    type: "Alert",
    priority: "High",
    confidence: 95,
    description: "Board meeting scheduled regarding current management structure",
    date: new Date("2024-09-21"),
    category: "Management"
  },
  {
    id: "5",
    title: "Technology Partnership Opportunity",
    organization: "England Cricket Board",
    sport: "Cricket",
    type: "Opportunity",
    priority: "Medium",
    confidence: 78,
    description: "Seeking digital transformation partner for fan engagement platforms",
    date: new Date("2024-09-17"),
    value: "£5M+",
    category: "Technology"
  },
  {
    id: "6",
    title: "Venue Naming Rights Available",
    organization: "Leicester City",
    sport: "Football",
    type: "Opportunity",
    priority: "High",
    confidence: 88,
    description: "Stadium naming rights contract up for renewal - premium opportunity",
    date: new Date("2024-09-16"),
    value: "£10M/year",
    category: "Commercial"
  },
  {
    id: "7",
    title: "Player Transfer Budget Increase",
    organization: "Aston Villa",
    sport: "Football",
    type: "Trend",
    priority: "Medium",
    confidence: 82,
    description: "Significant increase in transfer budget allocation for January window",
    date: new Date("2024-09-15"),
    value: "£80M+",
    category: "Transfers"
  },
  {
    id: "8",
    title: "Sustainability Initiative Launch",
    organization: "Arsenal FC",
    sport: "Football",
    type: "Trend",
    priority: "Low",
    confidence: 75,
    description: "New environmental sustainability program requiring technology partners",
    date: new Date("2024-09-14"),
    category: "Sustainability"
  }
];

const Signals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [signals] = useState<Signal[]>(mockSignals);

  const filteredSignals = signals.filter(signal => {
    const matchesSearch = signal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || !selectedType || signal.type === selectedType;
    const matchesPriority = selectedPriority === "all" || !selectedPriority || signal.priority === selectedPriority;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Opportunity": return <TrendingUp className="h-4 w-4" />;
      case "Risk": return <TrendingDown className="h-4 w-4" />;
      case "Alert": return <AlertTriangle className="h-4 w-4" />;
      case "Trend": return <Target className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Opportunity": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Risk": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Alert": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Trend": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Market Signals</h2>
          <p className="text-muted-foreground">AI-powered insights and opportunities in sports industry</p>
        </div>
        <Button className="gap-2">
          <Zap className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Opportunities</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Trends</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">£2.1B</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search signals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Opportunity">Opportunity</SelectItem>
                <SelectItem value="Risk">Risk</SelectItem>
                <SelectItem value="Alert">Alert</SelectItem>
                <SelectItem value="Trend">Trend</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Signals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Active Signals ({filteredSignals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Signal</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSignals.map((signal) => (
                <TableRow key={signal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{signal.title}</div>
                      <div className="text-sm text-muted-foreground">{signal.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{signal.organization}</div>
                        <div className="text-sm text-muted-foreground">{signal.sport}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(signal.type)}>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(signal.type)}
                        {signal.type}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(signal.priority)}>
                      {signal.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${signal.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm">{signal.confidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {signal.value ? (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        {signal.value}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(signal.date, "MMM dd")}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signals;