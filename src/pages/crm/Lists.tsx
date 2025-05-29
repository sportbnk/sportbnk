
import React, { useState, useEffect } from "react";
import CrmLayout from "@/components/crm/CrmLayout";
import { Button } from "@/components/ui/button";
import { Plus, List as ListIcon, MoreHorizontal, Eye, Edit, Trash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ContactsView from "@/components/database/ContactsView";
import { Badge } from "@/components/ui/badge";

interface List {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  contact_count?: number;
}

const Lists = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showListDetails, setShowListDetails] = useState(false);
  const [editingList, setEditingList] = useState<List | null>(null);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [listContacts, setListContacts] = useState([]);

  const queryClient = useQueryClient();

  // Fetch lists
  const { data: lists = [], isLoading: isListsLoading } = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lists")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        toast.error(error.message);
        throw error;
      }
      return data as List[];
    },
  });

  // Create or update list mutation
  const createOrUpdateListMutation = useMutation({
    mutationFn: async () => {
      if (editingList) {
        // Update list
        const { data, error } = await supabase
          .from("lists")
          .update({ name: listName, description: listDescription })
          .eq("id", editingList.id);
        if (error) {
          toast.error(error.message);
          throw error;
        }
        return data;
      } else {
        // Create list
        const { data, error } = await supabase.from("lists").insert([
          {
            name: listName,
            description: listDescription,
          },
        ]);
        if (error) {
          toast.error(error.message);
          throw error;
        }
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      setShowCreateDialog(false);
      setEditingList(null);
      setListName("");
      setListDescription("");
      toast.success(editingList ? "List updated!" : "List created!");
    },
  });

  // Delete list mutation
  const deleteListMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.from("lists").delete().eq("id", id);
      if (error) {
        toast.error(error.message);
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      toast.success("List deleted!");
    },
  });

  const handleCreateList = () => {
    setEditingList(null);
    setListName("");
    setListDescription("");
    setShowCreateDialog(true);
  };

  const handleViewList = async (list: List) => {
    setSelectedList(list);
    setShowListDetails(true);

    // Fetch contacts for the selected list
    const { data, error } = await supabase
      .from("list_items")
      .select("contact_id")
      .eq("list_id", list.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    // Fetch contact details for each contact_id
    if (data && data.length > 0) {
      const contactIds = data.map((item) => item.contact_id);

      // Fetch contacts from the "contacts" table based on contactIds
      const { data: contactsData, error: contactsError } = await supabase
        .from("contacts")
        .select("*")
        .in("id", contactIds);

      if (contactsError) {
        toast.error(contactsError.message);
        return;
      }

      setListContacts(contactsData || []);
    } else {
      setListContacts([]);
    }
  };

  const handleSaveList = async () => {
    createOrUpdateListMutation.mutate();
  };

  const handleDeleteList = async (id: string) => {
    deleteListMutation.mutate(id);
  };

  const handleRemoveFromList = (contactId: string) => {
    setListContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
    toast.info("Contact removed from your list.");
  };

  return (
    <CrmLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Lists</h1>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New List
          </Button>
        </div>

        {/* My Lists Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <ListIcon className="h-5 w-5 mr-2" />
            My Lists ({lists.length})
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lists.map((list) => (
              <Card key={list.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleViewList(list)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{list.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleViewList(list);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          setEditingList(list);
                          setShowCreateDialog(true);
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteList(list.id);
                          }}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {list.description && (
                    <p className="text-sm text-muted-foreground">{list.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{list.contact_count || 0} contacts</span>
                    <span>Updated {new Date(list.created_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* List Details Modal */}
        {selectedList && (
          <Dialog open={showListDetails} onOpenChange={setShowListDetails}>
            <DialogContent className="max-w-6xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedList.name}</span>
                  <Badge variant="secondary">{listContacts.length} contacts</Badge>
                </DialogTitle>
                {selectedList.description && (
                  <DialogDescription>{selectedList.description}</DialogDescription>
                )}
              </DialogHeader>
              
              <div className="flex-1 overflow-hidden">
                <ContactsView
                  data={listContacts}
                  revealedEmails={{}}
                  revealedPhones={{}}
                  revealedLinkedIns={{}}
                  onRevealEmail={() => {}}
                  onRevealPhone={() => {}}
                  onRevealLinkedIn={() => {}}
                  onViewTeam={() => {}}
                  onAddToList={() => {}}
                  onRemoveFromList={handleRemoveFromList}
                  isSavedList={true}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Create List Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingList ? "Edit List" : "Create New List"}</DialogTitle>
              <DialogDescription>
                {editingList ? "Update your list details." : "Enter a name and description for your new list."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">List Name</Label>
                <Input
                  id="name"
                  placeholder="Marketing Leads"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A list of potential marketing leads"
                  value={listDescription}
                  onChange={(e) => setListDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveList}
                disabled={createOrUpdateListMutation.isPending}
              >
                {createOrUpdateListMutation.isPending ? (
                  "Saving..."
                ) : editingList ? (
                  "Update List"
                ) : (
                  "Create List"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </CrmLayout>
  );
};

export default Lists;
