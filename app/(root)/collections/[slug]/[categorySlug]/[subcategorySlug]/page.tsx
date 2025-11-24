/** @format */
/** @format */

import { Button } from "@/components/ui/button";
import CollectionHero from "@/components/ui/shared/product/CollectionHero";
import ProductCard from "@/components/ui/shared/product/product-card";
import SearchResultsSkeleton from "@/components/ui/shared/product/SearchResultsSkeleton";
import { getSingleSubCategoryBySlug } from "@/lib/actions/subcategory-action";
import { Product } from "@/types";
import Link from "next/link";
import { Suspense } from "react";

const CollectionPage = async (props: {
  params: Promise<{
    slug: string;
    categorySlug: string;
    subcategorySlug: string;
  }>;
}) => {
  const { slug, categorySlug, subcategorySlug } = await props.params;

  const category = await getSingleSubCategoryBySlug(
    slug,
    categorySlug,
    subcategorySlug
  );

  const data = category.data?.products ?? [];

  return (
    <>
      <CollectionHero
        category={category.data}
        products={category.data?.products || []}
      />
      <div className='wrapper'>
        <Suspense fallback={<SearchResultsSkeleton />}>
          {data?.length > 0 ? (
            <>
              <div className={`grid grid-cols-2 md:grid-cols-${4} gap-4`}>
                {data.map((product: Product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {/* {collection.totalPages > 1 && (
                <div className='mt-8'>
                  {collection.totalPages > 1 && (
                    <Pagination page={1} totalPages={collection.totalPages} />
                  )}
                </div>
              )} */}
            </>
          ) : (
            <div className='bg-white rounded-lg border p-8 text-center shadow-sm mb-2'>
              <div className='mx-auto max-w-md'>
                <h3 className='text-xl font-semibold mb-2'>
                  No products found
                </h3>
                <p className='text-muted-foreground mb-4'>
                  Try adjusting your search filters or search for something
                  else.
                </p>
                <Link href='/search'>
                  <Button>Clear all filters</Button>
                </Link>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </>
  );
};

export default CollectionPage;
