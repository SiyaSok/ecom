/** @format */

import CategoryForm from "@/components/admin/category-form";

const CreateProduct = () => {
  return (
    <>
      <h2 className='h2-bold'> Create Product</h2>
      <div className='mt-8'>
        <CategoryForm type='Create' />
      </div>
    </>
  );
};

export default CreateProduct;
