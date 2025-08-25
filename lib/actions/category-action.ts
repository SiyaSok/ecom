/** @format */

"use server";

import { prisma } from "@/db/prisma";
import { FormatError } from "../utils";
import { insertCategorySchema, updateCategorySchema } from "../vaildators";
import { revalidatePath } from "next/cache";
import z from "zod";
import { PAGE_SIZE } from "../constants";

//create category
export async function createCategory(
  data: z.infer<typeof insertCategorySchema>
) {
  try {
    const category = insertCategorySchema.parse(data);

    await prisma.category.create({ data: category });

    revalidatePath("/adminn/categories");

    return { success: true, message: "A new category has been created..." };
  } catch (error) {
    console.log(FormatError(error));
    return { success: false, message: FormatError(error) };
  }
}

// update category

export async function updateCategory(
  data: z.infer<typeof updateCategorySchema>
) {
  try {
    const category = updateCategorySchema.parse(data);

    const existingCategory = await prisma.category.findFirst({
      where: { id: category.id },
    });

    if (!existingCategory) throw new Error("category not found!! ");

    await prisma.category.update({
      where: { id: category.id },
      data: category,
    });

    revalidatePath("/adminn/categories");

    return { success: true, message: "Category has been updated..." };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

// Get all categories
export async function getCategories({
  limit = PAGE_SIZE,
  // page,
  // query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const data = await prisma.category.findMany();

  const dataCount = await prisma.category.count({});

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

//get single category  by id
export async function getSingleCategoryById(slug: string) {
  return await prisma.category.findFirst({
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
}

//get single category  by id
export async function getSingleCategoryBySlug(slug: string, subSlug?: string) {
  const data = await prisma.category.findFirst({
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
