
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Trash2, ExternalLink, Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Meeting {
  id: string;
  title: string;
  participants: string;
  date: string;
  time: string;
  duration: string;
  type: "In-Person" | "Video Call" | "Phone Call";
  location: string;
  notes: string;
}

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      title: "",
      participants: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      duration: "30",
      type: "Video Call" as const,
      location: "",
      notes: ""
    }
  });

  const onSubmit = (data: any) => {
    const newMeeting = {
      id: Date.now().toString(),
      ...data
    };
    
    setMeetings(prev => [newMeeting, ...prev]);
    setIsDialogOpen(false);
    form.reset();
    
    toast.success("Meeting scheduled successfully", {
      description: `"${data.title}" has been scheduled for ${data.date} at ${data.time}`
    });
  };

  const deleteMeeting = (id: string) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
    toast.info("Meeting deleted");
  };

  const getMeetingTypeIcon = (type: string) => {
    switch(type) {
      case "Video Call":
        return <Video className="h-4 w-4" />;
      case "Phone Call":
        return <Phone className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getMeetingTypeColor = (type: string) => {
    switch(type) {
      case "Video Call":
        return "bg-blue-100 text-blue-700";
      case "Phone Call":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Meetings & Calls</h1>
      <div className="flex justify-end">
        <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Meetings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {meetings.length === 0 ? (
            <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">No upcoming meetings scheduled</p>
            </div>
          ) : (
            <div className="divide-y">
              {meetings.map(meeting => (
                <div key={meeting.id} className="py-3 px-2 hover:bg-muted/30 rounded-md">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <h3 className="font-medium">{meeting.title}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteMeeting(meeting.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">With: {meeting.participants}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <Badge variant="outline" className="bg-gray-100">
                          <Calendar className="h-3 w-3 mr-1" />
                          {meeting.date} at {meeting.time}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100">
                          {meeting.duration} min
                        </Badge>
                        <Badge variant="outline" className={getMeetingTypeColor(meeting.type)}>
                          {getMeetingTypeIcon(meeting.type)}
                          <span className="ml-1">{meeting.type}</span>
                        </Badge>
                      </div>
                      {meeting.location && (
                        <div className="flex items-center mt-2 text-sm">
                          <span className="font-medium mr-2">Location:</span> 
                          {meeting.location.startsWith('http') ? (
                            <a 
                              href={meeting.location} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center"
                            >
                              {meeting.location.substring(0, 30)}...
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          ) : (
                            <span>{meeting.location}</span>
                          )}
                        </div>
                      )}
                      {meeting.notes && (
                        <p className="mt-2 text-sm bg-muted/20 p-2 rounded-md">{meeting.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a Meeting</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Sales Discussion" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Participants</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe, Jane Smith" {...field} required />
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
                      <FormLabel>Date</FormLabel>
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
                      <FormLabel>Time</FormLabel>
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
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="5" placeholder="30" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location / Meeting Link</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Office address or video call link" 
                        {...field} 
                      />
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
                        placeholder="Any preparation or agenda items..."
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
                  Schedule
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Meetings;
