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
import PageInProgress from "./components/pages/PageInProgress";
import './App.css';
import { useTheme } from "./components/context/ThemeContext";
import CheckoutForm from "./components/pages/CheckoutForm";
import ThankYou from "./components/pages/ThankYoy";


const AppContent = () => {
  const { isDark } = useTheme();
  return (
    <div
      className={`min-h-screen flex flex-col ${isDark ? "dark" : ""}`}>
      <Header />
      <main
        className="flex-1 pt-16 pb-36 overflow-auto">
        {/* Main content goes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/in-progress" element={<PageInProgress />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* <Route path="/products/:id" element={<Products />} /> */}
          {/* Redirect any unknown paths to NotFound */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </main>
      <Footer />      
    </div>
  );
};

export default AppContent