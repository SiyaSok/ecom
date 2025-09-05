/** @format */

import ProductList from "@/components/ui/shared/product/product-list";
import { getSingleCategoryBySlug } from "@/lib/actions/category-action";

const CategoryPage = async (props: {
  params: Promise<{ slug: string; clothingSlug: string }>;
}) => {
  const { slug, clothingSlug } = await props.params;

  const collection = await getSingleCategoryBySlug(slug, clothingSlug);

  return (
    <ProductList
      data={(collection?.data?.products ?? []).map((product) => ({
        ...product,
        subCategoryId: product.subCategoryId ?? "",
      }))}
      title={collection?.data?.name}
      productCount={collection.dataCount}
    />
  );
};

export default CategoryPage;
