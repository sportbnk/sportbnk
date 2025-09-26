import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, TrendingUp, TrendingDown, AlertTriangle, Target, Building2, Calendar, Zap, Users, DollarSign, Plus } from "lucide-react";
import { format } from "date-fns";
import { useLists } from "@/contexts/ListsContext";
import { useNavigate } from "react-router-dom";

interface Signal {
  id: string;
  title: string;
  organization: string;
  sport: string;
  type: "Opportunity" | "Risk" | "Trend" | "Alert" | "Tender";
  priority: "High" | "Medium" | "Low";
  description: string;
  date: Date;
  value?: string;
  category: string;
  teamId?: string; // For linking to team details
}

const mockSignals: Signal[] = [
  {
    id: "1",
    title: "Stadium Lighting System Upgrade",
    organization: "Arsenal",
    sport: "Football",
    type: "Tender",
    priority: "High",
    description: "Complete LED lighting system upgrade for Emirates Stadium",
    date: new Date("2024-10-15"),
    value: "£2.5M - £3.2M",
    category: "Infrastructure",
    teamId: "arsenal"
  },
  {
    id: "2",
    title: "Digital Marketing Platform",
    organization: "Essex CCC",
    sport: "Cricket",
    type: "Tender",
    priority: "High",
    description: "Comprehensive digital marketing and fan engagement platform",
    date: new Date("2024-09-30"),
    value: "£800K - £1.2M",
    category: "Technology",
    teamId: "essex-ccc"
  },
  {
    id: "3",
    title: "Pitch Maintenance Equipment",
    organization: "Manchester United",
    sport: "Football",
    type: "Tender",
    priority: "Medium",
    description: "Advanced turf management and pitch maintenance systems",
    date: new Date("2024-11-20"),
    value: "£150K - £250K",
    category: "Equipment",
    teamId: "manchester-united"
  },
  {
    id: "4",
    title: "Player Performance Analytics",
    organization: "Liverpool",
    sport: "Football",
    type: "Tender",
    priority: "High",
    description: "AI-powered player performance tracking and analytics suite",
    date: new Date("2024-09-25"),
    value: "£500K - £750K",
    category: "Technology",
    teamId: "liverpool"
  },
  {
    id: "5",
    title: "Hospitality Suite Renovation",
    organization: "Tottenham Hotspur",
    sport: "Football",
    type: "Tender",
    priority: "Medium",
    description: "Premium hospitality areas and corporate facilities renovation",
    date: new Date("2024-12-01"),
    value: "£1.8M - £2.5M",
    category: "Construction",
    teamId: "tottenham-hotspur"
  },
  {
    id: "6",
    title: "Security System Overhaul",
    organization: "Chelsea",
    sport: "Football",
    type: "Tender",
    priority: "High",
    description: "Complete security infrastructure upgrade for Stamford Bridge",
    date: new Date("2024-10-08"),
    value: "£3.2M - £4.1M",
    category: "Security",
    teamId: "chelsea"
  },
  {
    id: "7",
    title: "Stadium Expansion Planning",
    organization: "Newcastle United",
    sport: "Football",
    type: "Opportunity",
    priority: "High",
    description: "Sources indicate active planning for 15,000 seat expansion project",
    date: new Date("2024-09-20"),
    value: "£200M+",
    category: "Infrastructure",
    teamId: "newcastle-united"
  },
  {
    id: "8",
    title: "Sponsorship Deal Renewal Risk",
    organization: "Manchester City",
    sport: "Football",
    type: "Risk",
    priority: "Medium",
    description: "Main sponsor contract expires next season, no renewal discussions reported",
    date: new Date("2024-09-19"),
    value: "£50M/year",
    category: "Commercial",
    teamId: "manchester-city"
  },
  {
    id: "9",
    title: "Youth Academy Investment",
    organization: "Chelsea",
    sport: "Football",
    type: "Trend",
    priority: "Medium",
    description: "Increased investment in youth development facilities and coaching staff",
    date: new Date("2024-09-18"),
    value: "£25M",
    category: "Development",
    teamId: "chelsea"
  },
  {
    id: "10",
    title: "Management Change Alert",
    organization: "Tottenham Hotspur",
    sport: "Football",
    type: "Alert",
    priority: "High",
    description: "Board meeting scheduled regarding current management structure",
    date: new Date("2024-09-21"),
    category: "Management",
    teamId: "tottenham-hotspur"
  }
];

const Signals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [signals] = useState<Signal[]>(mockSignals);
  const [selectedSignalForList, setSelectedSignalForList] = useState<Signal | null>(null);
  const [isAddToListDialogOpen, setIsAddToListDialogOpen] = useState(false);

  const { lists, addItemToList } = useLists();
  const navigate = useNavigate();

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

  const handleAddToList = async (listId: string) => {
    if (!selectedSignalForList) return;
    
    // For signals, we might want to add the organization as a team to the list
    // Since signals don't have direct contact/team references, we'll need to handle this differently
    // For now, let's just show a success message
    setIsAddToListDialogOpen(false);
    setSelectedSignalForList(null);
    // This would require mapping organization to actual team IDs
    // await addItemToList(listId, undefined, teamId);
  };

  const openAddToListDialog = (signal: Signal) => {
    setSelectedSignalForList(signal);
    setIsAddToListDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Signals Feed</h1>
          <p className="text-muted-foreground">AI-powered insights and opportunities in sports industry</p>
        </div>
        <Button className="gap-2">
          <Zap className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* My ICPs Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">My ICPs</h2>
          <p className="text-muted-foreground">Your Ideal Customer Profiles and saved segments</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Premier League Clubs</h3>
                <p className="text-sm text-muted-foreground">20 organisations</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-medium">Commercial Directors</h3>
                <p className="text-sm text-muted-foreground">145 contacts</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-1/10 rounded-lg">
                <Target className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <h3 className="font-medium">Tech Innovators</h3>
                <p className="text-sm text-muted-foreground">52 organisations</p>
              </div>
            </div>
          </Card>
        </div>
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
                 <TableHead>Sport</TableHead>
                 <TableHead>Type</TableHead>
                 <TableHead>Priority</TableHead>
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
                       <button 
                         onClick={() => navigate(`/crm/teams/${signal.teamId || signal.organization.toLowerCase().replace(/\s+/g, '-')}`)}
                         className="font-medium text-primary hover:underline text-left"
                       >
                         {signal.organization}
                       </button>
                     </div>
                   </TableCell>
                   <TableCell>
                     <Badge variant="outline">{signal.sport}</Badge>
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
                     <Button 
                       variant="ghost" 
                       size="sm" 
                       onClick={() => openAddToListDialog(signal)}
                       className="gap-1"
                     >
                       <Plus className="h-4 w-4" />
                       Add to List
                     </Button>
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add to List Dialog */}
      <Dialog open={isAddToListDialogOpen} onOpenChange={setIsAddToListDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add {selectedSignalForList?.organization} to List
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {lists.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You don't have any lists yet.</p>
                <Button 
                  onClick={() => {
                    setIsAddToListDialogOpen(false);
                    navigate('/crm/lists');
                  }}
                  variant="outline"
                >
                  Create Your First List
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Select a list to add this organization to:</p>
                {lists.map((list) => (
                  <div
                    key={list.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleAddToList(list.id)}
                  >
                    <div>
                      <h4 className="font-medium">{list.name}</h4>
                      {list.description && (
                        <p className="text-sm text-muted-foreground">{list.description}</p>
                      )}
                    </div>
                    <Badge variant="secondary">
                      {list.list_items?.length || 0} items
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsAddToListDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Signals;