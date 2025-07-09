import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserCheck, 
  Calendar, 
  Handshake,
  Target,
  DollarSign,
  BarChart3,
  PieChart,
  Minus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { toast } from 'sonner';
import { ConversionFunnel } from '@/components/analytics/ConversionFunnel';
import { PerformanceCharts } from '@/components/analytics/PerformanceCharts';
import { DetailedStatsTable } from '@/components/analytics/DetailedStatsTable';

interface AnalyticsData {
  totalContacts: number;
  leadsGenerated: number;
  meetingsBooked: number;
  dealsCreated: number;
  dealsWon: number;
  totalPipelineValue: number;
  wonValue: number;
  previousPeriodData?: {
    totalContacts: number;
    leadsGenerated: number;
    meetingsBooked: number;
    dealsCreated: number;
    dealsWon: number;
    totalPipelineValue: number;
  };
}

const Analytics = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalContacts: 0,
    leadsGenerated: 0,
    meetingsBooked: 0,
    dealsCreated: 0,
    dealsWon: 0,
    totalPipelineValue: 0,
    wonValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('month');

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user, timePeriod]);

  const fetchAnalyticsData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Calculate date ranges
      const now = new Date();
      const currentPeriodStart = new Date();
      const previousPeriodStart = new Date();
      const previousPeriodEnd = new Date();
      
      if (timePeriod === 'week') {
        currentPeriodStart.setDate(now.getDate() - 7);
        previousPeriodStart.setDate(now.getDate() - 14);
        previousPeriodEnd.setDate(now.getDate() - 7);
      } else {
        currentPeriodStart.setMonth(now.getMonth() - 1);
        previousPeriodStart.setMonth(now.getMonth() - 2);
        previousPeriodEnd.setMonth(now.getMonth() - 1);
      }

      // Fetch current period data
      const [contactsData, leadsData, meetingsData, dealsData] = await Promise.all([
        // Note: We don't have a contacts table in the current schema, so we'll use teams as a proxy
        supabase
          .from('teams')
          .select('id')
          .gte('created_at', currentPeriodStart.toISOString()),
        
        supabase
          .from('leads')
          .select('id')
          .eq('user_id', user.id)
          .gte('created_at', currentPeriodStart.toISOString()),
        
        supabase
          .from('meetings')
          .select('id')
          .eq('user_id', user.id)
          .gte('created_at', currentPeriodStart.toISOString()),
        
        supabase
          .from('deals')
          .select('id, deal_value, stage')
          .eq('user_id', user.id)
          .gte('created_at', currentPeriodStart.toISOString())
      ]);

      // Fetch previous period data for comparison
      const [prevContactsData, prevLeadsData, prevMeetingsData, prevDealsData] = await Promise.all([
        supabase
          .from('teams')
          .select('id')
          .gte('created_at', previousPeriodStart.toISOString())
          .lte('created_at', previousPeriodEnd.toISOString()),
        
        supabase
          .from('leads')
          .select('id')
          .eq('user_id', user.id)
          .gte('created_at', previousPeriodStart.toISOString())
          .lte('created_at', previousPeriodEnd.toISOString()),
        
        supabase
          .from('meetings')
          .select('id')
          .eq('user_id', user.id)
          .gte('created_at', previousPeriodStart.toISOString())
          .lte('created_at', previousPeriodEnd.toISOString()),
        
        supabase
          .from('deals')
          .select('id, deal_value, stage')
          .eq('user_id', user.id)
          .gte('created_at', previousPeriodStart.toISOString())
          .lte('created_at', previousPeriodEnd.toISOString())
      ]);

      // Get all-time deals data for total pipeline value
      const { data: allDealsData } = await supabase
        .from('deals')
        .select('deal_value, stage')
        .eq('user_id', user.id);

      const dealsWon = dealsData.data?.filter(deal => deal.stage === 'Closed - Won').length || 0;
      const totalPipelineValue = allDealsData?.reduce((sum, deal) => sum + (deal.deal_value || 0), 0) || 0;
      const wonValue = allDealsData?.filter(deal => deal.stage === 'Closed - Won')
        .reduce((sum, deal) => sum + (deal.deal_value || 0), 0) || 0;

      const currentData = {
        totalContacts: contactsData.data?.length || 0,
        leadsGenerated: leadsData.data?.length || 0,
        meetingsBooked: meetingsData.data?.length || 0,
        dealsCreated: dealsData.data?.length || 0,
        dealsWon,
        totalPipelineValue,
        wonValue,
        previousPeriodData: {
          totalContacts: prevContactsData.data?.length || 0,
          leadsGenerated: prevLeadsData.data?.length || 0,
          meetingsBooked: prevMeetingsData.data?.length || 0,
          dealsCreated: prevDealsData.data?.length || 0,
          dealsWon: prevDealsData.data?.filter(deal => deal.stage === 'Closed - Won').length || 0,
          totalPipelineValue: prevDealsData.data?.reduce((sum, deal) => sum + (deal.deal_value || 0), 0) || 0,
        }
      };

      setAnalyticsData(currentData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast.error('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const KPICard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    previousValue, 
    format 
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
    previousValue?: number;
    format?: 'currency' | 'number';
  }) => {
    const percentageChange = previousValue !== undefined ? calculatePercentageChange(value, previousValue) : null;
    const isPositive = percentageChange !== null && percentageChange >= 0;

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className={`text-2xl font-bold ${color}`}>
                {format === 'currency' ? formatCurrency(value) : value.toLocaleString()}
              </p>
              {percentageChange !== null && (
                <div className={`flex items-center text-sm mt-1 ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : percentageChange < 0 ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : (
                    <Minus className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(percentageChange)}% vs {timePeriod === 'week' ? 'last week' : 'last month'}
                </div>
              )}
            </div>
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your conversion performance and pipeline metrics</p>
        </div>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top-Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Contacts"
          value={analyticsData.totalContacts}
          icon={Users}
          color="text-blue-600"
          previousValue={analyticsData.previousPeriodData?.totalContacts}
        />
        <KPICard
          title="Leads Generated"
          value={analyticsData.leadsGenerated}
          icon={UserCheck}
          color="text-purple-600"
          previousValue={analyticsData.previousPeriodData?.leadsGenerated}
        />
        <KPICard
          title="Meetings Booked"
          value={analyticsData.meetingsBooked}
          icon={Calendar}
          color="text-orange-600"
          previousValue={analyticsData.previousPeriodData?.meetingsBooked}
        />
        <KPICard
          title="Deals Created"
          value={analyticsData.dealsCreated}
          icon={Handshake}
          color="text-indigo-600"
          previousValue={analyticsData.previousPeriodData?.dealsCreated}
        />
        <KPICard
          title="Deals Won"
          value={analyticsData.dealsWon}
          icon={Target}
          color="text-green-600"
          previousValue={analyticsData.previousPeriodData?.dealsWon}
        />
        <KPICard
          title="Pipeline Value"
          value={analyticsData.totalPipelineValue}
          icon={DollarSign}
          color="text-emerald-600"
          format="currency"
          previousValue={analyticsData.previousPeriodData?.totalPipelineValue}
        />
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ConversionFunnel data={analyticsData} />
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceCharts timePeriod={timePeriod} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Deal Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-8">
              Deal outcome breakdown coming soon
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailedStatsTable timePeriod={timePeriod} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;