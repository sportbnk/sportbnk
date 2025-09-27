import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  Users, 
  ExternalLink,
  Video,
  MapPin,
  Edit2,
  Trash2,
  Link
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  attendees: string[];
  location: string;
  type: 'video' | 'in-person' | 'phone';
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
  createdAt: string;
}

const Meetings = () => {
  const { toast } = useToast();
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Arsenal FC Partnership Discussion',
      description: 'Initial meeting to discuss potential sponsorship opportunities',
      date: '2024-01-15',
      time: '14:00',
      duration: 60,
      attendees: ['John Smith', 'Sarah Johnson', 'Arsenal Representative'],
      location: 'Emirates Stadium, London',
      type: 'in-person',
      status: 'scheduled',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Weekly Team Sync',
      description: 'Review progress on current deals and upcoming opportunities',
      date: '2024-01-12',
      time: '10:00',
      duration: 30,
      attendees: ['Team Lead', 'Sales Manager', 'Marketing Director'],
      location: 'Conference Room A',
      type: 'video',
      status: 'completed',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      createdAt: '2024-01-05'
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 60,
    attendees: '',
    location: '',
    type: 'video' as const
  });

  const handleCreateMeeting = () => {
    if (!newMeeting.title.trim() || !newMeeting.date || !newMeeting.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const meeting: Meeting = {
      id: Date.now().toString(),
      ...newMeeting,
      attendees: newMeeting.attendees.split(',').map(a => a.trim()).filter(a => a),
      status: 'scheduled',
      createdAt: new Date().toISOString().split('T')[0],
      meetingLink: newMeeting.type === 'video' ? 'https://meet.google.com/generated-link' : undefined
    };

    setMeetings(prev => [meeting, ...prev]);
    setNewMeeting({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 60,
      attendees: '',
      location: '',
      type: 'video'
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Meeting created",
      description: "New meeting has been scheduled successfully",
    });
  };

  const connectCalendar = (provider: string) => {
    // Mock calendar connection
    setCalendarConnected(true);
    toast({
      title: "Calendar connected",
      description: `Successfully connected to ${provider}`,
    });
  };

  const deleteMeeting = (meetingId: string) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== meetingId));
    toast({
      title: "Meeting deleted",
      description: "Meeting has been removed",
    });
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Clock className="h-4 w-4" />;
      case 'in-person': return <MapPin className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const upcomingMeetings = meetings.filter(meeting => 
    meeting.status === 'scheduled' && new Date(meeting.date) >= new Date()
  );

  const pastMeetings = meetings.filter(meeting => 
    meeting.status === 'completed' || new Date(meeting.date) < new Date()
  );

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CalendarIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Meetings</h1>
            <p className="text-muted-foreground">Schedule and manage your meetings</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Meeting Title</label>
                    <Input
                      value={newMeeting.title}
                      onChange={(e) => setNewMeeting(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter meeting title"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={newMeeting.description}
                      onChange={(e) => setNewMeeting(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter meeting description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      type="date"
                      value={newMeeting.date}
                      onChange={(e) => setNewMeeting(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <Input
                      type="time"
                      value={newMeeting.time}
                      onChange={(e) => setNewMeeting(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration (minutes)</label>
                    <Select value={newMeeting.duration.toString()} onValueChange={(value) => setNewMeeting(prev => ({ ...prev, duration: parseInt(value) }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Meeting Type</label>
                    <Select value={newMeeting.type} onValueChange={(value: any) => setNewMeeting(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="in-person">In Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Attendees (comma-separated)</label>
                    <Input
                      value={newMeeting.attendees}
                      onChange={(e) => setNewMeeting(prev => ({ ...prev, attendees: e.target.value }))}
                      placeholder="john@example.com, sarah@company.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Location/Meeting Link</label>
                    <Input
                      value={newMeeting.location}
                      onChange={(e) => setNewMeeting(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={newMeeting.type === 'video' ? 'Auto-generated video link' : 'Enter location or phone number'}
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateMeeting}>
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Calendar Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Calendar Integration
          </CardTitle>
          <CardDescription>
            Connect your calendar to sync meetings and avoid conflicts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!calendarConnected ? (
            <div className="flex gap-4">
              <Button onClick={() => connectCalendar('Google Calendar')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect Google Calendar
              </Button>
              <Button variant="outline" onClick={() => connectCalendar('Outlook')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect Outlook
              </Button>
              <Button variant="outline" onClick={() => connectCalendar('Apple Calendar')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect Apple Calendar
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                Calendar Connected
              </Badge>
              <p className="text-sm text-muted-foreground">
                Your meetings will be automatically synced with your calendar
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meeting Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{meetings.length}</p>
                <p className="text-sm text-muted-foreground">Total Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingMeetings.length}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pastMeetings.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meetings List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings ({upcomingMeetings.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{meeting.title}</h4>
                    <p className="text-sm text-muted-foreground">{meeting.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteMeeting(meeting.id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3" />
                    {meeting.date} at {meeting.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {meeting.duration} minutes
                  </div>
                  <div className="flex items-center gap-2">
                    {getMeetingTypeIcon(meeting.type)}
                    {meeting.type === 'video' ? 'Video Call' : meeting.type === 'phone' ? 'Phone Call' : 'In Person'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    {meeting.attendees.length} attendees
                  </div>
                </div>

                {meeting.meetingLink && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Join Meeting
                      </a>
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {meeting.location}
                  </div>
                </div>
              </div>
            ))}
            {upcomingMeetings.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No upcoming meetings</p>
            )}
          </CardContent>
        </Card>

        {/* Past Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Past Meetings ({pastMeetings.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pastMeetings.map((meeting) => (
              <div key={meeting.id} className="p-4 border rounded-lg space-y-3 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{meeting.title}</h4>
                    <p className="text-sm text-muted-foreground">{meeting.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteMeeting(meeting.id)}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3" />
                    {meeting.date} at {meeting.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {meeting.duration} minutes
                  </div>
                  <div className="flex items-center gap-2">
                    {getMeetingTypeIcon(meeting.type)}
                    {meeting.type === 'video' ? 'Video Call' : meeting.type === 'phone' ? 'Phone Call' : 'In Person'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    {meeting.attendees.length} attendees
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(meeting.status)}>
                    {meeting.status}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {meeting.location}
                  </div>
                </div>
              </div>
            ))}
            {pastMeetings.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No past meetings</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Meetings;