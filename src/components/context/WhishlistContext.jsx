import { createContext, useReducer, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useUser } from "../../hooks/useUser";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload, isLoading: false };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    isLoading: false,
  });
  const { user, isAuthenticated } = useUser();

  useEffect(() => {
    const fetchWishlistFromSupabase = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const { data, error } = await supabase
          .from("wishlist")
          .select(
            `
          product_id,
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
        }));

        dispatch({ type: "SET_ITEMS", payload: items });
      } catch (error) {
        console.error("Ошибка загрузки избранного:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    const loadWishlistFromLocalStorage = () => {
      try {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
          dispatch({ type: "SET_ITEMS", payload: JSON.parse(saved) });
        }
      } catch (error) {
        console.error("Ошибка загрузки избранного из localStorage:", error);
      }
    };

    if (isAuthenticated && user) {
      fetchWishlistFromSupabase();
    } else {
      loadWishlistFromLocalStorage();
    }
  }, [isAuthenticated, user]);

  // Сохраняем в localStorage для неавторизованных
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    }
  }, [state.items, isAuthenticated]);

  const addToWishlist = async (product) => {
    if (isAuthenticated && user) {
      try {
        const { error } = await supabase
          .from("wishlist")
          .insert([{ user_id: user.id, product_id: product.id }]);
        if (error) throw error;
      } catch (error) {
        console.error("Ошибка добавления в избранное:", error);
        return;
      }
    }
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromWishlist = async (productId) => {
    if (isAuthenticated && user) {
      try {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
        if (error) throw error;
      } catch (error) {
        console.error("Ошибка удаления из избранного:", error);
        return;
      }
    }
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const toggleWishlist = async (product) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return state.items.some((i) => i.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        isLoading: state.isLoading,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
