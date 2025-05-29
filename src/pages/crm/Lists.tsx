import React, { useState, useEffect } from 'react';
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
import { useListsContext } from "@/contexts/ListsContext";
import InsufficientCreditsDialog from "@/components/database/InsufficientCreditsDialog";
import { useCredits } from "@/contexts/CreditsContext";

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
  const [revealedEmails, setRevealedEmails] = useState<Record<string, boolean>>({});
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});
  const [revealedLinkedins, setRevealedLinkedins] = useState<Record<string, boolean>>({});
  const [showCreditsDialog, setShowCreditsDialog] = useState(false);
  const [creditsDialogInfo, setCreditsDialogInfo] = useState<{
    required: number;
    actionType: "email" | "phone" | "linkedin";
  }>({ required: 0, actionType: "email" });
  
  const { 
    lists, 
    loading, 
    createList, 
    deleteList, 
    removeContactFromList 
  } = useListsContext();

  const { credits } = useCredits();

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

  const handleRevealEmail = (email: string, requiredCredits: number = 1) => {
    if (credits < requiredCredits) {
      setCreditsDialogInfo({ required: requiredCredits, actionType: "email" });
      setShowCreditsDialog(true);
      return;
    }
    setRevealedEmails(prev => ({ ...prev, [email]: true }));
  };

  const handleRevealPhone = (phone: string, requiredCredits: number = 2) => {
    if (credits < requiredCredits) {
      setCreditsDialogInfo({ required: requiredCredits, actionType: "phone" });
      setShowCreditsDialog(true);
      return;
    }
    setRevealedPhones(prev => ({ ...prev, [phone]: true }));
  };

  const handleRevealLinkedin = (linkedin: string, requiredCredits: number = 0) => {
    if (credits < requiredCredits) {
      setCreditsDialogInfo({ required: requiredCredits, actionType: "linkedin" });
      setShowCreditsDialog(true);
      return;
    }
    setRevealedLinkedins(prev => ({ ...prev, [linkedin]: true }));
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

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center py-10">
          <p className="text-muted-foreground">Loading lists...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lists</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleExportCSV}
              disabled={!activeList || activeList.contacts.length === 0}
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
            {lists.length > 0 ? (
              <Select
                value={activeListId || ''}
                onValueChange={(value) => setActiveListId(value)}
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
            ) : (
              <p className="text-muted-foreground">No lists found. Create your first list.</p>
            )}
            
            {activeList?.description && (
              <span className="text-sm text-muted-foreground">
                {activeList.description}
              </span>
            )}
          </div>
          
          {activeList && (
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
          )}
        </div>

        {/* List Content */}
        <div className="bg-white rounded-lg border">
          {activeList && activeList.contacts.length > 0 ? (
            <ContactsView 
              data={activeList.contacts}
              revealedEmails={revealedEmails}
              revealedPhones={revealedPhones}
              revealedLinkedins={revealedLinkedins}
              onRevealEmail={handleRevealEmail}
              onRevealPhone={handleRevealPhone}
              onRevealLinkedin={handleRevealLinkedin}
              onViewTeam={() => {}}
              onAddToList={() => {}}
              onRemoveFromList={handleRemoveFromList}
              isSavedList={true}
            />
          ) : activeList ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">{activeList.name}</h3>
              {activeList.description && (
                <p className="text-muted-foreground mb-4">{activeList.description}</p>
              )}
              <p className="text-muted-foreground">
                No contacts in this list yet. Add contacts from the People page using the + button.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Create your first list to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      <InsufficientCreditsDialog
        open={showCreditsDialog}
        onOpenChange={setShowCreditsDialog}
        creditsRequired={creditsDialogInfo.required}
        creditsAvailable={credits}
        actionType={creditsDialogInfo.actionType}
      />
    </>
  );
};

export default Lists;
