import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import {
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  initialForm,
  initialCategoryForm,
} from "../constants";
import AdminLogin from "../components/admin-page/AdminLogin";
import AdminHeader from "../components/admin-page/AdminHeader";
import ProductForm from "../components/admin-page/ProductForm";

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories, addCategory, deleteCategory } = useCategories();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const [categoryForm, setCategoryForm] = useState(initialCategoryForm);
  const [categoryError, setCategoryError] = useState("");

  // ─── Характеристики ────────────────────────────────────────────
  const addSpecRow = () => {
    setForm({
      ...form,
      specifications: [...form.specifications, { key: "", value: "" }],
    });
  };

  const removeSpecRow = (index) => {
    setForm({
      ...form,
      specifications: form.specifications.filter((_, i) => i !== index),
    });
  };

  const updateSpecRow = (index, field, value) => {
    const updated = form.specifications.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec,
    );
    setForm({ ...form, specifications: updated });
  };

  // ─── Товары ────────────────────────────────────────────────────
  const buildSpecificationsObj = () =>
    form.specifications
      .filter((s) => s.key.trim() && s.value.trim())
      .reduce((acc, s) => ({ ...acc, [s.key.trim()]: s.value.trim() }), {});

  const buildProductPayload = () => ({
    name: form.name,
    price: Number(form.price),
    originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
    category: form.category,
    description: form.description,
    detailedDescription: form.detailedDescription,
    image: form.image || "https://placehold.co/300x300",
    tags: form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    inStock: form.inStock,
    isNew: form.isNew,
    isSale: form.isSale,
    specifications: buildSpecificationsObj(),
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setFormError("Заполните обязательные поля");
      return;
    }
    const result = await addProduct(buildProductPayload());
    if (result.success) {
      setForm(initialForm);
      setSuccessMessage(`Товар "${form.name}" добавлен`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setFormError(result.error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormError("");
    setForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || "",
      category: product.category,
      description: product.description || "",
      detailedDescription: product.detailedDescription || "",
      image: product.image || "",
      tags: product.tags?.join(", ") || "",
      inStock: product.inStock,
      isNew: product.isNew || false,
      isSale: product.isSale || false,
      specifications: Object.entries(product.specifications || {}).map(
        ([key, value]) => ({ key, value }),
      ),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setFormError("Заполните обязательные поля");
      return;
    }
    const result = await updateProduct(
      editingProduct.id,
      buildProductPayload(),
    );
    if (result.success) {
      setEditingProduct(null);
      setForm(initialForm);
      setSuccessMessage(`Товар "${form.name}" обновлён`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setFormError(result.error);
    }
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setFormError("");
  };

  // ─── Категории ─────────────────────────────────────────────────
  const handleAddCategory = async () => {
    if (!categoryForm.name.trim()) return;
    const result = await addCategory(categoryForm);
    if (result.success) {
      setCategoryForm(initialCategoryForm);
      setCategoryError("");
    } else {
      setCategoryError(result.error);
    }
  };

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
          <ProductForm
            form={form}
            setForm={setForm}
            formError={formError}
            successMessage={successMessage}
            editingProduct={editingProduct}
            cancelEditing={cancelEditing}
            handleAddProduct={handleAddProduct}
            handleUpdateProduct={handleUpdateProduct}
            handleEditProduct={handleEditProduct}
            addSpecRow={addSpecRow}
            updateSpecRow={updateSpecRow}
            removeSpecRow={removeSpecRow}
            products={products}
            deleteProduct={deleteProduct}
          />

          {/* ── Управление категориями ── */}
          <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Категории
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Форма добавления категории */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Добавить категорию
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Название *
                    </label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="Рыбалка"
                      className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Иконка
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_ICONS.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() =>
                            setCategoryForm({ ...categoryForm, icon })
                          }
                          className={`text-xl p-1.5 rounded-lg border transition ${
                            categoryForm.icon === icon
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">
                      Цвет
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_COLORS.map(({ label, value }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() =>
                            setCategoryForm({ ...categoryForm, color: value })
                          }
                          title={label}
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${value} transition ring-offset-1 ${
                            categoryForm.color === value
                              ? "ring-2 ring-blue-500"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className={`rounded-xl bg-gradient-to-br ${categoryForm.color} p-4 text-white flex items-center gap-3`}
                  >
                    <span className="text-3xl">{categoryForm.icon}</span>
                    <span className="font-semibold">
                      {categoryForm.name || "Название категории"}
                    </span>
                  </div>
                  {categoryError && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                      {categoryError}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Добавить категорию
                  </button>
                </div>
              </div>

              {/* Список категорий */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Существующие{" "}
                  <span className="text-gray-400">({categories.length})</span>
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-3 border rounded-xl p-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-sm flex-shrink-0`}
                      >
                        {cat.icon}
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-800">
                        {cat.name}
                      </span>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-red-400 hover:text-red-600 text-xs border border-red-200 hover:border-red-400 px-2 py-1 rounded-lg transition"
                      >
                        Удалить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
