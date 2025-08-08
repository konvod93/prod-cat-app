import React, { createContext, useContext, useEffect, useState } from 'react';

// Создаем контекст темы
const ThemeContext = createContext();

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  console.log('ThemeProvider initialized');

  // Загружаем тему из localStorage при инициализации
  useEffect(() => {
    console.log('ThemeProvider useEffect - loading theme');
    try {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      console.log('Saved theme:', savedTheme);
      console.log('System prefers dark:', systemPrefersDark);
      
      if (savedTheme) {
        const isDarkTheme = savedTheme === 'dark';
        setIsDark(isDarkTheme);
        console.log('Set theme from localStorage:', isDarkTheme);
      } else {
        // Используем системные настройки по умолчанию
        setIsDark(systemPrefersDark);
        console.log('Set theme from system preference:', systemPrefersDark);
      }
    } catch (error) {
      console.error('Ошибка загрузки темы:', error);
    }
  }, []);

  // Применяем тему к документу
  useEffect(() => {
    console.log('Applying theme to document, isDark:', isDark);
    
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add('dark');
      console.log('Added dark class to html element');
    } else {
      htmlElement.classList.remove('dark');
      console.log('Removed dark class from html element');
    }
    
    // Сохраняем в localStorage
    try {
      const themeValue = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', themeValue);
      console.log('Saved theme to localStorage:', themeValue);
    } catch (error) {
      console.error('Ошибка сохранения темы:', error);
    }
    
    // Проверяем, что класс действительно применился
    console.log('HTML classes after theme change:', htmlElement.className);
  }, [isDark]);

  // Функция переключения темы
  const toggleTheme = () => {
    console.log('toggleTheme called, current isDark:', isDark);
    setIsDark(prev => {
      const newValue = !prev;
      console.log('Setting isDark to:', newValue);
      return newValue;
    });
  };

  // Функция установки конкретной темы
  const setTheme = (theme) => {
    console.log('setTheme called with:', theme);
    setIsDark(theme === 'dark');
  };

  const value = {
    isDark,
    theme: isDark ? 'dark' : 'light',
    toggleTheme,
    setTheme
  };

  console.log('ThemeProvider context value:', value);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования контекста темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  console.log('useTheme called, context:', context);
  
  if (!context) {
    console.error('useTheme должен использоваться внутри ThemeProvider');
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;