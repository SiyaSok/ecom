/** @format */

import CategoryForm from "@/components/admin/category-form";
import { getSubCategories } from "@/lib/actions/subcategory-action";

const CreateProduct = async () => {
  const SubCategory = await getSubCategories({});

  return (
    <>
      <h2 className='h2-bold'>Create Product</h2>
      <div className='mt-8'>
        <CategoryForm type='Create' subcategory={SubCategory.data} />
      </div>
    </>
  );
};

export default CreateProduct;
