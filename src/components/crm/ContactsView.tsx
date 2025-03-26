
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
}

interface ContactsViewProps {
  data: Contact[];
  selectedContacts: string[];
  onSelectContact: (contactId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onAddToList: () => void;
  isSavedList: boolean;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  data,
  selectedContacts,
  onSelectContact,
  onSelectAll,
  onDeselectAll,
  onAddToList,
  isSavedList,
}) => {
  const allSelected = data.length > 0 && selectedContacts.length === data.length;
  const someSelected = selectedContacts.length > 0 && !allSelected;

  return (
    <div className="rounded-md border">
      <div className="p-4 bg-gray-50 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onClick={() => (allSelected ? onDeselectAll() : onSelectAll())}
          />
          <span className="text-sm text-gray-600">
            {selectedContacts.length} selected
          </span>
          {selectedContacts.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAddToList}
              className="ml-2"
              disabled={isSavedList}
            >
              {isSavedList ? "Already in List" : "Add to List"}
            </Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="w-12">
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onClick={() => onSelectContact(contact.id)}
                />
              </TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
