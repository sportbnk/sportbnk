
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  mobile?: string;
  role?: string;
}

interface ContactsViewProps {
  data: Contact[];
  onAddToList?: (contact: Contact) => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  data,
  onAddToList,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            {onAddToList && <TableHead className="w-20">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.role || 'Not specified'}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.mobile || 'Not available'}</TableCell>
              {onAddToList && (
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onAddToList(contact)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
