
import './App.css';
import { CartProvider } from "./components/context/CartContext";
import { ThemeProvider } from "./components/context/ThemeContext";
import AppContent from "./AppContent";
import { UserProvider } from "./components/context/UserContext";



function App() {
    return (
    <ThemeProvider>
      <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App
