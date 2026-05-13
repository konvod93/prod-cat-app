// Moved to AdminLogin.jsx for better organization and separation of concerns. This way, the login logic is encapsulated in its own component, making it easier to maintain and reuse if needed in other parts of the application.

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { handleLoginAdmin } from "../../functions";
import { supabase } from "../../lib/supabase";

const AdminLogin = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const role = session?.user?.user_metadata?.role;
      if (role === "admin") setIsAuthenticated(true);
      setIsCheckingAuth(false);
    });
  }, [setIsAuthenticated]);

  if (isCheckingAuth) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Админ панель
        </h1>
        <p className="text-gray-400 text-sm text-center mb-6"></p>
        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {authError}
          </div>
        )}
        <form onSubmit={(e) => handleLoginAdmin(e, credentials, setAuthError, setIsAuthenticated, supabase)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="admin@example.com"
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
};

export default AdminLogin;
