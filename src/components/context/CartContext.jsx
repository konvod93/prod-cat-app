import { createContext, useReducer, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useUser } from "../../hooks/useUser";

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
};

const CART_ACTIONS = {
  SET_ITEMS: "SET_ITEMS",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  SET_LOADING: "SET_LOADING",
};

const calcTotals = (items) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        ...calcTotals(action.payload),
        isLoading: false,
      };

    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      const newItems = existing
        ? state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
          )
        : [...state.items, { ...product, quantity }];
      return { ...state, items: newItems, ...calcTotals(newItems) };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter((i) => i.id !== action.payload);
      return { ...state, items: newItems, ...calcTotals(newItems) };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter((i) => i.id !== productId);
        return { ...state, items: newItems, ...calcTotals(newItems) };
      }
      const newItems = state.items.map((i) =>
        i.id === productId ? { ...i, quantity } : i,
      );
      return { ...state, items: newItems, ...calcTotals(newItems) };
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [], totalItems: 0, totalPrice: 0 };

    case CART_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useUser();

  // Загрузка корзины из Supabase или localStorage
  useEffect(() => {
    const fetchCartFromSupabase = async () => {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      try {
        const { data, error } = await supabase
          .from("cart_items")
          .select(
            `
          quantity,
          products (
            id, name, price, original_price, category,
            image, rating, reviews_count, in_stock, is_new, is_sale, tags
          )
        `,
          )
          .eq("user_id", user.id);

        if (error) throw error;

        const items = data.map((row) => ({
          id: row.products.id,
          name: row.products.name,
          price: row.products.price,
          originalPrice: row.products.original_price,
          category: row.products.category,
          image: row.products.image,
          rating: row.products.rating,
          reviewsCount: row.products.reviews_count,
          inStock: row.products.in_stock,
          isNew: row.products.is_new,
          isSale: row.products.is_sale,
          tags: row.products.tags || [],
          quantity: row.quantity,
        }));

        dispatch({ type: CART_ACTIONS.SET_ITEMS, payload: items });
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
        dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
      }
    };

    const loadCartFromLocalStorage = () => {
      try {
        const saved = localStorage.getItem("cart");
        if (saved) {
          const parsed = JSON.parse(saved);
          dispatch({
            type: CART_ACTIONS.SET_ITEMS,
            payload: parsed.items || [],
          });
        }
      } catch (error) {
        console.error("Ошибка загрузки корзины из localStorage:", error);
      }
    };

    if (isAuthenticated && user) {
      fetchCartFromSupabase();
    } else {
      loadCartFromLocalStorage();
    }
  }, [isAuthenticated, user]);

  // Сохранение в localStorage для неавторизованных
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify({ items: state.items }));
    }
  }, [state.items, isAuthenticated]);

  const addToCart = async (product, quantity = 1) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });

    if (isAuthenticated && user) {
      try {
        const { error } = await supabase.from("cart_items").upsert(
          {
            user_id: user.id,
            product_id: product.id,
            quantity:
              (state.items.find((i) => i.id === product.id)?.quantity || 0) +
              quantity,
          },
          { onConflict: "user_id,product_id" },
        );

        if (error) throw error;
      } catch (error) {
        console.error("Ошибка добавления в корзину:", error);
      }
    }

    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } });
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    showNotification(`${product.name} добавлен в корзину!`, "success");
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated && user) {
      try {
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
      } catch (error) {
        console.error("Ошибка удаления из корзины:", error);
      }
    }

    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
    showNotification("Товар удален из корзины", "info");
  };

  const updateQuantity = async (productId, quantity) => {
    if (isAuthenticated && user) {
      try {
        if (quantity <= 0) {
          await supabase
            .from("cart_items")
            .delete()
            .eq("user_id", user.id)
            .eq("product_id", productId);
        } else {
          await supabase
            .from("cart_items")
            .update({ quantity })
            .eq("user_id", user.id)
            .eq("product_id", productId);
        }
      } catch (error) {
        console.error("Ошибка обновления количества:", error);
      }
    }

    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, quantity },
    });
  };

  const clearCart = async () => {
    if (isAuthenticated && user) {
      try {
        await supabase.from("cart_items").delete().eq("user_id", user.id);
      } catch (error) {
        console.error("Ошибка очистки корзины:", error);
      }
    }

    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    showNotification("Корзина очищена", "info");
  };

  const getItemQuantity = (productId) => {
    return state.items.find((i) => i.id === productId)?.quantity || 0;
  };

  const isInCart = (productId) => {
    return state.items.some((i) => i.id === productId);
  };

  const value = {
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    isLoading: state.isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Уведомления
const showNotification = (message, type = "info") => {
  const notification = document.createElement("div");
  notification.className = `fixed top-20 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
    type === "success"
      ? "bg-green-500 text-white"
      : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
  }`;
  notification.textContent = message;
  notification.style.transform = "translateX(100%)";
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode)
        notification.parentNode.removeChild(notification);
    }, 300);
  }, 3000);
};

export default CartContext;
