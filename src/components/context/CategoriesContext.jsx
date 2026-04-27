import { createContext, useEffect, useReducer } from 'react';
import { supabase } from '../../lib/supabase';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_CATEGORIES':
        return { ...state, categories: action.payload, isLoading: false };
      case 'ADD_CATEGORY':
        return { ...state, categories: [...state.categories, action.payload] };
      case 'DELETE_CATEGORY':
        return { ...state, categories: state.categories.filter(c => c.id !== action.payload) };
      case 'SET_LOADING':
        return { ...state, isLoading: action.payload };
      default:
        return state;
    }
  }, { categories: [], isLoading: true });

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;

        dispatch({ type: 'SET_CATEGORIES', payload: data });
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (category) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{
          name: category.name,
          icon: category.icon || '📦',
          color: category.color || 'from-gray-500 to-gray-600',
        }])
        .select()
        .single();

      if (error) throw error;

      dispatch({ type: 'ADD_CATEGORY', payload: data });
      return { success: true };
    } catch (error) {
      console.error('Ошибка добавления категории:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteCategory = async (id) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      dispatch({ type: 'DELETE_CATEGORY', payload: id });
      return { success: true };
    } catch (error) {
      console.error('Ошибка удаления категории:', error);
      return { success: false, error: error.message };
    }
  };

  return (
    <CategoriesContext.Provider value={{
      categories: state.categories,
      isLoading: state.isLoading,
      addCategory,
      deleteCategory,
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;