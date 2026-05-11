import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";

const WishlistTab = () => {
  const { addToCart } = useCart();
  const { items: wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Избранное</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-400 text-sm">Избранных товаров нет</p>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-blue-600 font-semibold">
                  {item.price.toLocaleString()} ₴
                </p>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="text-sm text-blue-600 hover:underline"
              >
                В корзину
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-sm text-red-400 hover:text-red-600"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default WishlistTab;
