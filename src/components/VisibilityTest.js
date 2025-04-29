import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const VisibilityTest = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-blue-500 text-white text-center">
      <p>Dark Mode is: {isDarkMode ? 'ON' : 'OFF'}</p>
      <p>Toggle button should be visible in top-right corner</p>
      <div className="fixed top-4 right-4 w-12 h-12 border-2 border-red-500 animate-pulse pointer-events-none">
        {/* This is a visual indicator of where the toggle should be */}
      </div>
    </div>
  );
};

export default VisibilityTest;
