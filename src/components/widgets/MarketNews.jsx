import React, { useState, useEffect, useMemo, useCallback } from 'react';

const MarketNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState(['market', 'tech', 'policy']);
  const [expandedView, setExpandedView] = useState(false);

  const baseNewsItems = useMemo(() => [
    {
      id: 1,
      title: 'Federal Reserve Maintains Interest Rates, Signals Potential Cuts',
      timestamp: '2024-04-28 14:30:00',
      category: 'policy',
      summary: 'Fed Chair announces steady rates while hinting at future adjustments based on economic data.',
    },
    {
      id: 2,
      title: 'Tech Giant Announces Revolutionary AI Platform',
      timestamp: '2024-04-28 13:15:00',
      category: 'tech',
      summary: 'Major technology company unveils new artificial intelligence system with breakthrough capabilities.',
    },
    {
      id: 3,
      title: 'Global Market Cap Reaches Historic $100T Milestone',
      timestamp: '2024-04-28 11:45:00',
      category: 'market',
      summary: 'World markets achieve unprecedented total value, driven by tech and energy sectors.',
    },
  ], []);

  const filterNews = () => {
    if (activeFilter === 'all') {
      return newsItems;
    }
    return newsItems.filter(item => selectedCategories.includes(item.category));
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleView = () => {
    setExpandedView(prev => !prev);
  };

  const refreshNews = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add a new news item with current timestamp
      const newItem = {
        id: newsItems.length + 1,
        title: `Market Update ${new Date().toLocaleTimeString()}`,
        timestamp: new Date().toISOString(),
        category: ['market', 'tech', 'policy'][Math.floor(Math.random() * 3)],
        summary: 'Latest market movements and analysis.',
      };
      
      setNewsItems(prev => [newItem, ...prev].slice(0, 10));
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }, [newsItems]);

  useEffect(() => {
    // Initialize with base news items
    setNewsItems(baseNewsItems);

    // Set up periodic refresh
    const intervalId = setInterval(refreshNews, 30000);

    return () => clearInterval(intervalId);
  }, [baseNewsItems, refreshNews]);

  const filteredNews = filterNews();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Market News</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded ${
              activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          {['market', 'tech', 'policy'].map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded capitalize ${
                selectedCategories.includes(category) ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={toggleView}
            className="px-3 py-1 rounded bg-gray-200"
          >
            {expandedView ? 'Compact' : 'Expanded'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className={`space-y-4 ${expandedView ? '' : 'h-64 overflow-y-auto'}`}>
          {filteredNews.map(item => (
            <div key={item.id} className="border-b pb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{item.title}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {expandedView && (
                <p className="text-gray-600 mt-1">{item.summary}</p>
              )}
              <span className="inline-block mt-1 px-2 py-1 text-xs rounded bg-gray-100 text-gray-600 capitalize">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketNews;
