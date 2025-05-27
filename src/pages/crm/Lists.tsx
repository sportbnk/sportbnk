
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';
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

// Define the schema for the form
const formSchema = z.object({
  listName: z.string().min(2, {
    message: "List name must be at least 2 characters.",
  }),
  description: z.string().optional(),
})

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  team: string;
  teamId?: number;
  linkedin?: string;
  verified?: boolean;
  activeReplier?: boolean;
}

interface ContactList {
  id: string;
  name: string;
  description?: string;
  contacts: Contact[];
}

const Lists = () => {
  const location = useLocation();
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [lists, setLists] = useState<ContactList[]>([
    { id: '1', name: 'My Contacts', description: 'Default contact list', contacts: [] }
  ]);
  const [activeList, setActiveList] = useState(lists[0]);

  // Form logic
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listName: "",
      description: "",
    },
  });

  // Load lists from localStorage on component mount
  useEffect(() => {
    const storedLists = localStorage.getItem('contactLists');
    if (storedLists) {
      try {
        const parsedLists = JSON.parse(storedLists);
        if (Array.isArray(parsedLists) && parsedLists.length > 0) {
          setLists(parsedLists);
          setActiveList(parsedLists[0]);
        }
      } catch (error) {
        console.error('Error parsing lists from localStorage:', error);
      }
    }
  }, []);

  // Save lists to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem('contactLists', JSON.stringify(lists));
  }, [lists]);

  // Handle contact passed from People or Teams page
  useEffect(() => {
    if (location.state?.contactToAdd) {
      const contactToAdd = location.state.contactToAdd as Contact;
      
      // Check if contact is already in the active list
      const isAlreadyInList = activeList.contacts.some(c => c.id === contactToAdd.id);
      
      if (!isAlreadyInList) {
        const updatedList = {
          ...activeList,
          contacts: [...activeList.contacts, contactToAdd]
        };
        
        setLists(prev => prev.map(list => 
          list.id === activeList.id ? updatedList : list
        ));
        
        setActiveList(updatedList);
        
        toast.success(`Added ${contactToAdd.name} to ${activeList.name}`);
      } else {
        toast.info(`${contactToAdd.name} is already in ${activeList.name}`);
      }
      
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state, activeList]);

  // Function to handle form submission
  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    const newList: ContactList = { 
      id: Date.now().toString(),
      name: values.listName,
      description: values.description,
      contacts: []
    };
    
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    setActiveList(newList);
    
    toast.success("List created successfully", {
      description: `Your new list "${values.listName}" has been created.`
    });

    setIsCreateListOpen(false);
    form.reset();
  }, [lists, form]);

  // Function to delete list
  const handleDeleteList = () => {
    if (lists.length <= 1) {
      toast.error("Cannot delete the last list");
      return;
    }
    
    const updatedLists = lists.filter(list => list.id !== activeList.id);
    setLists(updatedLists);
    setActiveList(updatedLists[0]);
    toast.success(`Deleted list "${activeList.name}"`);
  };

  // Function to remove contact from list
  const handleRemoveFromList = (contactId: number) => {
    const updatedList = {
      ...activeList,
      contacts: activeList.contacts.filter(contact => contact.id !== contactId.toString())
    };
    
    setLists(prev => prev.map(list => 
      list.id === activeList.id ? updatedList : list
    ));
    
    setActiveList(updatedList);
    toast.info("Contact removed from list");
  };

  // Function to export to CSV
  const handleExportCSV = () => {
    if (activeList.contacts.length === 0) {
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
        `"${contact.linkedin || ''}"`
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lists</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleExportCSV}
            disabled={activeList.contacts.length === 0}
          >
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Dialog open={isCreateListOpen} onOpenChange={setIsCreateListOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" /> Create List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new list</DialogTitle>
                <DialogDescription>
                  Give your list a name and description.
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
                          <Input placeholder="Marketing Leads" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the name of your list.
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A brief description of the list."
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
                    <Button type="submit">Create</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Select
            value={activeList.id}
            onValueChange={(value) => {
              const selected = lists.find(list => list.id === value);
              if (selected) setActiveList(selected);
            }}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a list" />
            </SelectTrigger>
            <SelectContent>
              {lists.map(list => (
                <SelectItem key={list.id} value={list.id}>
                  {list.name} ({list.contacts.length} contacts)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {activeList.description && (
            <span className="text-sm text-muted-foreground">
              {activeList.description}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="text-red-600 hover:text-red-700"
                disabled={lists.length <= 1}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete List
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the list "{activeList.name}" and all its contacts. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteList} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* List Content */}
      <div className="bg-white rounded-lg border">
        {activeList.contacts.length > 0 ? (
          <ContactsView 
            data={activeList.contacts}
            revealedEmails={{}}
            revealedPhones={{}}
            onRevealEmail={() => {}}
            onRevealPhone={() => {}}
            onViewTeam={() => {}}
            onAddToList={() => {}}
            onRemoveFromList={handleRemoveFromList}
            isSavedList={true}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">{activeList.name}</h3>
            {activeList.description && (
              <p className="text-muted-foreground mb-4">{activeList.description}</p>
            )}
            <p className="text-muted-foreground">
              No contacts in this list yet. Add contacts from the People or Teams pages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
