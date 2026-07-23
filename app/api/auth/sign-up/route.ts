/** @format */

import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts-edge";
import { signIn } from "@/auth";
import { prisma } from "@/db/prisma";
import { signUpFormSchema } from "@/lib/vaildators";
import { FormatError } from "@/lib/utils";

// POST /api/auth/sign-up
// Body: { name, email, password, confirmPassword }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const user = signUpFormSchema.parse({
      name: body.name,
      email: body.email,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
      redirect: false,
    });

    return NextResponse.json({
      success: true,
      message: "User signed in successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 400 },
    );
  }
}
