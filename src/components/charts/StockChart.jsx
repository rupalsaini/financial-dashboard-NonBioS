import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDarkMode } from '../../context/DarkModeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StockChart = () => {
  const { isDarkMode } = useDarkMode();
  const [chartData, setChartData] = useState(null);

  // Generate sample data
  useEffect(() => {
    const generateData = () => {
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const baseValue = 100;
      const volatility = 10;
      
      const stockData = labels.map((_, index) => {
        const randomChange = (Math.random() - 0.5) * volatility;
        return baseValue + randomChange + (index * 2);
      });

      return {
        labels,
        datasets: [
          {
            label: 'Stock Price',
            data: stockData,
            fill: true,
            borderColor: isDarkMode ? '#60A5FA' : '#2563EB',
            backgroundColor: isDarkMode 
              ? 'rgba(96, 165, 250, 0.1)' 
              : 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            pointRadius: 2,
            pointHoverRadius: 5,
          }
        ]
      };
    };

    setChartData(generateData());
  }, [isDarkMode]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: isDarkMode ? '#E5E7EB' : '#1F2937'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
        titleColor: isDarkMode ? '#E5E7EB' : '#1F2937',
        bodyColor: isDarkMode ? '#E5E7EB' : '#1F2937',
        borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? '#374151' : '#E5E7EB',
          drawBorder: false,
        },
        ticks: {
          color: isDarkMode ? '#E5E7EB' : '#1F2937'
        }
      },
      y: {
        grid: {
          color: isDarkMode ? '#374151' : '#E5E7EB',
          drawBorder: false,
        },
        ticks: {
          color: isDarkMode ? '#E5E7EB' : '#1F2937'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Stock Performance</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              1D
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              1W
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              1M
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              1Y
            </button>
          </div>
        </div>
        <div className="h-96">
          {chartData && <Line data={chartData} options={options} />}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Open</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">$100.50</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">High</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">$110.75</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Low</p>
            <p className="text-lg font-semibold text-red-600 dark:text-red-400">$98.25</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
