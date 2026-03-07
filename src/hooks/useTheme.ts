// Theme Hook for Dark Mode
import { useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  borderRadius: number;
}

const defaultTheme: ThemeConfig = {
  mode: 'light',
  primaryColor: '#1890ff',
  borderRadius: 6,
};

export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    const savedTheme = localStorage.getItem('adminTheme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch {
        return defaultTheme;
      }
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return { ...defaultTheme, mode: 'dark' };
    }
    
    return defaultTheme;
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme.mode === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--bg-primary', '#141414');
      root.style.setProperty('--bg-secondary', '#1f1f1f');
      root.style.setProperty('--bg-tertiary', '#262626');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.65)');
      root.style.setProperty('--text-tertiary', 'rgba(255, 255, 255, 0.45)');
      root.style.setProperty('--border-color', '#434343');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f5f5f5');
      root.style.setProperty('--bg-tertiary', '#fafafa');
      root.style.setProperty('--text-primary', 'rgba(0, 0, 0, 0.88)');
      root.style.setProperty('--text-secondary', 'rgba(0, 0, 0, 0.65)');
      root.style.setProperty('--text-tertiary', 'rgba(0, 0, 0, 0.45)');
      root.style.setProperty('--border-color', '#d9d9d9');
    }
    
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--border-radius', `${theme.borderRadius}px`);
    
    // Save to localStorage
    localStorage.setItem('adminTheme', JSON.stringify(theme));
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('adminTheme');
      if (!savedTheme) {
        setThemeState(prev => ({
          ...prev,
          mode: e.matches ? 'dark' : 'light',
        }));
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((newTheme: Partial<ThemeConfig>) => {
    setThemeState(prev => ({ ...prev, ...newTheme }));
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const setMode = useCallback((mode: ThemeMode) => {
    setThemeState(prev => ({ ...prev, mode }));
  }, []);

  const setPrimaryColor = useCallback((color: string) => {
    setThemeState(prev => ({ ...prev, primaryColor: color }));
  }, []);

  const resetTheme = useCallback(() => {
    setThemeState(defaultTheme);
    localStorage.removeItem('adminTheme');
  }, []);

  const isDark = theme.mode === 'dark';
  const isDarkMode = isDark; // alias
  const themeColor = theme.primaryColor; // alias

  const setThemeColor = useCallback((color: string) => {
    setThemeState(prev => ({ ...prev, primaryColor: color }));
  }, []);

  return {
    theme,
    isDark,
    isDarkMode,
    themeColor,
    setTheme,
    toggleTheme,
    setMode,
    setPrimaryColor,
    setThemeColor,
    resetTheme,
  };
};
