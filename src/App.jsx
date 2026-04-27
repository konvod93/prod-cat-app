
import './App.css';
import { CartProvider } from "./components/context/CartContext";
import { ThemeProvider } from "./components/context/ThemeContext";
import AppContent from "./AppContent";
import { UserProvider } from "./components/context/UserContext";
import { ProductsProvider } from './components/context/ProductsContext';
import { CategoriesProvider } from './components/context/CategoriesContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App
