import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

const CategoriesSection = () => {
  const { products = [] } = useProducts();
  const { categoriesMap = {} } = useCategories();
  const [randomCategories, setRandomCategories] = useState([]);

  useEffect(() => {
    // Получаем уникальные категории из продуктов
    const uniqueCategories = [...new Set(products.map((p) => p.category))];

    // Функция для получения случайных элементов из массива
    const getRandomCategories = (categories, count = 3) => {
      const shuffled = [...categories].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    // Получаем 3 случайные категории
    const selected = getRandomCategories(uniqueCategories, 3);

    // Формируем данные для отображения
    const categoriesData = selected.map((categoryName) => {
      const categoryInfo = categoriesMap[categoryName];
      const productsInCategory = products.filter(
        (p) => p.category === categoryName,
      );

      return {
        name: categoryName,
        icon: categoryInfo?.icon || "📦",
        color: categoryInfo?.color || "from-gray-500 to-gray-600",
        productsCount: productsInCategory.length,
        // Можно добавить дополнительную логику для описания
        description: `Откройте для себя ${productsInCategory.length} товаров в этой категории.`,
      };
    });

    setRandomCategories(categoriesData);
  }, [products, categoriesMap]); // Пустой массив зависимостей - выполнится только при монтировании

  // Функция для обновления категорий (опционально)
  const refreshCategories = () => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    const shuffled = [...uniqueCategories].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const categoriesData = selected.map((categoryName) => {
      const categoryInfo = categoriesMap[categoryName];
      const productsInCategory = products.filter(
        (p) => p.category === categoryName,
      );

      return {
        name: categoryName,
        icon: categoryInfo?.icon || "📦",
        color: categoryInfo?.color || "from-gray-500 to-gray-600",
        productsCount: productsInCategory.length,
        description: `Откройте для себя ${productsInCategory.length} товаров в этой категории.`,
      };
    });

    setRandomCategories(categoriesData);
  };

  return (
    <section className="py-12 px-6 bg-white">
      <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold">📦 Популярные категории</h2>
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
            className=""
          >
            <div className="theme-card home-card p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
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
              <p className="text-gray-600 mb-4">{category.description}</p>

              {/* Кнопка действия */}
              <div className="flex items-center text-blue-600 font-medium">
                <span>Посмотреть товары</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
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
  );
};

export default CategoriesSection;
