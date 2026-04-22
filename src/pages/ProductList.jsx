import Products from './Products';

// ProductList - это просто алиас для Products без поисковой панели
const ProductList = () => {
  return <Products showSearchBar={true} mode="all" />;
};

export default ProductList;