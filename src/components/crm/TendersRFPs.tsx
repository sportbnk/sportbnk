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
import { Search, Calendar, DollarSign, Clock, Building2, FileText, ExternalLink, Plus } from "lucide-react";
import { format } from "date-fns";
import { useLists } from "@/contexts/ListsContext";
import { useNavigate } from "react-router-dom";

interface Tender {
  id: string;
  title: string;
  organization: string;
  sport: string;
  category: string;
  budget: string;
  deadline: Date;
  status: "Open" | "Closing Soon" | "Closed";
  description: string;
  requirements: string[];
  teamId?: string; // For linking to team details
}

const mockTenders: Tender[] = [
  {
    id: "1",
    title: "Stadium Lighting System Upgrade",
    organization: "Arsenal",
    sport: "Football",
    category: "Infrastructure",
    budget: "£2.5M - £3.2M",
    deadline: new Date("2024-10-15"),
    status: "Open",
    description: "Complete LED lighting system upgrade for Emirates Stadium",
    requirements: ["LED Technology", "Energy Efficiency", "UEFA Compliance"],
    teamId: "arsenal"
  },
  {
    id: "2",
    title: "Digital Marketing Platform",
    organization: "Essex CCC",
    sport: "Cricket",
    category: "Technology",
    budget: "£800K - £1.2M",
    deadline: new Date("2024-09-30"),
    status: "Closing Soon",
    description: "Comprehensive digital marketing and fan engagement platform",
    requirements: ["CRM Integration", "Mobile App", "Analytics Dashboard"],
    teamId: "essex-ccc"
  },
  {
    id: "3",
    title: "Pitch Maintenance Equipment",
    organization: "Manchester United",
    sport: "Football",
    category: "Equipment",
    budget: "£150K - £250K",
    deadline: new Date("2024-11-20"),
    status: "Open",
    description: "Advanced turf management and pitch maintenance systems",
    requirements: ["Automated Systems", "Weather Monitoring", "Soil Analysis"],
    teamId: "manchester-united"
  },
  {
    id: "4",
    title: "Player Performance Analytics",
    organization: "Liverpool",
    sport: "Football",
    category: "Technology",
    budget: "£500K - £750K",
    deadline: new Date("2024-09-25"),
    status: "Closing Soon",
    description: "AI-powered player performance tracking and analytics suite",
    requirements: ["Real-time Tracking", "Injury Prevention", "Data Visualization"],
    teamId: "liverpool"
  },
  {
    id: "5",
    title: "Hospitality Suite Renovation",
    organization: "Tottenham Hotspur",
    sport: "Football",
    category: "Construction",
    budget: "£1.8M - £2.5M",
    deadline: new Date("2024-12-01"),
    status: "Open",
    description: "Premium hospitality areas and corporate facilities renovation",
    requirements: ["Luxury Finishes", "AV Systems", "Catering Facilities"],
    teamId: "tottenham-hotspur"
  },
  {
    id: "6",
    title: "Security System Overhaul",
    organization: "Chelsea",
    sport: "Football",
    category: "Security",
    budget: "£3.2M - £4.1M",
    deadline: new Date("2024-10-08"),
    status: "Open",
    description: "Complete security infrastructure upgrade for Stamford Bridge",
    requirements: ["Facial Recognition", "Access Control", "Emergency Systems"],
    teamId: "chelsea"
  }
];

const TendersRFPs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [tenders] = useState<Tender[]>(mockTenders);
  const [selectedTenderForList, setSelectedTenderForList] = useState<Tender | null>(null);
  const [isAddToListDialogOpen, setIsAddToListDialogOpen] = useState(false);

  const { lists, addItemToList } = useLists();
  const navigate = useNavigate();

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.sport.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || !selectedCategory || tender.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || !selectedStatus || tender.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Closing Soon": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Closed": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Infrastructure": return <Building2 className="h-4 w-4" />;
      case "Technology": return <FileText className="h-4 w-4" />;
      case "Equipment": return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleAddToList = async (listId: string) => {
    if (!selectedTenderForList) return;
    
    setIsAddToListDialogOpen(false);
    setSelectedTenderForList(null);
    // This would require mapping organization to actual team IDs
    // await addItemToList(listId, undefined, teamId);
  };

  const openAddToListDialog = (tender: Tender) => {
    setSelectedTenderForList(tender);
    setIsAddToListDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tenders & RFPs</h2>
          <p className="text-muted-foreground">Active procurement opportunities in sports industry</p>
        </div>
        <Button className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Submit Proposal
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tenders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Construction">Construction</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closing Soon">Closing Soon</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tenders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Active Tenders ({filteredTenders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tender</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenders.map((tender) => (
                <TableRow key={tender.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tender.title}</div>
                      <div className="text-sm text-muted-foreground">{tender.sport}</div>
                    </div>
                  </TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                       <Building2 className="h-4 w-4 text-muted-foreground" />
                       <button 
                         onClick={() => navigate(`/crm/teams/${tender.teamId || tender.organization.toLowerCase().replace(/\s+/g, '-')}`)}
                         className="font-medium text-primary hover:underline text-left"
                       >
                         {tender.organization}
                       </button>
                     </div>
                   </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(tender.category)}
                      {tender.category}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      {tender.budget}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {format(tender.deadline, "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(tender.status)}>
                      {tender.status}
                    </Badge>
                  </TableCell>
                   <TableCell className="text-right">
                     <Button 
                       variant="ghost" 
                       size="sm" 
                       onClick={() => openAddToListDialog(tender)}
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
              Add {selectedTenderForList?.organization} to List
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

export default TendersRFPs;