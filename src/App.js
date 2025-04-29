import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';
import DarkModeToggle from './components/DarkModeToggle';

// Wrapper component to handle dark mode class
const DarkModeHandler = ({ children }) => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Apply dark mode class to html element
    document.documentElement.classList.toggle('dark', isDarkMode);
    console.log('DarkModeHandler: Updated dark mode class', {
      isDarkMode,
      htmlClasses: document.documentElement.classList.toString()
    });
  }, [isDarkMode]);

  return (
    <div className={`App min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {children}
    </div>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <DarkModeHandler>
        <DarkModeToggle />
        <Dashboard />
      </DarkModeHandler>
    </DarkModeProvider>
  );
}

export default App;
