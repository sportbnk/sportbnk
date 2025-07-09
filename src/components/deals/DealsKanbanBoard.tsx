import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, DollarSign, User } from 'lucide-react';
import { Deal } from '@/pages/crm/Deals';

interface DealsKanbanBoardProps {
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
  onStageChange: (dealId: string, newStage: string) => void;
}

const stages = [
  { name: 'Prospecting', color: 'border-l-blue-500 bg-blue-50' },
  { name: 'Qualified', color: 'border-l-purple-500 bg-purple-50' },
  { name: 'Proposal Sent', color: 'border-l-orange-500 bg-orange-50' },
  { name: 'Negotiation', color: 'border-l-yellow-500 bg-yellow-50' },
  { name: 'Closed - Won', color: 'border-l-green-500 bg-green-50' },
  { name: 'Closed - Lost', color: 'border-l-red-500 bg-red-50' },
];

export const DealsKanbanBoard: React.FC<DealsKanbanBoardProps> = ({ 
  deals, 
  onDealClick,
  onStageChange 
}) => {
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

  const handleDragStart = (e: React.DragEvent, deal: Deal) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(deal));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const dealData = JSON.parse(e.dataTransfer.getData('text/plain'));
    if (dealData.stage !== targetStage) {
      onStageChange(dealData.id, targetStage);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stages.map((stage) => {
        const stageDeals = deals.filter(deal => deal.stage === stage.name);
        const stageValue = stageDeals.reduce((sum, deal) => sum + (deal.deal_value || 0), 0);

        return (
          <div
            key={stage.name}
            className="space-y-3"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.name)}
          >
            <div className={`p-3 rounded-lg border-l-4 ${stage.color}`}>
              <h3 className="font-semibold text-sm text-gray-900">{stage.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-600">{stageDeals.length} deals</span>
                <span className="text-xs font-medium text-gray-900">
                  {formatCurrency(stageValue)}
                </span>
              </div>
            </div>

            <div className="space-y-2 min-h-[200px]">
              {stageDeals.map((deal) => (
                <Card
                  key={deal.id}
                  className="cursor-pointer hover:shadow-md transition-shadow bg-white border border-gray-200"
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal)}
                  onClick={() => onDealClick(deal)}
                >
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                          {deal.deal_name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{deal.company_name}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-green-600 font-medium">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {formatCurrency(deal.deal_value || 0)}
                        </div>
                      </div>

                      {deal.expected_close_date && (
                        <div className="flex items-center text-xs text-gray-500">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {formatDate(deal.expected_close_date)}
                        </div>
                      )}

                      {deal.assigned_to && (
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="h-3 w-3 mr-1" />
                          {deal.assigned_to}
                        </div>
                      )}

                      {deal.primary_contact && (
                        <p className="text-xs text-gray-500 truncate">
                          Contact: {deal.primary_contact}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {stageDeals.length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-500 text-sm">
                  Drop deals here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};