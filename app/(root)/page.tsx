/** @format */

import ProductList from "@/components/ui/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.actions";

const HomePage = async () => {
  const products = await getLatestProducts();
  return (
    <>
      <ProductList data={products} title='New In' limit={3} />
    </>
  );
};

export default HomePage;
