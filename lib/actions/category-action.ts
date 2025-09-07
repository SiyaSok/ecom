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

    console.log(category);

    const { subcategoryIds, ...rest } = category;

    await prisma.category.create({
      data: {
        ...rest,
        subCategories: {
          connect: subcategoryIds?.map((id) => ({ id })),
        },
      },
    });

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
    const { subcategoryIds, ...rest } = category;

    const existingCategory = await prisma.category.findFirst({
      where: { id: category.id },
    });

    if (!existingCategory) throw new Error("category not found!! ");

    await prisma.category.update({
      where: { id: category.id },
      data: {
        ...rest,
        subCategories: {
          connect: subcategoryIds?.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/adminn/categories");

    return { success: true, message: "Category has been updated..." };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

// Get all categories
export async function getCategories({ limit = PAGE_SIZE }: { limit?: number }) {
  const data = await prisma.category.findMany({
    include: {
      subCategories: true,
    },
  });

  const dataCount = await prisma.category.count({});

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

//get single category  by id
export async function getSingleCategoryById(id: string) {
  return await prisma.category.findFirst({
    where: { id: id.toLowerCase() },
    include: {
      subCategories: true,
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
export async function getSingleCategoryBySlug(
  slug: string,
  categorySlug?: string
) {
  const data = await prisma.category.findFirst({
    where: {
      slug: categorySlug,
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
        slug: categorySlug,
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
