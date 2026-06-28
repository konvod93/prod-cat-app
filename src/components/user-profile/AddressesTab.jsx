import { handleAddAddress } from "../../functions";
import { useAddresses } from "../../hooks/useAddresses";
import { useState } from "react";

const AddressesTab = () => {
  const {
    addresses,
    isLoading: addressesLoading,
    addAddress,
    deleteAddress,
  } = useAddresses();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "", address: "" });

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Адреса доставки</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showAddForm ? "Відмінити" : "+ Додати"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 space-y-2 border rounded-xl p-4">
          <input
            type="text"
            placeholder="Назва (наприклад: Дом)"
            value={newAddress.label}
            onChange={(e) =>
              setNewAddress({ ...newAddress, label: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Адреса доставки"
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, address: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() =>
              handleAddAddress({
                newAddress,
                addAddress,
                setNewAddress,
                setShowAddForm,
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Зберегти
          </button>
        </div>
      )}

      {addressesLoading ? (
        <p className="text-gray-400 text-sm">Завантаження...</p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-400 text-sm">Адрес доки немає</p>
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
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesTab;
