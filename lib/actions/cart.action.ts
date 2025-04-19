/** @format */

"use server";
import { prisma } from "@/db/prisma";
import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { convertToPlainObject, FormatError, round2 } from "../utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { auth } from "@/auth";
import { cartItemSchema, insertCartSchema } from "../vaildators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

//Calculate cart Prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // check for the cart cookie

    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session not found");
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();

    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { slug: item.slug },
    });

    if (!product) throw new Error("Product doesn't exist!!");

    if (!cart) {
      // Create New cart Object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/products/${product.slug}`);
      return { success: true, message: `${product.name} Item added to cart` };
    } else {
      // check if item exist in the cart
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        //check stock and increase the quantity

        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }

        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) {
          throw new Error("Not enough stock");
        }
        cart.items.push(item);
      }
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });
      revalidatePath(`/products/${product.slug}`);
      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : " added to"
        } cart`,
      };
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: FormatError(error) };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;

  if (!sessionCartId) throw new Error("Cart session not found");

  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session not found");

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) throw new Error("Product doesn't exist!!");

    const cart = await getMyCart();

    if (!cart) throw new Error("Cart doesn't exist!!");

    const existItem = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );

    if (!existItem) throw new Error("Item doesn't exist!!");

    if (existItem.qty === 1) {
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== existItem.productId
      );
    } else {
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        existItem.qty - 1;
    }
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });
    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: `${product.name} ${
        existItem ? "updated in" : " deleted from"
      } cart`,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: FormatError(error) };
  }
}
