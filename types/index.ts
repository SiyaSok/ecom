/** @format */

import {
  insertProductSchema,
  cartItemSchema,
  inssertCartSchema,
  ShippingAddressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
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
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitemms: OrderItem[];
  user: {
    name: string;
    email: string;
  };
};
