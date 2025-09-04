/** @format */

import CollectionForm from "@/components/admin/collection-form";
import { getCategories } from "@/lib/actions/category-action";
import { getSingleCollectiontById } from "@/lib/actions/collection-action";
import { notFound } from "next/navigation";

const EditCollectiontPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  const collection = await getSingleCollectiontById(id);
  const category = await getCategories({});

  if (
    !collection ||
    (typeof collection === "object" &&
      ("success" in collection || "message" in collection))
  ) {
    return notFound();
  }

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h2 className='h2-bold'>Update Collection</h2>
      <div className='mt-8'>
        <CollectionForm
          type='Update'
          collection={collection}
          collectionId={id}
          categories={category.data}
        />
      </div>
    </div>
  );
};

export default EditCollectiontPage;
