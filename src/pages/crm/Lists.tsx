
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Users, Download, Edit2, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ContactsView from "@/components/database/ContactsView";
import { useListsContext } from "@/contexts/ListsContext";

const Lists = () => {
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [selectedList, setSelectedList] = useState<any>(null);
  const [editingList, setEditingList] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { lists, loading, loadLists, createList, deleteList, removeContactFromList } = useListsContext();

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      toast.error("Please enter a list name");
      return;
    }

    setIsCreating(true);
    try {
      await createList(newListName.trim(), newListDescription.trim() || undefined);
      setNewListName("");
      setNewListDescription("");
      toast.success("List created successfully");
    } catch (error) {
      console.error('Error creating list:', error);
      toast.error("Failed to create list");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteList = async (listId: string) => {
    try {
      await deleteList(listId);
      if (selectedList && selectedList.id === listId) {
        setSelectedList(null);
      }
      toast.success("List deleted successfully");
    } catch (error) {
      console.error('Error deleting list:', error);
      toast.error("Failed to delete list");
    }
  };

  const handleEditStart = (list: any) => {
    setEditingList(list.id);
    setEditName(list.name);
    setEditDescription(list.description || "");
  };

  const handleEditSave = async () => {
    // Note: This would need an updateList function in the context
    // For now, just cancel editing
    setEditingList(null);
    toast.info("Edit functionality to be implemented");
  };

  const handleEditCancel = () => {
    setEditingList(null);
    setEditName("");
    setEditDescription("");
  };

  const handleRemoveFromList = async (contactId: string) => {
    if (!selectedList) return;
    
    try {
      await removeContactFromList(selectedList.id, contactId);
      toast.success("Contact removed from list");
    } catch (error) {
      console.error('Error removing contact from list:', error);
      toast.error("Failed to remove contact from list");
    }
  };

  const exportListToCsv = (list: any) => {
    if (!list.contacts || list.contacts.length === 0) {
      toast.error("No contacts to export");
      return;
    }

    const headers = ["Name", "Position", "Team", "Email", "Phone", "LinkedIn"];
    const csvContent = [
      headers.join(","),
      ...list.contacts.map((contact: any) => [
        `"${contact.name}"`,
        `"${contact.position || ""}"`,
        `"${contact.team || ""}"`,
        `"${contact.email || ""}"`,
        `"${contact.phone || ""}"`,
        `"${contact.linkedin || ""}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${list.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_contacts.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("List exported successfully");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lists</h1>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading lists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lists</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New List</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">List Name</label>
                <Input
                  placeholder="Enter list name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description (Optional)</label>
                <Textarea
                  placeholder="Enter list description"
                  value={newListDescription}
                  onChange={(e) => setNewListDescription(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleCreateList} 
                className="w-full"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create List"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lists sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Lists</CardTitle>
            </CardHeader>
            <CardContent>
              {lists.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No lists found. Create your first list!
                </p>
              ) : (
                <div className="space-y-2">
                  {lists.map((list) => (
                    <div
                      key={list.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedList?.id === list.id 
                          ? "bg-sportbnk-green/10 border-sportbnk-green" 
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedList(list)}
                    >
                      {editingList === list.id ? (
                        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="text-sm"
                          />
                          <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="text-xs"
                            rows={2}
                          />
                          <div className="flex gap-1">
                            <Button size="sm" onClick={handleEditSave} className="h-6 px-2">
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleEditCancel} className="h-6 px-2">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{list.name}</h3>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditStart(list);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteList(list.id);
                                }}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          {list.description && (
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {list.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {list.contacts?.length || 0}
                            </Badge>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* List details */}
        <div className="lg:col-span-2">
          {selectedList ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedList.name}</CardTitle>
                    {selectedList.description && (
                      <p className="text-muted-foreground mt-1">{selectedList.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportListToCsv(selectedList)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedList.contacts && selectedList.contacts.length > 0 ? (
                  <ContactsView
                    data={selectedList.contacts}
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
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      This list is empty. Add contacts from the database.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select a list to view its contacts
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lists;
