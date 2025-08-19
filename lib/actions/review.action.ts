/** @format */

"use server";

import z from "zod";
import { insertReviewSchema } from "../vaildators";
import { FormatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function createUpdateReview(
  data: z.infer<typeof insertReviewSchema>
) {
  try {
    const session = await auth();

    if (!session) throw new Error("User is not loged in");

    const review = insertReviewSchema.parse({
      ...data,
      userId: session?.user?.id,
    });

    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });

    if (!product) throw new Error("Products does not exist");

    const reviewExists = await prisma.review.findFirst({
      where: {
        productId: review.productId,
        userId: review.userId,
      },
    });

    await prisma.$transaction(async (tx) => {
      if (reviewExists) {
        await tx.review.update({
          where: { id: reviewExists.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        await tx.review.create({
          data: review,
        });
      }

      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      const numReviews = await tx.review.count({
        where: { productId: review.productId },
      });

      await tx.product.update({
        where: {
          id: review.productId,
        },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews,
        },
      });
    });

    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: reviewExists
        ? "Review updated successfully"
        : "Review has been added",
    };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

export async function getReviews({ productId }: { productId: string }) {
  const data = await prisma.review.findMany({
    where: { productId: productId },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return { data };
}

export async function getReviewByProductId({
  productId,
}: {
  productId: string;
}) {
  const session = await auth();

  if (!session) throw new Error("Unauthorized User");

  return await prisma.review.findFirst({
    where: { productId: productId, userId: session?.user?.id },
  });
}
