// Profile info section with editable fields for name, email, and phone

import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

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
      <ProfileEditForm isEditing={isEditing} setIsEditing={setIsEditing} />
    </div>
  );
};

export default ProfileInfo;
