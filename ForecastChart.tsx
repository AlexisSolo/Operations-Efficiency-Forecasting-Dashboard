import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

interface ForecastChartProps {
    data: { date: string, orders: number, type: string }[];
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const CustomTooltip = ({ active, payload, label }: any) => {      
      if (active && payload && payload.length) {
        return (
          <div className="bg-black/70 backdrop-blur-sm border border-cyan-500/50 p-3 rounded-md text-sm font-mono">
            <p className="label font-bold text-cyan-400">{`${formatXAxis(label)}`}</p>
            <p className="intro text-gray-300">{`${payload[0].name} Orders: ${payload[0].value}`}</p>
          </div>
        );
      }
    
      return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                <defs>
                    <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <CartesianGrid strokeDasharray="1 4" stroke="rgba(52, 211, 153, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatXAxis} 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{stroke: 'rgba(156, 163, 175, 0.5)'}}
                  dy={10}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{stroke: 'rgba(156, 163, 175, 0.5)'}}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip
                    cursor={{ stroke: 'rgba(8, 217, 214, 0.5)', strokeWidth: 1, strokeDasharray: '3 3' }}
                    content={<CustomTooltip />}
                />
                <Legend wrapperStyle={{ bottom: -5, fontFamily: 'monospace' }} />
                <Line 
                    type="monotone" 
                    dataKey="orders" 
                    name="Historical"
                    stroke="#9ca3af" 
                    strokeWidth={2} 
                    dot={false}
                    data={data.filter(d => d.type === 'Historical')}
                />
                 <Line 
                    type="monotone" 
                    dataKey="orders" 
                    name="Forecast"
                    stroke="#08d9d6" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={{ r: 4, fill: '#08d9d6' }}
                    filter="url(#glow-cyan)"
                    data={data.filter(d => d.type === 'Forecast')}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};