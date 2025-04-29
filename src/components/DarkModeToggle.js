import React, { useEffect, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const toggleRef = useRef(null);

  useEffect(() => {
    console.log('DarkModeToggle mounted or updated');
    console.log('Current dark mode state:', isDarkMode);
    console.log('HTML dark class:', document.documentElement.classList.contains('dark'));
    console.log('localStorage darkMode:', localStorage.getItem('darkMode'));
  }, [isDarkMode]);

  const handleToggle = () => {
    console.log('Toggle clicked - Before state change:', {
      isDarkMode,
      htmlClasses: document.documentElement.classList.toString(),
      localStorage: localStorage.getItem('darkMode')
    });
    
    toggleDarkMode();
    
    setTimeout(() => {
      console.log('Toggle clicked - After state change:', {
        isDarkMode: !isDarkMode,
        htmlClasses: document.documentElement.classList.toString(),
        localStorage: localStorage.getItem('darkMode')
      });
    }, 100);
  };

  return (
    <div 
      ref={toggleRef}
      className="dark-mode-toggle fixed top-4 right-4 z-[9999] group"
      style={{ position: 'fixed', top: '1rem', right: '1rem' }}
    >
      <button
        onClick={handleToggle}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-yellow-400 dark:to-orange-500 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
        aria-label="Toggle dark mode"
        style={{ cursor: 'pointer' }}
      >
        {isDarkMode ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
      <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </div>
    </div>
  );
};

export default DarkModeToggle;
