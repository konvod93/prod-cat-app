import { createContext, useContext, useEffect, useState } from 'react';

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
        setIsDark(savedTheme === 'dark');
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
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Сохраняем в localStorage
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Ошибка сохранения темы:', error);
    }
  }, [isDark]);

  // Функция переключения темы
  const toggleTheme = () => {
    setIsDark(!isDark);
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

// Хук для использования контекста темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;