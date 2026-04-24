import { createContext, useReducer, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { products as mockProducts } from '../../data/mockProducts';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload, isLoading: false };
      case 'ADD_PRODUCT':
        return { ...state, products: [...state.products, action.payload] };
      case 'DELETE_PRODUCT':
        return { ...state, products: state.products.filter(p => p.id !== action.payload) };
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      case 'SET_ERROR':
        return { ...state, error: action.payload, isLoading: false };
      default:
        return state;
    }
  }, { products: [], isLoading: true, error: null });

  // Загрузка товаров из Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Приводим поля к camelCase как в mockProducts
        const normalized = data.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          originalPrice: p.original_price,
          category: p.category,
          image: p.image,
          rating: p.rating,
          reviewsCount: p.reviews_count,
          inStock: p.in_stock,
          isNew: p.is_new,
          isSale: p.is_sale,
          tags: p.tags || [],
        }));

        dispatch({ type: 'SET_PRODUCTS', payload: normalized });
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        // Fallback на mockProducts если Supabase недоступен
        dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
      }
    };

    fetchProducts();
  }, []);

  // Добавление товара
  const addProduct = async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: product.name,
          description: product.description,
          price: product.price,
          original_price: product.originalPrice || null,
          category: product.category,
          image: product.image,
          in_stock: product.inStock,
          tags: product.tags || [],
        }])
        .select()
        .single();

      if (error) throw error;

      const normalized = {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        originalPrice: data.original_price,
        category: data.category,
        image: data.image,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        inStock: data.in_stock,
        isNew: data.is_new,
        isSale: data.is_sale,
        tags: data.tags || [],
      };

      dispatch({ type: 'ADD_PRODUCT', payload: normalized });
      return { success: true };
    } catch (error) {
      console.error('Ошибка добавления товара:', error);
      return { success: false, error: error.message };
    }
  };

  // Удаление товара
  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      return { success: true };
    } catch (error) {
      console.error('Ошибка удаления товара:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <ProductsContext.Provider value={{
      products: state.products,
      isLoading: state.isLoading,
      error: state.error,
      addProduct,
      deleteProduct,
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;