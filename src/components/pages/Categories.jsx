import { Link } from "react-router-dom";
import { products } from '../../data/mockProducts'; // предполагаем, что это массив товаров

const Categories = () => {
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  return (
    <div className="m-4">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">🛍️ Категории товаров</h1>
      <p className="mb-6 text-gray-600">Выберите интересующую вас категорию:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {uniqueCategories.map((category) => (
          <Link
            key={category}
            to={`/Products?category=${category}`}
            className="block p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-blue-800">{category}</h2>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-sm text-gray-500">
        <p>
          Не нашли нужную категорию? Свяжитесь с нами через{" "}
          <Link to="/contacts" className="text-blue-600 hover:underline">
            контакты
          </Link>.
        </p>
        <p className="mt-2">
          Или вернитесь на{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            главную страницу
          </Link>{" "}
          или перейдите к{" "}
          <Link to="/Products" className="text-blue-600 hover:underline">
            списку товаров
          </Link>.
        </p>
        <p className="mt-2">Спасибо за ваш интерес к нашему магазину!</p>
      </div>
    </div>
  );
};

export default Categories;