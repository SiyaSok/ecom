/** @format */
"use client";

import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Loader, ShoppingBag, Check, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart } from "@/lib/actions/cart.action";
import { useTransition, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddToCart = ({
  cart,
  item,
  className = "",
  variant = "default",
  showQuantity = false,
}: {
  cart?: Cart;
  item: CartItem;
  className?: string;
  variant?: "default" | "icon" | "minimal";
  showQuantity?: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const existingItem = cart?.items.find((x) => x.productId === item.productId);
  const currentQuantity = existingItem?.qty || 0;

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
          className: "border-red-200 bg-red-50 text-red-800",
        });
        return;
      }

      setIsAdded(true);
      toast({
        description: (
          <div className='flex items-center gap-3'>
            <div className='bg-green-100 p-1 rounded-full'>
              <Check className='h-4 w-4 text-green-600' />
            </div>
            <div>
              <p className='font-medium text-green-800'>Added to cart!</p>
              <p className='text-sm text-green-600'>{item.name}</p>
            </div>
          </div>
        ),
        action: (
          <ToastAction
            className='bg-green-600 text-white hover:bg-green-700 transition-colors'
            altText='VIEW CART'
            onClick={() => router.push("/cart")}>
            View Cart
          </ToastAction>
        ),
        className: "border-green-200 bg-green-50",
      });
    });
  };

  // Icon variant - compact for product cards
  if (variant === "icon") {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='relative'>
        <Button
          size='icon'
          className={`h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
          onClick={handleAddToCart}
          disabled={isPending}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <AnimatePresence mode='wait'>
            {isPending ? (
              <motion.div
                key='loading'
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}>
                <Loader className='h-4 w-4 animate-spin' />
              </motion.div>
            ) : isAdded ? (
              <motion.div
                key='added'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className='text-white'>
                <Check className='h-4 w-4' />
              </motion.div>
            ) : (
              <motion.div
                key='plus'
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}>
                <ShoppingBag className='h-4 w-4' />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Quantity badge */}
        {showQuantity && currentQuantity > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white shadow-lg'>
            {currentQuantity}
          </motion.div>
        )}
      </motion.div>
    );
  }

  // Minimal variant - for tight spaces
  if (variant === "minimal") {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          size='sm'
          className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ${className}`}
          onClick={handleAddToCart}
          disabled={isPending}>
          {isPending ? (
            <Loader className='h-4 w-4 animate-spin mr-2' />
          ) : isAdded ? (
            <Check className='h-4 w-4 mr-2' />
          ) : (
            <Plus className='h-4 w-4 mr-2' />
          )}
          {isAdded ? "Added" : "Add to Cart"}
        </Button>
      </motion.div>
    );
  }

  // Default variant - full featured
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className='w-full'>
      <Button
        className={`w-full h-14 relative overflow-hidden group transition-all duration-500 ${
          isAdded
            ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
        } ${className}`}
        onClick={handleAddToCart}
        disabled={isPending}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Animated background effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />

        <div className='relative z-10 flex items-center justify-center gap-3'>
          <AnimatePresence mode='wait'>
            {isPending ? (
              <motion.div
                key='loading'
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <Loader className='h-5 w-5 animate-spin' />
              </motion.div>
            ) : isAdded ? (
              <motion.div
                key='added'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className='flex items-center gap-2'>
                <Check className='h-5 w-5' />
                <span className='font-semibold'>Added to Cart!</span>
              </motion.div>
            ) : (
              <motion.div
                key='default'
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='flex items-center gap-2'>
                <motion.div
                  animate={{
                    rotate: isHovered ? 180 : 0,
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}>
                  <ShoppingBag className='h-5 w-5' />
                </motion.div>
                <span className='font-semibold'>ADD TO CART</span>
                {currentQuantity > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='bg-white/20 px-2 py-1 rounded-full text-xs font-bold'>
                    {currentQuantity} in cart
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sparkle effect on success */}
        <AnimatePresence>
          {isAdded && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos((i * 120 * Math.PI) / 180) * 50,
                    y: Math.sin((i * 120 * Math.PI) / 180) * 50,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                  }}
                  className='absolute text-yellow-300'>
                  <Sparkles className='h-3 w-3' />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

export default AddToCart;
