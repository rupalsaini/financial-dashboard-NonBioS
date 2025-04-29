import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const generateChartData = (basePrice) => {
  const labels = Array.from({length: 20}, (_, i) => i + 1);
  const data = labels.map(() => basePrice + (Math.random() - 0.5) * 10);
  return {
    labels,
    datasets: [
      {
        label: 'Price',
        data,
        borderColor: basePrice > data[data.length - 1] ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };
};

const StockCard = ({ symbol, price, change, weekRange, isLoading, onRefresh }) => {
  const [chartData, setChartData] = useState(generateChartData(parseFloat(price)));

  // Use setChartData when refreshing individual stock data
  const refreshChart = useCallback(() => {
    setChartData(generateChartData(parseFloat(price)));
  }, [price]);

  // Update chart when price changes
  useEffect(() => {
    refreshChart();
  }, [price, refreshChart]);

  const changePercent = parseFloat(change);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all ${
      isLoading ? 'opacity-50' : 'opacity-100'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold">{symbol}</h3>
          <p className="text-2xl font-semibold">${price}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-2 py-1 rounded ${changePercent >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {change}%
          </span>
          <button 
            onClick={() => {
              refreshChart();
              onRefresh();
            }}
            className="mt-2 text-blue-500 hover:text-blue-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          <span>52W Range:</span>
          <span className="ml-2">{weekRange}</span>
        </div>
        <div className="h-24 bg-gray-50 rounded">
          <Line options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
};

const PortfolioWatchlist = () => {
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', price: '186.40', change: '+2.3', weekRange: '167.20 - 198.23' },
    { symbol: 'MSFT', price: '392.38', change: '+1.8', weekRange: '346.12 - 398.86' },
    { symbol: 'GOOGL', price: '160.83', change: '-0.5', weekRange: '142.56 - 168.23' },
    { symbol: 'AMZN', price: '179.71', change: '+3.2', weekRange: '156.45 - 185.12' },
    { symbol: 'NVDA', price: '915.11', change: '+4.1', weekRange: '785.34 - 925.67' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update stocks with new random changes
    setStocks(prevStocks => prevStocks.map(stock => ({
      ...stock,
      price: (parseFloat(stock.price) + (Math.random() - 0.5) * 5).toFixed(2),
      change: ((Math.random() - 0.5) * 5).toFixed(1),
    })));
    
    setIsLoading(false);
    setLastUpdated(new Date());
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Portfolio Watchlist</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Refresh All
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            {...stock}
            isLoading={isLoading}
            onRefresh={() => refreshData()}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioWatchlist;
