import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Deal } from '@/pages/crm/Deals';

interface DealsTableProps {
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
}

export const DealsTable: React.FC<DealsTableProps> = ({ deals, onDealClick }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date set';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prospecting':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Qualified':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Proposal Sent':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Negotiation':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Closed - Won':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Closed - Lost':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  if (deals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No deals found matching your criteria.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Deal Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Close Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow
              key={deal.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onDealClick(deal)}
            >
              <TableCell className="font-medium">
                <div>
                  <div className="font-medium">{deal.deal_name}</div>
                  {deal.primary_contact && (
                    <div className="text-sm text-gray-500">{deal.primary_contact}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>{deal.company_name}</TableCell>
              <TableCell className="font-medium text-green-600">
                {formatCurrency(deal.deal_value || 0)}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStageColor(deal.stage)}>
                  {deal.stage}
                </Badge>
              </TableCell>
              <TableCell>{deal.assigned_to || '—'}</TableCell>
              <TableCell>{formatDate(deal.created_at)}</TableCell>
              <TableCell>{formatDate(deal.expected_close_date)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(deal.status)}>
                  {deal.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};