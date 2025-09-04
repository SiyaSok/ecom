/** @format */

import SubCategoryForm from "@/components/admin/subcategory-form";

const CreateProduct = () => {
  return (
    <>
      <h2 className='h2-bold'> Create SubCategory</h2>
      <div className='mt-8'>
        <SubCategoryForm type='Create' />
      </div>
    </>
  );
};

export default CreateProduct;
