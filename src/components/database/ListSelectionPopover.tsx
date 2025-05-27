
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface ContactList {
  id: string;
  name: string;
  description?: string;
  contacts: any[];
}

interface ListSelectionPopoverProps {
  onAddToList: (contact: any, listId: number, listName: string) => void;
  contact: any;
}

const ListSelectionPopover = ({ onAddToList, contact }: ListSelectionPopoverProps) => {
  const [lists, setLists] = useState<ContactList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Load lists from local storage on component mount
  useEffect(() => {
    const loadLists = () => {
      const storedLists = localStorage.getItem('contactLists');
      if (storedLists) {
        try {
          const parsedLists = JSON.parse(storedLists);
          if (Array.isArray(parsedLists)) {
            setLists(parsedLists);
          }
        } catch (error) {
          console.error('Error parsing lists from localStorage:', error);
        }
      } else {
        // Create default list if none exists
        const defaultList = { id: '1', name: 'My Contacts', description: 'Default contact list', contacts: [] };
        setLists([defaultList]);
        localStorage.setItem('contactLists', JSON.stringify([defaultList]));
      }
    };

    loadLists();
  }, []);

  const handleAddToList = (listId: string, listName: string) => {
    // Load current lists
    const storedLists = localStorage.getItem('contactLists');
    if (storedLists) {
      try {
        const parsedLists = JSON.parse(storedLists);
        const targetList = parsedLists.find((list: ContactList) => list.id === listId);
        
        if (targetList) {
          // Check if contact already exists
          const contactExists = targetList.contacts.some((c: any) => c.id === contact.id);
          
          if (!contactExists) {
            // Add contact to list
            targetList.contacts.push({
              id: contact.id,
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              position: contact.position,
              team: contact.team,
              teamId: contact.teamId,
              linkedin: contact.linkedin,
              verified: contact.verified,
              activeReplier: contact.activeReplier
            });
            
            // Save updated lists
            localStorage.setItem('contactLists', JSON.stringify(parsedLists));
            setLists(parsedLists);
            
            setIsOpen(false);
            toast.success(`Added ${contact.name} to ${listName}`);
          } else {
            toast.info(`${contact.name} is already in ${listName}`);
          }
        }
      } catch (error) {
        console.error('Error updating lists:', error);
        toast.error('Failed to add contact to list');
      }
    }
  };

  const handleCreateList = () => {
    if (!newListName.trim()) {
      toast.error("Please enter a list name");
      return;
    }
    
    const newList: ContactList = {
      id: Date.now().toString(),
      name: newListName.trim(),
      contacts: [{
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        position: contact.position,
        team: contact.team,
        teamId: contact.teamId,
        linkedin: contact.linkedin,
        verified: contact.verified,
        activeReplier: contact.activeReplier
      }]
    };
    
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    
    // Save to local storage
    try {
      localStorage.setItem('contactLists', JSON.stringify(updatedLists));
      setNewListName("");
      setIsOpen(false);
      toast.success(`Created "${newList.name}" and added ${contact.name}`);
    } catch (error) {
      console.error('Error saving lists to localStorage:', error);
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
            >
              Create
            </Button>
          </div>
          
          {lists.length > 0 && (
            <div className="border-t pt-2">
              <p className="text-xs text-muted-foreground mb-2">Or select existing list:</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {lists.map((list) => (
                  <div key={list.id} className="flex justify-between items-center">
                    <span className="text-sm truncate">{list.name}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleAddToList(list.id, list.name)}
                      className="h-6 w-6 p-0"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListSelectionPopover;
