// Cart.jsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    isLoading,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-xl font-semibold text-gray-600">Загрузка...</h2>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">Корзина пуста</h2>
        <Link to='/products'><p className="text-gray-500 mt-2">Добавьте товары в корзину</p></Link>
        <Link to="/products" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Перейти к товарам
        </Link>
        <div className="mt-6">
          <img  src="empty-cart.png" alt="Empty Cart" className="mx-auto w-48 h-48 object-cover" />
        </div>
        <div className="mt-4">
          <p className="text-gray-500">Вы можете начать покупки, перейдя в раздел товаров.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Корзина ({totalItems})</h2>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Очистить корзину
        </button>
      </div>

      {/* Items */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center md:items-start gap-4 border-b pb-4"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
              <p className="text-gray-600">Цена: {item.price} ₽</p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-sm text-gray-700">
                  Количество: {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <p className="mt-2 text-gray-700">
                Сумма: {(item.price * item.quantity).toFixed(2)} ₽
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Удалить из корзины
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 border-t pt-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-800">
          <h3 className="text-xl font-bold">Общая сумма: {totalPrice.toFixed(2)} ₽</h3>
          <p className="text-sm text-gray-600">Всего товаров: {totalItems}</p>
        </div>

        <button className="mt-4 md:mt-0 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default Cart;