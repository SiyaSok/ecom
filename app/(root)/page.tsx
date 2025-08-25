/** @format */

import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icon-boxes";
import ProductCarousel from "@/components/ui/shared/product/product-carousel";
import ProductList from "@/components/ui/shared/product/product-list";
import ViewAllProducts from "@/components/view-all-products";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/products.actions";

const HomePage = async () => {
  const products = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={products} title='New In' limit={4} />
      <ViewAllProducts />
      <DealCountdown />
      <IconBoxes />
    </>
  );
};

export default HomePage;
