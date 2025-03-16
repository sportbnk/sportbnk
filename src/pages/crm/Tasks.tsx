
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Plus, Trash2, Edit, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Todo" | "In Progress" | "Completed";
  assignedTo: string;
  relatedTo: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date().toISOString().split('T')[0],
      priority: "Medium" as const,
      status: "Todo" as const,
      assignedTo: "",
      relatedTo: "",
    }
  });

  const onSubmit = (data: any) => {
    if (isEditMode && currentTaskId) {
      // Edit existing task
      setTasks(prev => 
        prev.map(task => 
          task.id === currentTaskId ? { ...task, ...data } : task
        )
      );
      toast.success("Task updated successfully");
    } else {
      // Create new task
      const newTask = {
        id: Date.now().toString(),
        ...data
      };
      
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task created successfully");
    }
    
    setIsDialogOpen(false);
    setIsEditMode(false);
    setCurrentTaskId(null);
    form.reset();
  };

  const editTask = (task: Task) => {
    form.reset(task);
    setIsEditMode(true);
    setCurrentTaskId(task.id);
    setIsDialogOpen(true);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.info("Task deleted");
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === id) {
          const newStatus = task.status === "Completed" ? "Todo" : "Completed";
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <div className="flex justify-end">
        <Button 
          className="bg-sportbnk-green hover:bg-sportbnk-green/90" 
          onClick={() => {
            form.reset({
              title: "",
              description: "",
              dueDate: new Date().toISOString().split('T')[0],
              priority: "Medium",
              status: "Todo",
              assignedTo: "",
              relatedTo: "",
            });
            setIsEditMode(false);
            setCurrentTaskId(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Your Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">No tasks created yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {tasks.map(task => (
                <div key={task.id} className={`py-3 px-2 rounded-md ${task.status === "Completed" ? "bg-muted/10" : "hover:bg-muted/30"}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Checkbox 
                        checked={task.status === "Completed"} 
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                        className={task.status === "Completed" ? "data-[state=checked]:bg-green-600" : ""}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${task.status === "Completed" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mt-1 mb-2">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority} Priority
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100">
                          Due: {task.dueDate}
                        </Badge>
                      </div>
                      
                      {task.description && (
                        <p className={`text-sm mt-1 ${task.status === "Completed" ? "text-muted-foreground" : ""}`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 mt-2 text-xs text-muted-foreground">
                        {task.assignedTo && (
                          <div>Assigned to: <span className="font-medium">{task.assignedTo}</span></div>
                        )}
                        {task.relatedTo && (
                          <div>Related to: <span className="font-medium">{task.relatedTo}</span></div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => editTask(task)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
            <DialogTitle>{isEditMode ? "Edit Task" : "Create a New Task"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Follow up with client" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Details about the task..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              {isEditMode && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Todo">Todo</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Input placeholder="Team member name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="relatedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Related To</FormLabel>
                    <FormControl>
                      <Input placeholder="Team, Deal, or Contact" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter which team, deal, or contact this task relates to
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setIsEditMode(false);
                  setCurrentTaskId(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-sportbnk-green hover:bg-sportbnk-green/90">
                  {isEditMode ? "Update Task" : "Create Task"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
