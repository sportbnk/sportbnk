import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';

interface DetailedStatsTableProps {
  timePeriod: string;
}

interface UserStats {
  period: string;
  contacts: number;
  leads: number;
  meetings: number;
  deals: number;
  conversionRate: number;
}

export const DetailedStatsTable: React.FC<DetailedStatsTableProps> = ({ timePeriod }) => {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState<UserStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStatsData();
    }
  }, [user, timePeriod]);

  const fetchStatsData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Generate periods for detailed breakdown
      const periods = [];
      const now = new Date();
      
      for (let i = 4; i >= 0; i--) {
        const date = new Date(now);
        if (timePeriod === 'week') {
          date.setDate(now.getDate() - (i * 7));
          const endDate = new Date(date);
          endDate.setDate(date.getDate() + 7);
          periods.push({
            start: date,
            end: endDate,
            label: `Week of ${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
          });
        } else {
          date.setMonth(now.getMonth() - i);
          const endDate = new Date(date);
          endDate.setMonth(date.getMonth() + 1);
          periods.push({
            start: date,
            end: endDate,
            label: date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
          });
        }
      }

      const statsData: UserStats[] = [];

      for (const period of periods) {
        // Fetch data for this period - using teams as proxy for contacts
        const [contactsResponse, leadsResponse, meetingsResponse, dealsResponse] = await Promise.all([
          supabase
            .from('teams')
            .select('id')
            .gte('created_at', period.start.toISOString())
            .lt('created_at', period.end.toISOString()),
          
          supabase
            .from('leads')
            .select('id')
            .eq('user_id', user.id)
            .gte('created_at', period.start.toISOString())
            .lt('created_at', period.end.toISOString()),
          
          supabase
            .from('meetings')
            .select('id')
            .eq('user_id', user.id)
            .gte('created_at', period.start.toISOString())
            .lt('created_at', period.end.toISOString()),
          
          supabase
            .from('deals')
            .select('id, stage')
            .eq('user_id', user.id)
            .gte('created_at', period.start.toISOString())
            .lt('created_at', period.end.toISOString())
        ]);

        const contacts = contactsResponse.data?.length || 0;
        const leads = leadsResponse.data?.length || 0;
        const meetings = meetingsResponse.data?.length || 0;
        const deals = dealsResponse.data?.length || 0;
        const conversionRate = contacts > 0 ? Math.round((deals / contacts) * 100) : 0;

        statsData.push({
          period: period.label,
          contacts,
          leads,
          meetings,
          deals,
          conversionRate
        });
      }

      setStatsData(statsData);
    } catch (error) {
      console.error('Error fetching stats data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConversionRateColor = (rate: number) => {
    if (rate >= 15) return 'bg-green-100 text-green-700 border-green-200';
    if (rate >= 10) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (rate >= 5) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  if (loading) {
    return (
      <div className="h-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (statsData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available for the selected period.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead className="text-center">Contacts</TableHead>
            <TableHead className="text-center">Leads</TableHead>
            <TableHead className="text-center">Meetings</TableHead>
            <TableHead className="text-center">Deals</TableHead>
            <TableHead className="text-center">Conversion Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statsData.map((stat, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{stat.period}</TableCell>
              <TableCell className="text-center">{stat.contacts}</TableCell>
              <TableCell className="text-center">{stat.leads}</TableCell>
              <TableCell className="text-center">{stat.meetings}</TableCell>
              <TableCell className="text-center">{stat.deals}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className={getConversionRateColor(stat.conversionRate)}>
                  {stat.conversionRate}%
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};