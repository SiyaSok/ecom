/** @format */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/db/prisma";
import { convertToPlainObject, FormatError } from "@/lib/utils";
import { updateProductSchema } from "@/lib/vaildators";

// GET /api/products/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const data = await prisma.product.findFirst({
      where: { id },
      include: {
        collection: { select: { name: true, slug: true } },
        category_: { select: { name: true, slug: true, subCategories: true } },
      },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Product not found!!" },
        { status: 404 },
      );
    }

    return NextResponse.json(convertToPlainObject(data));
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 500 },
    );
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const product = updateProductSchema.parse({ ...body, id });

    const existingProd = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!existingProd) {
      return NextResponse.json(
        { success: false, message: "Product not found!! " },
        { status: 404 },
      );
    }

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return NextResponse.json({
      success: true,
      message: "Product has been updated...",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 400 },
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const productExist = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExist) {
      return NextResponse.json(
        { success: false, message: "Product not found!!" },
        { status: 404 },
      );
    }

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");

    return NextResponse.json({
      success: true,
      message: "The Product has been deleted...",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 500 },
    );
  }
}
