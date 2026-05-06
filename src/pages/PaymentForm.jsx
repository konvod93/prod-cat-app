import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";

export default function PaymentForm() {
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Симуляция обработки платежа
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = await createOrder(items, totalPrice);

    if (result.success) {
      clearCart();
      navigate("/thank-you");
    } else {
      console.error("Ошибка:", result.error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Оплата</h2>
      <p className="text-sm text-gray-500 mb-6">
        Это демо-форма. Настоящая оплата не производится.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 flex justify-between items-center">
        <span className="text-gray-600 text-sm">Сумма к оплате</span>
        <span className="text-xl font-bold text-gray-800">
          {totalPrice.toFixed(2)} $
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Номер карты
          </label>
          <input
            type="text"
            name="number"
            placeholder="0000 0000 0000 0000"
            value={cardData.number}
            onChange={handleChange}
            maxLength={19}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Имя владельца
          </label>
          <input
            type="text"
            name="name"
            placeholder="IVAN IVANOV"
            value={cardData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">
              Срок действия
            </label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={cardData.expiry}
              onChange={handleChange}
              maxLength={5}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-24">
            <label className="block text-sm text-gray-500 mb-1">CVV</label>
            <input
              type="password"
              name="cvv"
              placeholder="•••"
              value={cardData.cvv}
              onChange={handleChange}
              maxLength={3}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isProcessing ? "Обработка платежа..." : `Оплатить ${totalPrice.toFixed(2)} $`}
        </button>
      </form>
    </div>
  );
}