/** @format */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Heart, Sparkles, Bookmark, User, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useTransition } from "react";
import checkBookmarkStatus, {
  addRemoveFromWishlist,
} from "@/lib/actions/wishlist.action";
import CredentialsSignInForm from "@/app/(auth)/sign-in/credentials-signin-form";
import { motion, AnimatePresence } from "framer-motion";

const AddToWishList = ({
  productSlug,
  userId,
  heart = false,
  className = "",
  variant = "default",
}: {
  productSlug: string;
  userId: string | null;
  heart?: boolean;
  className?: string;
  variant?: "default" | "icon" | "minimal";
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Fetch bookmark status
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchBookmarkStatus = async () => {
      try {
        const res = await checkBookmarkStatus(productSlug);
        setIsBookmarked(res?.isBookmarked ?? false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          description: "Failed to load wishlist status",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkStatus();
  }, [productSlug, userId, toast]);

  // Handle post-login wishlist intent
  useEffect(() => {
    const pendingSlug = localStorage.getItem("pendingWishlistSlug");
    if (userId && pendingSlug === productSlug) {
      addRemoveFromWishlist(pendingSlug).then((res) => {
        if (res.success) {
          setIsBookmarked(true);
          setIsAdded(true);
          toast({
            description: res.message,
            className: "bg-green-50 border-green-200 text-green-800",
          });
        } else {
          toast({ variant: "destructive", description: res.message });
        }
        localStorage.removeItem("pendingWishlistSlug");
      });
    }
  }, [userId, productSlug, toast]);

  // Reset added state after animation
  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => setIsAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const handleAddToWishList = async () => {
    startTransition(async () => {
      const res = await addRemoveFromWishlist(productSlug);
      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
        return;
      }

      setIsBookmarked((prev) => !prev);
      setIsAdded(true);
      toast({
        description: (
          <div className='flex items-center gap-3'>
            <div className='bg-green-100 p-1 rounded-full'>
              <Check className='h-4 w-4 text-green-600' />
            </div>
            <div>
              <p className='font-medium text-green-800'>
                {isBookmarked ? "Removed from wishlist" : "Added to wishlist!"}
              </p>
            </div>
          </div>
        ),
        className: isBookmarked
          ? "bg-blue-50 border-blue-200 text-blue-800"
          : "bg-green-50 border-green-200 text-green-800",
      });
    });
  };

  const handleUnauthenticatedClick = () => {
    localStorage.setItem("pendingWishlistSlug", productSlug);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    localStorage.removeItem("pendingWishlistSlug");
  };

  // Loading skeleton for heart variant
  if (isLoading && heart) {
    return (
      <div className='bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200'>
        <Loader className='h-4 w-4 animate-spin text-gray-400' />
      </div>
    );
  }

  // Unauthenticated user - Show login dialog
  if (!userId) {
    return (
      <>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {heart || variant === "icon" ? (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='cursor-pointer'>
              <div
                className={`bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ${className}`}
                onClick={handleUnauthenticatedClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={isHovered ? "hover" : "normal"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    {isHovered ? (
                      <Heart className='h-4 w-4 text-pink-500' />
                    ) : (
                      <Bookmark className='h-4 w-4 text-gray-600' />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <Button
              variant='outline'
              className={`w-full h-14 flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 ${className}`}
              type='button'
              onClick={handleUnauthenticatedClick}>
              <User className='h-5 w-5 text-gray-500' />
              <span className='text-gray-700 font-medium'>Sign In to Save</span>
            </Button>
          )}

          <DialogContent className='sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl'>
            <DialogHeader className='space-y-6'>
              <div className='text-center space-y-3'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='mx-auto bg-gradient-to-r from-pink-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center'>
                  <Sparkles className='h-8 w-8 text-white' />
                </motion.div>
                <DialogTitle className='text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                  Save Your Favorites
                </DialogTitle>
                <DialogDescription className='text-gray-600 text-base'>
                  Sign in to add this item to your wishlist and never lose track
                  of what you love.
                </DialogDescription>
              </div>

              <div className='space-y-4'>
                <CredentialsSignInForm />
                <div className='text-center'>
                  <Button
                    variant='ghost'
                    onClick={handleDialogClose}
                    className='text-gray-500 hover:text-gray-700'>
                    Maybe later
                  </Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Authenticated user - Show wishlist functionality
  if (heart || variant === "icon") {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='cursor-pointer'>
        <div
          className={`bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border transition-all duration-300 relative overflow-hidden ${
            isBookmarked
              ? "bg-red-50 border-red-200 shadow-red-200/50"
              : "bg-white border-gray-200 hover:shadow-xl"
          } ${className}`}
          onClick={handleAddToWishList}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          {/* Animated background effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />

          {isPending ? (
            <Loader className='h-4 w-4 animate-spin text-gray-400 relative z-10' />
          ) : (
            <AnimatePresence mode='wait'>
              {isAdded ? (
                <motion.div
                  key='added'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className='relative z-10'>
                  <Check className='h-4 w-4 text-green-600' />
                </motion.div>
              ) : (
                <motion.div
                  key={isBookmarked ? "bookmarked" : "not-bookmarked"}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='relative z-10'>
                  <Heart
                    className={`h-4 w-4 transition-colors duration-300 ${
                      isBookmarked
                        ? "fill-red-500 text-red-500"
                        : isHovered
                          ? "text-pink-500"
                          : "text-gray-600"
                    }`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}

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
                      x: Math.cos((i * 120 * Math.PI) / 180) * 30,
                      y: Math.sin((i * 120 * Math.PI) / 180) * 30,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                    }}
                    className='absolute text-pink-400 z-20'>
                    <Sparkles className='h-2 w-2' />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // Default button variant
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        variant={isBookmarked ? "default" : "outline"}
        className={`h-14 flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group ${
          isBookmarked
            ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/25"
            : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-lg text-gray-700"
        } ${className}`}
        type='button'
        onClick={handleAddToWishList}
        disabled={isPending}>
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
                <span className='font-semibold'>
                  {isBookmarked ? "Removed!" : "Added to Wishlist!"}
                </span>
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
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}>
                  <Heart
                    className={`h-5 w-5 ${
                      isBookmarked ? "fill-white" : "fill-current"
                    }`}
                  />
                </motion.div>
                <span className='font-medium'>
                  {isBookmarked ? "Saved to Wishlist" : "Add to Wishlist"}
                </span>
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
                  className='absolute text-pink-300 z-20'>
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

export default AddToWishList;
