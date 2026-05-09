// Profile info section with editable fields for name, email, and phone

import { handleSaveProfile } from "../../functions";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";

const ProfileInfo = () => {
  const { updateProfile, isLoading, user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  return (
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
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
            <label className="block text-sm text-gray-500 mb-1">Телефон</label>
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
              onClick={() =>
                handleSaveProfile({ formData, updateProfile, setIsEditing })
              }
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
            <div key={label} className="flex justify-between border-b pb-3">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm text-gray-800 font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
