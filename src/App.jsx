
import './App.css';
import { CartProvider } from "./components/context/CartContext";
import { ThemeProvider, useTheme } from "./components/context/ThemeContext";
import AppContent from "./AppContent";



function App() {
    return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App
