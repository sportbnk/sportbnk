import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  DollarSign, 
  User, 
  Building, 
  Clock, 
  MessageSquare,
  Save,
  Trash2
} from 'lucide-react';
import { Deal } from '@/pages/crm/Deals';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';

interface DealActivity {
  id: string;
  activity_type: string;
  description: string;
  created_at: string;
}

interface DealDetailPanelProps {
  deal: Deal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDealUpdated: () => void;
}

export const DealDetailPanel: React.FC<DealDetailPanelProps> = ({
  deal,
  open,
  onOpenChange,
  onDealUpdated,
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activities, setActivities] = useState<DealActivity[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editedDeal, setEditedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    if (deal) {
      setEditedDeal({ ...deal });
      fetchActivities(deal.id);
    }
  }, [deal]);

  const fetchActivities = async (dealId: string) => {
    try {
      const { data, error } = await supabase
        .from('deal_activities')
        .select('*')
        .eq('deal_id', dealId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleSave = async () => {
    if (!editedDeal || !user) return;

    try {
      const { error } = await supabase
        .from('deals')
        .update({
          deal_name: editedDeal.deal_name,
          company_name: editedDeal.company_name,
          primary_contact: editedDeal.primary_contact,
          deal_value: editedDeal.deal_value,
          expected_close_date: editedDeal.expected_close_date,
          assigned_to: editedDeal.assigned_to,
          stage: editedDeal.stage,
          status: editedDeal.status,
          notes: editedDeal.notes,
          internal_comments: editedDeal.internal_comments,
        })
        .eq('id', editedDeal.id);

      if (error) throw error;

      // Log activity
      await supabase
        .from('deal_activities')
        .insert({
          deal_id: editedDeal.id,
          user_id: user.id,
          activity_type: 'Deal Updated',
          description: 'Deal information was updated'
        });

      toast.success('Deal updated successfully');
      setIsEditing(false);
      onDealUpdated();
      fetchActivities(editedDeal.id);
    } catch (error) {
      console.error('Error updating deal:', error);
      toast.error('Failed to update deal');
    }
  };

  const handleDelete = async () => {
    if (!deal || !user) return;
    
    if (!confirm('Are you sure you want to delete this deal?')) return;

    try {
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', deal.id);

      if (error) throw error;

      toast.success('Deal deleted successfully');
      onDealUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting deal:', error);
      toast.error('Failed to delete deal');
    }
  };

  const addComment = async () => {
    if (!deal || !user || !newComment.trim()) return;

    try {
      const { error } = await supabase
        .from('deal_activities')
        .insert({
          deal_id: deal.id,
          user_id: user.id,
          activity_type: 'Comment',
          description: newComment
        });

      if (error) throw error;

      setNewComment('');
      fetchActivities(deal.id);
      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date set';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prospecting':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Qualified':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Proposal Sent':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Negotiation':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Closed - Won':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Closed - Lost':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!deal || !editedDeal) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">{deal.deal_name}</SheetTitle>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button onClick={handleDelete} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className={getStageColor(deal.stage)}>
              {deal.stage}
            </Badge>
            <div className="flex items-center text-green-600 font-semibold">
              <DollarSign className="h-4 w-4 mr-1" />
              {formatCurrency(deal.deal_value || 0)}
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Deal Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deal Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Deal Name</Label>
                  {isEditing ? (
                    <Input
                      value={editedDeal.deal_name}
                      onChange={(e) => setEditedDeal({ ...editedDeal, deal_name: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm mt-1">{deal.deal_name}</p>
                  )}
                </div>
                <div>
                  <Label>Company</Label>
                  {isEditing ? (
                    <Input
                      value={editedDeal.company_name}
                      onChange={(e) => setEditedDeal({ ...editedDeal, company_name: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm mt-1">{deal.company_name}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Contact</Label>
                  {isEditing ? (
                    <Input
                      value={editedDeal.primary_contact || ''}
                      onChange={(e) => setEditedDeal({ ...editedDeal, primary_contact: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm mt-1">{deal.primary_contact || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <Label>Deal Value</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedDeal.deal_value || 0}
                      onChange={(e) => setEditedDeal({ ...editedDeal, deal_value: parseInt(e.target.value) || 0 })}
                    />
                  ) : (
                    <p className="text-sm mt-1">{formatCurrency(deal.deal_value || 0)}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expected Close Date</Label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editedDeal.expected_close_date || ''}
                      onChange={(e) => setEditedDeal({ ...editedDeal, expected_close_date: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm mt-1">{formatDate(deal.expected_close_date)}</p>
                  )}
                </div>
                <div>
                  <Label>Assigned To</Label>
                  {isEditing ? (
                    <Input
                      value={editedDeal.assigned_to || ''}
                      onChange={(e) => setEditedDeal({ ...editedDeal, assigned_to: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm mt-1">{deal.assigned_to || 'Not assigned'}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Stage</Label>
                  {isEditing ? (
                    <Select
                      value={editedDeal.stage}
                      onValueChange={(value) => setEditedDeal({ ...editedDeal, stage: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Prospecting">Prospecting</SelectItem>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                        <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                        <SelectItem value="Negotiation">Negotiation</SelectItem>
                        <SelectItem value="Closed - Won">Closed - Won</SelectItem>
                        <SelectItem value="Closed - Lost">Closed - Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm mt-1">{deal.stage}</p>
                  )}
                </div>
                <div>
                  <Label>Status</Label>
                  {isEditing ? (
                    <Select
                      value={editedDeal.status}
                      onValueChange={(value) => setEditedDeal({ ...editedDeal, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm mt-1">{deal.status}</p>
                  )}
                </div>
              </div>

              <div>
                <Label>Notes</Label>
                {isEditing ? (
                  <Textarea
                    value={editedDeal.notes || ''}
                    onChange={(e) => setEditedDeal({ ...editedDeal, notes: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <p className="text-sm mt-1">{deal.notes || 'No notes'}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add Comment */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addComment()}
                  />
                  <Button onClick={addComment} size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                {/* Activities List */}
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Clock className="h-4 w-4 text-gray-400 mt-1" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{activity.activity_type}</span>
                          <span className="text-gray-500">
                            {new Date(activity.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};