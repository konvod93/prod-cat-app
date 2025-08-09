// src/components/context/UserContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

// Начальное состояние пользователя
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Типы действий для пользователя
const USER_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  LOGOUT: 'LOGOUT',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer для управления состоянием пользователя
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN_START:
    case USER_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case USER_ACTIONS.LOGIN_SUCCESS:
    case USER_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case USER_ACTIONS.LOGIN_ERROR:
    case USER_ACTIONS.REGISTER_ERROR:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };

    case USER_ACTIONS.UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        error: null
      };

    case USER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Создаем контекст
const UserContext = createContext();

// Провайдер пользователя
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Функция входа
  const login = async (loginData) => {
    dispatch({ type: USER_ACTIONS.LOGIN_START });

    try {
      // Симуляция API запроса
      const response = await simulateApiCall(loginData, 'login');
      
      if (response.success) {
        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          avatar: response.user.avatar || null,
          preferences: response.user.preferences || {}
        };

        dispatch({ 
          type: USER_ACTIONS.LOGIN_SUCCESS, 
          payload: userData 
        });

        // Сохраняем в localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');

        return { success: true };
      } else {
        throw new Error(response.message || 'Ошибка входа');
      }
    } catch (error) {
      dispatch({ 
        type: USER_ACTIONS.LOGIN_ERROR, 
        payload: error.message 
      });
      return { success: false, error: error.message };
    }
  };

  // Функция регистрации
  const register = async (registerData) => {
    dispatch({ type: USER_ACTIONS.REGISTER_START });

    try {
      // Проверяем совпадение паролей
      if (registerData.password !== registerData.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }

      // Симуляция API запроса
      const response = await simulateApiCall(registerData, 'register');
      
      if (response.success) {
        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          avatar: response.user.avatar || null,
          preferences: response.user.preferences || {}
        };

        dispatch({ 
          type: USER_ACTIONS.REGISTER_SUCCESS, 
          payload: userData 
        });

        // Сохраняем в localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');

        return { success: true };
      } else {
        throw new Error(response.message || 'Ошибка регистрации');
      }
    } catch (error) {
      dispatch({ 
        type: USER_ACTIONS.REGISTER_ERROR, 
        payload: error.message 
      });
      return { success: false, error: error.message };
    }
  };

  // Функция выхода
  const logout = () => {
    dispatch({ type: USER_ACTIONS.LOGOUT });
    
    // Очищаем localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    // Можно также очистить корзину при выходе (опционально)
    // localStorage.removeItem('cart');
    
    showNotification('Вы успешно вышли из системы', 'info');
  };

  // Функция обновления профиля
  const updateProfile = async (profileData) => {
    try {
      // Симуляция API запроса
      const response = await simulateApiCall(profileData, 'updateProfile');
      
      if (response.success) {
        dispatch({ 
          type: USER_ACTIONS.UPDATE_PROFILE, 
          payload: response.user 
        });

        // Обновляем localStorage
        const updatedUser = { ...state.user, ...response.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        showNotification('Профиль обновлен', 'success');
        return { success: true };
      } else {
        throw new Error(response.message || 'Ошибка обновления профиля');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      return { success: false, error: error.message };
    }
  };

  // Функция очистки ошибок
  const clearError = () => {
    dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
  };

  // Загрузка пользователя из localStorage при инициализации
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      
      if (savedUser && isAuthenticated) {
        const userData = JSON.parse(savedUser);
        dispatch({ 
          type: USER_ACTIONS.LOGIN_SUCCESS, 
          payload: userData 
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователя из localStorage:', error);
      // Очищаем поврежденные данные
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
  }, []);

  const value = {
    // Состояние
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    
    // Действия
    login,
    register,
    logout,
    updateProfile,
    clearError
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста пользователя
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser должен использоваться внутри UserProvider');
  }
  
  return context;
};

// Симуляция API вызовов
const simulateApiCall = (data, type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case 'login':
          // Простая проверка для демо
          if (data.email && data.password) {
            resolve({
              success: true,
              user: {
                id: Date.now(),
                name: data.email.split('@')[0], // Используем часть email как имя
                email: data.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.email.split('@')[0])}&background=random`,
                preferences: {
                  theme: 'light',
                  notifications: true
                }
              }
            });
          } else {
            resolve({
              success: false,
              message: 'Неверный email или пароль'
            });
          }
          break;

        case 'register':
          if (data.name && data.email && data.password) {
            resolve({
              success: true,
              user: {
                id: Date.now(),
                name: data.name,
                email: data.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
                preferences: {
                  theme: 'light',
                  notifications: true
                }
              }
            });
          } else {
            resolve({
              success: false,
              message: 'Заполните все обязательные поля'
            });
          }
          break;

        case 'updateProfile':
          resolve({
            success: true,
            user: data
          });
          break;

        default:
          resolve({
            success: false,
            message: 'Неизвестный тип запроса'
          });
      }
    }, 1000); // Симулируем задержку сети
  });
};

// Функция для показа уведомлений
const showNotification = (message, type = 'info') => {
  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`;
  notification.textContent = message;
  notification.style.transform = 'translateX(100%)';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
};

export default UserContext;