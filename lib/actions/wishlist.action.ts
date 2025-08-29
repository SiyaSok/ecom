/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { FormatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";

export async function addRemoveFromWishlist(productSlug: string) {
  try {
    const session = await auth();
    if (!session) throw new Error("Please login first");

    if (!session.user?.id) {
      throw new Error("User not authenticated");
    }
    const user = await prisma.user.findUnique({
      where: { id: session.user?.id },
      include: { Wishlist: true },
    });

    let isBookmarked = user?.Wishlist?.some(
      (item) => item.productSlug === productSlug
    );

    let message;

    if (isBookmarked) {
      // Remove from wishlist
      await prisma.wishlist.deleteMany({
        where: {
          userId: session.user?.id,
          productSlug,
        },
      });

      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // Add to wishlist
      await prisma.wishlist.create({
        data: {
          userId: session.user.id, // guaranteed string now
          productSlug: productSlug, // must be a valid UUID (Product.id)
        },
      });

      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    revalidatePath(`/products/${productSlug}`);

    return { success: true, message, isBookmarked };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

async function checkBookmarkStatus(propertyId: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return { error: "User ID is required" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id },
    include: { Wishlist: true },
  });

  const isBookmarked = user?.Wishlist?.some(
    (item) => item.productSlug === propertyId
  );

  return { isBookmarked };
}

export default checkBookmarkStatus;
