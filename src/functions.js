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
