import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, ChevronsUpDown, Copy, Edit, Trash2, Download } from 'lucide-react';
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

  const queryClient = useQueryClient();
  const { toast } = useToast()

  // Form logic
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listName: "",
      description: "",
    },
  })

  // Function to handle form submission
  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    // Here, you would typically make an API call to save the list
    console.log("Form values:", values);

    // Optimistically update the cache
    queryClient.setQueryData(['lists'], (old: any) => {
      return [...(old || []), { ...values, id: Date.now().toString() }]
    })

    // Show a success toast
    toast({
      title: "List created.",
      description: "Your list has been successfully created.",
    })

    // Close the dialog
    setIsCreateListOpen(false);
  }, [queryClient, toast]);

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

        {/* Contacts View */}
        <ContactsView
          data={filteredContacts}
          onSelectContact={handleSelectContact}
          selectedContacts={selectedContacts}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onAddToList={() => {}} // Add the missing prop with an empty function
          isSavedList={true}
        />
      </div>
    </PageLayout>
  );
};

export default Lists;
