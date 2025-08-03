import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-4">Категории</h1>
      <p className="mb-4">Выберите категорию, чтобы просмотреть товары:</p>
      <ul className="list-disc pl-5">
        {["Электроника", "Одежда", "Дом и уют"].map((category) => (
          <li key={category} className="mb-2">
            <Link
              to={`/Products?category=${category}`}
              className="text-blue-600 hover:underline"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        Если вы не нашли нужную категорию, пожалуйста, свяжитесь с нами через{" "}
        <Link to="/contacts" className="text-blue-600 hover:underline">
          контакты
        </Link>
        .
      </p>
      <p className="mt-2">Мы всегда рады помочь вам!</p>
      <p className="mt-2">
        Вы также можете вернуться на{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          главную страницу
        </Link>
        .
      </p>
      <p className="mt-2">
        Или перейти к{" "}
        <Link to="/Products" className="text-blue-600 hover:underline">
          списку товаров
        </Link>
        .
      </p>
      <p className="mt-2">Спасибо за ваш интерес к нашему магазину!</p>
    </div>
  );
};

export default Categories;