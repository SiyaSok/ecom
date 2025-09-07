/** @format */

import ProductList from "@/components/ui/shared/product/product-list";
import { getSingleCategoryBySlug } from "@/lib/actions/category-action";

const CollectionPage = async (props: {
  params: Promise<{ slug: string; categorySlug: string }>;
}) => {
  const { slug, categorySlug } = await props.params;
  const category = await getSingleCategoryBySlug(slug, categorySlug);

  return (
    <ProductList
      data={(category?.data?.products ?? []).map((product) => ({
        ...product,
        subCategoryId: product.subCategoryId ?? "",
      }))}
      title={category?.data?.name}
      productCount={category.dataCount}
    />
  );
};

export default CollectionPage;
