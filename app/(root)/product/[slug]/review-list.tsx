/** @format */
"use client";

import { Review } from "@/types";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Rating from "@/components/ui/shared/product/rating";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      const res = await getReviews({ productId });
      setReviews(res.data);
    };

    loadReviews();
  }, [productId]);

  const reload = async () => {
    const res = await getReviews({ productId });
    setReviews([...res.data]);
  };

  return (
    <div className='space-y-4'>
      {reviews.length === 0 && <div> No reviews as yet.</div>}
      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          orReviewSubmitted={reload}
        />
      ) : (
        <div>
          Please
          <Link
            className='text-blue-700 px-2'
            href={`/sign-in?callbackUrl=/product/${productSlug}`}>
            sign In
          </Link>
          to write a review.
        </div>
      )}
      <div className='flex flex-col gap-3'>
        {reviews.map((i) => (
          <Card key={i.id}>
            <CardHeader>
              <div className='flex-between'>
                <CardTitle>{i.title}</CardTitle>
              </div>
              <CardDescription>{i.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex space-x-4 text-sm text-muted-foreground'>
                <Rating value={i.rating} />
                <div className='flex items-center'>
                  <User className='mr-1 h-3 w-3' />{" "}
                  {i.user ? i?.user.name : "User"}
                </div>
                <div className='flex items-center'>
                  <Calendar className='mr-1 h-3 w-3' />
                  {formatDateTime(i.createdAt).dateTime}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
