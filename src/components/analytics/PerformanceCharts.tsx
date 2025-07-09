import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';

interface PerformanceChartsProps {
  timePeriod: string;
}

interface ChartData {
  period: string;
  leads: number;
  meetings: number;
  deals: number;
  value: number;
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ timePeriod }) => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  useEffect(() => {
    if (user) {
      fetchChartData();
    }
  }, [user, timePeriod]);

  const fetchChartData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Generate periods based on timePeriod
      const periods = [];
      const now = new Date();
      
      for (let i = 7; i >= 0; i--) {
        const date = new Date(now);
        if (timePeriod === 'week') {
          date.setDate(now.getDate() - i);
          periods.push({
            date: date,
            label: date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })
          });
        } else {
          date.setMonth(now.getMonth() - i);
          periods.push({
            date: date,
            label: date.toLocaleDateString('en-GB', { month: 'short' })
          });
        }
      }

      const chartData: ChartData[] = [];

      for (const period of periods) {
        const startDate = new Date(period.date);
        const endDate = new Date(period.date);
        
        if (timePeriod === 'week') {
          endDate.setDate(startDate.getDate() + 1);
        } else {
          endDate.setMonth(startDate.getMonth() + 1);
        }

        // Fetch data for this period
        const [leadsResponse, meetingsResponse, dealsResponse] = await Promise.all([
          supabase
            .from('leads')
            .select('id')
            .eq('user_id', user.id)
            .gte('created_at', startDate.toISOString())
            .lt('created_at', endDate.toISOString()),
          
          supabase
            .from('meetings')
            .select('id')
            .eq('user_id', user.id)
            .gte('created_at', startDate.toISOString())
            .lt('created_at', endDate.toISOString()),
          
          supabase
            .from('deals')
            .select('id, deal_value')
            .eq('user_id', user.id)
            .gte('created_at', startDate.toISOString())
            .lt('created_at', endDate.toISOString())
        ]);

        const leads = leadsResponse.data?.length || 0;
        const meetings = meetingsResponse.data?.length || 0;
        const deals = dealsResponse.data?.length || 0;
        const value = dealsResponse.data?.reduce((sum, deal) => sum + (deal.deal_value || 0), 0) || 0;

        chartData.push({
          period: period.label,
          leads,
          meetings,
          deals,
          value: Math.round(value / 1000) // Convert to thousands
        });
      }

      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {timePeriod === 'week' ? 'Daily' : 'Monthly'} Performance Trends
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 text-xs rounded ${
              chartType === 'line' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 text-xs rounded ${
              chartType === 'bar' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Bar
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'value' ? `£${value}k` : value,
                name === 'leads' ? 'Leads' :
                name === 'meetings' ? 'Meetings' :
                name === 'deals' ? 'Deals' :
                'Deal Value (£k)'
              ]}
            />
            
            {chartType === 'line' ? (
              <>
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="meetings" 
                  stroke="#f97316" 
                  strokeWidth={2}
                  dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="deals" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                />
              </>
            ) : (
              <>
                <Bar dataKey="leads" fill="#8b5cf6" />
                <Bar dataKey="meetings" fill="#f97316" />
                <Bar dataKey="deals" fill="#06b6d4" />
              </>
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span>Leads</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Meetings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-500 rounded"></div>
          <span>Deals</span>
        </div>
      </div>
    </div>
  );
};