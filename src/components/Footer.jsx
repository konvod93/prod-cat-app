import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="fixed bottom-0 left-0 w-full bg-blue-900 dark:bg-gray-800 text-white text-sm lg:text-lg py-6 mt-8 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="text-sm">
        © {new Date().getFullYear()} ProductCat. Все права защищены.
      </div>
      <div className="flex space-x-6">
        <Link to="/about" className="hover:underline transition-colors duration-200">О нас</Link>
        <Link to="/contacts" className="hover:underline transition-colors duration-200">Контакты</Link>
        <Link to="/policy" className="hover:underline transition-colors duration-200">Политика конфиденциальности</Link>
      </div>
      <div className="text-xs text-blue-200 dark:text-gray-300">
        Сделано с <span className="text-pink-400">♥</span> для Telegram Mini Apps
      </div>
    </div>
  </footer>
);

export default Footer;