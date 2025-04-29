import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Portfolio', icon: '💼' },
    { name: 'Watchlist', icon: '👀' },
    { name: 'Markets', icon: '📈' },
    { name: 'News', icon: '📰' },
    { name: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          FinDash
        </h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`
                    flex items-center px-4 py-3 text-gray-700 dark:text-gray-200
                    rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors duration-150
                    ${index === 0 ? 'bg-gray-100 dark:bg-gray-700' : ''}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Rupal Saini</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Premium Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
