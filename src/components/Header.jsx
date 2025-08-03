import Navigation from './Navigation';
import { useState } from 'react';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(3); // Mock количество товаров

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Поиск:', searchQuery);
      // Здесь будет логика поиска через Context
    }
  };

  const handleLoginClick = () => {
    console.log('Переход на страницу входа');
    // Здесь будет navigate('/auth/login')
    setIsLoggedIn(true); // Временно для демо
  };

  const handleSignUpClick = () => {
    console.log('Переход на страницу регистрации');
    // Здесь будет navigate('/auth/register')  
    setIsLoggedIn(true); // Временно для демо
  };

  const handleLogout = () => {
    console.log('Выход из системы');
    setIsLoggedIn(false);
    // Здесь будет очистка AuthContext
  };

  const handleProfileClick = () => {
    console.log('Переход в профиль');
    // Здесь будет navigate('/profile')
  };

  const handleCartClick = () => {
    console.log('Переход в корзину');
    // Здесь будет navigate('/cart')
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo + Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">🛍️ ProductCat</h1>
            </div>
            <Navigation />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск товаров..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
              <button 
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Auth + Cart Buttons */}
          <div className="flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={handleLoginClick}
                  className="bg-white hover:bg-gray-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Вход
                </button>
                <button
                  onClick={handleSignUpClick}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Регистрация
                </button>
              </>
            ) : (
              <>
                {/* Profile Button */}
                <button
                  onClick={handleProfileClick}
                  className="relative p-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-200 group"
                  title="Профиль"
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Профиль
                  </span>
                </button>

                {/* Cart Button with Badge */}
                <button
                  onClick={handleCartClick}
                  className="relative p-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-200 group"
                  title="Корзина"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </span>
                  )}
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Корзина ({cartItemsCount})
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Выйти
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;