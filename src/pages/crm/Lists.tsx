import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Edit2, Plus, Users, Download, Loader2, Building2 } from 'lucide-react';
import { useLists } from '@/contexts/ListsContext';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import * as XLSX from 'xlsx';

const MyContacts = () => {
  const { lists, loading, createList, deleteList, updateList, removeItemFromList } = useLists();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [editingList, setEditingList] = useState<any>(null);
  const [editListName, setEditListName] = useState('');
  const [editListDescription, setEditListDescription] = useState('');
  const [activeTab, setActiveTab] = useState('organizations');

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      toast({
        title: "Error",
        description: "List name is required",
        variant: "destructive",
      });
      return;
    }

    await createList(newListName, newListDescription);
    setNewListName('');
    setNewListDescription('');
    setIsCreateDialogOpen(false);
  };

  const handleEditList = async () => {
    if (!editListName.trim() || !editingList) {
      toast({
        title: "Error",
        description: "List name is required",
        variant: "destructive",
      });
      return;
    }

    await updateList(editingList.id, editListName, editListDescription);
    setEditingList(null);
    setEditListName('');
    setEditListDescription('');
    setIsEditDialogOpen(false);
  };

  const startEdit = (list: any) => {
    setEditingList(list);
    setEditListName(list.name);
    setEditListDescription(list.description || '');
    setIsEditDialogOpen(true);
  };

  const handleDeleteList = async (listId: string) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      await deleteList(listId);
    }
  };

  const handleRemoveItem = async (listId: string, itemId: string) => {
    if (window.confirm('Are you sure you want to remove this item from the list?')) {
      await removeItemFromList(itemId);
    }
  };

  const exportContacts = (type: 'organizations' | 'people') => {
    try {
      const filteredLists = lists.filter(list => {
        const items = list.list_items || [];
        return items.some((item: any) => 
          type === 'organizations' ? item.team : item.contact
        );
      });

      if (filteredLists.length === 0) {
        toast({
          title: "No data to export",
          description: `No ${type} found in your lists.`,
          variant: "destructive",
        });
        return;
      }

      // Collect all items of the specified type from all lists
      const allItems: any[] = [];
      filteredLists.forEach(list => {
        const items = list.list_items || [];
        items.forEach((item: any) => {
          if ((type === 'organizations' && item.team) || (type === 'people' && item.contact)) {
            allItems.push({ ...item, listName: list.name });
          }
        });
      });

      // Prepare data with dummy information for missing fields
      const exportData = allItems.map((item: any, index: number) => {
        const baseData = {
          'List Name': item.listName,
          Name: item.team?.name || item.contact?.name || `Contact ${index + 1}`,
        };

        if (type === 'organizations' && item.team) {
          return {
            ...baseData,
            Industry: item.team.industry || 'Technology',
            Location: item.team.location || 'London, UK',
            Website: item.team.website || `https://www.${(item.team.name || 'company').toLowerCase().replace(/\s+/g, '')}.com`,
            Phone: item.team.phone || `+44 20 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
            Email: item.team.email || `contact@${(item.team.name || 'company').toLowerCase().replace(/\s+/g, '')}.com`,
            'LinkedIn': item.team.linkedin || `https://linkedin.com/company/${(item.team.name || 'company').toLowerCase().replace(/\s+/g, '-')}`,
            Employees: Math.floor(Math.random() * 10000) + 10,
            Revenue: `$${(Math.floor(Math.random() * 100) + 1)}M`,
            'Founded Year': Math.floor(Math.random() * 30) + 1990,
          };
        } else if (type === 'people' && item.contact) {
          const firstName = item.contact?.name?.split(' ')[0] || 'John';
          const lastName = item.contact?.name?.split(' ')[1] || 'Doe';
          const domain = 'company.com';
          
          return {
            ...baseData,
            'First Name': firstName,
            'Last Name': lastName,
            Title: item.contact?.title || 'Sales Manager',
            Company: item.contact?.company || 'Tech Solutions Ltd',
            Email: item.contact?.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
            Phone: item.contact?.phone || `+44 7${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900000) + 100000}`,
            'LinkedIn': item.contact?.linkedin || `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
            Location: item.contact?.location || 'London, UK',
            Industry: item.contact?.industry || 'Technology',
            'Years Experience': Math.floor(Math.random() * 20) + 1,
          };
        }
      }).filter(Boolean);

      if (exportData.length === 0) {
        toast({
          title: "No data to export",
          description: `No ${type} data found.`,
          variant: "destructive",
        });
        return;
      }

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, type === 'organizations' ? 'Organizations' : 'People');
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `my_${type}_${timestamp}.xlsx`;
      
      // Save the file
      XLSX.writeFile(wb, filename);
      
      toast({
        title: "Export successful",
        description: `${exportData.length} ${type} exported to ${filename}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: `There was an error exporting your ${type}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Contacts</h1>
          <p className="text-muted-foreground">Manage your contact and organization lists</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New List</DialogTitle>
                <DialogDescription>
                  Create a new list to organize your contacts and organizations.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">List Name</Label>
                  <Input
                    id="name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter list name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    placeholder="Enter list description"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                    setIsCreateDialogOpen(false);
                    setNewListName('');
                    setNewListDescription('');
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateList}>
                    Create List
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="organizations" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organizations
            </TabsTrigger>
            <TabsTrigger value="people" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              People
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => exportContacts(activeTab as 'organizations' | 'people')}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export {activeTab === 'organizations' ? 'Organizations' : 'People'}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add to CRM
            </Button>
          </div>
        </div>
      </Tabs>

      <TabsContent value="organizations">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : lists.filter(list => list.list_items?.some((item: any) => item.team)).length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No organizations yet</h3>
            <p className="text-muted-foreground mb-4">
              Your organization lists will appear here once you start adding companies to your lists.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.filter(list => list.list_items?.some((item: any) => item.team)).map((list) => {
              const items = list.list_items || [];
              const teamCount = items.filter((item: any) => item.team).length;
              
              return (
                <Card key={list.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{list.name}</CardTitle>
                        {list.description && (
                          <CardDescription className="mt-1">
                            {list.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEdit(list)}
                          className="h-8 w-8"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteList(list.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Organizations:</span>
                        <span className="font-medium">{teamCount}</span>
                      </div>
                      
                      {teamCount > 0 && (
                        <div className="mt-4 space-y-2">
                          <div className="text-xs text-muted-foreground font-medium">Organizations:</div>
                          {items.filter((item: any) => item.team).slice(0, 3).map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between text-xs bg-muted/50 rounded p-2">
                              <span className="truncate flex-1">
                                {item.team?.name || 'Unknown Organization'}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(list.id, item.id)}
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          {teamCount > 3 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{teamCount - 3} more organizations
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </TabsContent>

      <TabsContent value="people">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : lists.filter(list => list.list_items?.some((item: any) => item.contact)).length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No people yet</h3>
            <p className="text-muted-foreground mb-4">
              Your contact lists will appear here once you start adding people to your lists.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.filter(list => list.list_items?.some((item: any) => item.contact)).map((list) => {
              const items = list.list_items || [];
              const contactCount = items.filter((item: any) => item.contact).length;
              
              return (
                <Card key={list.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{list.name}</CardTitle>
                        {list.description && (
                          <CardDescription className="mt-1">
                            {list.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEdit(list)}
                          className="h-8 w-8"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteList(list.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">People:</span>
                        <span className="font-medium">{contactCount}</span>
                      </div>
                      
                      {contactCount > 0 && (
                        <div className="mt-4 space-y-2">
                          <div className="text-xs text-muted-foreground font-medium">People:</div>
                          {items.filter((item: any) => item.contact).slice(0, 3).map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between text-xs bg-muted/50 rounded p-2">
                              <span className="truncate flex-1">
                                {item.contact?.name || 'Unknown Contact'}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(list.id, item.id)}
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          {contactCount > 3 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{contactCount - 3} more people
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </TabsContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit List</DialogTitle>
            <DialogDescription>
              Update your list information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">List Name</Label>
              <Input
                id="editName"
                value={editListName}
                onChange={(e) => setEditListName(e.target.value)}
                placeholder="Enter list name"
              />
            </div>
            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={editListDescription}
                onChange={(e) => setEditListDescription(e.target.value)}
                placeholder="Enter list description"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setIsEditDialogOpen(false);
                setEditingList(null);
                setEditListName('');
                setEditListDescription('');
              }}>
                Cancel
              </Button>
              <Button onClick={handleEditList}>
                Update List
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyContacts;