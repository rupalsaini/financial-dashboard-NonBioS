import React from 'react';

const MarketNews = () => {
  const news = [
    {
      title: 'Fed Signals Potential Rate Changes',
      source: 'Financial Times',
      time: '2 hours ago',
      description: 'Federal Reserve officials indicate possible policy shifts in response to economic data...'
    },
    {
      title: 'Tech Stocks Rally Continues',
      source: 'Reuters',
      time: '3 hours ago',
      description: 'Major technology companies lead market gains as investor confidence grows...'
    },
    {
      title: 'Global Supply Chain Updates',
      source: 'Bloomberg',
      time: '4 hours ago',
      description: 'New developments in global logistics show signs of improvement...'
    },
    {
      title: 'Cryptocurrency Market Analysis',
      source: 'CoinDesk',
      time: '5 hours ago',
      description: 'Bitcoin and other major cryptocurrencies show increased stability...'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Market News</h2>
        <div className="space-y-4">
          {news.map((item, index) => (
            <div 
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{item.source}</span>
                <span className="mx-2">•</span>
                <span>{item.time}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketNews;
