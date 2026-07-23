/** @format */

import { NextResponse } from "next/server";
import { signOut } from "@/auth";

// POST /api/auth/sign-out
export async function POST() {
  // get current users cart and delete it so it does not persist to next user
  // const currentCart = await getMyCart();
  // await prisma.cart.delete({ where: { id: currentCart?.id } });

  await signOut({ redirect: false });

  return NextResponse.json({ success: true, message: "Signed out" });
}
