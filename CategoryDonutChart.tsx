import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Order, Category } from '../types';
import { CATEGORIES } from '../constants';

interface CategoryDonutChartProps {
    orders: Order[];
    onCategorySelect: (category: Category | 'All') => void;
}

const COLORS = ['#34d399', '#08d9d6', '#a78bfa', '#f472b6'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/70 backdrop-blur-sm border border-cyan-500/50 p-3 rounded-md text-sm font-mono">
          <p className="font-bold" style={{color: payload[0].fill}}>{data.name}</p>
          <p className="text-gray-300">{`Orders: ${data.value}`}</p>
        </div>
      );
    }
  
    return null;
};

export const CategoryDonutChart: React.FC<CategoryDonutChartProps> = ({ orders, onCategorySelect }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const categoryData = useMemo(() => {
        const counts: Record<Category, number> = {
            'Electronics': 0,
            'Apparel': 0,
            'Home Goods': 0,
            'Groceries': 0,
        };
        orders.forEach(order => {
            if (counts[order.category] !== undefined) {
                counts[order.category]++;
            }
        });
        return CATEGORIES.map(cat => ({ name: cat, value: counts[cat] })).filter(d => d.value > 0);
    }, [orders]);
    
    if (categoryData.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500 font-mono text-sm">No data to display</div>
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
                <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={(data) => onCategorySelect(data.name as Category)}
                >
                    {categoryData.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[CATEGORIES.indexOf(entry.name as Category) % COLORS.length]}
                            style={{
                                filter: `drop-shadow(0 0 5px ${COLORS[CATEGORIES.indexOf(entry.name as Category) % COLORS.length]})`,
                                opacity: activeIndex === null || activeIndex === index ? 1 : 0.5,
                                cursor: 'pointer',
                                transition: 'opacity 0.2s, transform 0.2s',
                                transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                            }}
                         />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};