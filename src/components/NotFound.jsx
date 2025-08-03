import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Страница не найдена</h1>
      <p className="mt-4 text-gray-600">К сожалению, запрашиваемая страница не существует.</p>
    </div>
  );
};

export default NotFound;