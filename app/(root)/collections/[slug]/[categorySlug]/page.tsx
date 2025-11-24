/** @format */

import ProductCard from "@/components/ui/shared/product/product-card";
import { getSingleCategoryBySlug } from "@/lib/actions/category-action";
import { Product } from "@/types";

const CollectionPage = async (props: {
  params: Promise<{ slug: string; categorySlug: string }>;
}) => {
  const { slug, categorySlug } = await props.params;
  const category = await getSingleCategoryBySlug(slug, categorySlug);

  return (
    <div className='wrapper'>
      <div className={`grid grid-cols-2 md:grid-cols-${4} gap-4`}>
        {(category?.data?.products ?? []).map((product: Product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
