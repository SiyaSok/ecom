/** @format */

import ProductCard from "@/components/ui/shared/product/product-card";
import { getSingleCategoryBySlug } from "@/lib/actions/category-action";
import { Product } from "@/types";

const CategoryPage = async (props: {
  params: Promise<{ slug: string; clothingSlug: string }>;
}) => {
  const { slug, clothingSlug } = await props.params;

  const collection = await getSingleCategoryBySlug(slug, clothingSlug);

  console.log(collection);

  return (
    <div className='grid  grid-cols-1 gap-4 md:grid-cols-3'>
      {(collection?.products.length ?? 0 > 0) ? (
        collection?.products.map((product: Product) => (
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

export default CategoryPage;
