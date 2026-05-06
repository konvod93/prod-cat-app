import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { formatProductPrice } from "../functions";

function CheckoutForm() {
  const { totalPrice } = useCart();  
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  navigate("/payment");
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Оформление заказа
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Адрес доставки"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="comment"
          placeholder="Комментарий к заказу (необязательно)"
          value={formData.comment}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          {isSubmitting ? "Оформляем..." : `Подтвердить заказ на ${formatProductPrice(totalPrice.toFixed(2))}`}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;