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
    <div className='space-y-8 mx-auto'>
      <div>
        <SubCategoryForm type='Update' category={category} categoryId={id} />
      </div>
    </div>
  );
};

export default EditProductPage;
