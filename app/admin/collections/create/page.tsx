/** @format */

import CollectionForm from "@/components/admin/collection-form";

const CreateProduct = () => {
  return (
    <>
      <h2 className='h2-bold'>Create Collection</h2>
      <div className='mt-8'>
        <CollectionForm type='Create' />
      </div>
    </>
  );
};

export default CreateProduct;
