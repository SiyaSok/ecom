/** @format */

import ProductForm from "@/components/admin/product-form";
import { getAllCollections } from "@/lib/actions/collection-action";
import { Collection } from "@/types";

const CreateProduct = async () => {
  const collections = await getAllCollections({});

  return (
    <div>
      <ProductForm
        type='Create'
        collections={collections?.data as Collection[]}
      />
    </div>
  );
};

export default CreateProduct;
