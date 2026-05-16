import { useProducts } from "./useProducts";
import { useState } from "react";

export const useProductForm = ({ initialForm, form, setForm }) => {
  const { addProduct, updateProduct } = useProducts();
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

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

  return {
    formError,
    successMessage,
    editingProduct,
    handleAddProduct,
    handleEditProduct,
    handleUpdateProduct,
    cancelEditing,
  };
};
