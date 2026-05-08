import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { useOrders } from "../hooks/useOrders";
import { getOrderStatus, formatProductPrice } from "../functions";
import { useAddresses } from "../hooks/useAddresses";
import { statusColors, tabs } from "../constants";
import { handleLogout, handleAddAddress, handleSaveProfile } from "../functions";

export default function UserProfile() {
  const { user, logout, updateProfile, isLoading } = useUser();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const { getOrders } = useOrders();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const {
    addresses,
    isLoading: addressesLoading,
    addAddress,
    deleteAddress,
  } = useAddresses();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", address: "" });  

  useEffect(() => {
    if (activeTab === "orders") {
      setOrdersLoading(true);
      getOrders().then((data) => {
        setOrders(data);
        setOrdersLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const navigate = useNavigate();  

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Шапка профиля */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 mb-6">
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=random`
            }
            alt="Аватар"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={() => handleLogout({ logout, navigate })}
            className="text-sm text-red-500 hover:text-red-700 border border-red-300 hover:border-red-500 px-4 py-2 rounded-lg transition"
          >
            Выйти
          </button>
        </div>

        {/* Табы */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Профиль */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Личные данные
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Редактировать
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Имя
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+380..."
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleSaveProfile({ formData, updateProfile, setIsEditing })}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition"
                  >
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-500 px-5 py-2 rounded-lg text-sm border hover:bg-gray-50 transition"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { label: "Имя", value: user?.name },
                  { label: "Email", value: user?.email },
                  { label: "Телефон", value: user?.phone || "Не указан" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between border-b pb-3"
                  >
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm text-gray-800 font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Заказы */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              История заказов
            </h2>
            {ordersLoading ? (
              <p className="text-gray-400 text-sm">Загрузка...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-400 text-sm">Заказов пока нет</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const status = getOrderStatus(order.created_at);
                  return (
                    <div
                      key={order.id}
                      className="border rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          Заказ №{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString(
                            "ru-RU",
                          )}{" "}
                          · {order.items.length} товара
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className="font-semibold text-gray-800">
                          {formatProductPrice(order.total)}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}
                        >
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Избранное */}
        {activeTab === "favorites" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Избранное
            </h2>
            {wishlistItems.length === 0 ? (
              <p className="text-gray-400 text-sm">Избранных товаров нет</p>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-blue-600 font-semibold">
                        {item.price.toLocaleString()} ₴
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      В корзину
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-sm text-red-400 hover:text-red-600"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Адреса */}
        {activeTab === "addresses" && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Адреса доставки
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showAddForm ? "Отмена" : "+ Добавить"}
              </button>
            </div>

            {showAddForm && (
              <div className="mb-4 space-y-2 border rounded-xl p-4">
                <input
                  type="text"
                  placeholder="Название (например: Дом)"
                  value={newAddress.label}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, label: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Адрес доставки"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleAddAddress({ newAddress, addAddress, setNewAddress, setShowAddForm })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  Сохранить
                </button>
              </div>
            )}

            {addressesLoading ? (
              <p className="text-gray-400 text-sm">Загрузка...</p>
            ) : addresses.length === 0 ? (
              <p className="text-gray-400 text-sm">Адресов пока нет</p>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border rounded-xl p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{addr.label}</p>
                      <p className="text-sm text-gray-500">{addr.address}</p>
                    </div>
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-sm text-red-400 hover:text-red-600 transition"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
