
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

// Example of preset lists - in a real app, this would come from a database
const defaultLists = [
  { id: 1, name: "My Contacts" },
  { id: 2, name: "Marketing Leads" },
  { id: 3, name: "Key Decision Makers" },
];

interface ListSelectionPopoverProps {
  onAddToList: (contact: any, listId: number, listName: string) => void;
  contact: any;
}

const ListSelectionPopover = ({ onAddToList, contact }: ListSelectionPopoverProps) => {
  const [lists, setLists] = useState(defaultLists);
  const [newListName, setNewListName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToList = (listId: number, listName: string) => {
    onAddToList(contact, listId, listName);
    setIsOpen(false);
    toast.success(`Added ${contact.name} to ${listName}`);
  };

  const handleCreateList = () => {
    if (!newListName.trim()) {
      toast.error("Please enter a list name");
      return;
    }
    
    const newList = {
      id: lists.length + 1,
      name: newListName.trim()
    };
    
    setLists([...lists, newList]);
    setNewListName("");
    handleAddToList(newList.id, newList.name);
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
          
          <div className="border-t pt-2">
            <p className="text-xs text-muted-foreground mb-2">Or select existing list:</p>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {lists.map((list) => (
                <div key={list.id} className="flex justify-between items-center">
                  <span className="text-sm">{list.name}</span>
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
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListSelectionPopover;
