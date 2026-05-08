// src/constants.js
// Вынесем константы для категорий в отдельный файл, чтобы не дублировать код в разных компонентах, где может понадобиться эта логика
export const CATEGORY_ICONS = [
  "📱",
  "👕",
  "📚",
  "🏠",
  "⚽",
  "💄",
  "🍎",
  "🧸",
  "🚗",
  "💍",
  "🎮",
  "🔧",
  "🎨",
  "🐾",
  "🌿",
  "🍳",
  "🏕️",
  "🎸",
  "📦",
  "🐟",
  "🚵",
];

// Вынесем константы для категорий в отдельный файл, чтобы не дублировать код в разных компонентах, где может понадобиться эта логика
export const CATEGORY_COLORS = [
  { label: "Синий", value: "from-blue-500 to-blue-600" },
  { label: "Фиолетовый", value: "from-purple-500 to-purple-600" },
  { label: "Зелёный", value: "from-green-500 to-green-600" },
  { label: "Оранжевый", value: "from-orange-500 to-orange-600" },
  { label: "Красный", value: "from-red-500 to-red-600" },
  { label: "Розовый", value: "from-pink-500 to-pink-600" },
  { label: "Жёлтый", value: "from-yellow-500 to-yellow-600" },
  { label: "Индиго", value: "from-indigo-500 to-indigo-600" },
  { label: "Серый", value: "from-gray-500 to-gray-600" },
  { label: "Бирюзовый", value: "from-teal-500 to-teal-600" },
  { label: "Фуксия", value: "from-fuchsia-500 to-fuchsia-600" },
  { label: "Фиолетово-синий", value: "from-violet-500 to-violet-600" },
  { label: "Лаймовый", value: "from-lime-500 to-lime-600" },
  { label: "Коралловый", value: "from-rose-500 to-rose-600" },
  { label: "Синий-фиолетовый", value: "from-blue-500 to-purple-600" },
  { label: "Зелёно-жёлтый", value: "from-green-500 to-yellow-600" },
  { label: "Оранжево-красный", value: "from-orange-500 to-red-600" },
  { label: "Розово-фиолетовый", value: "from-pink-500 to-purple-600" },
  { label: "Жёлто-зелёный", value: "from-yellow-500 to-green-600" },
];
// Вынесем начальное состояние формы продукта в отдельный файл, чтобы не дублировать код в разных компонентах, где может понадобиться эта логика
export const initialForm = {
  name: "",
  price: "",
  originalPrice: "",
  category: "",
  description: "",
  detailedDescription: "",
  image: "",
  tags: "",
  inStock: true,
  isNew: false,
  isSale: false,
  specifications: [],
};

// Вынесем начальное состояние формы категории в отдельный файл, чтобы не дублировать код в разных компонентах, где может понадобиться эта логика
export const initialCategoryForm = {
  name: "",
  icon: "📦",
  color: "from-gray-500 to-gray-600",
};
