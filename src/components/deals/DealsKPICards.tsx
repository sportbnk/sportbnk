import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Target, TrendingUp, Users } from 'lucide-react';
import { Deal } from '@/pages/crm/Deals';

interface DealsKPICardsProps {
  deals: Deal[];
}

export const DealsKPICards: React.FC<DealsKPICardsProps> = ({ deals }) => {
  const totalValue = deals.reduce((sum, deal) => sum + (deal.deal_value || 0), 0);
  const activeDeals = deals.filter(deal => deal.status === 'Active').length;
  const wonDeals = deals.filter(deal => deal.stage === 'Closed - Won');
  const wonValue = wonDeals.reduce((sum, deal) => sum + (deal.deal_value || 0), 0);
  const winRate = deals.length > 0 ? (wonDeals.length / deals.length * 100) : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pipeline Value</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalValue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-orange-600">{activeDeals}</p>
            </div>
            <Target className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Won Value</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(wonValue)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-purple-600">{winRate.toFixed(1)}%</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};