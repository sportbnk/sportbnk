import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, MapPin, User, Trash2, Video, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface MeetingEntry {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: 'Video Call' | 'In Person' | 'Phone Call';
  location?: string;
  attendees: string;
  notes?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

const Meetings = () => {
  const [meetings, setMeetings] = useState<MeetingEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { register, handleSubmit, reset, watch } = useForm<MeetingEntry>();

  const onSubmit = (data: MeetingEntry) => {
    const newMeeting: MeetingEntry = {
      ...data,
      id: Date.now().toString(),
      status: 'Scheduled'
    };
    
    setMeetings(prev => [newMeeting, ...prev]);
    reset();
    setIsDialogOpen(false);
    toast.success("Meeting scheduled successfully!");
  };

  const deleteMeeting = (id: string) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
    toast.info("Meeting deleted");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Call': return <Video className="h-4 w-4" />;
      case 'Phone Call': return <Calendar className="h-4 w-4" />;
      case 'In Person': return <Users className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage your meetings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  {...register('title', { required: true })}
                  placeholder="Meeting title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    {...register('date', { required: true })}
                    type="date"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    {...register('time', { required: true })}
                    type="time"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <Select onValueChange={(value) => register('duration').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15 minutes">15 minutes</SelectItem>
                      <SelectItem value="30 minutes">30 minutes</SelectItem>
                      <SelectItem value="1 hour">1 hour</SelectItem>
                      <SelectItem value="2 hours">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select onValueChange={(value) => register('type').onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Video Call">Video Call</SelectItem>
                      <SelectItem value="Phone Call">Phone Call</SelectItem>
                      <SelectItem value="In Person">In Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Attendees</label>
                <Input
                  {...register('attendees', { required: true })}
                  placeholder="Email addresses, separated by commas"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Location (optional)</label>
                <Input
                  {...register('location')}
                  placeholder="Meeting location or video link"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Notes (optional)</label>
                <Textarea
                  {...register('notes')}
                  placeholder="Meeting agenda or notes"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Schedule Meeting
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {meetings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No meetings scheduled</h3>
              <p className="text-muted-foreground text-center">
                Schedule your first meeting to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          meetings.map((meeting) => (
            <Card key={meeting.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getTypeIcon(meeting.type)}
                      {meeting.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {meeting.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {meeting.time} ({meeting.duration})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMeeting(meeting.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Attendees:</span> {meeting.attendees}
                  </div>
                  
                  {meeting.location && (
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Location:</span> {meeting.location}
                    </div>
                  )}
                  
                  <div className="text-sm">
                    <span className="font-medium">Type:</span> {meeting.type}
                  </div>
                  
                  {meeting.notes && (
                    <div className="text-sm">
                      <span className="font-medium">Notes:</span>
                      <p className="mt-1 text-muted-foreground">{meeting.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Meetings;