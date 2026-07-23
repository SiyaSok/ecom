/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { signInFormSchema } from "@/lib/vaildators";
import { FormatError } from "@/lib/utils";
import { compareSync } from "bcrypt-ts-edge";
import jwt from "jsonwebtoken";

// POST /api/auth/sign-in
// Body: { email, password }
// Returns: { success, token, user, message }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const credentials = signInFormSchema.parse({
      email: body.email,
      password: body.password,
    });

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    console.log("User found:", user); // Debugging line

    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Verify password
    const isValidPassword = compareSync(credentials.password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 },
      );
    }

    console.log("Valid password for user:", user.id); // Debugging line

    // Create JWT token
    const token = jwt.sign(
      {
        sub: user.id,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: "30d" },
    );

    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    console.log("Response prepared for user:", response); // Debugging line

    // Also set httpOnly cookie for browser clients (optional)
    response.cookies.set("authjs.session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: FormatError(error) },
      { status: 401 },
    );
  }
}
