/** @format */

import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icon-boxes";
import CategorytCarousel from "@/components/ui/shared/product/category-carousel";
import CollectionsImages from "@/components/ui/shared/product/collections-images";
import ProductCarousel from "@/components/ui/shared/product/product-carousel";
import ProductList from "@/components/ui/shared/product/product-list";
import ViewAllProducts from "@/components/view-all-products";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/products.actions";
import { getAllSubCategories } from "@/lib/actions/subcategory-action";

const HomePage = async () => {
  const products = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  const SubCategories = await getAllSubCategories({ limit: 10 });

  return (
    <>
      <CollectionsImages />
      <ProductList data={products} title='New In' limit={10} />
      <ViewAllProducts />
      <CategorytCarousel data={SubCategories.data} />
      <DealCountdown />
      <ProductCarousel data={featuredProducts} />
      <IconBoxes />
    </>
  );
};

export default HomePage;
