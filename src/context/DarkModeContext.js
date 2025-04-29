import React, { createContext, useState, useContext, useEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get initial state from localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved ? JSON.parse(saved) : prefersDark;
  });

  useEffect(() => {
    // Update HTML class and localStorage when dark mode changes
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    // Log state changes for debugging
    console.log('Dark mode changed:', {
      isDarkMode,
      hasRootDarkClass: root.classList.contains('dark'),
      localStorageValue: localStorage.getItem('darkMode')
    });
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log('Toggle called, current state:', isDarkMode);
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      console.log('New dark mode state will be:', newMode);
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}
