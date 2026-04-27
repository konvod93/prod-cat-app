import { Link } from "react-router-dom";
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

const Categories = () => {
  const { products } = useProducts();
  const { categories, isLoading } = useCategories();

  const getCategoryCount = (categoryName) => {
    return products.filter(p => p.category === categoryName).length;
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 categories-container p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            🛍️ Категории товаров
          </h1>
          <p className="text-xl text-gray-600 categories-text max-w-2xl mx-auto transition-colors duration-300">
            Выберите интересующую вас категорию и откройте для себя мир качественных товаров
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Сетка категорий */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const count = getCategoryCount(category.name);
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl category-card transition-all duration-300 transform hover:-translate-y-2 cursor-pointer block"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color || 'from-gray-500 to-gray-600'} opacity-90`}></div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8"></div>

                <div className="relative p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {category.icon || '📦'}
                    </span>
                    <div className="bg-gray-300 bg-opacity-20 rounded-full px-3 py-1">
                      <span className="text-sm font-medium text-amber-400">{count} товаров</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {category.name}
                  </h2>
                  <div className="flex items-center text-sm opacity-90">
                    <span>Посмотреть все</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Статистика */}
        <div className="bg-white white-block rounded-2xl shadow-lg p-8 mb-12 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 stat-blue mb-2">{categories.length}</div>
              <div className="text-gray-600 categories-text">Категорий</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 stat-green mb-2">{products.length}</div>
              <div className="text-gray-600 categories-text">Товаров</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 stat-purple mb-2">24/7</div>
              <div className="text-gray-600 categories-text">Поддержка</div>
            </div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="bg-white white-block rounded-2xl shadow-lg p-8 text-center transition-all duration-300">
          <h3 className="text-2xl font-bold text-gray-800 categories-heading mb-4">Не нашли что искали?</h3>
          <p className="text-gray-600 categories-text mb-6">
            Мы всегда готовы помочь вам найти именно то, что вам нужно
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacts" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 btn-blue text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              📞 Связаться с нами
            </Link>
            <Link to="/" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 btn-gray text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              🏠 Главная страница
            </Link>
            <Link to="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 btn-green text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              📋 Все товары
            </Link>
          </div>
          <p className="mt-6 text-gray-500 categories-text italic transition-colors duration-300">
            Спасибо за выбор нашего магазина! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;