import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../functions";

const ProfileHeader = ({ user }) => {
  const { logout } = useUser();
  const navigate = useNavigate();

  return (
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
  );
};
export default ProfileHeader;
