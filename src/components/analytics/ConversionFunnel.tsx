import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ConversionFunnelProps {
  data: {
    totalContacts: number;
    leadsGenerated: number;
    meetingsBooked: number;
    dealsCreated: number;
    dealsWon: number;
  };
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({ data }) => {
  const stages = [
    { name: 'Contacts', value: data.totalContacts, color: 'bg-blue-500' },
    { name: 'Leads', value: data.leadsGenerated, color: 'bg-purple-500' },
    { name: 'Meetings', value: data.meetingsBooked, color: 'bg-orange-500' },
    { name: 'Deals', value: data.dealsCreated, color: 'bg-indigo-500' },
    { name: 'Won', value: data.dealsWon, color: 'bg-green-500' },
  ];

  const calculateConversionRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round((current / previous) * 100);
  };

  const maxValue = Math.max(...stages.map(stage => stage.value));

  return (
    <div className="space-y-6">
      {/* Visual Funnel */}
      <div className="flex items-center justify-between space-x-4 overflow-x-auto pb-4">
        {stages.map((stage, index) => {
          const widthPercentage = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
          const conversionRate = index > 0 
            ? calculateConversionRate(stage.value, stages[index - 1].value)
            : 100;

          return (
            <React.Fragment key={stage.name}>
              <div className="flex flex-col items-center min-w-0 flex-1">
                <div className="w-full max-w-32 mb-2">
                  <div
                    className={`${stage.color} text-white text-center py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl relative`}
                    style={{ 
                      minHeight: '80px',
                      width: `${Math.max(widthPercentage, 20)}%`,
                      margin: '0 auto'
                    }}
                  >
                    <div className="text-lg font-bold">{stage.value.toLocaleString()}</div>
                    <div className="text-xs opacity-90">{stage.name}</div>
                    {index > 0 && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 text-xs px-2 py-1 rounded shadow">
                        {conversionRate}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {index < stages.length - 1 && (
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Conversion Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Contact → Lead</div>
          <div className="text-lg font-bold text-blue-600">
            {calculateConversionRate(data.leadsGenerated, data.totalContacts)}%
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Lead → Meeting</div>
          <div className="text-lg font-bold text-purple-600">
            {calculateConversionRate(data.meetingsBooked, data.leadsGenerated)}%
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Meeting → Deal</div>
          <div className="text-lg font-bold text-orange-600">
            {calculateConversionRate(data.dealsCreated, data.meetingsBooked)}%
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">Deal → Won</div>
          <div className="text-lg font-bold text-green-600">
            {calculateConversionRate(data.dealsWon, data.dealsCreated)}%
          </div>
        </div>
      </div>
    </div>
  );
};