/** @format */
"use client";

// import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { Loader, Heart } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
// import { addItemToCart } from "@/lib/actions/cart.action";
// import { useTransition } from "react";
const AddToWishList = (
  {
    // productId,
    // userId,
  }: {
    productId: string;
    userId: string | null;
  }
) => {
  // const router = useRouter();
  // const { toast } = useToast();
  // const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    // startTransition(async () => {
    //   const res = await addItemToCart(item);
    //   if (!res.success) {
    //     toast({
    //       variant: "destructive",
    //       description: res.message,
    //     });
    //   }
    //   toast({
    //     description: res.message,
    //     action: (
    //       <ToastAction
    //         className='bg-primary text-white hover:bg-gray-800'
    //         altText='GO TO CART'
    //         onClick={() => router.push("/cart")}>
    //         Cart
    //       </ToastAction>
    //     ),
    //   });
    // });
  };

  // const handleRemoveFromCart = async () => {
  //   startTransition(async () => {
  //     const res = await removeItemFromCart(item.productId);
  //     toast({
  //       variant: res.success ? "default" : "destructive",
  //       description: res.message,
  //     });
  //   });
  //   return;
  // };

  // const existItem =
  //   cart && cart.items.find((x) => x.productId === item.productId);
  // existItem ? (
  //   <div>
  //     <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
  //       {isPending ? (
  //         <Loader className='h-4 w-4 animate-spin' />
  //       ) : (
  //         <Minus className='h-4 w-4' />
  //       )}
  //     </Button>
  //     <span className='px-2'>{existItem.qty}</span>
  //     <Button type='button' variant='outline' onClick={handleAddToCart}>
  //       {isPending ? (
  //         <Loader className='h-4 w-4 animate-spin' />
  //       ) : (
  //         <Plus className='h-4 w-4' />
  //       )}
  //     </Button>
  //   </div>
  // ) :
  return (
    <Button
      variant='outline'
      className='w-full h-14'
      type='button'
      onClick={handleAddToCart}>
      {/* {isPending ? (
        <Loader className='h-4 w-4 animate-spin' />
      ) : (
        <Heart className='h-4 w-4' />
      )}{" "} */}
      ADD TO WISHLIST
    </Button>
  );
};

export default AddToWishList;
