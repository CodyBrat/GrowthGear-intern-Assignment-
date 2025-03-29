// Mock data for different query types
const mockDatasets = {
  sales: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'North',
        data: [4000, 4200, 4500, 4800, 5100, 5400],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'South',
        data: [3000, 3100, 3300, 3400, 3600, 3800],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'East',
        data: [5000, 5200, 5400, 5600, 5800, 6000],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'West',
        data: [4500, 4700, 4900, 5100, 5300, 5500],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
    type: 'bar',
    title: 'Sales Performance by Region (Q1-Q2 2023)',
  },
  revenue: {
    labels: ['Electronics', 'Clothing', 'Home Goods', 'Toys', 'Sports', 'Beauty'],
    datasets: [
      {
        label: 'Revenue by Category',
        data: [12000, 8000, 6000, 4000, 3000, 2000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
    type: 'pie',
    title: 'Revenue by Product Category',
  },
  customers: {
    labels: ['ABC Corp', 'XYZ Ltd', 'Acme Inc', 'Tech Solutions', 'Global Services'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [42000, 38000, 32000, 28000, 25000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
    type: 'bar',
    title: 'Top 5 Customers by Revenue',
  },
  traffic: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Website Visitors',
        data: [15000, 16000, 18000, 21000, 24000, 26000, 28000, 27000, 25000, 23000, 22000, 24000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
    type: 'line',
    title: 'Monthly Website Traffic Trends',
  },
  churn: {
    labels: ['Enterprise', 'SMB', 'Startup', 'Individual'],
    datasets: [
      {
        label: 'Churn Rate (%)',
        data: [2.3, 4.5, 8.7, 12.2],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
    type: 'bar',
    title: 'Customer Churn Rate by Segment',
  },
};

// Helper to detect query type based on keywords
const detectQueryType = (query) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('sales') && lowerQuery.includes('region')) return 'sales';
  if (lowerQuery.includes('revenue') && lowerQuery.includes('product')) return 'revenue';
  if (lowerQuery.includes('top') && lowerQuery.includes('customer')) return 'customers';
  if (lowerQuery.includes('traffic') || lowerQuery.includes('website')) return 'traffic';
  if (lowerQuery.includes('churn')) return 'churn';
  
  // Default to sales if no match
  return 'sales';
};

// Process query asynchronously (simulates API call)
export const processQuery = async (query) => {
  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const queryType = detectQueryType(query);
        const results = mockDatasets[queryType];
        
        if (results) {
          resolve({
            ...results,
            query,
            timestamp: new Date().toISOString(),
          });
        } else {
          reject(new Error('Could not process query. Please try again.'));
        }
      } catch (error) {
        reject(new Error('An error occurred while processing your query.'));
      }
    }, 1500); // 1.5 second delay to simulate processing
  });
}; 