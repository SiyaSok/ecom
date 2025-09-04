/** @format */

import CollectionForm from "@/components/admin/collection-form";
import { getCategories } from "@/lib/actions/category-action";

const CreateProduct = async () => {
  const category = await getCategories({});

  return (
    <>
      <h2 className='h2-bold'>Create Collection</h2>
      <div className='mt-8'>
        <CollectionForm type='Create' categories={category.data} />
      </div>
    </>
  );
};

export default CreateProduct;
