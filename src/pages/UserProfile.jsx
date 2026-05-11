import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useAddresses } from "../hooks/useAddresses";
import { handleAddAddress } from "../functions";
import ProfileHeader from "../components/user-profile/ProfileHeader";
import ProfileTabs from "../components/user-profile/ProfileTabs";
import ProfileInfo from "../components/user-profile/ProfileInfo";
import OrdersTab from "../components/user-profile/OrdersTab";
import WhishlistTab from "../components/user-profile/WhishlistTab";

export default function UserProfile() {
  const { user } = useUser();  
  const [activeTab, setActiveTab] = useState("profile");    
  
  
  const {
    addresses,
    isLoading: addressesLoading,
    addAddress,
    deleteAddress,
  } = useAddresses();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", address: "" });  

  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Шапка профиля */}
        <ProfileHeader user={user} />

        {/* Табы */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Профиль */}
        {activeTab === "profile" && (
          <ProfileInfo />
        )}        

        {/* Заказы */}
        {activeTab === "orders" && (
          <OrdersTab />
        )}

        {/* Избранное */}
        {activeTab === "favorites" && (
          <WhishlistTab />
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
