
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useLists } from "@/contexts/ListsContext";

interface ListSelectionPopoverProps {
  onAddToList: (contact: any, listId: string, listName: string) => void;
  contact: any;
}

const ListSelectionPopover = ({ onAddToList, contact }: ListSelectionPopoverProps) => {
  const [newListName, setNewListName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [contactLists, setContactLists] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const { lists, createList, refreshLists } = useLists();

  // Load which lists contain this contact
  useEffect(() => {
    if (isOpen && contact?.id) {
      loadContactLists();
    }
  }, [isOpen, contact?.id]);

  const loadContactLists = async () => {
    setLoading(true);
    try {
      const { data: contactListItems, error } = await supabase
        .from('list_items')
        .select('list_id')
        .eq('contact_id', contact.id);

      if (error) {
        console.error('Error fetching contact lists:', error);
        return;
      }

      const listIds = new Set(contactListItems?.map(item => item.list_id) || []);
      setContactLists(listIds);
    } catch (error) {
      console.error('Error loading contact lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToList = async (listId: string, listName: string) => {
    try {
      // Check if contact is already in this list
      if (contactLists.has(listId)) {
        toast.info(`${contact.name} is already in ${listName}`);
        return;
      }

      // Add contact to list
      const { error } = await supabase
        .from('list_items')
        .insert({
          list_id: listId,
          contact_id: contact.id
        });

      if (error) {
        console.error('Error adding contact to list:', error);
        toast.error('Failed to add contact to list');
        return;
      }

      // Update local state
      setContactLists(prev => new Set([...prev, listId]));

      toast.success(`Added ${contact.name} to ${listName}`);
      onAddToList(contact, listId, listName);
    } catch (error) {
      console.error('Error adding contact to list:', error);
      toast.error('Failed to add contact to list');
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      toast.error("Please enter a list name");
      return;
    }

    try {
      const newList = await createList(newListName.trim());
      
      if (!newList) {
        toast.error("Failed to create list");
        return;
      }

      // Add contact to the new list
      const { error: itemError } = await supabase
        .from('list_items')
        .insert({
          list_id: newList.id,
          contact_id: contact.id
        });

      if (itemError) {
        console.error('Error adding contact to new list:', itemError);
        toast.error('List created but failed to add contact');
        return;
      }

      // Update local state
      setContactLists(prev => new Set([...prev, newList.id]));
      setNewListName("");
      setIsOpen(false);
      toast.success(`Created "${newList.name}" and added ${contact.name}`);
      onAddToList(contact, newList.id, newList.name);
    } catch (error) {
      console.error('Error creating list:', error);
      toast.error('Failed to create list');
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-sportbnk-green hover:text-sportbnk-green/90 p-0 h-auto"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 z-50 bg-white" align="end">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Add to List</h4>
          
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Create new list"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateList();
                }
              }}
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCreateList}
              className="whitespace-nowrap text-xs px-2"
              disabled={loading}
            >
              Create
            </Button>
          </div>
          
          {loading ? (
            <div className="text-xs text-muted-foreground text-center py-2">
              Loading lists...
            </div>
          ) : lists.length > 0 ? (
            <div className="border-t pt-2">
              <p className="text-xs text-muted-foreground mb-2">Or select existing list:</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {lists.map((list) => {
                  const isContactInList = contactLists.has(list.id);
                  return (
                    <div key={list.id} className="flex justify-between items-center">
                      <span className="text-sm truncate">{list.name}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleAddToList(list.id, list.name)}
                        className="h-6 w-6 p-0"
                        disabled={isContactInList}
                      >
                        {isContactInList ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground text-center py-2">
              No lists found. Create your first list above.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListSelectionPopover;
