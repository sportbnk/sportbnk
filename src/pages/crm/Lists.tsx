import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Users, Calendar, Edit3, FolderOpen, Archive, Filter } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';
import ContactsView from "@/components/database/ContactsView";
import { useListsContext } from "@/contexts/ListsContext";

// Define the schema for the form
const formSchema = z.object({
  listName: z.string().min(2, {
    message: "List name must be at least 2 characters.",
  }),
  description: z.string().optional(),
})

const Lists = () => {
  const location = useLocation();
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  const { 
    lists, 
    loading, 
    createList, 
    deleteList, 
    removeContactFromList 
  } = useListsContext();

  const activeList = lists.find(list => list.id === activeListId) || null;

  // Form logic
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listName: "",
      description: "",
    },
  });

  // Set the first list as active when lists are loaded
  useEffect(() => {
    if (lists.length > 0 && !activeListId) {
      setActiveListId(lists[0].id);
    }
  }, [lists, activeListId]);

  // Handle contact passed from People or Teams page
  useEffect(() => {
    if (location.state?.contactToAdd && activeList) {
      const contactToAdd = location.state.contactToAdd;
      
      // Check if contact is already in the active list
      const isAlreadyInList = activeList.contacts.some(c => c.id === contactToAdd.id);
      
      if (!isAlreadyInList) {
        toast.info(`Please use the + button to add ${contactToAdd.name} to a list`);
      } else {
        toast.info(`${contactToAdd.name} is already in ${activeList.name}`);
      }
      
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state, activeList]);

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newListId = await createList(values.listName, values.description);
      
      if (newListId) {
        toast.success("List created successfully", {
          description: `Your new list "${values.listName}" has been created.`
        });

        setIsCreateListOpen(false);
        form.reset();
        setActiveListId(newListId);
      }
    } catch (error) {
      console.error('Error creating list:', error);
      toast.error('Failed to create list');
    }
  };

  // Function to delete list
  const handleDeleteList = async () => {
    if (!activeList) return;
    
    if (lists.length <= 1) {
      toast.error("Cannot delete the last list");
      return;
    }
    
    try {
      await deleteList(activeList.id);
      toast.success(`Deleted list "${activeList.name}"`);
      
      // Set the first available list as active
      const remainingLists = lists.filter(l => l.id !== activeList.id);
      if (remainingLists.length > 0) {
        setActiveListId(remainingLists[0].id);
      } else {
        setActiveListId(null);
      }
    } catch (error) {
      console.error('Error deleting list:', error);
      toast.error('Failed to delete list');
    }
  };

  // Function to remove contact from list
  const handleRemoveFromList = async (contactId: string) => {
    if (!activeList) return;

    try {
      await removeContactFromList(activeList.id, contactId);
      toast.info("Contact removed from list");
    } catch (error) {
      console.error('Error removing contact from list:', error);
      toast.error('Failed to remove contact from list');
    }
  };

  // Function to export to CSV
  const handleExportCSV = () => {
    if (!activeList || activeList.contacts.length === 0) {
      toast.error("No contacts to export");
      return;
    }

    const headers = ['Name', 'Position', 'Team', 'Email', 'Phone', 'LinkedIn'];
    const csvContent = [
      headers.join(','),
      ...activeList.contacts.map(contact => [
        `"${contact.name || ''}"`,
        `"${contact.position || ''}"`,
        `"${contact.team || ''}"`,
        `"${contact.email || ''}"`,
        `"${contact.phone || ''}"`,
        `"${contact.linkedin || 'n/a'}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeList.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_contacts.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Exported ${activeList.contacts.length} contacts to CSV`);
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="border-b border-border pb-4">
          <div className="h-8 bg-muted rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-64 mt-2 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contact Lists</h1>
            <p className="text-muted-foreground mt-1">
              Organize and manage your contact lists efficiently
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleExportCSV}
              disabled={!activeList || activeList.contacts.length === 0}
            >
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Dialog open={isCreateListOpen} onOpenChange={setIsCreateListOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Create List
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new list</DialogTitle>
                  <DialogDescription>
                    Give your list a name and description to organize your contacts.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="listName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>List Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Marketing Leads, VIP Contacts" {...field} />
                          </FormControl>
                          <FormDescription>
                            Choose a descriptive name for your list.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of the list purpose..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Describe the purpose of this list.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsCreateListOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create List</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Lists Overview Grid */}
      {lists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => {
            const isActive = activeListId === list.id;
            return (
              <Card 
                key={list.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isActive ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'
                }`}
                onClick={() => setActiveListId(list.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <FolderOpen className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{list.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {list.contacts.length} contacts
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        Active
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {list.description ? (
                    <CardDescription className="text-sm line-clamp-2 mb-3">
                      {list.description}
                    </CardDescription>
                  ) : (
                    <CardDescription className="text-sm text-muted-foreground/60 mb-3">
                      No description provided
                    </CardDescription>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Created {formatDate(list.created_at)}</span>
                    </div>
                    {isActive && (
                      <div className="flex items-center space-x-1">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                              disabled={lists.length <= 1}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete List</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{list.name}"? This will permanently remove the list and all its contacts. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleDeleteList} 
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete List
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No lists created yet</h3>
                <p className="text-muted-foreground">
                  Create your first list to start organizing your contacts.
                </p>
              </div>
              <Dialog open={isCreateListOpen} onOpenChange={setIsCreateListOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> Create Your First List
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active List Content */}
      {activeList && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <FolderOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{activeList.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {activeList.contacts.length} contacts • Created {formatDate(activeList.created_at)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit List
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {activeList.description && (
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{activeList.description}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              {activeList.contacts.length > 0 ? (
                <ContactsView 
                  data={activeList.contacts}
                  onViewTeam={() => {}}
                  onAddToList={() => {}}
                  onRemoveFromList={handleRemoveFromList}
                  isSavedList={true}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-muted rounded-full">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">No contacts in this list</h3>
                      <p className="text-muted-foreground">
                        Add contacts from the People page using the + button.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Lists;