/** @format */

import {
  insertProductSchema,
  cartItemSchema,
  inssertCartSchema,
  ShippingAddressSchema,
} from "@/lib/vaildators";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Cart = z.infer<typeof inssertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
