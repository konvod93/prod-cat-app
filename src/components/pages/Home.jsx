import { products, categoriesMap } from '../../data/mockProducts';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Home = () => {
  const [randomCategories, setRandomCategories] = useState([]);

  useEffect(() => {
    // Получаем уникальные категории из продуктов
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    
    // Функция для получения случайных элементов из массива
    const getRandomCategories = (categories, count = 3) => {
      const shuffled = [...categories].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    
    // Получаем 3 случайные категории
    const selected = getRandomCategories(uniqueCategories, 3);
    
    // Формируем данные для отображения
    const categoriesData = selected.map(categoryName => {
      const categoryInfo = categoriesMap[categoryName];
      const productsInCategory = products.filter(p => p.category === categoryName);
      
      return {
        name: categoryName,
        icon: categoryInfo?.icon || '📦',
        color: categoryInfo?.color || 'from-gray-500 to-gray-600',
        productsCount: productsInCategory.length,
        // Можно добавить дополнительную логику для описания
        description: `Откройте для себя ${productsInCategory.length} товаров в этой категории.`
      };
    });
    
    setRandomCategories(categoriesData);
  }, []); // Пустой массив зависимостей - выполнится только при монтировании

  // Функция для обновления категорий (опционально)
  const refreshCategories = () => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const shuffled = [...uniqueCategories].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    const categoriesData = selected.map(categoryName => {
      const categoryInfo = categoriesMap[categoryName];
      const productsInCategory = products.filter(p => p.category === categoryName);
      
      return {
        name: categoryName,
        icon: categoryInfo?.icon || '📦',
        color: categoryInfo?.color || 'from-gray-500 to-gray-600',
        productsCount: productsInCategory.length,
        description: `Откройте для себя ${productsInCategory.length} товаров в этой категории.`
      };
    });
    
    setRandomCategories(categoriesData);
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Добро пожаловать в наш магазин!
        </h1>
        <p className="text-xl mb-6">
          Товары, которые вдохновляют. Цены, которые радуют.
        </p>
        <Link 
          to="/Products"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Перейти к покупкам
        </Link>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">🛒 Кто мы?</h2>
        <p className="text-lg text-gray-700">
          Мы — команда, которая верит, что покупки должны быть простыми,
          приятными и доступными. У нас вы найдете всё — от повседневных нужд до
          уникальных находок. <Link to="/About" className="text-blue-600 font-medium">Узнать больше...</Link>
        </p>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6 bg-white">
        <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold">
            📦 Популярные категории
          </h2>
          <button
            onClick={refreshCategories}
            className="text-sm bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
            title="Обновить категории"
          >
            🔄 Обновить
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {randomCategories.map((category, index) => (
            <Link
              key={`${category.name}-${index}`}
              to={`/Products?category=${category.name}`}
              className="group block"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                {/* Иконка и счетчик */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                  <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    {category.productsCount} товаров
                  </span>
                </div>
                
                {/* Название */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                {/* Описание */}
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                
                {/* Кнопка действия */}
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Посмотреть товары</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ссылка на все категории */}
        <div className="text-center mt-8">
          <Link
            to="/Categories"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Посмотреть все категории
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          🎯 Почему выбирают нас?
        </h2>
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
          Есть вопросы? Мы всегда готовы помочь. Перейдите в раздел{" "}
          <span className="text-blue-600 font-medium">"Контакты"</span>.
        </p>
        <Link
          to="/Contacts"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Связаться
        </Link>
      </section>      
    </div>
  );
};

export default Home;