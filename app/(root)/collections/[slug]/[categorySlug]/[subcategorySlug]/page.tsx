/** @format */
/** @format */

import ProductList from "@/components/ui/shared/product/product-list";
import { getSingleSubCategoryBySlug } from "@/lib/actions/subcategory-action";

const CollectionPage = async (props: {
  params: Promise<{
    slug: string;
    categorySlug: string;
    subcategorySlug: string;
  }>;
}) => {
  const { slug, categorySlug, subcategorySlug } = await props.params;
  console.log(subcategorySlug);

  const category = await getSingleSubCategoryBySlug(
    slug,
    categorySlug,
    subcategorySlug
  );

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
