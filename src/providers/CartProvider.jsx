import { useReducer, useEffect } from 'react';

// Провайдер корзины
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Функции для работы с корзиной
  const addToCart = (product, quantity = 1) => {
    // Симуляция загрузки
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    
    // Симулируем асинхронную операцию (например, API запрос)
    setTimeout(() => {
      dispatch({
        type: CART_ACTIONS.ADD_ITEM,
        payload: { product, quantity }
      });
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
      
      // Показываем уведомление
      showNotification(`${product.name} добавлен в корзину!`, 'success');
    }, 300);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
    showNotification('Товар удален из корзины', 'info');
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    showNotification('Корзина очищена', 'info');
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  // Простая функция для показа уведомлений (можно заменить на toast библиотеку)
  const showNotification = (message, type = 'info') => {
    // Создаем временное уведомление
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    notification.style.transform = 'translateX(100%)';
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Удаление через 3 секунды
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  // Сохранение корзины в localStorage
  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);

  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Восстанавливаем состояние корзины
        parsedCart.items.forEach(item => {
          dispatch({
            type: CART_ACTIONS.ADD_ITEM,
            payload: { product: item, quantity: item.quantity }
          });
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины из localStorage:', error);
    }
  }, []);

  const value = {
    // Состояние
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    isLoading: state.isLoading,
    
    // Действия
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
