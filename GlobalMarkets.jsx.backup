import React, { useState, useEffect, useCallback } from 'react';

const IndexCard = ({ name, value, change, previousValue }) => {
  const valueChanged = previousValue && value !== previousValue;
  
  return (
    <div className={`flex justify-between items-center p-3 border-b border-gray-200 transition-all duration-300 ${
      valueChanged ? 'bg-yellow-50' : ''
    }`}>
      <span className="font-medium">{name}</span>
      <div className="text-right">
        <div className={valueChanged ? 'animate-pulse' : ''}>{value}</div>
        <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};

const CurrencyCard = ({ pair, rate, change, previousRate }) => {
  const rateChanged = previousRate && rate !== previousRate;
  
  return (
    <div className={`flex justify-between items-center p-3 border-b border-gray-200 transition-all duration-300 ${
      rateChanged ? 'bg-yellow-50' : ''
    }`}>
      <span className="font-medium">{pair}</span>
      <div className="text-right">
        <div className={rateChanged ? 'animate-pulse' : ''}>{rate}</div>
        <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};

const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const GlobalMarkets = () => {
  const [indices, setIndices] = useState([
    { name: 'S&P 500', value: '4,783.35', change: 1.2 },
    { name: 'Dow Jones', value: '37,562.10', change: 0.8 },
    { name: 'NASDAQ', value: '15,003.22', change: 1.5 },
    { name: 'Nikkei 225', value: '33,452.80', change: -0.3 },
    { name: 'FTSE 100', value: '7,512.28', change: 0.4 },
    { name: 'DAX', value: '16,752.23', change: 0.6 }
  ]);

  const [currencies, setCurrencies] = useState([
    { pair: 'EUR/USD', rate: '1.0892', change: 0.15 },
    { pair: 'USD/JPY', rate: '148.32', change: -0.25 },
    { pair: 'USD/GBP', rate: '0.7912', change: 0.08 },
    { pair: 'USD/CAD', rate: '1.3456', change: -0.12 },
    { pair: 'USD/CNY', rate: '7.1432', change: 0.05 },
    { pair: 'AUD/USD', rate: '0.6578', change: 0.18 }
  ]);

  const [previousIndices, setPreviousIndices] = useState([]);
  const [previousCurrencies, setPreviousCurrencies] = useState([]);
  const [isLoadingIndices, setIsLoadingIndices] = useState(false);
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const generateRandomChange = (baseValue) => {
    const change = (Math.random() - 0.5) * 2;
    const newValue = (parseFloat(baseValue.replace(',', '')) * (1 + change / 100)).toFixed(2);
    return {
      formattedValue: Number(newValue).toLocaleString('en-US', { minimumFractionDigits: 2 }),
      change: change.toFixed(2)
    };
  };

  const refreshIndices = useCallback(async () => {
    setIsLoadingIndices(true);
    setPreviousIndices([...indices]);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIndices(prevIndices => prevIndices.map(index => {
      const { formattedValue, change } = generateRandomChange(index.value);
      return { ...index, value: formattedValue, change: parseFloat(change) };
    }));

    setIsLoadingIndices(false);
    setLastUpdated(new Date());
  }, [indices]);

  const refreshCurrencies = useCallback(async () => {
    setIsLoadingCurrencies(true);
    setPreviousCurrencies([...currencies]);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setCurrencies(prevCurrencies => prevCurrencies.map(currency => {
      const { formattedValue, change } = generateRandomChange(currency.rate);
      return { ...currency, rate: formattedValue, change: parseFloat(change) };
    }));

    setIsLoadingCurrencies(false);
    setLastUpdated(new Date());
  }, [currencies]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refreshIndices();
        refreshCurrencies();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshIndices, refreshCurrencies]);

  return (
    <div className="grid grid-rows-2 gap-4">
      <div className="bg-white rounded-lg shadow-lg p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Global Markets</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={refreshIndices}
              className="text-blue-500 hover:text-blue-600 flex items-center"
              disabled={isLoadingIndices}
            >
              <span className={`mr-1 ${isLoadingIndices ? 'animate-spin' : ''}`}>↻</span> 
              Refresh
            </button>
          </div>
        </div>
        {isLoadingIndices && <LoadingOverlay />}
        <div className="space-y-1">
          {indices.map((index, i) => (
            <IndexCard 
              key={i} 
              {...index} 
              previousValue={previousIndices[i]?.value}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Currency Exchange</h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="mr-2"
              />
              Auto-refresh
            </label>
            <button
              onClick={refreshCurrencies}
              className="text-blue-500 hover:text-blue-600 flex items-center"
              disabled={isLoadingCurrencies}
            >
              <span className={`mr-1 ${isLoadingCurrencies ? 'animate-spin' : ''}`}>↻</span> 
              Refresh
            </button>
          </div>
        </div>
        {isLoadingCurrencies && <LoadingOverlay />}
        <div className="space-y-1">
          {currencies.map((currency, i) => (
            <CurrencyCard 
              key={i} 
              {...currency} 
              previousRate={previousCurrencies[i]?.rate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalMarkets;
