

const Footer = () => (
  <footer className="bg-blue-700 text-white py-6 mt-8">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm">
        © {new Date().getFullYear()} ProductCat. Все права защищены.
      </div>
      <div className="flex space-x-6">
        <a href="/about" className="hover:underline">О нас</a>
        <a href="/contacts" className="hover:underline">Контакты</a>
        <a href="/policy" className="hover:underline">Политика конфиденциальности</a>
      </div>
      <div className="text-xs text-blue-200">
        Сделано с <span className="text-pink-400">♥</span> для Telegram Mini Apps
      </div>
    </div>
  </footer>
);

export default Footer;