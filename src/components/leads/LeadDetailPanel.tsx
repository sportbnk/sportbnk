
import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { Phone, Mail, Calendar, User, Building, Tag, FileText, Clock } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadActivity = Database['public']['Tables']['lead_activities']['Row'];

interface LeadDetailPanelProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadUpdated: () => void;
}

export const LeadDetailPanel: React.FC<LeadDetailPanelProps> = ({
  lead,
  open,
  onOpenChange,
  onLeadUpdated,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    lead_status: '',
    next_action: '',
    notes: '',
    assigned_to: '',
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        lead_status: lead.lead_status,
        next_action: lead.next_action || '',
        notes: lead.notes || '',
        assigned_to: lead.assigned_to || '',
      });
      fetchActivities();
    }
  }, [lead]);

  const fetchActivities = async () => {
    if (!lead) return;

    try {
      const { data, error } = await supabase
        .from('lead_activities')
        .select('*')
        .eq('lead_id', lead.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleUpdate = async () => {
    if (!lead || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          lead_status: formData.lead_status,
          next_action: formData.next_action || null,
          notes: formData.notes || null,
          assigned_to: formData.assigned_to || null,
          last_contacted: new Date().toISOString(),
        })
        .eq('id', lead.id);

      if (error) throw error;

      // Add activity log for status change
      if (formData.lead_status !== lead.lead_status) {
        await supabase
          .from('lead_activities')
          .insert({
            lead_id: lead.id,
            activity_type: 'status_change',
            description: `Status changed from ${lead.lead_status} to ${formData.lead_status}`,
            user_id: user.id,
          });
      }

      toast.success('Lead updated successfully');
      setEditMode(false);
      onLeadUpdated();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast.error('Failed to update lead');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-yellow-100 text-yellow-800';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800';
      case 'Converted':
        return 'bg-green-100 text-green-800';
      case 'Lost':
        return 'bg-red-100 text-red-800';
      case 'Follow Up':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>{lead.company_name}</span>
            <Badge className={getStatusColor(lead.lead_status)}>
              {lead.lead_status}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{lead.contact_person}</span>
              </div>
              {lead.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                    {lead.email}
                  </a>
                </div>
              )}
              {lead.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                    {lead.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Added {formatDistanceToNow(new Date(lead.date_added), { addSuffix: true })}
                </span>
              </div>
              {lead.last_contacted && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Last contacted {formatDistanceToNow(new Date(lead.last_contacted), { addSuffix: true })}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          {lead.tags && lead.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Editable Fields */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Lead Details
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editMode ? (
                <>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.lead_status}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, lead_status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Converted">Converted</SelectItem>
                        <SelectItem value="Lost">Lost</SelectItem>
                        <SelectItem value="Follow Up">Follow Up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Assigned To</Label>
                    <Input
                      value={formData.assigned_to}
                      onChange={(e) => setFormData(prev => ({ ...prev, assigned_to: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Next Action</Label>
                    <Input
                      value={formData.next_action}
                      onChange={(e) => setFormData(prev => ({ ...prev, next_action: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleUpdate} disabled={loading} className="w-full">
                    {loading ? 'Updating...' : 'Update Lead'}
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Assigned To</Label>
                    <p>{lead.assigned_to || 'Unassigned'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Next Action</Label>
                    <p>{lead.next_action || 'No action specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Notes</Label>
                    <p className="whitespace-pre-wrap">{lead.notes || 'No notes added'}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No activities recorded</p>
              ) : (
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div key={activity.id}>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      {index < activities.length - 1 && <Separator className="ml-4 mt-3" />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};
