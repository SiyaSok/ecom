/** @format */

"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, FormatError } from "../utils";
import { insertCollectionSchema, updateCollectionSchema } from "../vaildators";
import { revalidatePath } from "next/cache";
import z from "zod";
import { PAGE_SIZE } from "../constants";

//create Collection
//create product
export async function createCollection(
  data: z.infer<typeof insertCollectionSchema>
) {
  try {
    const collection = insertCollectionSchema.parse(data);

    console.log(collection);

    await prisma.collection.create({ data: collection });

    revalidatePath("/adminn/collections");

    return { success: true, message: "A new collection has been created..." };
  } catch (error) {
    console.log(FormatError(error));
    return { success: false, message: FormatError(error) };
  }
}

// update products

export async function updateeCollection(
  data: z.infer<typeof updateCollectionSchema>
) {
  try {
    const collection = updateCollectionSchema.parse(data);

    const existingProd = await prisma.collection.findFirst({
      where: { id: collection.id },
    });

    if (!existingProd) throw new Error("Product not found!! ");

    await prisma.collection.update({
      where: { id: collection.id },
      data: collection,
    });

    revalidatePath("/adminn/products");

    return { success: true, message: "Collection has been updated..." };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

// Get all categories
export async function getAllCollections({
  limit = PAGE_SIZE,
  // page,
  // query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const data = await prisma.collection.findMany();

  const dataCount = await prisma.collection.count({});

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

//get single collection  by id
export async function getSingleCollectiontById(id: string) {
  try {
    const data = await prisma.collection.findFirst({
      where: { id: id },
    });
    return convertToPlainObject(data);
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

// export async function updateeProducts(
//   data: z.infer<typeof insertCollectionSchema>
// ) {
//   try {
//     const collection = insertCollectionSchema.parse(data);

//     const existingProd = await prisma.collection.findFirst({
//       where: { name: collection.name },
//     });

//     if (!existingProd) throw new Error("Product not found!! ");

//     await prisma.product.update({
//       where: { id: product.id },
//       data: product,
//     });

//     revalidatePath("/adminn/products");

//     return { success: true, message: "Product has been updated..." };
//   } catch (error) {
//     return { success: false, message: FormatError(error) };
//   }
// }
