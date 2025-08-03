import { Link } from "react-router-dom";

// Имитация данных для демонстрации
const mockProducts = [
  { id: 1, category: 'electronics', name: 'Смартфон' },
  { id: 2, category: 'clothing', name: 'Футболка' },
  { id: 3, category: 'books', name: 'Роман' },
  { id: 4, category: 'electronics', name: 'Ноутбук' },
  { id: 5, category: 'home', name: 'Кресло' },
  { id: 6, category: 'sports', name: 'Мяч' },
  { id: 7, category: 'beauty', name: 'Крем' },
  { id: 8, category: 'food', name: 'Кофе' },
];

const Categories = () => {
  // Маппинг категорий с английского на русский и добавление иконок
  const categoryMapping = {
    'electronics': { name: 'Электроника', icon: '📱', color: 'from-blue-500 to-blue-600' },
    'clothing': { name: 'Одежда', icon: '👕', color: 'from-purple-500 to-purple-600' },
    'books': { name: 'Книги', icon: '📚', color: 'from-green-500 to-green-600' },
    'home': { name: 'Дом и сад', icon: '🏠', color: 'from-orange-500 to-orange-600' },
    'sports': { name: 'Спорт', icon: '⚽', color: 'from-red-500 to-red-600' },
    'beauty': { name: 'Красота', icon: '💄', color: 'from-pink-500 to-pink-600' },
    'food': { name: 'Продукты', icon: '🍎', color: 'from-yellow-500 to-yellow-600' },
    'toys': { name: 'Игрушки', icon: '🧸', color: 'from-indigo-500 to-indigo-600' },
    'automotive': { name: 'Автотовары', icon: '🚗', color: 'from-gray-500 to-gray-600' },
    'jewelry': { name: 'Украшения', icon: '💍', color: 'from-violet-500 to-violet-600' }
  };

  const uniqueCategories = [...new Set(mockProducts.map(p => p.category))];
  
  // Подсчет товаров в каждой категории
  const getCategoryCount = (category) => {
    return mockProducts.filter(p => p.category === category).length;
  };

  // Имитация навигации (в реальном проекте замените на react-router)
  const handleCategoryClick = (category) => {
    console.log(`Переход к категории: ${category}`);
    // В реальном проекте: navigate(`/Products?category=${category}`)
  };

  const handleNavClick = (path) => {
    console.log(`Переход к: ${path}`);
    // В реальном проекте: navigate(path)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            🛍️ Категории товаров
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите интересующую вас категорию и откройте для себя мир качественных товаров
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Сетка категорий */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {uniqueCategories.map((category) => {
            const categoryInfo = categoryMapping[category] || { 
              name: category, 
              icon: '📦', 
              color: 'from-gray-500 to-gray-600' 
            };
            const count = getCategoryCount(category);
            
            return (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Градиентный фон */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.color} opacity-90`}></div>
                
                {/* Декоративные элементы */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8"></div>
                
                {/* Контент карточки */}
                <div className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {categoryInfo.icon}
                    </span>
                    <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                      <span className="text-sm font-medium">{count} товаров</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {categoryInfo.name}
                  </h2>
                  
                  <div className="flex items-center text-sm opacity-90">
                    <span>Посмотреть все</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
                
                {/* Эффект ховера */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Статистика */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">{uniqueCategories.length}</div>
              <div className="text-gray-600">Категорий</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">{mockProducts.length}</div>
              <div className="text-gray-600">Товаров</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Поддержка</div>
            </div>
          </div>
        </div>

        {/* Нижняя навигация */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Не нашли что искали?</h3>
          <p className="text-gray-600 mb-6">
            Мы всегда готовы помочь вам найти именно то, что вам нужно
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleNavClick('/contacts')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              📞 Связаться с нами
            </button>
            
            <button               
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <Link to='/'>🏠 Главная страница</Link>
            </button>
            
            <button               
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <Link to='/Products'>📋 Все товары</Link>
            </button>
          </div>
          
          <p className="mt-6 text-gray-500 italic">
            Спасибо за выбор нашего магазина! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;