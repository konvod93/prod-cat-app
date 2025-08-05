import Navigation from './Navigation';
import { useState } from 'react';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(3);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Поиск:', searchQuery);
    }
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
    // Здесь будет логика входа
    setIsLoggedIn(true);
    setIsLoginFormOpen(false);
    setLoginData({ email: '', password: '' });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Регистрация с данными:', registerData);
    // Здесь будет логика регистрации
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
  };

  const handleCartClick = () => {
    console.log('Переход в корзину');
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

  // Модальное окно
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
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

export default Header;