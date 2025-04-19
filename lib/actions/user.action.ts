/** @format */

"use server";

import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
} from "../vaildators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { FormatError } from "../utils";
import { ShippingAddress } from "@/types";
import { z } from "zod";
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: FormatError(error) };
  }
}

export async function signOutUser() {
  await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
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
    });

    return { success: true, message: "User signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: FormatError(error) };
  }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) throw new Error("User not found!!");

  return user;
}

// update user Adddress
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const user = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!user) throw new Error("User not found!!");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { address },
    });

    return { success: true, message: "User has been update successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: FormatError(error) };
  }
}

// update user payment method

export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();

    const user = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!user) throw new Error("User not found!!");

    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { paymentMethod: paymentMethod.type },
    });
    return {
      success: true,
      message: "User payment method has been update successfully",
    };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}
