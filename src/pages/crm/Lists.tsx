
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Download, UserPlus, Trash2 } from 'lucide-react';
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import PageLayout from "@/components/PageLayout";
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';

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
  company: string;
  mobile?: string;
  role?: string;
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
  const [searchTerm, setSearchTerm] = useState('');
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

  // Handle contact passed from People page
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
    
    setLists(prev => [...prev, newList]);
    setActiveList(newList);
    
    toast.success("List created successfully", {
      description: `Your new list "${values.listName}" has been created.`
    });

    setIsCreateListOpen(false);
    form.reset();
  }, [form]);

  // Function to handle export to CSV
  const handleExportToCsv = useCallback(() => {
    if (!activeList || activeList.contacts.length === 0) {
      toast.error("No contacts to export", {
        description: "Your list is empty. Add contacts to export."
      });
      return;
    }

    try {
      const headers = ["Name", "Role", "Company", "Email", "Mobile"];
      const rows = activeList.contacts.map(contact => [
        `"${contact.name.replace(/"/g, '""')}"`,
        `"${(contact.role || 'Not specified').replace(/"/g, '""')}"`,
        `"${contact.company.replace(/"/g, '""')}"`,
        `"${contact.email.replace(/"/g, '""')}"`,
        `"${contact.mobile || 'Not available'}"`
      ]);
      
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
      ].join("\n");
      
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${activeList.name.replace(/\s+/g, '_')}_contacts.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Export completed", {
        description: `${activeList.contacts.length} contacts exported to CSV.`
      });
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Export failed", {
        description: "There was an error exporting your contacts. Please try again."
      });
    }
  }, [activeList]);

  // Function to remove contact from list
  const handleRemoveContact = (contactId: string) => {
    const updatedList = {
      ...activeList,
      contacts: activeList.contacts.filter(c => c.id !== contactId)
    };
    
    setLists(prev => prev.map(list => 
      list.id === activeList.id ? updatedList : list
    ));
    
    setActiveList(updatedList);
    toast.success("Contact removed from list");
  };

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

  // Filter contacts based on search term
  const filteredContacts = activeList.contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.role && contact.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <PageLayout pageTitle="Contact Lists">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Lists</h1>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
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
              defaultValue={activeList.id}
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
            <Button
              variant="outline"
              onClick={handleExportToCsv}
              disabled={!activeList || activeList.contacts.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            
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

        {/* Contacts Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.role || 'Not specified'}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.mobile || 'Not available'}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveContact(contact.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? 'No contacts found matching your search.' : 'No contacts in this list. Add contacts from the People page.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageLayout>
  );
};

export default Lists;
