
import React, { useState, useReducer } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Calendar, Clock, X } from "lucide-react";
import { toast } from "sonner";

type Priority = "High" | "Medium" | "Low";
type Status = "Todo" | "In Progress" | "Done";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  assignedTo: string;
  relatedTo: string;
  createdAt: Date;
}

type FormState = Omit<Task, "id" | "createdAt">;

type FormAction = 
  | { type: "SET_FIELD", field: keyof FormState, value: string }
  | { type: "RESET" };

const initialFormState: FormState = {
  title: "",
  description: "",
  dueDate: new Date().toISOString().split('T')[0],
  priority: "Medium",
  status: "Todo",
  assignedTo: "",
  relatedTo: ""
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { 
        ...state, 
        [action.field]: action.value 
      };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
};

// Initial dummy tasks
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Follow up with Manchester United",
    description: "Send email regarding sponsorship opportunity",
    dueDate: "2023-06-15",
    priority: "High",
    status: "Todo",
    assignedTo: "Me",
    relatedTo: "Manchester United",
    createdAt: new Date("2023-06-10")
  },
  {
    id: 2,
    title: "Prepare presentation for LA Lakers",
    description: "Create slides for the partnership proposal",
    dueDate: "2023-06-18",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Jane Smith",
    relatedTo: "LA Lakers",
    createdAt: new Date("2023-06-12")
  },
  {
    id: 3,
    title: "Review contract with Real Madrid",
    description: "Check the terms and conditions of the new agreement",
    dueDate: "2023-06-20",
    priority: "High",
    status: "Done",
    assignedTo: "Legal Team",
    relatedTo: "Real Madrid",
    createdAt: new Date("2023-06-05")
  }
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  
  const handleCreateTask = () => {
    // Basic validation
    if (!formState.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    
    const newTask: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      ...formState,
      createdAt: new Date()
    };
    
    setTasks([...tasks, newTask]);
    dispatch({ type: "RESET" });
    setShowForm(false);
    toast.success("Task created successfully");
  };
  
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success("Task deleted successfully");
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "todo") return task.status === "Todo";
    if (filter === "inprogress") return task.status === "In Progress";
    if (filter === "done") return task.status === "Done";
    return true;
  });
  
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High": return "text-red-500";
      case "Medium": return "text-amber-500";
      case "Low": return "text-green-500";
      default: return "text-amber-500";
    }
  };
  
  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "Todo": 
        return <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">Todo</span>;
      case "In Progress": 
        return <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">In Progress</span>;
      case "Done": 
        return <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">Completed</span>;
      default:
        return <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">Todo</span>;
    }
  };
  
  return (
    <div className="container max-w-full px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-sportbnk-navy">Tasks</h1>
        <Button onClick={() => setShowForm(!showForm)} className="bg-sportbnk-navy hover:bg-sportbnk-navy/90">
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>
      
      {showForm && (
        <Card className="mb-6 border-sportbnk-navy border-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Create New Task</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input 
                    placeholder="Task title" 
                    value={formState.title}
                    onChange={(e) => dispatch({ 
                      type: "SET_FIELD", 
                      field: "title", 
                      value: e.target.value 
                    })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea 
                    placeholder="Task description" 
                    className="min-h-20" 
                    value={formState.description}
                    onChange={(e) => dispatch({ 
                      type: "SET_FIELD", 
                      field: "description", 
                      value: e.target.value 
                    })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Due Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="date" 
                      className="pl-10" 
                      value={formState.dueDate}
                      onChange={(e) => dispatch({ 
                        type: "SET_FIELD", 
                        field: "dueDate", 
                        value: e.target.value 
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Priority</label>
                  <Select 
                    value={formState.priority}
                    onValueChange={(value) => dispatch({ 
                      type: "SET_FIELD", 
                      field: "priority", 
                      value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select 
                    value={formState.status}
                    onValueChange={(value) => dispatch({ 
                      type: "SET_FIELD", 
                      field: "status", 
                      value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todo">Todo</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Assigned To</label>
                  <Input 
                    placeholder="Assignee" 
                    value={formState.assignedTo}
                    onChange={(e) => dispatch({ 
                      type: "SET_FIELD", 
                      field: "assignedTo", 
                      value: e.target.value 
                    })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Related To</label>
                  <Input 
                    placeholder="Related to (e.g., team, contact)" 
                    value={formState.relatedTo}
                    onChange={(e) => dispatch({ 
                      type: "SET_FIELD", 
                      field: "relatedTo", 
                      value: e.target.value 
                    })}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
              <Button onClick={handleCreateTask} className="bg-sportbnk-navy hover:bg-sportbnk-navy/90">Create Task</Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex gap-2 mb-4">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-sportbnk-navy hover:bg-sportbnk-navy/90" : ""}
        >
          All
        </Button>
        <Button 
          variant={filter === "todo" ? "default" : "outline"} 
          onClick={() => setFilter("todo")}
          className={filter === "todo" ? "bg-sportbnk-navy hover:bg-sportbnk-navy/90" : ""}
        >
          Todo
        </Button>
        <Button 
          variant={filter === "inprogress" ? "default" : "outline"} 
          onClick={() => setFilter("inprogress")}
          className={filter === "inprogress" ? "bg-sportbnk-navy hover:bg-sportbnk-navy/90" : ""}
        >
          In Progress
        </Button>
        <Button 
          variant={filter === "done" ? "default" : "outline"} 
          onClick={() => setFilter("done")}
          className={filter === "done" ? "bg-sportbnk-navy hover:bg-sportbnk-navy/90" : ""}
        >
          Completed
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No tasks found. Create a new task to get started.
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="border-l-4" style={{ borderLeftColor: task.priority === "High" ? "#ef4444" : task.priority === "Medium" ? "#f59e0b" : "#10b981" }}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)} className="text-red-500 hover:text-red-700 h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {task.dueDate}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Priority</p>
                    <p className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <div>{getStatusBadge(task.status)}</div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="text-sm">{task.assignedTo}</p>
                  </div>
                  
                  {task.relatedTo && (
                    <div className="col-span-2">
                      <p className="text-xs text-muted-foreground">Related To</p>
                      <p className="text-sm text-blue-600">{task.relatedTo}</p>
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

export default Tasks;
