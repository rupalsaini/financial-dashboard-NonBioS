import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Market Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Refresh</button>
          <input 
            type="search" 
            placeholder="Search markets..." 
            className="px-4 py-2 rounded text-gray-800"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
