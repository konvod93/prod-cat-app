import { Link } from "react-router-dom";

const PageInProgress = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Страница в разработке</h1>
      <p className="text-lg text-gray-600 mb-6">Мы работаем над этой страницей. Пожалуйста, вернитесь позже.</p>
      <Link to="/products" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Перейти к товарам
      </Link>
    </div>
  );
}

export default PageInProgress;