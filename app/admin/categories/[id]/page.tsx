/** @format */

import CategoryForm from "@/components/admin/category-form";
import { getSingleCategoryById } from "@/lib/actions/category-action";
import { notFound } from "next/navigation";

const EditProductPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const category = await getSingleCategoryById(id);
  if (
    !category ||
    (typeof category === "object" &&
      ("success" in category || "message" in category))
  ) {
    return notFound();
  }

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h2 className='h2-bold'>Update Category</h2>
      <div className='mt-8'>
        <CategoryForm type='Update' category={category} categoryId={id} />
      </div>
    </div>
  );
};

export default EditProductPage;
