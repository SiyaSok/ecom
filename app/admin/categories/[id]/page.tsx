/** @format */

import CategoryForm from "@/components/admin/category-form";
import { getSingleCategoryById } from "@/lib/actions/category-action";
import { getAllSubCategories } from "@/lib/actions/subcategory-action";
import { notFound } from "next/navigation";

const EditProductPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const category = await getSingleCategoryById(id);
  const SubCategory = await getAllSubCategories({});

  if (
    !category ||
    (typeof category === "object" &&
      ("success" in category || "message" in category))
  ) {
    return notFound();
  }

  return (
    <div className='space-y-4'>
      <CategoryForm
        type='Update'
        category={category}
        categoryId={id}
        subcategory={SubCategory.data}
      />
    </div>
  );
};

export default EditProductPage;
