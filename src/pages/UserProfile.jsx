import { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

// Моковые данные для демо
const mockOrders = [
  { id: '001', date: '15.04.2025', total: 4500, status: 'Доставлен', items: 3 },
  { id: '002', date: '02.03.2025', total: 1200, status: 'В пути', items: 1 },
  { id: '003', date: '18.02.2025', total: 8900, status: 'Доставлен', items: 5 },
];

const mockFavorites = [
  { id: 1, name: 'Кроссовки Nike Air Max', price: 7990, image: 'https://placehold.co/80x80' },
  { id: 2, name: 'Футболка Adidas', price: 2490, image: 'https://placehold.co/80x80' },
  { id: 3, name: 'Рюкзак Eastpak', price: 4990, image: 'https://placehold.co/80x80' },
];

const mockAddresses = [
  { id: 1, label: 'Дом', address: 'г. Харьков, ул. Сумская, 1, кв. 10' },
  { id: 2, label: 'Работа', address: 'г. Харьков, пр. Науки, 14' },
];

// Статусы заказов
const statusColors = {
  'Доставлен': 'bg-green-100 text-green-700',
  'В пути': 'bg-blue-100 text-blue-700',
  'Отменён': 'bg-red-100 text-red-700',
  'Обрабатывается': 'bg-yellow-100 text-yellow-700',
};

export default function UserProfile() {
  const { user, logout, updateProfile, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const handleSaveProfile = async () => {
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Профиль' },
    { id: 'orders', label: 'Заказы' },
    { id: 'favorites', label: 'Избранное' },
    { id: 'addresses', label: 'Адреса' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Шапка профиля */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 mb-6">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=random`}
            alt="Аватар"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 border border-red-300 hover:border-red-500 px-4 py-2 rounded-lg transition"
          >
            Выйти
          </button>
        </div>

        {/* Табы */}
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Профиль */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Личные данные</h2>
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
                  <label className="block text-sm text-gray-500 mb-1">Имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+380..."
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 transition"
                  >
                    {isLoading ? 'Сохранение...' : 'Сохранить'}
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
                  { label: 'Имя', value: user?.name },
                  { label: 'Email', value: user?.email },
                  { label: 'Телефон', value: user?.phone || 'Не указан' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Заказы */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">История заказов</h2>
            {mockOrders.length === 0 ? (
              <p className="text-gray-400 text-sm">Заказов пока нет</p>
            ) : (
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <div key={order.id} className="border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Заказ №{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date} · {order.items} товара</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="font-semibold text-gray-800">{order.total.toLocaleString()} ₴</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Избранное */}
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Избранное</h2>
            {mockFavorites.length === 0 ? (
              <p className="text-gray-400 text-sm">Избранных товаров нет</p>
            ) : (
              <div className="space-y-4">
                {mockFavorites.map(item => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-blue-600 font-semibold">{item.price.toLocaleString()} ₴</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:underline">В корзину</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Адреса */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Адреса доставки</h2>
              <button className="text-sm text-blue-600 hover:underline">+ Добавить</button>
            </div>
            {mockAddresses.length === 0 ? (
              <p className="text-gray-400 text-sm">Адресов пока нет</p>
            ) : (
              <div className="space-y-3">
                {mockAddresses.map(addr => (
                  <div key={addr.id} className="border rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">{addr.label}</p>
                      <p className="text-sm text-gray-500">{addr.address}</p>
                    </div>
                    <button className="text-sm text-red-400 hover:text-red-600 transition">Удалить</button>
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