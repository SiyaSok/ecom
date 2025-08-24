/** @format */

import ProductCard from "@/components/ui/shared/product/product-card";
import { getSingleCategoryBySlug } from "@/lib/actions/category-action";
import { Product } from "@/types";

const CollectionPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const category = await getSingleCategoryBySlug(slug);
  return (
    <div className='grid  grid-cols-1 gap-4 md:grid-cols-3'>
      {(category?.products.length ?? 0 > 0) ? (
        category?.products.map((product: Product) => (
          <ProductCard key={product.slug} product={product} />
        ))
      ) : (
        <div>
          <p>No product found</p>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
