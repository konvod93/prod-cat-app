import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import {
  ShoppingCartIcon,
  CheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import CartButton from "../components/CartButton";
import ProductPageInfo from "../components/ProductPageInfo";
import ProductTags from "../components/ProductTags";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, isLoading } = useProducts();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));  

  if (isLoading) {    
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
          <ProductPageInfo product={product} discount={discount} />
          {/* Кнопка корзины */}
          
          <CartButton
            product={product}            
            isAddingToCart={isAddingToCart}
            productInCart={productInCart}
            itemQuantity={itemQuantity}
            addToCart={addToCart}
            setIsAddingToCart={setIsAddingToCart}
          />

          {/* Теги */}
          <ProductTags product={product} />
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
