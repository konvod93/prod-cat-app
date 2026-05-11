import { Link } from "react-router-dom";
import Hero from '../components/home-page-components/Hero';
import AboutSection from '../components/home-page-components/AboutSection';
import BenefitsSection from '../components/home-page-components/BenefitsSection';
import ContactSection from '../components/home-page-components/ContactSection';
import CategoriesSection from '../components/home-page-components/CategoriesSection';

const Home = () => {
  
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <AboutSection />
      {/* Categories Section */}
      <CategoriesSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Home;