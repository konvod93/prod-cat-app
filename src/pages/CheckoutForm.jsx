import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useAddresses } from "../hooks/useAddresses";
import { useUser } from "../hooks/useUser";
import { formatProductPrice } from "../functions";

function CheckoutForm() {
  const { totalPrice } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();
  const { addresses, addAddress } = useAddresses();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectAddress = (address) => {
    setFormData({ ...formData, address });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (saveAddress && formData.address) {
      await addAddress("Адрес доставки", formData.address);
    }

    navigate("/payment");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Оформлення замовлення
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

        {/* Сохранённые адреса */}
        {addresses.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Збережені адреси:</p>
            <div className="flex flex-wrap gap-2">
              {addresses.map((addr) => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => handleSelectAddress(addr.address)}
                  className={`text-sm px-3 py-1.5 rounded-lg border transition ${
                    formData.address === addr.address
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {addr.label}: {addr.address}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <input
            type="text"
            name="address"
            placeholder="Адрес доставки"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Чекбокс сохранения — только если адрес введён вручную */}
          {formData.address &&
            !addresses.some((a) => a.address === formData.address) && (
              <label className="flex items-center gap-2 mt-2 text-sm text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                  className="rounded"
                />
                Зберегти адресу в профілі
              </label>
            )}
        </div>

        <textarea
          name="comment"
          placeholder="Коментар до замовлення (необов’язково)"
          value={formData.comment}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          {isSubmitting
            ? "Оформляем..."
            : `Подтвердить заказ на ${formatProductPrice(totalPrice.toFixed(2))}`}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;