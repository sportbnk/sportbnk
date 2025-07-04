
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];

interface LeadsTableProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'Contacted':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'In Progress':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    case 'Converted':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'Lost':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'Follow Up':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onLeadClick }) => {
  if (leads.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No leads found. Add your first lead to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden lg:table-cell">Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Next Action</TableHead>
            <TableHead className="hidden xl:table-cell">Assigned To</TableHead>
            <TableHead className="hidden md:table-cell">Date Added</TableHead>
            <TableHead className="hidden lg:table-cell">Last Contacted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onLeadClick(lead)}
            >
              <TableCell className="font-medium">{lead.company_name}</TableCell>
              <TableCell>{lead.contact_person}</TableCell>
              <TableCell className="hidden md:table-cell">
                {lead.email || '-'}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {lead.phone || '-'}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(lead.lead_status)}>
                  {lead.lead_status}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {lead.next_action || '-'}
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                {lead.assigned_to || '-'}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDistanceToNow(new Date(lead.date_added), { addSuffix: true })}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {lead.last_contacted 
                  ? formatDistanceToNow(new Date(lead.last_contacted), { addSuffix: true })
                  : 'Never'
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
