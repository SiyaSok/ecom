/** @format */

import ProductForm from "@/components/admin/product-form";
import { getAllCollections } from "@/lib/actions/collection-action";
import { getSingleProductById } from "@/lib/actions/products.actions";
import { notFound } from "next/navigation";

const EditProductPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  const { id } = await props.params;

  const product = await getSingleProductById(id);

  const collections = await getAllCollections({});

  if (
    !product ||
    (typeof product === "object" &&
      ("success" in product || "message" in product))
  ) {
    return notFound();
  }

  return (
    <ProductForm
      type='Update'
      product={product}
      productId={id}
      collections={collections.data}
    />
  );
};

export default EditProductPage;
