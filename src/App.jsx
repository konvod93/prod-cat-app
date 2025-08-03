import Header from "./components/Header"
import Footer from "./components/Footer"
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Categories from "./components/pages/Categories";
import About from "./components/pages/About";
import Contacts from "./components/pages/Contacts.";
import NotFound from "./components/pages/NotFound";
import './App.css';


function App() {
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-24 overflow-auto">
        {/* Main content goes here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* Redirect any unknown paths to NotFound */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>        
      </main>
      <Footer />
    </div>
  );
}

export default App
