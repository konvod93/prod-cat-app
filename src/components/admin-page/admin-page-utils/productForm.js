// Вспомогательные функции для работы с формой продукта в админке

// Преобразует массив спецификаций в объект { key: value }
const buildSpecificationsObj = (form) =>
  form.specifications
    .filter((s) => s.key.trim() && s.value.trim())
    .reduce((acc, s) => ({ ...acc, [s.key.trim()]: s.value.trim() }), {});

// Формирует полезную нагрузку для API на основе данных формы

export const buildProductPayload = (form) => ({
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
  specifications: buildSpecificationsObj(form),
});
