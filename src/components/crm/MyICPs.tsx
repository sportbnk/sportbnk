import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Users, Target, Plus, Edit, Trash2, Filter, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface ICPCriteria {
  sports?: string[];
  teamLevels?: string[];
  competitions?: string[];
  budgetRange?: string;
  regions?: string[];
  signalTypes?: string[];
  positions?: string[];
  departments?: string[];
  experience?: string;
  categories?: string[];
}

interface ICP {
  id: string;
  name: string;
  description: string;
  organizations: number;
  contacts: number;
  type: "Organizations" | "Contacts";
  criteria: ICPCriteria;
  color: string;
}

const MyICPs = () => {
  const [icps, setIcps] = useState<ICP[]>([
    {
      id: "1",
      name: "High-Budget Premier League Clubs",
      description: "Top-tier English football clubs seeking major commercial partnerships and sponsorships",
      organizations: 20,
      contacts: 145,
      type: "Organizations",
      criteria: {
        sports: ["Football"],
        teamLevels: ["Professional"],
        competitions: ["Premier League"],
        budgetRange: "£1M+",
        regions: ["UK"],
        signalTypes: ["Tender", "Sponsorship"]
      },
      color: "bg-primary/10 text-primary"
    },
    {
      id: "2", 
      name: "Commercial Decision Makers",
      description: "Senior commercial and marketing decision makers across professional sports",
      organizations: 52,
      contacts: 289,
      type: "Contacts",
      criteria: {
        positions: ["Commercial Director", "Marketing Director", "Head of Partnerships"],
        departments: ["Commercial", "Marketing"],
        experience: "5+ years",
        sports: ["Football", "Cricket", "Rugby"],
        teamLevels: ["Professional"]
      },
      color: "bg-accent/10 text-accent"
    },
    {
      id: "3",
      name: "Technology Procurement Signals", 
      description: "Sports organizations actively procuring technology solutions and digital infrastructure",
      organizations: 35,
      contacts: 167,
      type: "Organizations",
      criteria: {
        signalTypes: ["Procurement", "Tender"],
        budgetRange: "£50k+",
        categories: ["Technology", "Digital Infrastructure", "Performance Analytics"],
        sports: ["Football", "Basketball", "Cricket"],
        teamLevels: ["Professional", "Semi-Professional"]
      },
      color: "bg-chart-1/10 text-chart-1"
    }
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newIcp, setNewIcp] = useState({
    name: "",
    description: "",
    type: "Organizations" as "Organizations" | "Contacts",
    criteria: {
      sports: [] as string[],
      teamLevels: [] as string[],
      competitions: [] as string[],
      budgetRange: "",
      regions: [] as string[],
      signalTypes: [] as string[],
      positions: [] as string[],
      departments: [] as string[]
    }
  });

  const handleCreateIcp = () => {
    if (!newIcp.name.trim()) {
      toast.error("Please enter an ICP name");
      return;
    }

    const id = Date.now().toString();
    const estimatedOrgs = Math.floor(Math.random() * 50) + 10;
    const estimatedContacts = Math.floor(Math.random() * 200) + 50;

    const createdIcp = {
      id,
      name: newIcp.name,
      description: newIcp.description,
      organizations: estimatedOrgs,
      contacts: estimatedContacts,
      type: newIcp.type,
      criteria: newIcp.criteria,
      color: `bg-chart-${(icps.length % 5) + 1}/10 text-chart-${(icps.length % 5) + 1}`
    };

    setIcps([...icps, createdIcp]);
    setCreateDialogOpen(false);
    setNewIcp({
      name: "",
      description: "",
      type: "Organizations",
      criteria: {
        sports: [],
        teamLevels: [],
        competitions: [],
        budgetRange: "",
        regions: [],
        signalTypes: [],
        positions: [],
        departments: []
      }
    });

    toast.success("ICP created successfully!");
  };

  const handleDeleteIcp = (id: string) => {
    setIcps(icps.filter(icp => icp.id !== id));
    toast.success("ICP deleted successfully!");
  };

  const getCriteriaDisplay = (criteria: ICPCriteria): string[] => {
    const display: string[] = [];
    if (criteria.sports?.length) display.push(...criteria.sports);
    if (criteria.teamLevels?.length) display.push(...criteria.teamLevels);
    if (criteria.budgetRange) display.push(criteria.budgetRange);
    if (criteria.signalTypes?.length) display.push(...criteria.signalTypes);
    if (criteria.positions?.length) display.push(...criteria.positions);
    if (criteria.categories?.length) display.push(...criteria.categories);
    return display.slice(0, 3);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My ICPs</h1>
          <p className="text-muted-foreground">Your Ideal Customer Profiles and saved segments</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create ICP
            </Button>
          </DialogTrigger>
        </Dialog>
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteIcp(icp.id)}
                  >
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
                    {getCriteriaDisplay(icp.criteria).map((criterion, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {criterion}
                      </Badge>
          ))}
        </div>

        {/* Create ICP Dialog */}
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Create New ICP
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">ICP Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., High-Budget Premier League Clubs"
                  value={newIcp.name}
                  onChange={(e) => setNewIcp({...newIcp, name: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your ideal customer profile..."
                  value={newIcp.description}
                  onChange={(e) => setNewIcp({...newIcp, description: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Target Type</Label>
                <Select 
                  value={newIcp.type} 
                  onValueChange={(value: "Organizations" | "Contacts") => setNewIcp({...newIcp, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Organizations">Organizations</SelectItem>
                    <SelectItem value="Contacts">Contacts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Signals-Based Criteria */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Signal Criteria
              </h3>
              
              {/* Sports */}
              <div>
                <Label>Sports</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {["Football", "Cricket", "Rugby", "Basketball", "Tennis", "Golf"].map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={sport}
                        checked={newIcp.criteria.sports?.includes(sport)}
                        onCheckedChange={(checked) => {
                          const sports = newIcp.criteria.sports || [];
                          if (checked) {
                            setNewIcp({
                              ...newIcp,
                              criteria: {...newIcp.criteria, sports: [...sports, sport]}
                            });
                          } else {
                            setNewIcp({
                              ...newIcp,
                              criteria: {...newIcp.criteria, sports: sports.filter(s => s !== sport)}
                            });
                          }
                        }}
                      />
                      <Label htmlFor={sport} className="text-sm">{sport}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Levels */}
              <div>
                <Label>Team Levels</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Professional", "Semi-Professional", "Amateur", "Youth"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={level}
                        checked={newIcp.criteria.teamLevels?.includes(level)}
                        onCheckedChange={(checked) => {
                          const levels = newIcp.criteria.teamLevels || [];
                          if (checked) {
                            setNewIcp({
                              ...newIcp,
                              criteria: {...newIcp.criteria, teamLevels: [...levels, level]}
                            });
                          } else {
                            setNewIcp({
                              ...newIcp,
                              criteria: {...newIcp.criteria, teamLevels: levels.filter(l => l !== level)}
                            });
                          }
                        }}
                      />
                      <Label htmlFor={level} className="text-sm">{level}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <Label>Budget Range</Label>
                <Select 
                  value={newIcp.criteria.budgetRange || ""} 
                  onValueChange={(value) => setNewIcp({
                    ...newIcp, 
                    criteria: {...newIcp.criteria, budgetRange: value}
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under £10k">Under £10k</SelectItem>
                    <SelectItem value="£10k-£50k">£10k-£50k</SelectItem>
                    <SelectItem value="£50k-£100k">£50k-£100k</SelectItem>
                    <SelectItem value="£100k-£500k">£100k-£500k</SelectItem>
                    <SelectItem value="£500k-£1M">£500k-£1M</SelectItem>
                    <SelectItem value="£1M+">£1M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Signal Types */}
              <div>
                <Label>Signal Types</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {["Tender", "Sponsorship", "Funding", "Hiring", "Procurement"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={newIcp.criteria.signalTypes?.includes(type)}
                        onCheckedChange={(checked) => {
                          const types = newIcp.criteria.signalTypes || [];
                          if (checked) {
                            setNewIcp({
                              ...newIcp,
                              criteria: {...newIcp.criteria, signalTypes: [...types, type]}
                            });
                          } else {
                            setNewIcp({
                              ...newIcp,
                              criteria: {...newIcp.criteria, signalTypes: types.filter(t => t !== type)}
                            });
                          }
                        }}
                      />
                      <Label htmlFor={type} className="text-sm">{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div>
                <Label>Regions</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {["UK", "Ireland", "Spain", "France", "Germany", "Italy", "Netherlands", "Europe"].map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox
                        id={region}
                        checked={newIcp.criteria.regions?.includes(region)}
                        onCheckedChange={(checked) => {
                          const regions = newIcp.criteria.regions || [];
                          if (checked) {
                            setNewIcp({
                              ...newIcp,
                              criteria: {...newIcp.criteria, regions: [...regions, region]}
                            });
                          } else {
                            setNewIcp({
                              ...newIcp,
                              criteria: {...newIcp.criteria, regions: regions.filter(r => r !== region)}
                            });
                          }
                        }}
                      />
                      <Label htmlFor={region} className="text-sm">{region}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact-specific criteria */}
              {newIcp.type === "Contacts" && (
                <>
                  <div>
                    <Label>Positions</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["Commercial Director", "Marketing Director", "Head of Partnerships", "CEO", "Operations Director", "Finance Director"].map((position) => (
                        <div key={position} className="flex items-center space-x-2">
                          <Checkbox
                            id={position}
                            checked={newIcp.criteria.positions?.includes(position)}
                            onCheckedChange={(checked) => {
                              const positions = newIcp.criteria.positions || [];
                              if (checked) {
                                setNewIcp({
                                  ...newIcp,
                                  criteria: {...newIcp.criteria, positions: [...positions, position]}
                                });
                              } else {
                                setNewIcp({
                                  ...newIcp,
                                  criteria: {...newIcp.criteria, positions: positions.filter(p => p !== position)}
                                });
                              }
                            }}
                          />
                          <Label htmlFor={position} className="text-sm">{position}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Departments</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {["Commercial", "Marketing", "Operations", "Finance", "Technology", "Partnerships"].map((dept) => (
                        <div key={dept} className="flex items-center space-x-2">
                          <Checkbox
                            id={dept}
                            checked={newIcp.criteria.departments?.includes(dept)}
                            onCheckedChange={(checked) => {
                              const departments = newIcp.criteria.departments || [];
                              if (checked) {
                                setNewIcp({
                                  ...newIcp,
                                  criteria: {...newIcp.criteria, departments: [...departments, dept]}
                                });
                              } else {
                                setNewIcp({
                                  ...newIcp,
                                  criteria: {...newIcp.criteria, departments: departments.filter(d => d !== dept)}
                                });
                              }
                            }}
                          />
                          <Label htmlFor={dept} className="text-sm">{dept}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateIcp} className="flex-1">
                Create ICP
              </Button>
            </div>
          </div>
        </DialogContent>
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