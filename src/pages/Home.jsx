import { Link } from "react-router-dom";
import Hero from '../components/homepagecomponents/Hero';
import AboutSection from '../components/homepagecomponents/AboutSection';
import BenefitsSection from '../components/homepagecomponents/BenefitsSection';
import ContactSection from '../components/homepagecomponents/ContactSection';
import CategoriesSection from '../components/homepagecomponents/CategoriesSection';

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