import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, LayoutGrid, Table2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';
import { DealsKanbanBoard } from '@/components/deals/DealsKanbanBoard';
import { DealsTable } from '@/components/deals/DealsTable';
import { AddDealDialog } from '@/components/deals/AddDealDialog';
import { DealDetailPanel } from '@/components/deals/DealDetailPanel';
import { DealsKPICards } from '@/components/deals/DealsKPICards';

export interface Deal {
  id: string;
  user_id: string;
  deal_name: string;
  company_name: string;
  primary_contact: string | null;
  deal_value: number;
  expected_close_date: string | null;
  assigned_to: string | null;
  stage: string;
  status: string;
  notes: string | null;
  internal_comments: string | null;
  created_at: string;
  updated_at: string;
}

const Deals = () => {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'pipeline' | 'table'>('pipeline');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchDeals = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
      toast.error('Failed to fetch deals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [user]);

  useEffect(() => {
    let filtered = [...deals];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(deal =>
        deal.deal_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.primary_contact?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply stage filter
    if (stageFilter !== 'all') {
      filtered = filtered.filter(deal => deal.stage === stageFilter);
    }

    // Apply assignee filter
    if (assigneeFilter !== 'all') {
      filtered = filtered.filter(deal => deal.assigned_to === assigneeFilter);
    }

    setFilteredDeals(filtered);
  }, [deals, searchTerm, stageFilter, assigneeFilter]);

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsPanelOpen(true);
  };

  const handleDealUpdate = () => {
    fetchDeals();
    setIsPanelOpen(false);
    setSelectedDeal(null);
  };

  const handleDealAdd = () => {
    fetchDeals();
    setIsAddDialogOpen(false);
  };

  const updateDealStage = async (dealId: string, newStage: string) => {
    try {
      const { error } = await supabase
        .from('deals')
        .update({ stage: newStage })
        .eq('id', dealId);

      if (error) throw error;
      
      // Add activity log
      await supabase
        .from('deal_activities')
        .insert({
          deal_id: dealId,
          user_id: user?.id,
          activity_type: 'Stage Change',
          description: `Deal moved to ${newStage}`
        });

      fetchDeals();
      toast.success('Deal stage updated');
    } catch (error) {
      console.error('Error updating deal stage:', error);
      toast.error('Failed to update deal stage');
    }
  };

  const uniqueAssignees = Array.from(new Set(deals.map(deal => deal.assigned_to).filter(Boolean)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
          <p className="text-gray-600 mt-1">Manage your sales pipeline</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      <DealsKPICards deals={deals} />

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle>Sales Pipeline</CardTitle>
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) => value && setViewMode(value as 'pipeline' | 'table')}
                className="bg-gray-100 rounded-lg p-1"
              >
                <ToggleGroupItem value="pipeline" aria-label="Pipeline view" className="data-[state=on]:bg-white">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Pipeline
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Table view" className="data-[state=on]:bg-white">
                  <Table2 className="h-4 w-4 mr-2" />
                  Table
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="Prospecting">Prospecting</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Closed - Won">Closed - Won</SelectItem>
                  <SelectItem value="Closed - Lost">Closed - Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Owners</SelectItem>
                  {uniqueAssignees.map((assignee) => (
                    <SelectItem key={assignee} value={assignee!}>
                      {assignee}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'pipeline' ? (
            <DealsKanbanBoard 
              deals={filteredDeals} 
              onDealClick={handleDealClick}
              onStageChange={updateDealStage}
            />
          ) : (
            <DealsTable deals={filteredDeals} onDealClick={handleDealClick} />
          )}
        </CardContent>
      </Card>

      <AddDealDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onDealAdded={handleDealAdd}
      />

      <DealDetailPanel
        deal={selectedDeal}
        open={isPanelOpen}
        onOpenChange={setIsPanelOpen}
        onDealUpdated={handleDealUpdate}
      />
    </div>
  );
};

export default Deals;