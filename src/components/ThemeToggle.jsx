import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './context/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log('ThemeToggle clicked, current theme:', isDark ? 'dark' : 'light');
    toggleTheme();
    console.log('Theme toggled to:', !isDark ? 'dark' : 'light');
    
    // Принудительно добавляем/удаляем класс dark
    if (isDark) {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from html');
    } else {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to html');
    }
  };

  console.log('ThemeToggle render, isDark:', isDark);

  return (
    <button
      onClick={handleToggle}
      className={`
        relative p-1 sm:p-2 rounded-lg transition-all duration-300 group
        ${isDark 
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }
        ${className}
      `}
      title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
      aria-label="Переключить тему"
    >
      <div className="relative w-6 h-6">
        {isDark ? (
          <MoonIcon className="w-3 h-3 sm:w-6 sm:h-6 text-blue-400" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        )}
      </div>

      {/* Простой tooltip */}
      <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
        {isDark ? 'Светлая тема' : 'Темная тема'}
      </span>
    </button>
  );
};

export default ThemeToggle;