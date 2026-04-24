// src/pages/Admin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

// В реальном проекте это будет в .env
const ADMIN_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const initialForm = {
  name: "",
  price: "",
  category: "",
  description: "",
  image: "",
  tags: "",
  inStock: true,
};

export default function Admin() {
  const { products, addProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Вход в админку
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.login === ADMIN_LOGIN &&
      credentials.password === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Неверный логин или пароль");
    }
  };

  // Добавление товара
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setFormError("Заполните обязательные поля");
      return;
    }
    const result = await addProduct({
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      image: form.image || "https://placehold.co/300x300",
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      inStock: form.inStock,
    });

    if (result.success) {
      setForm(initialForm);
      setSuccessMessage(`Товар "${form.name}" добавлен`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setFormError(result.error);
    }
  };

  // Форма входа
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Админ панель
          </h1>
          <p className="text-gray-400 text-sm text-center mb-6">
            Доступ только для администраторов
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Логин</label>
              <input
                type="text"
                value={credentials.login}
                onChange={(e) =>
                  setCredentials({ ...credentials, login: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Пароль</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Войти
            </button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600 text-center transition"
          >
            ← На главную
          </button>
        </div>
      </div>
    );
  }

  // Панель управления
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Шапка */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Панель администратора
          </h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-red-500 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50 transition"
          >
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Форма добавления товара */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Добавить товар
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {formError}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleAddProduct} className="space-y-3">
              {[
                {
                  label: "Название *",
                  key: "name",
                  placeholder: "Название товара",
                },
                {
                  label: "Цена *",
                  key: "price",
                  placeholder: "1990",
                  type: "number",
                },
                {
                  label: "Категория *",
                  key: "category",
                  placeholder: "Электроника",
                },
                {
                  label: "Описание",
                  key: "description",
                  placeholder: "Описание товара",
                },
                {
                  label: "Ссылка на фото",
                  key: "image",
                  placeholder: "https://...",
                },
                {
                  label: "Теги (через запятую)",
                  key: "tags",
                  placeholder: "новинка, хит, скидка",
                },
              ].map(({ label, key, placeholder, type = "text" }) => (
                <div key={key}>
                  <label className="block text-sm text-gray-500 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    placeholder={placeholder}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={form.inStock}
                  onChange={(e) =>
                    setForm({ ...form, inStock: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="inStock" className="text-sm text-gray-600">
                  В наличии
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Добавить товар
              </button>
            </form>
          </div>

          {/* Список товаров с удалением */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Товары{" "}
              <span className="text-gray-400 text-sm font-normal">
                ({products.length})
              </span>
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 border rounded-xl p-3"
                >
                  <img
                    src={product.image || "https://placehold.co/48x48"}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {product.category} · {product.price.toLocaleString()} ₴
                    </p>
                  </div>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-400 hover:text-red-600 text-xs border border-red-200 hover:border-red-400 px-2 py-1 rounded-lg transition flex-shrink-0"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}