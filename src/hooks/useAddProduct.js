// hooks/useAddProduct.js

import { useState } from "react";
import { initialForm } from "../constants";

export const useAddProduct = (addProduct, formError, setFormError) => {
  const [form, setForm] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");

  const buildSpecificationsObj = () =>
    Object.fromEntries(
      form.specifications.map(({ key, value }) => [key, value]),
    );

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

  return {
    form,
    setForm,
    successMessage,
    handleAddProduct,
  };
};
