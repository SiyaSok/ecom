/** @format */

import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

// GET /api/categories
export async function GET() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return NextResponse.json(data);
}
