import Header from "./components/Header"
import Footer from "./components/Footer"
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/pages/Home";
import ProductList from "./components/pages/ProductList";
import Categories from "./components/pages/Categories";
import About from "./components/pages/About";
import Contacts from "./components/pages/Contacts.";
import NotFound from "./components/pages/NotFound";
import Cart from "./components/pages/Cart";
import './App.css';
import { CartProvider } from "./components/context/CartContext";


function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 pb-24 overflow-auto">
          {/* Main content goes here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/products/:id" element={<Products />} /> */}
            {/* Redirect any unknown paths to NotFound */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App
