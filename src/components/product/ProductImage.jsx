const ProductImage = ({ product, imageLoaded, setImageLoaded }) => {
  return (
    <img
      src={product.image}
      alt={product.name}
      onLoad={() => setImageLoaded(true)}
      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
        imageLoaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default ProductImage;
