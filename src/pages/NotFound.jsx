import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        404 - Сторінка не знайдена
      </h1>
      <p className="mt-4 text-gray-600">
        На жаль, запитана сторінка не існує.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Повернутися на головну
      </Link>
      <p className="mt-4 text-sm text-gray-500">
        Якщо у вас є питання, будь ласка, зв’яжіться з нами через{" "}
        <Link to="/contacts" className="text-blue-600 hover:underline">
          контакти
        </Link>
        .
      </p>
    </div>
  );
};

export default NotFound;
