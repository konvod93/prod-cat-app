import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Страница не найдена</h1>
      <p className="mt-4 text-gray-600">К сожалению, запрашиваемая страница не существует.</p>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        <Link to="/" className="text-white">Вернуться на главную</Link>
      </button>
      <p className="mt-4 text-sm text-gray-500">
        Если у вас есть вопросы, пожалуйста, свяжитесь с нами через <Link to="/contacts" className="text-blue-600 hover:underline">контакты</Link>.
      </p>
    </div>
  );
};

export default NotFound;