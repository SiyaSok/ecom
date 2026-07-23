/** @format */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { FormatError } from "@/lib/utils";

// PUT /api/users/profile
// Body: { name, email }
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User not found!!");

    const body = await request.json();
    const user: { name: string; email: string } = body;

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { name: user.name },
    });

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
