import { textFields, initialForm, checkboxFields } from "../../constants";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";

const ProductForm = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

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

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto max-h-[85vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingProduct
              ? `Редактировать: ${editingProduct.name}`
              : "Добавить товар"}
          </h2>
          {editingProduct && (
            <button
              onClick={cancelEditing}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Отмена
            </button>
          )}
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {formError}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          className="space-y-3"
        >
          {/* Текстовые поля */}
          {textFields.map(({ label, key, placeholder, type = "text" }) => (
            <div key={key}>
              <label className="block text-sm text-gray-500 mb-1">
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Краткое описание */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Краткое описание
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Краткое описание товара"
              rows={2}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Подробное описание */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Подробное описание
            </label>
            <textarea
              value={form.detailedDescription}
              onChange={(e) =>
                setForm({ ...form, detailedDescription: e.target.value })
              }
              placeholder="Подробное описание, особенности, преимущества..."
              rows={4}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Характеристики */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm text-gray-500">
                Характеристики
              </label>
              <button
                type="button"
                onClick={addSpecRow}
                className="text-xs text-blue-600 hover:underline"
              >
                + Добавить
              </button>
            </div>
            <div className="space-y-2">
              {form.specifications.map((spec, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) =>
                      updateSpecRow(index, "key", e.target.value)
                    }
                    placeholder="Название (напр. Бренд)"
                    className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) =>
                      updateSpecRow(index, "value", e.target.value)
                    }
                    placeholder="Значение (напр. Apple)"
                    className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecRow(index)}
                    className="text-red-400 hover:text-red-600 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Чекбоксы */}
          <div className="flex gap-4 flex-wrap">
            {checkboxFields.map(({ id, key, label }) => (
              <div key={id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={id}
                  checked={form[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor={id} className="text-sm text-gray-600">
                  {label}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {editingProduct ? "Сохранить изменения" : "Добавить товар"}
          </button>
        </form>
      </div>

      {/* ── Список товаров ── */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Товары{" "}
          <span className="text-gray-400 text-sm font-normal">
            ({products.length})
          </span>
        </h2>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 border rounded-xl p-3"
            >
              <img
                src={product.image || "https://placehold.co/48x48"}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-400">
                  {product.category} · {product.price.toLocaleString()} ₴
                </p>
              </div>
              <button
                onClick={() => handleEditProduct(product)}
                className="text-blue-400 hover:text-blue-600 text-xs border border-blue-200 hover:border-blue-400 px-2 py-1 rounded-lg transition flex-shrink-0"
              >
                Изменить
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-400 hover:text-red-600 text-xs border border-red-200 hover:border-red-400 px-2 py-1 rounded-lg transition flex-shrink-0"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductForm;
