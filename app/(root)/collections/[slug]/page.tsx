/** @format */

import ProductCard from "@/components/ui/shared/product/product-card";
import { getSingleCollectionBySlug } from "@/lib/actions/collection-action";
import { Product } from "@/types";

const CollectionPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const collection = await getSingleCollectionBySlug(slug);
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

export default CollectionPage;
