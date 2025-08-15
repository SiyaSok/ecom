/** @format */

import ProductForm from "@/components/admin/product-form";

const CreateProduct = () => {
  return (
    <>
      <h2 className='h2-bold'> Create Product</h2>
      <div className='mt-8'>
        <ProductForm type='Create' />
      </div>
    </>
  );
};

export default CreateProduct;
