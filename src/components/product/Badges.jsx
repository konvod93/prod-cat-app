const Badges = ({ product, discount, productInCart, itemQuantity }) => {
  return (
    <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
      {product.isNew && (
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          NEW
        </span>
      )}
      {discount > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          -{discount}%
        </span>
      )}
      {!product.inStock && (
        <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          НЕТ В НАЛИЧИИ
        </span>
      )}
      {productInCart && (
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
          В КОРЗИНЕ ({itemQuantity})
        </span>
      )}
    </div>
  );
};

export default Badges;