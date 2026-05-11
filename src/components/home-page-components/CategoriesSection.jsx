import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

const CategoriesSection = () => {
  const { products = [] } = useProducts();
  const { categories = [] } = useCategories();
  const [randomCategories, setRandomCategories] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!products.length || !categories.length) return;
    if (initialized.current) return;

    const uniqueCategoryNames = [...new Set(products.map((p) => p.category))];
    const shuffled = [...uniqueCategoryNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const categoriesData = selected.map((categoryName) => {
      const categoryInfo = categories.find((c) => c.name === categoryName);
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
    initialized.current = true;
  }, [products, categories]);

  const refreshCategories = () => {
    const uniqueCategoryNames = [...new Set(products.map((p) => p.category))];
    const shuffled = [...uniqueCategoryNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const categoriesData = selected.map((categoryName) => {
      const categoryInfo = categories.find((c) => c.name === categoryName);
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
