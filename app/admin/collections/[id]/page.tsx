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
    <CollectionForm
      type='Update'
      collection={collection}
      collectionId={id}
      categories={category.data}
    />
  );
};

export default EditCollectiontPage;
