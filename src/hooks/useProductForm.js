import { useProducts } from "./useProducts";
import { useState } from "react";
import { initialForm } from "../constants";
import { buildProductPayload } from "../components/admin-page/admin-page-utils/productPayload";
import { supabase } from "../lib/supabase";

export const useProductForm = () => {
  const [form, setForm] = useState(initialForm);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

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

  const resetForm = () => {
    setForm(initialForm);
    setEditingProduct(null);
    setFormError("");
  };

  // Обработка результата API для добавления и обновления
  const handleResult = ({ result, successText }) => {
    if (result.success) {
      resetForm();
      setSuccessMessage(successText);
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setFormError(result.error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      setFormError("Заполните обязательные поля");
      return;
    }
    const result = await addProduct(buildProductPayload(form));
    handleResult({ result, successText: `Товар "${form.name}" добавлен` });
  };

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) return null;

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(fileName);

    return publicUrl;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) setForm((prev) => ({ ...prev, image: url }));
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
      buildProductPayload(form),
    );
    handleResult({ result, successText: `Товар "${form.name}" обновлен` });
  };

  return {
    products,
    deleteProduct,
    form,
    setForm,
    formError,
    successMessage,
    editingProduct,
    handleAddProduct,
    handleEditProduct,
    handleUpdateProduct,
    cancelEditing: resetForm,
    addSpecRow,
    removeSpecRow,
    updateSpecRow,
    handleImageUpload,
  };
};
