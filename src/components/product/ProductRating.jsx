import RenderStars from "./RenderStars";

const ProductRating = ({ product }) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex"><RenderStars rating={product.rating} /></div>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {product.rating} ({product.reviewsCount} отзывов)
      </span>
    </div>
  );
};

export default ProductRating;