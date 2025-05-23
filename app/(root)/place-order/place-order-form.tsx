/** @format */

"use client";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order.action";
import React from "react";
const PlaceOrderForm = () => {
  const router = useRouter();

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full'>
        {pending ? (
          <Loader className='h-4 w-4 animate-spin' />
        ) : (
          <Check className='h-4 w-4' />
        )}{" "}
        Place Order
      </Button>
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await createOrder();

    console.log(res);

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
