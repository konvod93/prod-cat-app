import { supabase } from "../../lib/supabase"

const AdminHeader = ({ setIsAuthenticated }) => {
    return (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Панель адмінистратора
          </h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              setIsAuthenticated(false);
            }}
            className="text-sm text-red-500 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50 transition"
          >
            Вийти
          </button>
        </div>
    )
}

export default AdminHeader;