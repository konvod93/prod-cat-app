import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import {
  ShoppingCartIcon,
  CheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const renderStars = (rating) => {
  if (!rating) return null;
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  for (let i = 0; i < full; i++)
    stars.push(
      <span key={i} className="text-yellow-400">
        ★
      </span>,
    );
  if (half)
    stars.push(
      <span key="half" className="text-yellow-400">
        ☆
      </span>,
    );
  for (let i = 0; i < 5 - Math.ceil(rating); i++)
    stars.push(
      <span key={`e${i}`} className="text-gray-300">
        ★
      </span>,
    );
  return stars;
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, isLoading } = useProducts();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  const handleAddToCart = async () => {
    if (!product.inStock || isAddingToCart) return;
    setIsAddingToCart(true);
    await addToCart(product);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Товар не найден
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 hover:underline"
        >
          ← Вернуться к товарам
        </button>
      </div>
    );

  const productInCart = isInCart(product.id);
  const itemQuantity = getItemQuantity(product.id);
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Назад */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Назад
      </button>

      {/* Верхняя часть — фото слева, инфо справа */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Фото */}
        <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
          <img
            src={product.image || "https://placehold.co/600x600"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Инфо */}
        <div className="flex flex-col">
          {/* Категория */}
          <span className="text-sm text-blue-600 uppercase tracking-wide font-medium mb-2">
            {product.category}
          </span>

          {/* Название */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {product.name}
          </h1>

          {/* Краткое описание */}
          {product.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {product.description}
            </p>
          )}

          {/* Рейтинг */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviewsCount} отзывов)
              </span>
            </div>
          )}

          {/* Цена */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full font-medium">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Наличие */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="text-green-600 font-medium">✓ В наличии</span>
            ) : (
              <span className="text-red-500 font-medium">✗ Нет в наличии</span>
            )}
          </div>

          {/* Кнопка корзины */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
              !product.inStock
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : productInCart && !isAddingToCart
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : isAddingToCart
                    ? "bg-blue-400 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isAddingToCart ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Добавляем...
              </>
            ) : productInCart ? (
              <>
                <CheckIcon className="h-5 w-5" />В корзине ({itemQuantity})
              </>
            ) : (
              <>
                <ShoppingCartIcon className="h-5 w-5" />
                Добавить в корзину
              </>
            )}
          </button>

          {/* Теги */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Нижняя часть — описание и характеристики */}
      {(product.detailedDescription ||
        (product.specifications &&
          Object.keys(product.specifications).length > 0)) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Подробное описание */}
          {product.detailedDescription && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Описание
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {product.detailedDescription}
              </p>
            </div>
          )}

          {/* Характеристики */}
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Характеристики
                </h2>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <tr
                          key={key}
                          className="border-b border-gray-100 dark:border-gray-700"
                        >
                          <td className="py-2 pr-4 text-gray-500 dark:text-gray-400 w-1/2">
                            {key}
                          </td>
                          <td className="py-2 text-gray-800 dark:text-gray-200 font-medium">
                            {value}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
