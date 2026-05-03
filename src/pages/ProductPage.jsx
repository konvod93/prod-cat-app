import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import {
  ShoppingCartIcon,
  CheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import CartButton from "../components/productpage/CartButton";
import ProductPageInfo from "../components/productpage/ProductPageInfo";
import ProductTags from "../components/productpage/ProductTags";
import ProductPageButton from "../components/productpage/ProductPageButton";
import Badges from "../components/product/Badges";
import WhishlistButton from "../components/product/WhishlistButton";
import { productDiscount } from "../functions";
import ProductPageImage from "../components/productpage/ProductPageImage";
import DetailedDescription from "../components/productpage/DetailedDescription";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, isLoading: isProductsLoading } = useProducts();
  const { isInCart, getItemQuantity } = useCart();

  const product = products.find((p) => p.id === parseInt(id));
  const discount = productDiscount(product);

  if (isProductsLoading) {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Назад */}
      <ProductPageButton navigate={navigate} />

      {/* Верхняя часть — фото слева, инфо справа */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Фото */}
        <ProductPageImage
          product={product}
          discount={discount}
          productInCart={productInCart}
          itemQuantity={itemQuantity}
        />
        {/* Инфо */}
        <div className="flex flex-col">
          <ProductPageInfo product={product} discount={discount} />

          {/* Кнопка корзины */}
          <CartButton
            product={product}
            productInCart={productInCart}
            itemQuantity={itemQuantity}
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
          <DetailedDescription product={product} />
          
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
