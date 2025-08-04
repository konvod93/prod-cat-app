// src/data/mockProducts.js

// Массив категорий (для ProductList.jsx)
export const categories = [
    { id: 1, name: 'Электроника', label: 'Электроника', icon: '📱', color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'Одежда', label: 'Одежда', icon: '👕', color: 'from-purple-500 to-purple-600' },
    { id: 3, name: 'Книги', label: 'Книги', icon: '📚', color: 'from-green-500 to-green-600' },
    { id: 4, name: 'Дом и сад', label: 'Дом и сад', icon: '🏠', color: 'from-orange-500 to-orange-600' },
    { id: 5, name: 'Спорт', label: 'Спорт', icon: '⚽', color: 'from-red-500 to-red-600' },
    { id: 6, name: 'Красота', label: 'Красота', icon: '💄', color: 'from-pink-500 to-pink-600' },
    { id: 7, name: 'Продукты', label: 'Продукты', icon: '🍎', color: 'from-yellow-500 to-yellow-600' },
    { id: 8, name: 'Игрушки', label: 'Игрушки', icon: '🧸', color: 'from-indigo-500 to-indigo-600' },
    { id: 9, name: 'Автотовары', label: 'Автотовары', icon: '🚗', color: 'from-gray-500 to-gray-600' },
    { id: 10, name: 'Украшения', label: 'Украшения', icon: '💍', color: 'from-violet-500 to-violet-600' }
];

// Объект категорий (для Categories.jsx) - создается автоматически из массива
export const categoriesMap = categories.reduce((map, category) => {
    map[category.name] = {
        name: category.name,
        icon: category.icon,
        color: category.color
    };
    return map;
}, {});

export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Самый продвинутый iPhone с титановым корпусом и чипом A17 Pro",
    price: 999,
    originalPrice: 1199,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    rating: 4.8,
    reviewsCount: 1250,
    inStock: true,
    isNew: true,
    isSale: true,
    tags: ["smartphone", "apple", "premium", "5g"],
    specifications: {
      brand: "Apple",
      model: "iPhone 15 Pro", 
      storage: "128GB",
      color: "Titanium Blue"
    }
  },
  {
    id: 2,
    name: "MacBook Air M3",
    description: "Невероятно тонкий и легкий ноутбук с чипом M3",
    price: 1299,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    rating: 4.9,
    reviewsCount: 890,
    inStock: true,
    isNew: true,
    tags: ["laptop", "apple", "ultrabook"],
    specifications: {
      brand: "Apple",
      processor: "M3",
      ram: "8GB",
      storage: "256GB SSD"
    }
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    description: "Стильные кроссовки с максимальной амортизацией",
    price: 150,
    originalPrice: 180,
    category: "Спорт",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    rating: 4.6,
    reviewsCount: 445,
    inStock: true,
    isSale: true,
    tags: ["sneakers", "nike", "running", "comfort"],
    specifications: {
      brand: "Nike",
      size: "42",
      color: "Black/White",
      material: "Synthetic"
    }
  },
  {
    id: 4,
    name: "The Psychology of Programming",
    description: "Классическая книга о психологии программирования",
    price: 45,
    category: "Книги",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    rating: 4.7,
    reviewsCount: 234,
    inStock: true,
    tags: ["programming", "psychology", "development"],
    specifications: {
      author: "Gerald Weinberg",
      pages: 360,
      language: "English",
      publisher: "Dorset House"
    }
  },
  {
    id: 5,
    name: "Wireless Headphones Sony",
    description: "Премиальные беспроводные наушники с активным шумоподавлением",
    price: 299,
    originalPrice: 349,
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.5,
    reviewsCount: 678,
    inStock: false, // Нет в наличии
    isSale: true,
    tags: ["headphones", "sony", "wireless", "noise-cancelling"],
    specifications: {
      brand: "Sony",
      type: "Over-ear",
      batteryLife: "30 hours",
      connectivity: "Bluetooth 5.0"
    }
  },
  {
    id: 6,
    name: "Elegant Summer Dress",
    description: "Легкое летнее платье из натурального хлопка",
    price: 89,
    category: "Одежда",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    rating: 4.4,
    reviewsCount: 156,
    inStock: true,
    tags: ["dress", "summer", "cotton", "elegant"],
    specifications: {
      brand: "Fashion Co",
      size: "M",
      material: "100% Cotton",
      color: "Blue"
    }
  },
  {
    id: 7,
    name: "Smart Home Hub",
    description: "Центральное устройство для управления умным домом",
    price: 199,
    category: "Дом и сад",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    rating: 4.3,
    reviewsCount: 89,
    inStock: true,
    isNew: true,
    tags: ["smart-home", "hub", "automation", "iot"],
    specifications: {
      brand: "SmartTech",
      connectivity: "Wi-Fi, Zigbee, Z-Wave",
      compatibility: "Alexa, Google Assistant",
      warranty: "2 years"
    }
  },
  {
    id: 8,
    name: "Organic Face Cream",
    description: "Органический крем для лица с натуральными ингредиентами",
    price: 65,
    category: "Красота",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    rating: 4.6,
    reviewsCount: 312,
    inStock: true,
    tags: ["skincare", "organic", "face-cream", "natural"],
    specifications: {
      brand: "NaturalBeauty",
      volume: "50ml",
      skinType: "All types",
      ingredients: "Organic"
    }
  }
];

// Утилитарные функции для работы с данными
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (categoryName) => {
  return products.filter(product => product.category === categoryName);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getFilteredProducts = (filters = {}) => {
  let filtered = [...products];
  
  // Фильтр по категории
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  
  // Фильтр по цене
  if (filters.minPrice) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }
  
  // Фильтр по наличию
  if (filters.inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }
  
  // Фильтр по новинкам
  if (filters.newOnly) {
    filtered = filtered.filter(p => p.isNew);
  }
  
  // Фильтр по скидкам
  if (filters.saleOnly) {
    filtered = filtered.filter(p => p.isSale);
  }
  
  // Сортировка
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
  }
  
  return filtered;
};

// Mock API функции (имитируют асинхронные запросы)
export const mockAPI = {
  // Получить все продукты
  getProducts: (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getFilteredProducts(filters));
      }, 500); // Имитируем задержку сети
    });
  },
  
  // Получить продукт по ID
  getProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = getProductById(id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  },
  
  // Поиск продуктов
  searchProducts: (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(searchProducts(query));
      }, 400);
    });
  },
  
  // Получить категории
  getCategories: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categories);
      }, 200);
    });
  }
};