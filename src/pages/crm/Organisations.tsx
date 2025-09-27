import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Download, 
  Plus, 
  Filter,
  Building2,
  MapPin,
  Users,
  ExternalLink,
  Mail,
  Phone,
  List,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ListItem {
  id: string;
  name: string;
  type: 'organisation' | 'person';
  organisation?: string;
  position?: string;
  location: string;
  email?: string;
  phone?: string;
  addedDate: string;
}

interface SavedList {
  id: string;
  name: string;
  description?: string;
  items: ListItem[];
  createdDate: string;
  lastModified: string;
}

// Mock data for saved lists
const mockSavedLists: SavedList[] = [
  {
    id: '1',
    name: 'London Premier League Clubs',
    description: 'All Premier League teams based in London',
    items: [
      {
        id: '1',
        name: 'Arsenal FC',
        type: 'organisation',
        location: 'London, England',
        email: 'info@arsenal.co.uk',
        phone: '+44 20 7619 5003',
        addedDate: '2024-01-15'
      },
      {
        id: '2',
        name: 'Chelsea FC',
        type: 'organisation',
        location: 'London, England',
        email: 'info@chelseafc.com',
        phone: '+44 871 984 1955',
        addedDate: '2024-01-15'
      },
      {
        id: '3',
        name: 'Tottenham Hotspur FC',
        type: 'organisation',
        location: 'London, England',
        email: 'customer.care@tottenhamhotspur.com',
        phone: '+44 344 499 5000',
        addedDate: '2024-01-15'
      }
    ],
    createdDate: '2024-01-15',
    lastModified: '2024-01-15'
  },
  {
    id: '2',
    name: 'Marketing Contacts',
    description: 'Key marketing personnel across Premier League',
    items: [
      {
        id: '1',
        name: 'Sarah Johnson',
        type: 'person',
        organisation: 'Manchester United FC',
        position: 'Marketing Director',
        location: 'Manchester, England',
        email: 's.johnson@manutd.com',
        phone: '+44 161 868 8001',
        addedDate: '2024-01-20'
      },
      {
        id: '2',
        name: 'Emma Wilson',
        type: 'person',
        organisation: 'Chelsea FC',
        position: 'Communications Manager',
        location: 'London, England',
        email: 'e.wilson@chelseafc.com',
        phone: '+44 871 984 1956',
        addedDate: '2024-01-20'
      }
    ],
    createdDate: '2024-01-20',
    lastModified: '2024-01-22'
  }
];

const MyOrganisations = () => {
  const { toast } = useToast();
  const [savedLists, setSavedLists] = useState<SavedList[]>(mockSavedLists);
  const [selectedList, setSelectedList] = useState<SavedList | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newListName, setNewListName] = useState('');
  const [showNewListForm, setShowNewListForm] = useState(false);

  const handleSelectList = (list: SavedList) => {
    setSelectedList(list);
    setSelectedItems([]);
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAllItems = () => {
    if (!selectedList) return;
    
    const filteredItems = selectedList.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleExportList = () => {
    if (!selectedList || selectedItems.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select items to export.",
        variant: "destructive"
      });
      return;
    }

    const selectedData = selectedList.items.filter(item => selectedItems.includes(item.id));
    const csvContent = [
      ['Name', 'Type', 'Organisation', 'Position', 'Location', 'Email', 'Phone', 'Added Date'],
      ...selectedData.map(item => [
        item.name,
        item.type,
        item.organisation || '',
        item.position || '',
        item.location,
        item.email || '',
        item.phone || '',
        item.addedDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedList.name.toLowerCase().replace(/\s+/g, '-')}-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: `Exported ${selectedItems.length} ${selectedItems.length === 1 ? 'item' : 'items'} from "${selectedList.name}".`,
    });
  };

  const handleDeleteList = (listId: string) => {
    setSavedLists(prev => prev.filter(list => list.id !== listId));
    if (selectedList?.id === listId) {
      setSelectedList(null);
    }
    toast({
      title: "List Deleted",
      description: "The list has been successfully deleted.",
    });
  };

  const handleCreateNewList = () => {
    if (!newListName.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid list name.",
        variant: "destructive"
      });
      return;
    }

    const newList: SavedList = {
      id: Date.now().toString(),
      name: newListName,
      description: '',
      items: [],
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setSavedLists(prev => [...prev, newList]);
    setNewListName('');
    setShowNewListForm(false);
    setSelectedList(newList);

    toast({
      title: "List Created",
      description: `Successfully created list "${newListName}".`,
    });
  };

  const filteredItems = selectedList ? selectedList.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.organisation && item.organisation.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.position && item.position.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Lists</h1>
            <p className="text-gray-600 mt-1">Build and manage your contact and organisation lists</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setShowNewListForm(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New List
            </Button>
            {selectedList && (
              <Button 
                onClick={handleExportList}
                disabled={selectedItems.length === 0}
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Export ({selectedItems.length})
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lists Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Saved Lists ({savedLists.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {savedLists.map((list) => (
                    <div 
                      key={list.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 ${
                        selectedList?.id === list.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                      }`}
                      onClick={() => handleSelectList(list)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{list.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Modified: {list.lastModified}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteList(list.id);
                          }}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* New List Form */}
            {showNewListForm && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Create New List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="List name..."
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleCreateNewList}>
                        Create
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => {
                          setShowNewListForm(false);
                          setNewListName('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* List Content */}
          <div className="lg:col-span-3">
            {selectedList ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedList.name}</CardTitle>
                      {selectedList.description && (
                        <p className="text-gray-600 mt-1">{selectedList.description}</p>
                      )}
                    </div>
                    <Badge variant="secondary">
                      {selectedList.items.length} {selectedList.items.length === 1 ? 'item' : 'items'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search items in this list..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Selection Controls */}
                  {filteredItems.length > 0 && (
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="select-all-items"
                          checked={selectedItems.length === filteredItems.length}
                          onCheckedChange={handleSelectAllItems}
                        />
                        <label htmlFor="select-all-items" className="text-sm font-medium">
                          Select All ({filteredItems.length})
                        </label>
                      </div>
                      {selectedItems.length > 0 && (
                        <Badge variant="secondary">
                          {selectedItems.length} selected
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Items Table */}
                  {filteredItems.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox
                              checked={selectedItems.length === filteredItems.length}
                              onCheckedChange={handleSelectAllItems}
                            />
                          </TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Organisation</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Added</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredItems.map((item) => (
                          <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell>
                              <Checkbox
                                checked={selectedItems.includes(item.id)}
                                onCheckedChange={() => handleSelectItem(item.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>
                              <Badge variant={item.type === 'organisation' ? 'default' : 'secondary'}>
                                {item.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.organisation || '-'}</TableCell>
                            <TableCell>{item.position || '-'}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {item.email && (
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-600 truncate max-w-32">
                                      {item.email}
                                    </span>
                                  </div>
                                )}
                                {item.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-600">
                                      {item.phone}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{item.addedDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-12">
                      <List className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchQuery ? 'No items found' : 'Empty list'}
                      </h3>
                      <p className="text-gray-600">
                        {searchQuery 
                          ? 'Try adjusting your search criteria' 
                          : 'Add contacts and organisations from the Discover section'
                        }
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <List className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a list</h3>
                  <p className="text-gray-600">Choose a list from the sidebar to view and manage its contents</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrganisations;