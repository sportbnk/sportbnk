import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target, 
  Plus, 
  Edit, 
  Trash2, 
  Filter,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  matchedSignals?: number;
  lastUpdated: string;
}

const ICPs = () => {
  const { toast } = useToast();
  const [icps, setIcps] = useState<ICP[]>([
    {
      id: "1",
      name: "High-Budget Premier League Clubs",
      description: "Top-tier English football clubs seeking major commercial partnerships and sponsorships over £1M",
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
      color: "bg-blue-100 text-blue-800",
      matchedSignals: 8,
      lastUpdated: "2 days ago"
    },
    {
      id: "2", 
      name: "Commercial Decision Makers",
      description: "Senior commercial and marketing decision makers across professional sports organizations",
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
      color: "bg-green-100 text-green-800",
      matchedSignals: 15,
      lastUpdated: "1 week ago"
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
      color: "bg-purple-100 text-purple-800",
      matchedSignals: 12,
      lastUpdated: "3 days ago"
    }
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingIcp, setEditingIcp] = useState<ICP | null>(null);
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
      toast({
        title: "Validation Error",
        description: "Please enter an ICP name",
        variant: "destructive"
      });
      return;
    }

    const id = Date.now().toString();
    const estimatedOrgs = Math.floor(Math.random() * 50) + 10;
    const estimatedContacts = Math.floor(Math.random() * 200) + 50;
    const matchedSignals = Math.floor(Math.random() * 20) + 5;

    const createdIcp: ICP = {
      id,
      name: newIcp.name,
      description: newIcp.description,
      organizations: estimatedOrgs,
      contacts: estimatedContacts,
      type: newIcp.type,
      criteria: newIcp.criteria,
      color: `bg-indigo-100 text-indigo-800`,
      matchedSignals,
      lastUpdated: "Just now"
    };

    setIcps([...icps, createdIcp]);
    setCreateDialogOpen(false);
    resetForm();

    toast({
      title: "ICP Created",
      description: `Successfully created "${newIcp.name}" with ${matchedSignals} matched signals`,
    });
  };

  const handleEditIcp = (icp: ICP) => {
    setEditingIcp(icp);
    setNewIcp({
      name: icp.name,
      description: icp.description,
      type: icp.type,
      criteria: {
        sports: icp.criteria.sports || [],
        teamLevels: icp.criteria.teamLevels || [],
        competitions: icp.criteria.competitions || [],
        budgetRange: icp.criteria.budgetRange || "",
        regions: icp.criteria.regions || [],
        signalTypes: icp.criteria.signalTypes || [],
        positions: icp.criteria.positions || [],
        departments: icp.criteria.departments || []
      }
    });
    setCreateDialogOpen(true);
  };

  const handleUpdateIcp = () => {
    if (!editingIcp) return;

    const updatedIcps = icps.map(icp => 
      icp.id === editingIcp.id 
        ? { ...icp, ...newIcp, lastUpdated: "Just now" }
        : icp
    );

    setIcps(updatedIcps);
    setCreateDialogOpen(false);
    setEditingIcp(null);
    resetForm();

    toast({
      title: "ICP Updated",
      description: `Successfully updated "${newIcp.name}"`,
    });
  };

  const handleDeleteIcp = (id: string) => {
    const icpToDelete = icps.find(icp => icp.id === id);
    setIcps(icps.filter(icp => icp.id !== id));
    
    toast({
      title: "ICP Deleted",
      description: `"${icpToDelete?.name}" has been removed`,
    });
  };

  const resetForm = () => {
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
  };

  const handleCloseDialog = () => {
    setCreateDialogOpen(false);
    setEditingIcp(null);
    resetForm();
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

  const handleCriteriaChange = (type: keyof ICPCriteria, value: string, checked?: boolean) => {
    if (type === 'budgetRange' || type === 'experience') {
      setNewIcp({
        ...newIcp,
        criteria: { ...newIcp.criteria, [type]: value }
      });
    } else {
      const currentArray = newIcp.criteria[type] as string[] || [];
      if (checked) {
        setNewIcp({
          ...newIcp,
          criteria: { ...newIcp.criteria, [type]: [...currentArray, value] }
        });
      } else {
        setNewIcp({
          ...newIcp,
          criteria: { ...newIcp.criteria, [type]: currentArray.filter(item => item !== value) }
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              My ICPs
            </h1>
            <p className="text-gray-600 mt-2">Define and manage your Ideal Customer Profiles to match relevant signals</p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Plus className="h-4 w-4" />
                Create New ICP
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {editingIcp ? 'Edit ICP' : 'Create New ICP'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Basic Information
                  </h3>
                  
                  <div>
                    <Label htmlFor="name">ICP Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., High-Budget Premier League Clubs"
                      value={newIcp.name}
                      onChange={(e) => setNewIcp({...newIcp, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your ideal customer profile and what signals you're looking for..."
                      value={newIcp.description}
                      onChange={(e) => setNewIcp({...newIcp, description: e.target.value})}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Target Type</Label>
                    <Select 
                      value={newIcp.type} 
                      onValueChange={(value: "Organizations" | "Contacts") => setNewIcp({...newIcp, type: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Organizations">Organizations</SelectItem>
                        <SelectItem value="Contacts">Contacts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Signal Criteria */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
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
                            onCheckedChange={(checked) => handleCriteriaChange('sports', sport, !!checked)}
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
                            onCheckedChange={(checked) => handleCriteriaChange('teamLevels', level, !!checked)}
                          />
                          <Label htmlFor={level} className="text-sm">{level}</Label>
                        </div>
                      ))}
                    </div>
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
                            onCheckedChange={(checked) => handleCriteriaChange('signalTypes', type, !!checked)}
                          />
                          <Label htmlFor={type} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <Label>Budget Range</Label>
                    <Select 
                      value={newIcp.criteria.budgetRange || ""} 
                      onValueChange={(value) => handleCriteriaChange('budgetRange', value)}
                    >
                      <SelectTrigger className="mt-1">
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

                  {/* Regions */}
                  <div>
                    <Label>Regions</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {["UK", "Ireland", "Spain", "France", "Germany", "Italy", "Netherlands", "Europe"].map((region) => (
                        <div key={region} className="flex items-center space-x-2">
                          <Checkbox
                            id={region}
                            checked={newIcp.criteria.regions?.includes(region)}
                            onCheckedChange={(checked) => handleCriteriaChange('regions', region, !!checked)}
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
                                onCheckedChange={(checked) => handleCriteriaChange('positions', position, !!checked)}
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
                                onCheckedChange={(checked) => handleCriteriaChange('departments', dept, !!checked)}
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
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={editingIcp ? handleUpdateIcp : handleCreateIcp}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {editingIcp ? 'Update ICP' : 'Create ICP'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total ICPs</p>
                  <p className="text-2xl font-bold text-gray-900">{icps.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Organizations</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {icps.reduce((sum, icp) => sum + icp.organizations, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {icps.reduce((sum, icp) => sum + icp.contacts, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Matched Signals</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {icps.reduce((sum, icp) => sum + (icp.matchedSignals || 0), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ICPs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {icps.map((icp) => (
            <Card key={icp.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">{icp.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditIcp(icp)}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteIcp(icp.id)}
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Badge className={icp.color}>{icp.type}</Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">{icp.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Organizations:</span>
                    <span className="font-semibold text-gray-900">{icp.organizations}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Contacts:</span>
                    <span className="font-semibold text-gray-900">{icp.contacts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Matched Signals:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {icp.matchedSignals || 0} active
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Key Criteria:</p>
                  <div className="flex flex-wrap gap-1">
                    {getCriteriaDisplay(icp.criteria).map((criterion, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {criterion}
                      </Badge>
                    ))}
                    {getCriteriaDisplay(icp.criteria).length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{getCriteriaDisplay(icp.criteria).length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Updated {icp.lastUpdated}</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                      <Eye className="h-3 w-3" />
                      View Signals
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {icps.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No ICPs Created Yet</h3>
              <p className="text-gray-600 mb-6">Create your first Ideal Customer Profile to start matching relevant signals</p>
              <Button 
                onClick={() => setCreateDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Your First ICP
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ICPs;