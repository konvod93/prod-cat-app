// src/components/context/UserContext.jsx
import { createContext, useReducer, useEffect } from 'react';
import { userReducer, USER_ACTIONS } from '../../reducers/userReducer';
import { supabase } from '../../lib/supabase';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Функция входа
  const login = async (loginData) => {
    dispatch({ type: USER_ACTIONS.LOGIN_START });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw new Error(error.message);

      const userData = {
        id: data.user.id,
        name: data.user.user_metadata?.name || data.user.email.split('@')[0],
        email: data.user.email,
        avatar: data.user.user_metadata?.avatar_url || null,
        preferences: data.user.user_metadata?.preferences || {}
      };

      dispatch({ type: USER_ACTIONS.LOGIN_SUCCESS, payload: userData });
      return { success: true };

    } catch (error) {
      dispatch({ type: USER_ACTIONS.LOGIN_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Функция регистрации
  const register = async (registerData) => {
    dispatch({ type: USER_ACTIONS.REGISTER_START });
    try {
      if (registerData.password !== registerData.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }

      const { data, error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            name: registerData.name,
          }
        }
      });

      if (error) throw new Error(error.message);

      const userData = {
        id: data.user.id,
        name: registerData.name,
        email: data.user.email,
        avatar: null,
        preferences: {}
      };

      dispatch({ type: USER_ACTIONS.REGISTER_SUCCESS, payload: userData });
      return { success: true };

    } catch (error) {
      dispatch({ type: USER_ACTIONS.REGISTER_ERROR, payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Функция выхода
  const logout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: USER_ACTIONS.LOGOUT });
    showNotification('Вы успешно вышли из системы', 'info');
  };

  // Функция обновления профиля
  const updateProfile = async (profileData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: profileData.name }
      });

      if (error) throw new Error(error.message);

      dispatch({ type: USER_ACTIONS.UPDATE_PROFILE, payload: profileData });
      showNotification('Профиль обновлен', 'success');
      return { success: true };

    } catch (error) {
      showNotification(error.message, 'error');
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
  };

  // Supabase сам следит за сессией — слушаем изменения
  useEffect(() => {
    // Получаем текущую сессию при загрузке
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const userData = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email.split('@')[0],
          email: session.user.email,
          avatar: session.user.user_metadata?.avatar_url || null,
          preferences: session.user.user_metadata?.preferences || {}
        };
        dispatch({ type: USER_ACTIONS.LOGIN_SUCCESS, payload: userData });
      }
    });

    // Слушаем изменения авторизации (вход, выход, обновление токена)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userData = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email.split('@')[0],
          email: session.user.email,
          avatar: session.user.user_metadata?.avatar_url || null,
          preferences: session.user.user_metadata?.preferences || {}
        };
        dispatch({ type: USER_ACTIONS.LOGIN_SUCCESS, payload: userData });
      } else {
        dispatch({ type: USER_ACTIONS.LOGOUT });
      }
    });

    // Отписываемся при размонтировании
    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
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