/** @format */

import ProductForm from "@/components/admin/product-form";
import { getCategories } from "@/lib/actions/category-action";
import { getAllCollections } from "@/lib/actions/collection-action";
import { getSingleProductById } from "@/lib/actions/products.actions";
import { notFound } from "next/navigation";

const EditProductPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  const { id } = await props.params;

  const { page, query } = await props.searchParams;

  const product = await getSingleProductById(id);

  const collections = await getAllCollections({
    // page: Number(page),
    // query,
  });

  const categories = await getCategories({
    page: Number(page),
    query,
  });

  if (
    !product ||
    (typeof product === "object" &&
      ("success" in product || "message" in product))
  ) {
    return notFound();
  }

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h2 className='h2-bold'>Update Product</h2>
      <div className='mt-8'>
        <ProductForm
          type='Update'
          product={product}
          productId={id}
          collections={collections.data}
          categories={categories.data}
        />
      </div>
    </div>
  );
};

export default EditProductPage;
