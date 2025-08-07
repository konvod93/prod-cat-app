import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './context/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg transition-all duration-300 group
        bg-gray-100 hover:bg-gray-200 
        dark:bg-gray-700 dark:hover:bg-gray-600
        ${className}
      `}
      title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
      aria-label="Переключить тему"
    >
      <div className="relative w-6 h-6">
        {/* Иконка солнца (светлая тема) */}
        <SunIcon 
          className={`
            absolute inset-0 w-6 h-6 text-yellow-500 
            transition-all duration-300 transform
            ${isDark 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
        
        {/* Иконка луны (темная тема) */}
        <MoonIcon 
          className={`
            absolute inset-0 w-6 h-6 text-blue-400
            transition-all duration-300 transform
            ${isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>

      {/* Tooltip */}
      <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
        {isDark ? 'Светлая тема' : 'Темная тема'}
      </span>
    </button>
  );
};

export default ThemeToggle;