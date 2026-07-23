/** @format */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/db/prisma";
import { updateUserSchema } from "@/lib/vaildators";
import { FormatError } from "@/lib/utils";

// GET /api/users/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const user = await prisma.user.findFirst({
    where: { id },
    include: {
      Wishlist: {
        include: { product: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found!!" },
      { status: 404 },
    );
  }

  return NextResponse.json(user);
}

// PUT /api/users/[id]
// Body: { name, role }
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const user = updateUserSchema.parse({ ...body, id });

    const currentUser = await prisma.user.findFirst({
      where: { id: user.id },
    });

    if (!currentUser) throw new Error("User not found!!");

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { name: user.name, role: user.role },
    });

    revalidatePath("/admin/users");

    return NextResponse.json({
      success: true,
      message: "User Profile has been update successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 400 },
    );
  }
}

// DELETE /api/users/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/users");

    return NextResponse.json({
      success: true,
      message: "The User has been deleted...",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 500 },
    );
  }
}
