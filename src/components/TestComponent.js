import React, { useEffect } from 'react';

const TestComponent = () => {
  useEffect(() => {
    console.log('TestComponent mounted');
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: 'red',
      color: 'white',
      zIndex: 9999,
      border: '2px solid white'
    }}>
      Test Component
    </div>
  );
};

export default TestComponent;

# Update App.js to include TestComponent
cat > src/App.js << 'EOF'
import React, { useEffect } from 'react';
import './App.css';
import { DarkModeProvider } from './context/DarkModeContext';
import DarkModeToggle from './components/DarkModeToggle';
import DebugInfo from './components/DebugInfo';
import TestComponent from './components/TestComponent';

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <TestComponent />
        <DarkModeToggle />
        <header className="bg-blue-500 dark:bg-blue-800 py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Financial Dashboard
          </h1>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="text-gray-900 dark:text-white">
            <h2 className="text-xl font-semibold mb-4">Dashboard Content</h2>
            <p>Your financial data will appear here.</p>
          </div>
        </main>
        <DebugInfo />
      </div>
    </DarkModeProvider>
  );
}

export default App;
