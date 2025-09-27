import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  CheckSquare,
  Plus,
  Clock,
  User,
  Calendar,
  AlertCircle,
  FileText,
  Settings
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Completed';
  assignee: string;
  category: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with Arsenal FC',
    description: 'Send partnership proposal and schedule follow-up meeting',
    dueDate: '2024-01-16',
    priority: 'High',
    status: 'To Do',
    assignee: 'Sarah Johnson',
    category: 'Sales'
  },
  {
    id: '2',
    title: 'Contract review - Manchester United',
    description: 'Review contract terms and prepare feedback document',
    dueDate: '2024-01-15',
    priority: 'High',
    status: 'In Progress',
    assignee: 'David Martinez',
    category: 'Legal'
  },
  {
    id: '3',
    title: 'Prepare quarterly report',
    description: 'Compile Q4 sales data and create presentation',
    dueDate: '2024-01-20',
    priority: 'Medium',
    status: 'To Do',
    assignee: 'Emma Thompson',
    category: 'Reporting'
  },
  {
    id: '4',
    title: 'Client onboarding - Liverpool FC',
    description: 'Set up client portal and send welcome package',
    dueDate: '2024-01-12',
    priority: 'Medium',
    status: 'Completed',
    assignee: 'James Wilson',
    category: 'Onboarding'
  },
  {
    id: '5',
    title: 'Update CRM database',
    description: 'Clean up duplicate contacts and update missing information',
    dueDate: '2024-01-18',
    priority: 'Low',
    status: 'To Do',
    assignee: 'Maria Rodriguez',
    category: 'Admin'
  }
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleNewTask = () => {
    console.log('New task clicked');
  };

  const handleTaskSettings = () => {
    console.log('Task settings clicked');
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'To Do': 'bg-gray-100 text-gray-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'High': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== 'Completed';
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
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-1">Manage your tasks and stay organized</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleNewTask}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
            <Button 
              onClick={handleTaskSettings}
              variant="outline"
            >
              <Settings className="h-4 w-4 mr-2" />
              Task Settings
            </Button>
          </div>
        </div>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {tasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                        {getStatusIcon(task.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {task.title}
                          </h3>
                          {isOverdue(task.dueDate, task.status) && (
                            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span className={isOverdue(task.dueDate, task.status) ? 'text-red-600 font-medium' : ''}>
                              Due: {formatDate(task.dueDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{task.assignee}</span>
                          </div>
                        </div>
                        
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {tasks.length === 0 && (
              <div className="text-center py-12">
                <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-600">Create your first task to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tasks;