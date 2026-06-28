// Компонент, который отображает баннер с призывом добавить номер телефона, если он не указан в профиле пользователя.

import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const PhoneBanner = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  if (!user || user.phone || dismissed) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Додайте номер телефону
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Номер телефону допоможе нам зв’язатися з вами щодо питань доставки та оформлення замовлень.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setDismissed(true);
              navigate("/profile");
            }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Додати
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Пізніше
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneBanner;