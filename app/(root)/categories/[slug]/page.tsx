/** @format */

import ProductList from "@/components/ui/shared/product/product-list";
import { getSingleCategoryBySlug } from "@/lib/actions/category-action";

const CollectionPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const category = await getSingleCategoryBySlug(slug);
  return (
    <ProductList
      data={category?.data?.products ?? []}
      title={category?.data?.name}
      productCount={category.dataCount}
    />
  );
};

export default CollectionPage;
