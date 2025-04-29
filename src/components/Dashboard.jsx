import React from 'react';
import Sidebar from './layout/Sidebar';
import MarketOverview from './widgets/MarketOverview';
import PortfolioWatchlist from './widgets/PortfolioWatchlist';
import StockChart from './charts/StockChart';
import GlobalMarkets from './widgets/GlobalMarkets';
import MarketNews from './widgets/MarketNews';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Market Dashboard</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <MarketOverview />
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Main content area */}
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-6">
                <PortfolioWatchlist />
              </div>
              <div className="mb-6">
                <StockChart />
              </div>
            </div>

            {/* Right sidebar */}
            <div className="col-span-12 lg:col-span-4">
              <GlobalMarkets />
            </div>
          </div>

          {/* Bottom news section */}
          <div className="mt-6">
            <MarketNews />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
