
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Target, Clock } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];

interface LeadsKPICardsProps {
  leads: Lead[];
}

export const LeadsKPICards: React.FC<LeadsKPICardsProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(lead => lead.lead_status === 'Converted').length;
  const inProgressLeads = leads.filter(lead => lead.lead_status === 'In Progress').length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

  // Calculate average days to conversion for converted leads
  const convertedLeadsWithDates = leads.filter(lead => 
    lead.lead_status === 'Converted' && lead.last_contacted
  );
  
  const avgDaysToConversion = convertedLeadsWithDates.length > 0 
    ? Math.round(
        convertedLeadsWithDates.reduce((acc, lead) => {
          const created = new Date(lead.created_at);
          const contacted = new Date(lead.last_contacted!);
          const days = Math.abs(contacted.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
          return acc + days;
        }, 0) / convertedLeadsWithDates.length
      )
    : 0;

  const kpiCards = [
    {
      title: 'Total Leads',
      value: totalLeads.toString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Converted',
      value: convertedLeads.toString(),
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'In Progress',
      value: inProgressLeads.toString(),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Avg. Days to Convert',
      value: avgDaysToConversion.toString(),
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((kpi, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {kpi.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${kpi.bgColor}`}>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            {kpi.title === 'Converted' && totalLeads > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {conversionRate}% conversion rate
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
