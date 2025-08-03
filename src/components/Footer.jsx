import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-blue-900 text-white py-6 mt-8">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm">
        © {new Date().getFullYear()} ProductCat. Все права защищены.
      </div>
      <div className="flex space-x-6">
        <Link to="/about" className="hover:underline">О нас</Link>
        <Link to="/contacts" className="hover:underline">Контакты</Link>
        <Link to="/policy" className="hover:underline">Политика конфиденциальности</Link>
      </div>
      <div className="text-xs text-blue-200">
        Сделано с <span className="text-pink-400">♥</span> для Telegram Mini Apps
      </div>
    </div>
  </footer>
);

export default Footer;