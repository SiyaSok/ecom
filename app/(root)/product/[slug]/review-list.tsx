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
import {
  Calendar,
  User,
  Star,
  MessageSquare,
  ThumbsUp,
  Award,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Rating from "@/components/ui/shared/product/rating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

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
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    average: 0,
    total: 0,
    distribution: [0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const res = await getReviews({ productId });
        setReviews(res.data);
        calculateStats(res.data);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [productId]);

  const calculateStats = (reviewsData: Review[]) => {
    if (reviewsData.length === 0) return;

    const total = reviewsData.length;
    const average =
      reviewsData.reduce((sum, review) => sum + review.rating, 0) / total;

    const distribution = [0, 0, 0, 0, 0];
    reviewsData.forEach((review) => {
      distribution[5 - review.rating]++; // Reverse for 5-star to 1-star
    });

    setStats({
      average,
      total,
      distribution: distribution.map((count) => (count / total) * 100),
    });
  };

  const reload = async () => {
    const res = await getReviews({ productId });
    setReviews([...res.data]);
    calculateStats(res.data);
  };

  const getRatingLabel = (rating: number) => {
    const labels = {
      5: "Excellent",
      4: "Good",
      3: "Average",
      2: "Poor",
      1: "Terrible",
    };
    return labels[rating as keyof typeof labels];
  };

  const ReviewSkeleton = () => (
    <Card className='animate-pulse'>
      <CardHeader>
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-4 w-1/2' />
      </CardHeader>
      <CardContent>
        <div className='flex space-x-4'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-28' />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='space-y-8'>
      {/* Reviews Header with Stats */}
      <div className='bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Average Rating */}
          <div className='text-center lg:text-left'>
            <div className='flex items-center justify-center lg:justify-start gap-4 mb-4'>
              <div className='bg-white rounded-full p-4 shadow-lg'>
                <div className='text-4xl font-bold text-gray-900'>
                  {stats.average.toFixed(1)}
                </div>
              </div>
              <div>
                <div className='flex items-center gap-1 mb-2'>
                  <Rating value={stats.average} />
                  <span className='text-sm text-gray-600 ml-2'>
                    {stats.average.toFixed(1)} out of 5
                  </span>
                </div>
                <p className='text-sm text-gray-600'>
                  {stats.total} {stats.total === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className='lg:col-span-2'>
            <h3 className='font-semibold text-gray-900 mb-4'>
              Rating Breakdown
            </h3>
            <div className='space-y-3'>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className='flex items-center gap-3'>
                  <div className='flex items-center gap-1 w-16'>
                    <span className='text-sm font-medium text-gray-700'>
                      {rating}
                    </span>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  </div>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-yellow-400 h-2 rounded-full transition-all duration-500'
                      style={{ width: `${stats.distribution[5 - rating]}%` }}
                    />
                  </div>
                  <span className='text-sm text-gray-600 w-12'>
                    {Math.round(stats.distribution[5 - rating])}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Section */}
      <div className='bg-white rounded-2xl border border-gray-200 p-6'>
        {userId ? (
          <div className='space-y-4'>
            <div className='text-center p-8'>
              <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Share Your Experience
              </h3>
              <p className='text-gray-600 mb-6 max-w-md mx-auto'>
                Help other customers make informed decisions by sharing your
                thoughts about this product.
              </p>
              <ReviewForm
                userId={userId}
                productId={productId}
                orReviewSubmitted={reload}
                // onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        ) : (
          <div className='text-center p-8'>
            <Award className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              Join the Conversation
            </h3>
            <p className='text-gray-600 mb-6'>
              Sign in to share your experience and help other customers.
            </p>
            <Button asChild className='bg-blue-600 hover:bg-blue-700'>
              <Link href={`/sign-in?callbackUrl=/product/${productSlug}`}>
                <User className='h-4 w-4 mr-2' />
                Sign In to Review
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-bold text-gray-900'>
            Customer Reviews ({reviews.length})
          </h3>
          {reviews.length > 0 && (
            <Badge variant='secondary' className='text-sm'>
              <ThumbsUp className='h-3 w-3 mr-1' />
              {stats.total} {stats.total === 1 ? "Review" : "Reviews"}
            </Badge>
          )}
        </div>

        {loading ? (
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className='text-center py-12'>
            <MessageSquare className='h-16 w-16 text-gray-300 mx-auto mb-4' />
            <h4 className='text-lg font-semibold text-gray-600 mb-2'>
              No Reviews Yet
            </h4>
            <p className='text-gray-500 max-w-md mx-auto'>
              Be the first to share your thoughts about this product. Your
              review will help other customers make better decisions.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className='space-y-6'>
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <Card className='hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500'>
                    <CardHeader>
                      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                        <div className='flex items-center gap-3'>
                          <CardTitle className='text-lg'>
                            {review.title}
                          </CardTitle>
                          <Badge
                            variant='outline'
                            className={`${
                              review.rating >= 4
                                ? "bg-green-50 text-green-700 border-green-200"
                                : review.rating >= 3
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }`}>
                            {getRatingLabel(review.rating)}
                          </Badge>
                        </div>
                        <Rating value={review.rating} />
                      </div>
                      <CardDescription className='text-base leading-relaxed'>
                        {review.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full'>
                          <User className='h-3 w-3' />
                          <span className='font-medium'>
                            {review.user ? review.user.name : "Anonymous"}
                          </span>
                        </div>
                        <div className='flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full'>
                          <Calendar className='h-3 w-3' />
                          <span>
                            {formatDateTime(review.createdAt).dateTime}
                          </span>
                        </div>
                        {review.rating === 5 && (
                          <Badge
                            variant='secondary'
                            className='bg-yellow-50 text-yellow-700'>
                            <Star className='h-3 w-3 mr-1 fill-yellow-400' />
                            Top Review
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
