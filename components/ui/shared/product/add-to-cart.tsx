/** @format */
"use client";

import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart } from "@/lib/actions/cart.action";
const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
    }

    toast({
      description: res.message,
      action: (
        <ToastAction
          className='bg-primary text-white hover:bg-gray-800'
          altText='GO TO CART'
          onClick={() => router.push("/cart")}>
          Cart
        </ToastAction>
      ),
    });
  };

  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
