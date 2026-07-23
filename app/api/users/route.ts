/** @format */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { PAGE_SIZE } from "@/lib/constants";
import { Prisma } from "@prisma/client";

// GET /api/users?query=&page=&limit=
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") ?? "all";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? PAGE_SIZE);

  const queryFilter: Prisma.UserWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.user.findMany({
    where: { ...queryFilter },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.user.count();

  return NextResponse.json({
    data,
    totalPages: Math.ceil(dataCount / limit),
  });
}
