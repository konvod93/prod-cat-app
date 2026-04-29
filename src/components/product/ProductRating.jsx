const renderStars = (rating) => {
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
      <span key={`e${i}`} className="text-gray-300 dark:text-gray-500">
        ★
      </span>,
    );
  return stars;
};

const ProductRating = ({ product }) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex">{renderStars(product.rating)}</div>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {product.rating} ({product.reviewsCount})
      </span>
    </div>
  );
};

export default ProductRating;