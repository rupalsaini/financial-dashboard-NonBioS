import React from 'react';

const PortfolioWatchlist = () => {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '145.85', change: '+2.34%', volume: '78.9M' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '285.32', change: '-0.78%', volume: '25.6M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '2,750.12', change: '+1.45%', volume: '1.2M' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '3,305.78', change: '-0.23%', volume: '3.5M' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '725.60', change: '+3.16%', volume: '21.4M' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Portfolio Watchlist</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Symbol</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Price</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Change</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Volume</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr 
                  key={stock.symbol}
                  className={`
                    ${index !== stocks.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}
                    hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150
                  `}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{stock.symbol}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{stock.name}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">${stock.price}</td>
                  <td className={`px-4 py-3 text-sm text-right ${
                    stock.change.startsWith('+') 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stock.change}
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-500 dark:text-gray-400">{stock.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioWatchlist;
