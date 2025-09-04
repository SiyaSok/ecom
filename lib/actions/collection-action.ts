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

    const { categoryIds, ...rest } = collection;

    await prisma.collection.create({
      data: {
        ...rest,
        categories: {
          connect: categoryIds?.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/adminn/collections");

    return { success: true, message: "A new collection has been created..." };
  } catch (error) {
    console.log(FormatError(error));
    return { success: false, message: FormatError(error) };
  }
}

// update products

export async function updateCollection(
  data: z.infer<typeof updateCollectionSchema>
) {
  try {
    const collection = updateCollectionSchema.parse(data);

    const existingProd = await prisma.collection.findFirst({
      where: { id: collection.id },
    });

    if (!existingProd) throw new Error("Product not found!! ");

    const { id, categoryIds, ...rest } = collection;

    await prisma.collection.update({
      where: { id },
      data: {
        ...rest,
        categories: {
          connect: categoryIds?.map((id) => ({ id })),
        },
      },
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
}) {
  const data = await prisma.collection.findMany({
    include: {
      categories: true,
    },
  });

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
      include: {
        categories: true,
      },
    });
    return convertToPlainObject(data);
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

//get single Collection By Slug
export async function getSingleCollectionBySlug(slug: string) {
  const data = await prisma.collection.findFirst({
    where: { slug: slug.toLowerCase() },
    include: {
      products: {
        include: {
          collection: {
            select: { name: true, slug: true },
          },
          category_: {
            select: { name: true, slug: true },
          },
        },
      },
    },
  });

  const dataCount = await prisma.product.count({
    where: {
      collection: {
        slug: slug,
      },
    },
  });

  return {
    data,
    dataCount,
  };
}
