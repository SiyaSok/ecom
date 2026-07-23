/** @format */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { paymentMethodSchema } from "@/lib/vaildators";
import { FormatError } from "@/lib/utils";

// PUT /api/users/payment-method
// Body: { type }
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    const user = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!user) throw new Error("User not found!!");

    const body = await request.json();
    const paymentMethod = paymentMethodSchema.parse(body);

    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return NextResponse.json({
      success: true,
      message: "User payment method has been update successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 400 },
    );
  }
}
