
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Trash2, ExternalLink, Video, Phone, MapPin, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";

interface Meeting {
  id: string;
  title: string;
  linkedContact: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";
  leadLink: string;
  assignedTo: string;
  location: string;
  notes: string;
  type: "In-Person" | "Video Call" | "Phone Call";
}

const Meetings = () => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterTime, setFilterTime] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const form = useForm({
    defaultValues: {
      title: "",
      linkedContact: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      status: "Scheduled" as const,
      leadLink: "",
      assignedTo: "",
      location: "",
      notes: "",
      type: "Video Call" as const
    }
  });

  // Load meetings from database
  useEffect(() => {
    if (user) {
      loadMeetings();
    }
  }, [user]);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error loading meetings:', error);
        toast.error('Failed to load meetings');
        return;
      }

      // Transform database data to match interface
      const transformedMeetings = data.map(meeting => ({
        id: meeting.id,
        title: meeting.title,
        linkedContact: meeting.linked_contact || '',
        date: meeting.date,
        time: meeting.time,
        status: meeting.status as "Scheduled" | "Completed" | "Cancelled" | "Rescheduled",
        leadLink: meeting.lead_link || '',
        assignedTo: meeting.assigned_to || '',
        location: meeting.location || '',
        notes: meeting.notes || '',
        type: meeting.meeting_type as "In-Person" | "Video Call" | "Phone Call"
      }));

      setMeetings(transformedMeetings);
    } catch (error) {
      console.error('Error loading meetings:', error);
      toast.error('Failed to load meetings');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!user) {
      toast.error('Please log in to create meetings');
      return;
    }

    try {
      const { error } = await supabase
        .from('meetings')
        .insert({
          user_id: user.id,
          title: data.title,
          linked_contact: data.linkedContact,
          date: data.date,
          time: data.time,
          status: data.status,
          lead_link: data.leadLink,
          assigned_to: data.assignedTo,
          location: data.location,
          notes: data.notes,
          meeting_type: data.type
        });

      if (error) {
        console.error('Error creating meeting:', error);
        toast.error('Failed to create meeting');
        return;
      }

      setIsDialogOpen(false);
      form.reset();
      
      toast.success("Meeting scheduled successfully", {
        description: `"${data.title}" has been scheduled for ${data.date} at ${data.time}`
      });

      // Reload meetings
      loadMeetings();
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast.error('Failed to create meeting');
    }
  };

  const deleteMeeting = async (id: string) => {
    try {
      const { error } = await supabase
        .from('meetings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting meeting:', error);
        toast.error('Failed to delete meeting');
        return;
      }

      setIsDetailPanelOpen(false);
      toast.info("Meeting deleted");
      
      // Reload meetings
      loadMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error);
      toast.error('Failed to delete meeting');
    }
  };

  const openDetailPanel = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsDetailPanelOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "Rescheduled":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "Video Call":
        return <Video className="h-3 w-3" />;
      case "Phone Call":
        return <Phone className="h-3 w-3" />;
      default:
        return <MapPin className="h-3 w-3" />;
    }
  };

  // Filter meetings based on status, time, and search
  const filteredMeetings = meetings.filter(meeting => {
    const matchesStatus = filterStatus === "All" || meeting.status === filterStatus;
    const meetingDate = new Date(meeting.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let matchesTime = true;
    if (filterTime === "Upcoming") {
      matchesTime = meetingDate >= today;
    } else if (filterTime === "Past") {
      matchesTime = meetingDate < today;
    }
    
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.linkedContact.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesTime && matchesSearch;
  });

  // Calculate summary stats
  const upcomingCount = meetings.filter(m => new Date(m.date) >= new Date()).length;
  const pastCount = meetings.filter(m => new Date(m.date) < new Date()).length;
  const completedCount = meetings.filter(m => m.status === "Completed").length;
  const cancelledCount = meetings.filter(m => m.status === "Cancelled").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meeting Tracker</h1>
        <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Meeting
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Meetings</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Past Meetings</p>
                <p className="text-2xl font-bold text-gray-600">{pastCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search meetings, contacts, or organisations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterTime} onValueChange={setFilterTime}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Time filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Time</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Past">Past</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Rescheduled">Rescheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Meetings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Meetings ({filteredMeetings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Loading meetings...</p>
            </div>
          ) : !user ? (
            <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Please log in to view meetings</p>
            </div>
          ) : filteredMeetings.length === 0 ? (
            <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">No meetings found</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meeting Title</TableHead>
                    <TableHead>With</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Lead Link</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMeetings.map((meeting) => (
                    <TableRow 
                      key={meeting.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => openDetailPanel(meeting)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(meeting.type)}
                          {meeting.title}
                        </div>
                      </TableCell>
                      <TableCell>{meeting.linkedContact || "—"}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{meeting.date}</div>
                          <div className="text-gray-500">{meeting.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(meeting.status)}>
                          {meeting.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{meeting.leadLink || "—"}</TableCell>
                      <TableCell>{meeting.assignedTo || "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetailPanel(meeting);
                            }}
                            className="h-8 w-8"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMeeting(meeting.id);
                            }}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Meeting Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Sales Discussion" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="linkedContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Linked Contact/Organization *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe / ABC Sports Club" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                          <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="In-Person">In-Person</SelectItem>
                          <SelectItem value="Video Call">Video Call</SelectItem>
                          <SelectItem value="Phone Call">Phone Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="leadLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Link to related lead or opportunity" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Input placeholder="Team member responsible" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location / Meeting Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Office address or video call link" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Meeting agenda, preparation items, or additional notes..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-sportbnk-green hover:bg-sportbnk-green/90">
                  Schedule Meeting
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Meeting Detail Panel */}
      <Dialog open={isDetailPanelOpen} onOpenChange={setIsDetailPanelOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Meeting Details
            </DialogTitle>
          </DialogHeader>
          {selectedMeeting && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedMeeting.title}</h3>
                <p className="text-gray-600">with {selectedMeeting.linkedContact}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Date & Time</label>
                  <p className="font-medium">{selectedMeeting.date} at {selectedMeeting.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-1">
                    <Badge variant="outline" className={getStatusColor(selectedMeeting.status)}>
                      {selectedMeeting.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {selectedMeeting.leadLink && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Lead Link</label>
                  <p className="font-medium">{selectedMeeting.leadLink}</p>
                </div>
              )}
              
              {selectedMeeting.assignedTo && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Assigned To</label>
                  <p className="font-medium">{selectedMeeting.assignedTo}</p>
                </div>
              )}
              
              {selectedMeeting.location && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  {selectedMeeting.location.startsWith('http') ? (
                    <a 
                      href={selectedMeeting.location} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {selectedMeeting.location}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <p className="font-medium">{selectedMeeting.location}</p>
                  )}
                </div>
              )}
              
              {selectedMeeting.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Notes</label>
                  <p className="bg-muted/20 p-3 rounded-md text-sm">{selectedMeeting.notes}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Meeting
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => deleteMeeting(selectedMeeting.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Meetings;
