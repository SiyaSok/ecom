/** @format */

import CollectionForm from "@/components/admin/collection-form";
import { getCategories } from "@/lib/actions/category-action";

const CreateProduct = async () => {
  const category = await getCategories({});

  return (
    <>
      <CollectionForm type='Create' categories={category.data} />
    </>
  );
};

export default CreateProduct;
