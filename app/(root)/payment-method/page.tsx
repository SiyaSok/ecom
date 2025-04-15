/** @format */
import { Metadata } from "next";
import PaymentMethodForm from "./payment-method-form";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.action";
import CheckoutSteps from "@/components/ui/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");
  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
