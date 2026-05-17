import { useState } from "react";
import AdminLogin from "../components/admin-page/AdminLogin";
import AdminHeader from "../components/admin-page/AdminHeader";
import ProductForm from "../components/admin-page/ProductForm";
import CategoryManager from "../components/admin-page/CategoryManager";

export default function Admin() {
  
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);   

  // ─── Форма входа ───────────────────────────────────────────────
  if (!isAuthenticated) {
    return <AdminLogin setIsAuthenticated={setIsAuthenticated} />;
  }

  // ─── Панель управления ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Шапка */}
        <AdminHeader setIsAuthenticated={setIsAuthenticated} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Форма добавления / редактирования товара ── */}
          <ProductForm />

          {/* ── Управление категориями ── */}
          <CategoryManager />
        </div>
      </div>
    </div>
  );
}
