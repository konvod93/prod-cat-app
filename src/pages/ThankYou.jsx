import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow p-10 max-w-md w-full text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Заказ оформлен!</h1>
        <p className="text-gray-500 mb-8">
          Дякуємо за покупку. Ваш замовлення прийнято і вже обробляється.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/profile"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
          >
            Мої замовлення
          </Link>
          <Link
            to="/products"
            className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition text-center"
          >
            Продовжити покупки
          </Link>
        </div>
      </div>
    </div>
  );
}