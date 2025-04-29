import React, { useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const DebugInfo = () => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    console.log('Debug Info Mounted');
    console.log('Dark Mode State:', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 text-sm">
      <p className="text-gray-900 dark:text-white">Debug Info:</p>
      <p className="text-gray-700 dark:text-gray-300">Dark Mode: {isDarkMode ? 'On' : 'Off'}</p>
      <p className="text-gray-700 dark:text-gray-300">Toggle Position: Top Right</p>
    </div>
  );
};

export default DebugInfo;
