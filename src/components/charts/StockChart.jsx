import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import SimulatedWebSocket from '../../services/websocket';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = () => {
  const [currentPrice, setCurrentPrice] = useState(186.40);
  const [priceChange, setPriceChange] = useState('+2.45%');
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('line');
  const [isLoading, setIsLoading] = useState(false);
  const [indicators, setIndicators] = useState({ rsi: false });
  
  const calculateRSI = (prices) => {
    const periods = 14;
    const gains = [];
    const losses = [];
    
    for (let i = 1; i < prices.length; i++) {
      const difference = prices[i] - prices[i - 1];
      if (difference >= 0) {
        gains.push(difference);
        losses.push(0);
      } else {
        gains.push(0);
        losses.push(Math.abs(difference));
      }
    }
    
    const avgGain = gains.reduce((a, b) => a + b, 0) / periods;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / periods;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  };

  const generateChartData = useCallback(() => {
    const labels = Array.from({ length: 100 }, (_, i) => i.toString());
    const prices = Array.from({ length: 100 }, () => Math.random() * 10 + 180);
    const rsiValues = Array.from({ length: 100 }, (_, i) => {
      if (i < 14) return null;
      return calculateRSI(prices.slice(0, i + 1));
    });

    return {
      labels,
      datasets: [
        {
          label: 'Stock Price',
          data: prices,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          yAxisID: 'y'
        },
        ...(indicators.rsi ? [{
          label: 'RSI',
          data: rsiValues,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
          yAxisID: 'rsi'
        }] : [])
      ]
    };
  }, [indicators.rsi]);

  const [chartData, setChartData] = useState(generateChartData());

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChartData(generateChartData());
    } finally {
      setIsLoading(false);
    }
  }, [generateChartData]);

  useEffect(() => {
    const ws = new SimulatedWebSocket();
    
    ws.onmessage = (event) => {
      const newPrice = parseFloat(event.data);
      const oldPrice = currentPrice;
      setCurrentPrice(newPrice);
      
      // Calculate price change percentage
      const changePercent = ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);
      const changeStr = changePercent >= 0 ? `+${changePercent}%` : `${changePercent}%`;
      setPriceChange(changeStr);

      setChartData(prevData => ({
        ...prevData,
        datasets: [{
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data.slice(1), newPrice]
        }]
      }));
    };

    return () => ws.close();
  }, [currentPrice]);

  // Fetch new data when timeframe changes
  useEffect(() => {
    fetchData();
  }, [timeframe, fetchData]);

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Price ($)'
        }
      },
      rsi: {
        type: 'linear',
        display: indicators.rsi,
        position: 'right',
        min: 0,
        max: 100,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'RSI'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AAPL Stock Price & RSI'
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">
          AAPL: ${currentPrice.toFixed(2)} <span className={priceChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{priceChange}</span>
        </div>
        <div className="flex gap-2">
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="border p-2 rounded">
            <option value="1D">1 Day</option>
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
          </select>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)} className="border p-2 rounded">
            <option value="line">Line</option>
            <option value="candlestick">Candlestick</option>
          </select>
          <div className="flex items-center gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={indicators.rsi}
                onChange={(e) => setIndicators(prev => ({ ...prev, rsi: e.target.checked }))}
                className="mr-1"
              />
              RSI
            </label>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default StockChart;
