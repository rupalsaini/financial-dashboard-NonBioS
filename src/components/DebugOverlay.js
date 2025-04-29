import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const DebugOverlay = () => {
  const { isDarkMode, debug } = useDarkMode();
  const [togglePosition, setTogglePosition] = useState(null);

  useEffect(() => {
    const toggle = document.querySelector('.dark-mode-toggle');
    if (toggle) {
      const rect = toggle.getBoundingClientRect();
      setTogglePosition({
        top: rect.top,
        right: rect.right,
        visible: rect.width > 0 && rect.height > 0,
        zIndex: window.getComputedStyle(toggle).zIndex
      });
    }
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-[9999] text-sm">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <ul className="space-y-1">
        <li>Dark Mode: {isDarkMode ? 'Enabled' : 'Disabled'}</li>
        <li>System Preference: {debug.systemPreference ? 'Dark' : 'Light'}</li>
        <li>LocalStorage: {debug.hasLocalStorage ? 'Present' : 'Not set'}</li>
        {togglePosition && (
          <>
            <li>Toggle Position: {JSON.stringify(togglePosition)}</li>
            <li>Toggle Visible: {togglePosition.visible ? 'Yes' : 'No'}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DebugOverlay;
