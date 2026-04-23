import Header from "./components/Header"
import Footer from "./components/Footer"
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contacts from "./pages/Contacts.";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import PageInProgress from "./pages/PageInProgress";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/Admin";
import './App.css';
import { useTheme } from "./components/context/ThemeContext";
import CheckoutForm from "./pages/CheckoutForm";
import ThankYou from "./pages/ThankYoy";


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
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<Admin />} />
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