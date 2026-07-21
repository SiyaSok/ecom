/** @format */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/db/prisma";
import { FormatError } from "@/lib/utils";
import { PAGE_SIZE } from "@/lib/constants";
import { insertProductSchema } from "@/lib/vaildators";
import { Prisma } from "@prisma/client";

// GET /api/products?query=&category=&price=&sort=&rating=&page=&limit=
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query") ?? "all";
    const category = searchParams.get("category") ?? "all";
    const price = searchParams.get("price") ?? "all";
    const sort = searchParams.get("sort") ?? undefined;
    const rating = searchParams.get("rating") ?? "all";
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? PAGE_SIZE);

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

    // Price filter
    const priceFilter: Prisma.ProductWhereInput =
      price && price !== "all"
        ? {
            price: {
              gte: Number(price.split("-")[0]),
              lte: Number(price.split("-")[1]),
            },
          }
        : {};

    // Rating filter
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
        category_: { select: { name: true, slug: true, subCategories: true } },
        collection: { select: { name: true, slug: true } },
      },
    });

    const dataCount = await prisma.product.count({});

    return NextResponse.json({
      data,
      totalPages: Math.ceil(dataCount / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 500 },
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = insertProductSchema.parse(body);

    await prisma.product.create({ data: product });

    revalidatePath("/admin/products");

    return NextResponse.json(
      { success: true, message: "A new product has been created..." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 400 },
    );
  }
}
