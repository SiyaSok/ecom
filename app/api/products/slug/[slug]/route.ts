/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

// GET /api/products/slug/[slug]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { slug },
    include: {
      SubCategory: true,
      collection: { select: { name: true, slug: true } },
      category_: {
        select: {
          name: true,
          slug: true,
          subCategories: { select: { name: true, id: true, slug: true } },
        },
      },
    },
  });

  if (!product) {
    return NextResponse.json(
      { success: false, message: "Product not found!!" },
      { status: 404 },
    );
  }

  return NextResponse.json(product);
}
