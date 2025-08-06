import { createContext, useContext, useReducer, useEffect } from 'react';

// Начальное состояние корзины
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false
};

// Типы действий
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING'
};

// Reducer для управления состоянием корзины
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      let newItems;
      if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем количество
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Если товара нет, добавляем новый
        newItems = [...state.items, { ...product, quantity }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const productId = action.payload;
      const newItems = state.items.filter(item => item.id !== productId);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Если количество 0 или меньше, удаляем товар
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
      }

      const newItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      };

    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

// Создаем контекст
const CartContext = createContext();

// Хук для использования контекста корзины
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  
  return context;
};

export default CartContext;