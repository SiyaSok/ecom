/** @format */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useTransition } from "react";
import checkBookmarkStatus, {
  addRemoveFromWishlist,
} from "@/lib/actions/wishlist.action";
import CredentialsSignInForm from "@/app/(auth)/sign-in/credentials-signin-form";

const AddToWishList = ({
  productSlug,
  userId,
  heart = false,
}: {
  productSlug: string;
  userId: string | null;
  heart?: boolean;
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Error: " + error,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkStatus();
  }, [productSlug, userId]);

  // Handle post-login wishlist intent
  useEffect(() => {
    const pendingSlug = localStorage.getItem("pendingWishlistSlug");
    if (userId && pendingSlug === productSlug) {
      addRemoveFromWishlist(pendingSlug).then((res) => {
        if (res.success) {
          setIsBookmarked(true);
          toast({ description: res.message });
        } else {
          toast({ variant: "destructive", description: res.message });
        }
        localStorage.removeItem("pendingWishlistSlug");
      });
    }
  }, [userId, productSlug]);

  const handleAddToWishList = async () => {
    startTransition(async () => {
      const res = await addRemoveFromWishlist(productSlug);
      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
        return;
      }

      setIsBookmarked((prev) => !prev);
      toast({ description: res.message });
    });
  };

  const handleUnauthenticatedClick = () => {
    localStorage.setItem("pendingWishlistSlug", productSlug);
  };

  if (!userId) {
    return (
      <Dialog
        onOpenChange={(open) => {
          if (!open) localStorage.removeItem("pendingWishlistSlug");
        }}>
        <DialogTrigger asChild>
          {heart ? (
            <Heart
              onClick={handleUnauthenticatedClick}
              className={`h-5 w-5 ${isBookmarked ? "fill-red-500  text-red-500" : ""} hover:fill-red-500 cursor-pointer`}
            />
          ) : (
            <Button
              variant='outline'
              className='w-full h-14 flex items-center justify-center gap-2 text-gray-400'
              type='button'
              onClick={handleUnauthenticatedClick}
              disabled={isLoading}>
              {isPending ? (
                <Loader className='h-4 w-4 animate-spin' />
              ) : (
                <Heart
                  className={`h-6 w-6 ${
                    isBookmarked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              )}
              {isBookmarked ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className='text-center'>
          <DialogHeader>
            <DialogTitle className='text-center'>
              <h2 className='h2-bold'>Hanger</h2>
              <p className='mb-5 mt-2'>
                Enter your email address and password to sign in to your
                account.
              </p>
            </DialogTitle>
            <DialogDescription>
              <CredentialsSignInForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return heart ? (
    <div
      className={`${isBookmarked ? "opacity-100" : "opacity-50"} bg-white rounded-md p-2 shadow-md flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity`}>
      <Heart
        onClick={handleAddToWishList}
        className={`h-4 w-4 ${isBookmarked ? "fill-red-500  text-red-500" : ""} hover:fill-red-500 cursor-pointer`}
      />
    </div>
  ) : (
    <Button
      variant='outline'
      className='w-full h-14 flex items-center justify-center gap-2 text-gray-400'
      type='button'
      onClick={handleAddToWishList}
      disabled={isLoading}>
      {isPending ? (
        <Loader className='h-4 w-4 animate-spin' />
      ) : (
        <Heart
          className={`h-4 w-4 ${
            isBookmarked ? "fill-red-500 text-red-500" : ""
          }`}
        />
      )}
      {isBookmarked ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
    </Button>
  );
};

export default AddToWishList;
