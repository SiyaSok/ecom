/** @format */

"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject, FormatError } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
import z from "zod";
import { insertProductSchema, updateProductSchema } from "../vaildators";
import { Prisma } from "@prisma/client";

export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(products);
}

//get single product by slug

export async function getSingleProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
    include: {
      Category: { select: { name: true } },
      Collection: { select: { name: true } },
    },
  });
}

//get single product by id

export async function getSingleProductById(id: string) {
  try {
    const data = await prisma.product.findFirst({
      where: { id: id },
      include: {
        Category: { select: { name: true } },
        Collection: { select: { name: true } },
      },
    });
    return convertToPlainObject(data);
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

//get all products

export async function getAllProducts({
  limit = PAGE_SIZE,
  page,
  category,
  query,
  price,
  sort,
  rating,
}: {
  limit?: number;
  page: number;
  category?: string;
  query: string;
  price?: string;
  sort?: string;
  rating?: string;
}) {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  // Category filter
  const categoryFilter = category && category !== "all" ? { category } : {};

  // Price  filter
  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  // Rating  filter
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            gte: Number(rating.split("-")[0]),
          },
        }
      : {};

  const data = await prisma.product.findMany({
    where: {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    },
    orderBy:
      sort === "lowest"
        ? { price: "asc" }
        : sort === "hightest"
          ? { price: "desc" }
          : sort === "rating"
            ? { rating: "desc" }
            : { createdAt: "asc" },
    take: limit,
    skip: (page - 1) * limit,
    include: {
      Category: { select: { name: true } },
      Collection: { select: { name: true } },
    },
  });

  const dataCount = await prisma.product.count({});

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

//get all products
export async function deleteProduct(productId: string) {
  try {
    const productExist = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!productExist) throw new Error("Product not found!!");

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "The Product has been deleted...",
    };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

//create product
export async function createProducts(
  data: z.infer<typeof insertProductSchema>
) {
  try {
    const product = insertProductSchema.parse(data);

    await prisma.product.create({ data: product });

    revalidatePath("/adminn/products");

    return { success: true, message: "A new product has been created..." };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

// update products

export async function updateeProducts(
  data: z.infer<typeof updateProductSchema>
) {
  try {
    const product = updateProductSchema.parse(data);

    const existingProd = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!existingProd) throw new Error("Product not found!! ");

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/adminn/products");

    return { success: true, message: "Product has been updated..." };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

// Get all Categories
// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return convertToPlainObject(data);
}
