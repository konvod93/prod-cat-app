import React, { createContext, useEffect, useState } from 'react';

// Создаем контекст темы
const ThemeContext = createContext();

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  // Загружаем тему из localStorage при инициализации
  useEffect(() => {
    
    try {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
      if (savedTheme) {
        const isDarkTheme = savedTheme === 'dark';
        setIsDark(isDarkTheme);
        console.log('Set theme from localStorage:', isDarkTheme);
      } else {
        // Используем системные настройки по умолчанию
        setIsDark(systemPrefersDark);        
      }
    } catch (error) {
      console.error('Ошибка загрузки темы:', error);
    }
  }, []);

  // Применяем тему к документу
  useEffect(() => {
        
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add('dark');      
    } else {
      htmlElement.classList.remove('dark');
    }
    
    // Сохраняем в localStorage
    try {
      const themeValue = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', themeValue);
    } catch (error) {
      console.error('Ошибка сохранения темы:', error);
    }    
    
  }, [isDark]);

  // Функция переключения темы
  const toggleTheme = () => {    
    setIsDark(prev => {
      const newValue = !prev;
      console.log('Setting isDark to:', newValue);
      return newValue;
    });
  };

  // Функция установки конкретной темы
  const setTheme = (theme) => {    
    setIsDark(theme === 'dark');
  };

  const value = {
    isDark,
    theme: isDark ? 'dark' : 'light',
    toggleTheme,
    setTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;