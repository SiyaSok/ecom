/** @format */

import { generateAccessToken, paypal } from "../lib/paypal";

// Test to generate access token from paypal

test("generates token from pay paypal", async () => {
  const tokenRespone = await generateAccessToken();

  console.log(tokenRespone);

  expect(typeof tokenRespone).toBe("string");
  expect(tokenRespone.length).toBeGreaterThan(0);
});

// Test to create a paypal order

test("creates a paypal order", async () => {
  const tokenRespone = await generateAccessToken();

  console.log(tokenRespone);

  const price = 10.0;

  const orderRespone = await paypal.createOrder(price);
  console.log(orderRespone);

  expect(orderRespone).toHaveProperty("id");
  expect(orderRespone).toHaveProperty("status");
  expect(orderRespone.status).toBe("CREATED");
});

// Test to capture payment with mock order

test("simulate capturing a payment from an order", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const captureRespone = await paypal.capturePayment(orderId);
  expect(captureRespone).toHaveProperty("status", "COMPLETED");

  mockCapturePayment.mockRestore();
});
