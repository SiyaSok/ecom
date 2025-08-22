/** @format */

import ProductForm from "@/components/admin/product-form";
import { getCategories } from "@/lib/actions/category-action";
import { getAllCollections } from "@/lib/actions/collection-action";

const CreateProduct = async () => {
  const collections = await getAllCollections({
    page: Number(1),
    query: "1",
  });

  const categories = await getCategories({
    page: Number(1),
    query: "1",
  });

  return (
    <>
      <h2 className='h2-bold'> Create Product</h2>
      <div className='mt-8'>
        <ProductForm
          type='Create'
          categories={categories.data}
          collections={collections.data}
        />
      </div>
    </>
  );
};

export default CreateProduct;
