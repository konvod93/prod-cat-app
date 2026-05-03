import Badges from "../product/Badges";
import WhishlistButton from "../product/WhishlistButton";

const ProductPageImage = ({ product, itemQuantity, productInCart }) => {
    return (
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
          <Badges
            product={product}            
            itemQuantity={itemQuantity}
            productInCart={productInCart}            
          />
          <WhishlistButton product={product} />
          <img
            src={product.image || "https://placehold.co/600x600"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

    )
}

export default ProductPageImage