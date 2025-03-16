
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CallEntry {
  id: string;
  contactName: string;
  team: string;
  date: string;
  duration: string;
  notes: string;
  outcome: "Positive" | "Neutral" | "Negative" | "Follow-up Required";
}

const Calls = () => {
  const [calls, setCalls] = useState<CallEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      contactName: "",
      team: "",
      date: new Date().toISOString().split('T')[0],
      duration: "",
      notes: "",
      outcome: "Neutral" as const
    }
  });

  const onSubmit = (data: any) => {
    const newCall = {
      id: Date.now().toString(),
      ...data
    };
    
    setCalls(prev => [newCall, ...prev]);
    setIsDialogOpen(false);
    form.reset();
    
    toast.success("Call logged successfully", {
      description: `Call with ${data.contactName} has been recorded`
    });
  };

  const deleteCall = (id: string) => {
    setCalls(calls.filter(call => call.id !== id));
    toast.info("Call record deleted");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Call Tracking</h1>
      <div className="flex justify-end">
        <Button className="bg-sportbnk-green hover:bg-sportbnk-green/90" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Log Call
        </Button>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <PhoneCall className="h-5 w-5" />
            Recent Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          {calls.length === 0 ? (
            <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">No calls logged yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {calls.map(call => (
                <div key={call.id} className="py-3 px-2 hover:bg-muted/30 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{call.contactName}</h3>
                      <p className="text-sm text-muted-foreground">{call.team}</p>
                      <div className="flex gap-3 mt-1 text-sm">
                        <span>{call.date}</span>
                        <span>{call.duration} min</span>
                        <span className={`${
                          call.outcome === "Positive" ? "text-green-600" : 
                          call.outcome === "Negative" ? "text-red-600" : 
                          call.outcome === "Follow-up Required" ? "text-orange-600" : 
                          "text-gray-600"
                        }`}>
                          {call.outcome}
                        </span>
                      </div>
                      {call.notes && (
                        <p className="mt-2 text-sm bg-muted/20 p-2 rounded-md">{call.notes}</p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => deleteCall(call.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
            <DialogTitle>Log a New Call</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team/Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="FC Barcelona" {...field} required />
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
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder="15" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="outcome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Call Outcome</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select outcome" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Positive">Positive</SelectItem>
                        <SelectItem value="Neutral">Neutral</SelectItem>
                        <SelectItem value="Negative">Negative</SelectItem>
                        <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                      </SelectContent>
                    </Select>
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
                        placeholder="Enter any notes about the call..."
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
                  Save Call
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calls;
