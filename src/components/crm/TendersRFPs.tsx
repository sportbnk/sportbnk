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
import { Search, Calendar, DollarSign, Clock, Building2, FileText, ExternalLink } from "lucide-react";
import { format } from "date-fns";

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
}

const mockTenders: Tender[] = [
  {
    id: "1",
    title: "Stadium Lighting System Upgrade",
    organization: "Arsenal FC",
    sport: "Football",
    category: "Infrastructure",
    budget: "£2.5M - £3.2M",
    deadline: new Date("2024-10-15"),
    status: "Open",
    description: "Complete LED lighting system upgrade for Emirates Stadium",
    requirements: ["LED Technology", "Energy Efficiency", "UEFA Compliance"]
  },
  {
    id: "2",
    title: "Digital Marketing Platform",
    organization: "England Cricket Board",
    sport: "Cricket",
    category: "Technology",
    budget: "£800K - £1.2M",
    deadline: new Date("2024-09-30"),
    status: "Closing Soon",
    description: "Comprehensive digital marketing and fan engagement platform",
    requirements: ["CRM Integration", "Mobile App", "Analytics Dashboard"]
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
    requirements: ["Automated Systems", "Weather Monitoring", "Soil Analysis"]
  },
  {
    id: "4",
    title: "Player Performance Analytics",
    organization: "Liverpool FC",
    sport: "Football",
    category: "Technology",
    budget: "£500K - £750K",
    deadline: new Date("2024-09-25"),
    status: "Closing Soon",
    description: "AI-powered player performance tracking and analytics suite",
    requirements: ["Real-time Tracking", "Injury Prevention", "Data Visualization"]
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
    requirements: ["Luxury Finishes", "AV Systems", "Catering Facilities"]
  },
  {
    id: "6",
    title: "Security System Overhaul",
    organization: "Wembley Stadium",
    sport: "Multi-Sport",
    category: "Security",
    budget: "£3.2M - £4.1M",
    deadline: new Date("2024-10-08"),
    status: "Open",
    description: "Complete security infrastructure upgrade for national stadium",
    requirements: ["Facial Recognition", "Access Control", "Emergency Systems"]
  }
];

const TendersRFPs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [tenders] = useState<Tender[]>(mockTenders);

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tender.sport.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tender.category === selectedCategory;
    const matchesStatus = !selectedStatus || tender.status === selectedStatus;
    
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
                <SelectItem value="">All Categories</SelectItem>
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
                <SelectItem value="">All Status</SelectItem>
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
                      {tender.organization}
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
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Details
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

export default TendersRFPs;