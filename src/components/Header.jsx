import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, } from '@heroicons/react/24/outline';
import Modal from './Modal';
import { products } from '../data/mockProducts';
import { useCart } from './context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart(); // Получаем количество товаров из контекста
  
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Состояние для форм
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Функция поиска с автодополнением
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 1) {
      // Ищем совпадения в названиях и тегах товаров
      const suggestions = products
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5) // Показываем максимум 5 предложений
        .map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          type: 'product'
        }));

      // Добавляем категории в предложения
      const categoryMatches = [...new Set(products.map(p => p.category))]
        .filter(category => category.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map(category => ({
          name: category,
          type: 'category'
        }));

      setSearchSuggestions([...suggestions, ...categoryMatches]);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Поиск:', searchQuery);
      // Перенаправляем на страницу продуктов с поисковым запросом
      navigate(`/Products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'product') {
      // Переход к конкретному товару - исправляем URL
      navigate(`/Products?id=${suggestion.id}`);
    } else if (suggestion.type === 'category') {
      // Переход к категории
      navigate(`/Products?category=${encodeURIComponent(suggestion.name)}`);
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  const handleLoginClick = () => {
    setIsLoginFormOpen(true);
  };

  const handleSignUpClick = () => {
    setIsRegisterFormOpen(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Вход с данными:', loginData);
    setIsLoggedIn(true);
    setIsLoginFormOpen(false);
    setLoginData({ email: '', password: '' });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Регистрация с данными:', registerData);
    setIsLoggedIn(true);
    setIsRegisterFormOpen(false);
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    console.log('Выход из системы');
    setIsLoggedIn(false);
  };

  const handleProfileClick = () => {
    console.log('Переход в профиль');
    navigate('/Profile');
  };

  const handleCartClick = () => {
    console.log('Переход в корзину');
    navigate('/Cart');
  };

  const closeModals = () => {
    setIsLoginFormOpen(false);
    setIsRegisterFormOpen(false);
  };

  // Переключение между формами
  const switchToRegister = () => {
    setIsLoginFormOpen(false);
    setIsRegisterFormOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterFormOpen(false);
    setIsLoginFormOpen(true);
  };

  // Закрытие предложений при клике вне поиска
  const handleSearchBlur = () => {
    // Задержка для обработки клика по предложению
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo + Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                  🛍️ ProductCat
                </h1>
              </div>
              <Navigation />
            </div>

            {/* Search Bar with Suggestions and Submit Button */}
            <div className="flex-1 max-w-lg mx-8 relative">
              <form onSubmit={handleSearch} className="relative hidden md:flex">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onBlur={handleSearchBlur}
                    onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                    placeholder="Поиск товаров..."
                    className="w-full pl-10 pr-4 py-2 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-transparent border border-gray-200 dark:border-gray-600 transition-colors duration-300"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 text-blue-600 dark:text-gray-100 rounded-r-lg border-l border-gray-200 dark:border-gray-500 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
                >
                  Найти
                </button>
              </form>

              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto z-50">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.id || suggestion.name}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {suggestion.name}
                          </div>
                          {suggestion.category && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              в категории: {suggestion.category}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {suggestion.type === 'product' ? 'Товар' : 'Категория'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle + Auth + Cart Buttons */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              {/* <ThemeToggle /> */}

              {!isLoggedIn ? (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600 dark:text-gray-100 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Вход
                  </button>
                  <button
                    onClick={handleSignUpClick}
                    className="bg-blue-800 dark:bg-gray-600 hover:bg-blue-900 dark:hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Регистрация
                  </button>
                </>
              ) : (
                <>
                  {/* Profile Button */}
                  <button
                    onClick={handleProfileClick}
                    className="relative p-2 bg-blue-700 dark:bg-gray-700 hover:bg-blue-800 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300 group"
                    title="Профиль"
                  >
                    <UserIcon className="h-6 w-6" />
                    <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Профиль
                    </span>
                  </button>

                  {/* Cart Button with Badge */}
                  <button
                    onClick={handleCartClick}
                    className="relative p-2 bg-blue-700 dark:bg-gray-700 hover:bg-blue-800 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300 group"
                    title="Корзина"
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                        {totalItems > 99 ? '99+' : totalItems}
                      </span>
                    )}
                    <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Корзина ({totalItems})
                    </span>
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Выйти
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

       {/* Login Modal */}
      <Modal isOpen={isLoginFormOpen} onClose={closeModals}>
        <div className="px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Вход в аккаунт</h2>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email адрес
              </label>
              <input
                id="login-email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{' '}
              <button
                onClick={switchToRegister}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={isRegisterFormOpen} onClose={closeModals}>
        <div className="px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Регистрация</h2>
          
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">
                Полное имя
              </label>
              <input
                id="register-name"
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Иван Иванов"
                required
              />
            </div>

            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email адрес
              </label>
              <input
                id="register-email"
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                id="register-password"
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Подтвердите пароль
              </label>
              <input
                id="register-confirm-password"
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Зарегистрироваться
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Уже есть аккаунт?{' '}
              <button
                onClick={switchToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Войти
              </button>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header