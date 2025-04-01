/** @format */

"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(products);
}

//get single product by slug

export async function getSingleProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug: slug } });
}
