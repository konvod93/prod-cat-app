// Хук для управления категориями: получение списка, добавление, удаление, обработка ошибок

import { useState } from "react";
import { useCategories } from "./useCategories";
import { initialCategoryForm } from "../constants";

export const useCategoryManager = () => {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [categoryForm, setCategoryForm] = useState(initialCategoryForm);
  const [categoryError, setCategoryError] = useState("");

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
  return {
    categories,
    categoryForm,
    categoryError,
    setCategoryForm,
    handleAddCategory,
    deleteCategory,
  };
};
