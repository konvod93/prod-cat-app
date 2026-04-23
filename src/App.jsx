
import './App.css';
import { CartProvider } from "./components/context/CartContext";
import { ThemeProvider } from "./components/context/ThemeContext";
import AppContent from "./AppContent";
import { UserProvider } from "./components/context/UserContext";
import { ProductsProvider } from './components/context/ProductContext';



function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App
