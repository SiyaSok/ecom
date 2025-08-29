/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { Loader, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useTransition } from "react";
import checkBookmarkStatus, {
  addRemoveFromWishlist,
} from "@/lib/actions/wishlist.action";

const AddToWishList = ({
  productSlug,
  userId,
}: {
  productSlug: string;
  userId: string | null;
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await checkBookmarkStatus(productSlug);
        // Assuming res looks like { success: true, isBookmarked: boolean }
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
    console.log("test");
    fetchBookmarkStatus();
  }, [productSlug, userId]);

  const handleAddToWishList = async () => {
    startTransition(async () => {
      const res = await addRemoveFromWishlist(productSlug);
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }

      setIsBookmarked((prev) => !prev); // flip state
      toast({
        description: res.message,
      });
    });
  };

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      className='w-full h-14 flex items-center justify-center gap-2'
      type='button'
      onClick={handleAddToWishList}
      disabled={isLoading}>
      {isPending ? (
        <Loader className='h-4 w-4 animate-spin' />
      ) : (
        <Heart
          className={`h-4 w-4 ${isBookmarked ? "fill-red-500 text-red-500" : ""}`}
        />
      )}
      {isBookmarked ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
    </Button>
  );
};

export default AddToWishList;
