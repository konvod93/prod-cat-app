// Вынесем функцию обработки добавления в корзину в отдельный файл, чтобы не загромождать компонент CartButton

export const handleAddToCart = async (
  product,
  isAddingToCart,
  setIsAddingToCart,
  addToCart,
) => {
  if (!product.inStock || isAddingToCart) return;
  setIsAddingToCart(true);
  await addToCart(product);
  setTimeout(() => setIsAddingToCart(false), 1000);
};

// Вынесем функцию расчета скидки в отдельный файл, чтобы не загромождать компоненты и страницы, где она используется

export const productDiscount = (product) => {
  if (!product) return 0;
  return product.originalPrice && product.originalPrice > product.price
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;
};

// Вынесем функцию форматирования цены в отдельный файл, чтобы не дублировать код в разных компонентах
export const formatProductPrice = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "UAH",
  }).format(price);
};
