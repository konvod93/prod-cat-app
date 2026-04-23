import { createContext, useReducer } from 'react';
import { products as initialProducts } from '../../data/mockProducts';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return [...state, action.payload];
      case 'DELETE_PRODUCT':
        return state.filter(p => p.id !== action.payload);
      default:
        return state;
    }
  }, initialProducts);

  const addProduct = (product) => dispatch({ type: 'ADD_PRODUCT', payload: product });
  const deleteProduct = (id) => dispatch({ type: 'DELETE_PRODUCT', payload: id });

  return (
    <ProductsContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;