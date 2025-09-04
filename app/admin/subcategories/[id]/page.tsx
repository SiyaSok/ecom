/** @format */

import SubCategoryForm from "@/components/admin/subcategory-form";
import { getSubSingleCategoryById } from "@/lib/actions/subcategory-action";
import { notFound } from "next/navigation";

const EditProductPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const category = await getSubSingleCategoryById(id);
  if (
    !category ||
    (typeof category === "object" &&
      ("success" in category || "message" in category))
  ) {
    return notFound();
  }

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h2 className='h2-bold'>Update SubCategory</h2>
      <div className='mt-8'>
        <SubCategoryForm type='Update' category={category} categoryId={id} />
      </div>
    </div>
  );
};

export default EditProductPage;
