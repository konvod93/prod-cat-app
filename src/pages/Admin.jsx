import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";

const ADMIN_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

// Добавьте константы вверху файла
const CATEGORY_ICONS = [
  "📱",
  "👕",
  "📚",
  "🏠",
  "⚽",
  "💄",
  "🍎",
  "🧸",
  "🚗",
  "💍",
  "🎮",
  "🔧",
  "🎨",
  "🐾",
  "🌿",
  "🍳",
  "🏕️",
  "🎸",
  "📦",
  "🐟",
  "🚵",  
];

const CATEGORY_COLORS = [
  { label: "Синий", value: "from-blue-500 to-blue-600" },
  { label: "Фиолетовый", value: "from-purple-500 to-purple-600" },
  { label: "Зелёный", value: "from-green-500 to-green-600" },
  { label: "Оранжевый", value: "from-orange-500 to-orange-600" },
  { label: "Красный", value: "from-red-500 to-red-600" },
  { label: "Розовый", value: "from-pink-500 to-pink-600" },
  { label: "Жёлтый", value: "from-yellow-500 to-yellow-600" },
  { label: "Индиго", value: "from-indigo-500 to-indigo-600" },
  { label: "Серый", value: "from-gray-500 to-gray-600" },
  { label: "Бирюзовый", value: "from-teal-500 to-teal-600" },
  { label: "Фуксия", value: "from-fuchsia-500 to-fuchsia-600" },
  { label: "Фиолетово-синий", value: "from-violet-500 to-violet-600" },
  { label: "Лаймовый", value: "from-lime-500 to-lime-600" },
  { label: "Коралловый", value: "from-rose-500 to-rose-600" },
  { label: "Синий-фиолетовый", value: "from-blue-500 to-purple-600" },
  { label: "Зелёно-жёлтый", value: "from-green-500 to-yellow-600" },
  { label: "Оранжево-красный", value: "from-orange-500 to-red-600" },
  { label: "Розово-фиолетовый", value: "from-pink-500 to-purple-600" },
  { label: "Жёлто-зелёный", value: "from-yellow-500 to-green-600" },
];

const initialForm = {
  name: "",
  price: "",
  category: "",
  description: "",
  detailedDescription: "",
  image: "",
  tags: "",
  inStock: true,
  specifications: [], // [{key: '', value: ''}]
};

const initialCategoryForm = {
  name: "",
  icon: "📦",
  color: "from-gray-500 to-gray-600",
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
  const { categories, addCategory, deleteCategory } = useCategories();

  const [categoryForm, setCategoryForm] = useState(initialCategoryForm); // ← добавить

  const handleAddCategory = async () => {
    if (!categoryForm.name.trim()) return;
    const result = await addCategory(categoryForm);
    if (result.success) {
      setCategoryForm(initialCategoryForm);
    }
  };

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

  // Добавление строки характеристики
  const addSpecRow = () => {
    setForm({
      ...form,
      specifications: [...form.specifications, { key: "", value: "" }],
    });
  };

  // Удаление строки характеристики
  const removeSpecRow = (index) => {
    setForm({
      ...form,
      specifications: form.specifications.filter((_, i) => i !== index),
    });
  };

  // Обновление строки характеристики
  const updateSpecRow = (index, field, value) => {
    const updated = form.specifications.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec,
    );
    setForm({ ...form, specifications: updated });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setFormError("Заполните обязательные поля");
      return;
    }

    // Преобразуем массив [{key, value}] в объект {key: value}
    const specificationsObj = form.specifications
      .filter((s) => s.key.trim() && s.value.trim())
      .reduce((acc, s) => ({ ...acc, [s.key.trim()]: s.value.trim() }), {});

    const result = await addProduct({
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      detailedDescription: form.detailedDescription,
      image: form.image || "https://placehold.co/300x300",
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      inStock: form.inStock,
      specifications: specificationsObj,
    });

    if (result.success) {
      setForm(initialForm);
      setSuccessMessage(`Товар "${form.name}" добавлен`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setFormError(result.error);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
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
          <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto max-h-[85vh]">
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
              {/* Основные поля */}
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

              {/* Краткое описание */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Краткое описание
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Краткое описание товара"
                  rows={2}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              {/* Подробное описание */}
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Подробное описание
                </label>
                <textarea
                  value={form.detailedDescription}
                  onChange={(e) =>
                    setForm({ ...form, detailedDescription: e.target.value })
                  }
                  placeholder="Подробное описание, особенности, преимущества..."
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              {/* Характеристики */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm text-gray-500">
                    Характеристики
                  </label>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    + Добавить
                  </button>
                </div>
                <div className="space-y-2">
                  {form.specifications.map((spec, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) =>
                          updateSpecRow(index, "key", e.target.value)
                        }
                        placeholder="Название (напр. Бренд)"
                        className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpecRow(index, "value", e.target.value)
                        }
                        placeholder="Значение (напр. Apple)"
                        className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecRow(index)}
                        className="text-red-400 hover:text-red-600 text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

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

          {/* Список товаров */}
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
          {/* Управление категориями */}
          <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Категории
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Форма добавления категории */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Добавить категорию
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Название *
                    </label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="Рыбалка"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Выбор иконки */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Иконка
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_ICONS.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() =>
                            setCategoryForm({ ...categoryForm, icon })
                          }
                          className={`text-xl p-1.5 rounded-lg border transition ${
                            categoryForm.icon === icon
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Выбор цвета */}
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Цвет
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_COLORS.map(({ label, value }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setCategoryForm({ ...categoryForm, color: value })
                          }
                          title={label}
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${value} transition ring-offset-1 ${
                            categoryForm.color === value
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Превью */}
                  <div
                    className={`rounded-xl bg-gradient-to-br ${categoryForm.color} p-4 text-white flex items-center gap-3`}
                  >
                    <span className="text-3xl">{categoryForm.icon}</span>
                    <span className="font-semibold">
                      {categoryForm.name || "Название категории"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Добавить категорию
                  </button>
                </div>
              </div>

              {/* Список категорий */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Существующие{" "}
                  <span className="text-gray-400">({categories.length})</span>
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-3 border rounded-xl p-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-sm flex-shrink-0`}
                      >
                        {cat.icon}
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-800">
                        {cat.name}
                      </span>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-red-400 hover:text-red-600 text-xs border border-red-200 hover:border-red-400 px-2 py-1 rounded-lg transition"
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
      </div>
    </div>
  );
}
