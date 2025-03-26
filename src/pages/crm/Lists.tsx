
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, ChevronsUpDown, Copy, Edit, Trash2, Download, UserPlus } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  TableCaption,
  TableCell,
  TableFooter,
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
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Progress } from "@/components/ui/progress"
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
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
import { cn } from "@/lib/utils"
import { ContactsView } from "@/components/crm/ContactsView";
import PageLayout from "@/components/PageLayout";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { toast } from "sonner";

// Define the schema for the form
const formSchema = z.object({
  listName: z.string().min(2, {
    message: "List name must be at least 2 characters.",
  }),
  description: z.string().optional(),
})

const Lists = () => {
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [contacts, setContacts] = useState([
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', company: 'ABC Corp' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', company: 'XYZ Ltd' },
    { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', company: '123 Inc' },
  ]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSavedList, setIsSavedList] = useState(true);
  const [lists, setLists] = useState<{id: string, name: string, description?: string, contacts: any[]}[]>([
    { id: '1', name: 'My Contacts', description: 'Default contact list', contacts: [] }
  ]);
  const [activeList, setActiveList] = useState(lists[0]);

  const queryClient = useQueryClient();
  const { toast: uiToast } = useToast();

  // Form logic
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listName: "",
      description: "",
    },
  });

  // Function to handle form submission
  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    // Create a new list
    const newList = { 
      id: Date.now().toString(),
      name: values.listName, // Set the name property explicitly
      description: values.description,
      contacts: []
    };
    
    setLists(prev => [...prev, newList]);
    setActiveList(newList);
    
    // Show a success toast
    toast.success("List created successfully", {
      description: `Your new list "${values.listName}" has been created.`
    });

    // Close the dialog
    setIsCreateListOpen(false);
    
    // Reset the form
    form.reset();
  }, [form]);

  // Function to handle contact selection
  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]
    );
  };

  // Function to handle select all contacts
  const handleSelectAll = () => {
    const allContactIds = contacts.map(contact => contact.id);
    setSelectedContacts(allContactIds);
  };

  // Function to handle deselect all contacts
  const handleDeselectAll = () => {
    setSelectedContacts([]);
  };

  // Function to add selected contacts to the active list
  const handleAddToList = useCallback(() => {
    if (selectedContacts.length === 0) {
      toast.error("No contacts selected", {
        description: "Please select contacts to add to your list."
      });
      return;
    }

    // Find the selected contacts
    const contactsToAdd = contacts.filter(contact => 
      selectedContacts.includes(contact.id) && 
      !activeList.contacts.some(c => c.id === contact.id)
    );

    if (contactsToAdd.length === 0) {
      toast.info("Contacts already in list", {
        description: "All selected contacts are already in your list."
      });
      return;
    }

    // Update the active list with the new contacts
    const updatedList = {
      ...activeList,
      contacts: [...activeList.contacts, ...contactsToAdd]
    };

    // Update the lists array
    setLists(prev => prev.map(list => 
      list.id === activeList.id ? updatedList : list
    ));
    
    // Update the active list
    setActiveList(updatedList);

    // Show a success toast
    toast.success(`${contactsToAdd.length} contacts added to list`, {
      description: `Added to "${activeList.name}"`
    });

    // Clear the selection
    setSelectedContacts([]);
  }, [activeList, contacts, selectedContacts]);

  // Function to handle export to CSV
  const handleExportToCsv = useCallback(() => {
    if (!activeList || activeList.contacts.length === 0) {
      toast.error("No contacts to export", {
        description: "Your list is empty. Add contacts to export."
      });
      return;
    }

    try {
      // Create CSV content
      const headers = ["Name", "Email", "Company"];
      const rows = activeList.contacts.map(contact => [
        `"${contact.name.replace(/"/g, '""')}"`, 
        `"${contact.email.replace(/"/g, '""')}"`, 
        `"${contact.company.replace(/"/g, '""')}"`
      ]);
      
      // Combine headers and rows
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
      ].join("\n");
      
      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${activeList.name.replace(/\s+/g, '_')}_contacts.csv`);
      
      // Append the link to the document
      document.body.appendChild(link);
      
      // Click the link to trigger the download
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show a success toast
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

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout pageTitle="Lists">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Contact Lists</h1>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" /> Create List
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Create a new list</DrawerTitle>
                  <DrawerDescription>
                    Give your list a name and description.
                  </DrawerDescription>
                </DrawerHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <DrawerFooter>
                      <Button type="submit">Create</Button>
                    </DrawerFooter>
                  </form>
                </Form>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Select
              defaultValue={activeList.id}
              onValueChange={(value) => {
                const selected = lists.find(list => list.id === value);
                if (selected) setActiveList(selected);
              }}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select a list" />
              </SelectTrigger>
              <SelectContent>
                {lists.map(list => (
                  <SelectItem key={list.id} value={list.id}>
                    {list.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {activeList?.contacts?.length || 0} contacts
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleAddToList}
              disabled={selectedContacts.length === 0}
            >
              <UserPlus className="h-4 w-4 mr-2" /> 
              Add Selected to List
            </Button>
            
            <Button
              variant="outline"
              onClick={handleExportToCsv}
              disabled={!activeList || activeList.contacts.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Contacts View */}
        <ContactsView
          data={filteredContacts}
          onSelectContact={handleSelectContact}
          selectedContacts={selectedContacts}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onAddToList={handleAddToList}
          isSavedList={true}
        />
      </div>
    </PageLayout>
  );
};

export default Lists;
