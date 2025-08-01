import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MetricPod } from './components/MetricPod';
import { ForecastChart } from './components/ForecastChart';
import { AnalysisSection } from './components/AnalysisSection';
import { MOCK_ORDERS, getMockAnalysis, CATEGORIES } from './constants';
import { Order, AnalysisResult, HistoricalDataPoint, Category } from './types';
import { DataPanel } from './components/DataPanel';
import { Tabs } from './components/Tabs';
import { CategoryDonutChart } from './components/CategoryDonutChart';
import { OrderTable } from './components/OrderTable';

type Tab = 'Dashboard' | 'Order Details';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filteredOrders = useMemo(() => {
    if (activeCategory === 'All') {
      return MOCK_ORDERS;
    }
    return MOCK_ORDERS.filter(order => order.category === activeCategory);
  }, [activeCategory]);
  
  const analysisResult = useMemo(() => getMockAnalysis(activeCategory), [activeCategory]);

  const calculateMetrics = useCallback((orders: Order[]) => {
    const totalOrders = orders.length;
    const processingTimeThreshold = 48; // hours
    
    const serviceLevelCompliantOrders = orders.filter(
      o => o.processingTimeHours <= processingTimeThreshold
    ).length;
    
    const serviceLevelCompliance = totalOrders > 0 
      ? (serviceLevelCompliantOrders / totalOrders) * 100 
      : 0;

    const averageProcessingTime = totalOrders > 0
      ? orders.reduce((sum, o) => sum + o.processingTimeHours, 0) / totalOrders
      : 0;

    return {
      totalOrders,
      serviceLevelCompliance,
      averageProcessingTime,
    };
  }, []);

  const metrics = useMemo(() => calculateMetrics(filteredOrders), [filteredOrders, calculateMetrics]);

  const aggregateHistoricalData = useCallback((orders: Order[]): HistoricalDataPoint[] => {
    const dailyData: { [key: string]: number } = {};
    orders.forEach(order => {
      const date = new Date(order.orderDate).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      dailyData[date]++;
    });

    return Object.entries(dailyData)
      .map(([date, orders]) => ({ date, orders }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  const historicalData = useMemo(() => aggregateHistoricalData(filteredOrders), [filteredOrders, aggregateHistoricalData]);

  const combinedChartData = useMemo(() => {
    if (!analysisResult?.forecast || historicalData.length === 0) {
      return historicalData.map(d => ({...d, type: 'Historical'}));
    }
    const forecastData = analysisResult.forecast.map(f => ({ ...f, type: 'Forecast' }));
    
    const lastHistorical = historicalData[historicalData.length - 1];
    if (lastHistorical && forecastData.length > 0) {
      forecastData.unshift({ ...lastHistorical, orders: lastHistorical.orders, type: 'Forecast' });
    }

    return [
        ...historicalData.map(d => ({...d, type: 'Historical'})),
        ...forecastData
    ];
  }, [historicalData, analysisResult]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col h-[85vh] gap-4">
          
          {/* Controls and Tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Tabs<Tab>
              tabs={['Dashboard', 'Order Details']}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={() => setActiveCategory('All')}
                className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${activeCategory === 'All' ? 'bg-cyan-400 text-black font-bold glow-shadow-secondary' : 'bg-gray-700/50 hover:bg-gray-600/70'}`}
              >
                All Categories
              </button>
              {CATEGORIES.map(cat => (
                 <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${activeCategory === cat ? 'bg-cyan-400 text-black font-bold glow-shadow-secondary' : 'bg-gray-700/50 hover:bg-gray-600/70'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow">
            {activeTab === 'Dashboard' && (
              <div className="grid grid-cols-12 grid-rows-6 gap-6 h-full">
                <div className="col-span-12 lg:col-span-3 row-span-2 lg:row-span-6 flex flex-col justify-around gap-6">
                  <MetricPod 
                    title="Total Orders (Filtered)" 
                    value={metrics.totalOrders.toString()}
                    icon="fa-box"
                  />
                  <MetricPod 
                    title="Service-Level Compliance" 
                    value={`${metrics.serviceLevelCompliance.toFixed(1)}%`}
                    icon="fa-check-circle"
                    tooltip="Percentage of orders processed within 48 hours"
                  />
                  <MetricPod 
                    title="Avg. Processing Time" 
                    value={`${metrics.averageProcessingTime.toFixed(1)} hrs`}
                    icon="fa-clock"
                  />
                </div>
                
                <div className="col-span-12 lg:col-span-9 row-span-6 flex flex-col gap-6">
                   <div className="grid grid-cols-5 gap-6 flex-grow">
                      <div className="col-span-5 xl:col-span-3 h-full">
                        <DataPanel title="Order Volume: Historical vs. Forecast" className="shimmer">
                          <ForecastChart data={combinedChartData} />
                        </DataPanel>
                      </div>
                      <div className="col-span-5 xl:col-span-2 h-full grid grid-rows-2 gap-6">
                        <div className="row-span-1">
                          <DataPanel title="Order Distribution by Category" className="shimmer">
                              <CategoryDonutChart orders={filteredOrders} onCategorySelect={setActiveCategory} />
                          </DataPanel>
                        </div>
                         <div className="row-span-1">
                          <DataPanel title="Analysis & Recommendations" className="shimmer">
                              <AnalysisSection result={analysisResult} />
                          </DataPanel>
                         </div>
                      </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Order Details' && (
              <DataPanel title={`Order Details (${filteredOrders.length} items)`} className="h-full">
                <OrderTable orders={filteredOrders} />
              </DataPanel>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;