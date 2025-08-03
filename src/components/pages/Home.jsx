import { categories } from "../../data/mockProducts";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Добро пожаловать в наш магазин!</h1>
        <p className="text-xl mb-6">Товары, которые вдохновляют. Цены, которые радуют.</p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          <Link to='/Products'>Перейти к покупкам</Link>
        </button>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">🛒 Кто мы?</h2>
        <p className="text-lg text-gray-700">
          Мы — команда, которая верит, что покупки должны быть простыми, приятными и доступными. У нас вы найдете всё —
          от повседневных нужд до уникальных находок.
        </p>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">📦 Популярные категории</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Электроника", "Одежда", "Дом и уют"].map((category) => (
            <div key={category} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{category}</h3>
              <p className="text-gray-600">Откройте для себя лучшие предложения в этой категории.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">🎯 Почему выбирают нас?</h2>
        <ul className="max-w-3xl mx-auto space-y-4 text-lg text-gray-700">
          <li>✅ Быстрая доставка по всей стране</li>
          <li>✅ Надёжная поддержка клиентов</li>
          <li>✅ Постоянные акции и скидки</li>
          <li>✅ Удобная и безопасная оплата</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">📞 Связаться с нами</h2>
        <p className="text-lg text-gray-700 mb-6">
          Есть вопросы? Мы всегда готовы помочь. Перейдите в раздел <span className="text-blue-600 font-medium">"Контакты"</span>.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Связаться
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2025 Наш Магазин. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default Home;