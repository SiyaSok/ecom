/** @format */

import CategoryForm from "@/components/admin/category-form";
import { getAllSubCategories } from "@/lib/actions/subcategory-action";

const CreateProduct = async () => {
  const SubCategory = await getAllSubCategories({});

  return (
    <>
      <CategoryForm type='Create' subcategory={SubCategory.data} />
    </>
  );
};

export default CreateProduct;
