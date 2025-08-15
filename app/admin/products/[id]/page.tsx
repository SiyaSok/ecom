/** @format */

import ProductForm from "@/components/admin/product-form";
import { getSingleProductById } from "@/lib/actions/products.actions";
import { notFound } from "next/navigation";

const EditProductPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const product = await getSingleProductById(id);
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
        <ProductForm type='Update' product={product} productId={id} />
      </div>
    </div>
  );
};

export default EditProductPage;
