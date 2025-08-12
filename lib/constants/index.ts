/** @format */

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Cool Store";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Cool Store";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_APP_SERVER_URL || "http://localhost:3000/";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];

export const DEFAULT_PAYMENT_METHODS =
  process.env.DEFAULT_PAYMENT_METHODS || "PayPal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;
