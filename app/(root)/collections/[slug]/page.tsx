/** @format */

import ProductList from "@/components/ui/shared/product/product-list";
import { getSingleCollectionBySlug } from "@/lib/actions/collection-action";

const CollectionPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const collection = await getSingleCollectionBySlug(slug);

  return (
    <ProductList
      data={collection?.data?.products ?? []}
      title={collection?.data?.name}
      productCount={collection.dataCount}
    />
  );
};

export default CollectionPage;
