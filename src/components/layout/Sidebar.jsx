import React, { useState } from 'react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  
  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Stocks', icon: '📈', path: '/stocks' },
    { name: 'Markets', icon: '🏢', path: '/markets' },
    { name: 'Commodities', icon: '💎', path: '/commodities' },
    { name: 'Global', icon: '🌍', path: '/global' },
    { name: 'Portfolio', icon: '📁', path: '/portfolio' },
    { name: 'Performance', icon: '📊', path: '/performance' },
    { name: 'Analytics', icon: '📉', path: '/analytics' },
    { name: 'Settings', icon: '⚙️', path: '/settings' }
  ];

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">
          Market Dashboard
        </h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleItemClick(item.name)}
                className={`w-full flex items-center space-x-3 p-3 rounded transition-colors ${
                  activeItem === item.name 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="flex-1 text-left">{item.name}</span>
                {activeItem === item.name && (
                  <span className="h-2 w-2 rounded-full bg-white"/>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 left-0 w-64 p-4 bg-gray-900">
        <div className="flex items-center space-x-3 p-3 rounded hover:bg-gray-800">
          <span className="text-xl">👤</span>
          <span className="text-sm text-gray-300">User Profile</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
