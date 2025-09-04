/** @format */

"use server";

import { prisma } from "@/db/prisma";
import { FormatError } from "../utils";
import {
  insertSubCategorySchema,
  updateSubCategorySchema,
} from "../vaildators";
import { revalidatePath } from "next/cache";
import z from "zod";
import { PAGE_SIZE } from "../constants";

//create category
export async function createSubCategory(
  data: z.infer<typeof insertSubCategorySchema>
) {
  try {
    const category = insertSubCategorySchema.parse(data);

    await prisma.subCategory.create({ data: category });

    revalidatePath("/adminn/subcategories");

    return { success: true, message: "A new subcategory has been created..." };
  } catch (error) {
    console.log(FormatError(error));
    return { success: false, message: FormatError(error) };
  }
}

// update category

export async function updateSubCategory(
  data: z.infer<typeof updateSubCategorySchema>
) {
  try {
    const category = updateSubCategorySchema.parse(data);

    const existingCategory = await prisma.subCategory.findFirst({
      where: { id: category.id },
    });

    if (!existingCategory) throw new Error("category not found!! ");

    await prisma.subCategory.update({
      where: { id: category.id },
      data: category,
    });

    revalidatePath("/adminn/subcategories");

    return { success: true, message: "Subcategory has been updated..." };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

// Get all categories
export async function getSubCategories({
  limit = PAGE_SIZE,
}: {
  limit?: number;
}) {
  const data = await prisma.subCategory.findMany();

  const dataCount = await prisma.subCategory.count({});

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

//get single category  by id
export async function getSubSingleCategoryById(id: string) {
  return await prisma.subCategory.findFirst({
    where: { id: id.toLowerCase() },
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
}

//get single category  by id
export async function getSingleSubCategoryBySlug(
  slug: string,
  subSlug?: string
) {
  const data = await prisma.subCategory.findFirst({
    where: {
      slug: subSlug,
    },
    include: {
      products: {
        where: {
          collection: { slug: slug },
        },
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
      category_: {
        slug: subSlug,
      },
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
