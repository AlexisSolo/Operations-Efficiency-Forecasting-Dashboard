import { Order, AnalysisResult, Category } from './types';

export const CATEGORIES: Category[] = ['Electronics', 'Apparel', 'Home Goods', 'Groceries'];
const STATUSES: Order['status'][] = ['Completed', 'Processing', 'Delayed'];

const generateMockOrders = (): Order[] => {
  const orders: Order[] = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) { // Increased to 90 days of data
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dailyOrders = 20 + Math.floor(Math.random() * 25) + (i % 7 < 2 ? -5 : 5); 

    for (let j = 0; j < dailyOrders; j++) {
      const processingTime = 12 + Math.random() * 60; 
      let status: Order['status'] = 'Completed';
      if (processingTime > 48) {
          status = 'Delayed'
      } else if (Math.random() > 0.8) {
          status = 'Processing'
      }

      orders.push({
        id: orders.length + 1,
        orderDate: date.toISOString(),
        processingTimeHours: parseFloat(processingTime.toFixed(1)),
        status: status,
        category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      });
    }
  }
  return orders;
};

export const MOCK_ORDERS: Order[] = generateMockOrders();

// Mock data to replace the AI-generated analysis
const BASE_ANALYSIS: AnalysisResult = {
  forecast: [
    { date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], orders: 45 },
    { date: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0], orders: 50 },
    { date: new Date(new Date().setDate(new Date().getDate() + 21)).toISOString().split('T')[0], orders: 48 },
    { date: new Date(new Date().setDate(new Date().getDate() + 28)).toISOString().split('T')[0], orders: 55 },
  ],
  analysis: {
    bottlenecks: [
      "Observed surge in orders at the beginning of the week, potentially straining fulfillment capacity.",
      "A significant portion of orders fall into the 'Delayed' category, suggesting a systemic bottleneck.",
    ],
    recommendations: [
      "Implement dynamic resource allocation to handle weekly surges.",
      "Conduct a root cause analysis on delayed orders, investigating warehouse and carrier performance.",
    ]
  }
};

export const getMockAnalysis = (category: Category | 'All'): AnalysisResult => {
  if (category === 'All') {
    return BASE_ANALYSIS;
  }
  
  const categorySpecificAnalysis = { ...BASE_ANALYSIS };

  categorySpecificAnalysis.analysis.bottlenecks = [
    `High delay rate specifically within the '${category}' category suggests supply chain or inventory issues.`,
    `Processing times for '${category}' items are 15% higher than average.`,
  ];
  categorySpecificAnalysis.analysis.recommendations = [
    `Review inventory management and supplier reliability for '${category}'.`,
    `Isolate and analyze the '${category}' fulfillment workflow to identify specific slowdowns.`,
  ];

  // Adjust forecast slightly for variety
  categorySpecificAnalysis.forecast = BASE_ANALYSIS.forecast.map(f => ({
    ...f,
    orders: Math.round(f.orders * (1 + (CATEGORIES.indexOf(category) - 1.5) * 0.1)) // some variance
  }));
  
  return categorySpecificAnalysis;
}