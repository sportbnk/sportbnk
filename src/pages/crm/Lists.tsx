
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, Plus, Trash2, Edit, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ContactList {
  id: string;
  name: string;
  description: string;
  teamCount: number;
  contactCount: number;
  createdDate: string;
  type: "Teams" | "Contacts" | "Mixed";
}

const Lists = () => {
  const [lists, setLists] = useState<ContactList[]>([
    {
      id: "list-1",
      name: "Top Teams in Germany",
      description: "Bundesliga teams to contact about new partnership",
      teamCount: 12,
      contactCount: 36,
      createdDate: "2023-10-15",
      type: "Teams"
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      type: "Teams" as "Teams" | "Contacts" | "Mixed",
    }
  });

  const onSubmit = (data: { name: string; description: string; type: "Teams" | "Contacts" | "Mixed" }) => {
    if (isEditMode && currentListId) {
      // Edit existing list
      setLists(prev => 
        prev.map(list => 
          list.id === currentListId ? { 
            ...list, 
            name: data.name, 
            description: data.description,
            type: data.type,
          } : list
        )
      );
      toast.success("List updated successfully");
    } else {
      // Create new list
      const newList = {
        id: `list-${Date.now()}`,
        name: data.name,
        description: data.description,
        teamCount: 0,
        contactCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
        type: data.type,
      };
      
      setLists(prev => [...prev, newList]);
      toast.success("List created successfully");
    }
    
    setIsDialogOpen(false);
    setIsEditMode(false);
    setCurrentListId(null);
    form.reset();
  };

  const editList = (list: ContactList) => {
    form.reset({
      name: list.name,
      description: list.description,
      type: list.type,
    });
    setIsEditMode(true);
    setCurrentListId(list.id);
    setIsDialogOpen(true);
  };

  const deleteList = (id: string) => {
    setLists(lists.filter(list => list.id !== id));
    toast.info("List deleted");
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "Teams":
        return "bg-blue-100 text-blue-700";
      case "Contacts":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const exportToCSV = (listId: string) => {
    // Find the selected list
    const selectedList = lists.find(list => list.id === listId);
    
    if (!selectedList) {
      toast.error("List not found");
      return;
    }
    
    // Create CSV header and mock data for demonstration
    const csvHeader = "Name,Position,Team,Sport,Email,Phone,LinkedIn\n";
    const csvData = [
      "John Smith,Marketing Director,Manchester United,Football,john.smith@manutd.com,+441234567890,https://linkedin.com/in/johnsmith",
      "Sarah Jones,Fan Relations Manager,Manchester United,Football,sarah.jones@manutd.com,,",
      "Michael Johnson,Operations Director,LA Lakers,Basketball,michael.johnson@lakers.com,+13101234567,https://linkedin.com/in/michaeljohnson"
    ].join("\n");
    
    const csvContent = csvHeader + csvData;
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedList.name.replace(/\s+/g, "_")}_contacts.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Exported ${selectedList.name} to CSV`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Lists</h1>
      <div className="flex justify-end">
        <Button 
          className="bg-sportbnk-green hover:bg-sportbnk-green/90" 
          onClick={() => {
            form.reset({
              name: "",
              description: "",
              type: "Teams",
            });
            setIsEditMode(false);
            setCurrentListId(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create List
        </Button>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <List className="h-5 w-5" />
            Manage Your Lists
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Create and manage your contact lists for targeted campaigns and outreach.
          </p>
          
          {lists.length === 0 ? (
            <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
              <p className="text-muted-foreground">No lists created yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {lists.map(list => (
                <Card key={list.id} className="overflow-hidden border">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{list.name}</CardTitle>
                      <Badge variant="outline" className={getTypeColor(list.type)}>
                        {list.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pt-0 pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {list.description}
                    </p>
                    <div className="flex gap-4 text-sm mb-4">
                      <div>
                        <span className="font-medium">{list.teamCount}</span> Teams
                      </div>
                      <div>
                        <span className="font-medium">{list.contactCount}</span> Contacts
                      </div>
                      <div className="text-muted-foreground">
                        Created {list.createdDate}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => editList(list)}>
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          onClick={() => deleteList(list.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                          onClick={() => exportToCSV(list.id)}
                        >
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Export CSV
                        </Button>
                        <Button asChild variant="ghost" size="sm" className="text-blue-600">
                          <Link to={`/crm/teams`}>
                            View 
                            <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit List" : "Create a New List"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>List Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Top Teams in Spain" {...field} required />
                    </FormControl>
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
                        placeholder="What is this list for?"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add context about what this list is for and how you plan to use it
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>List Type</FormLabel>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="Teams">Teams</option>
                      <option value="Contacts">Contacts</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                    <FormDescription>
                      What kind of items will this list contain?
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setIsEditMode(false);
                  setCurrentListId(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-sportbnk-green hover:bg-sportbnk-green/90">
                  {isEditMode ? "Update List" : "Create List"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lists;
