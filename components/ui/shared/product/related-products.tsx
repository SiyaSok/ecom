/** @format */

import { getSingleCategoryBySlug } from "@/lib/actions/category-action";

import ProductList from "./product-list";

// ✅ Make it a Server Component
const RelatedProducts = async ({
  categorySlug,
  collectionSlug,
}: {
  collectionSlug: string;
  categorySlug: string;
}) => {
  const category = await getSingleCategoryBySlug(
    collectionSlug,
    categorySlug,
    8
  );

  return (
    <ProductList
      data={category?.data?.products ?? []}
      title='Related Products'
      limit={8}
    />
  );
};

export default RelatedProducts;
