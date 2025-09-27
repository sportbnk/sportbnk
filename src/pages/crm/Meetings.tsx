import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar,
  Plus,
  Clock,
  MapPin,
  User,
  Video,
  Phone,
  ExternalLink
} from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: 'Video Call' | 'Phone Call' | 'In Person';
  attendees: string[];
  location?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Partnership Discussion - Arsenal FC',
    date: '2024-01-15',
    time: '14:00',
    duration: '1h',
    type: 'Video Call',
    attendees: ['Sarah Johnson', 'Mike Thompson'],
    status: 'Scheduled'
  },
  {
    id: '2',
    title: 'Contract Review - Manchester United',
    date: '2024-01-14',
    time: '10:30',
    duration: '45m',
    type: 'Phone Call',
    attendees: ['David Martinez'],
    status: 'Completed'
  },
  {
    id: '3',
    title: 'Quarterly Review Meeting',
    date: '2024-01-16',
    time: '16:00',
    duration: '2h',
    type: 'In Person',
    attendees: ['Team Leads'],
    location: 'Conference Room A',
    status: 'Scheduled'
  },
  {
    id: '4',
    title: 'Client Onboarding - Liverpool FC',
    date: '2024-01-13',
    time: '11:00',
    duration: '30m',
    type: 'Video Call',
    attendees: ['Emma Wilson', 'James Brown'],
    status: 'Completed'
  }
];

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);

  const handleNewMeeting = () => {
    console.log('New meeting clicked');
  };

  const handleConnectCalendar = () => {
    console.log('Connect calendar clicked');
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Call':
        return <Video className="h-4 w-4" />;
      case 'Phone Call':
        return <Phone className="h-4 w-4" />;
      case 'In Person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
            <p className="text-gray-600 mt-1">Manage your meeting schedule</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleNewMeeting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Meeting
            </Button>
            <Button 
              onClick={handleConnectCalendar}
              variant="outline"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Connect Calendar
            </Button>
          </div>
        </div>

        {/* Meetings List */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming & Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                        {getTypeIcon(meeting.type)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {meeting.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(meeting.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{meeting.time} ({meeting.duration})</span>
                          </div>
                          {meeting.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{meeting.location}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {meeting.attendees.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={`text-xs ${getStatusColor(meeting.status)}`}>
                        {meeting.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {meeting.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {meetings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings scheduled</h3>
                <p className="text-gray-600">Create your first meeting to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Meetings;