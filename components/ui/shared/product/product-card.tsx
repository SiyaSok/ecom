/** @format */

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import Rating from "./rating";
import AddToWishList from "./add-to-wishlish";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Eye, ShoppingBag, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCard = async ({
  product,
  showActions = true,
}: {
  product: Product;
  showActions?: boolean;
}) => {
  const session = await auth();
  const userId = session?.user?.id;

  const isNew = () => {
    const createdAt = new Date(product.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Product is "new" if created within last 30 days
  };

  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <Card className='group relative w-full max-w-sm border-0 bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'>
      {/* Image Container */}
      <CardHeader className='p-0 relative overflow-hidden'>
        <Link href={`/product/${product.slug}`} className='block relative'>
          {/* Main Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className='w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110'
          />

          {/* Hover Overlay with Quick Actions */}
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center'>
            <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex gap-2'>
              <Button
                size='icon'
                variant='secondary'
                className='bg-white/90 backdrop-blur-sm hover:bg-white h-10 w-10 rounded-full'
                asChild>
                <Link href={`/product/${product.slug}`}>
                  <Eye className='h-4 w-4' />
                </Link>
              </Button>
              <Button
                size='icon'
                variant='secondary'
                className='bg-white/90 backdrop-blur-sm hover:bg-white h-10 w-10 rounded-full'>
                <ShoppingBag className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Badges Container */}
          <div className='absolute top-3 left-3 flex flex-col gap-2'>
            {product.isFeatured && (
              <Badge className='bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 shadow-lg'>
                <Zap className='h-3 w-3 mr-1' />
                Featured
              </Badge>
            )}
            {isNew() && (
              <Badge className='bg-green-500 text-white border-0 shadow-lg'>
                New
              </Badge>
            )}
            {isLowStock && (
              <Badge className='bg-orange-500 text-white border-0 shadow-lg'>
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className='bg-red-500 text-white border-0 shadow-lg'>
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          {showActions && (
            <div className='absolute top-3 right-3 z-10'>
              <AddToWishList
                productSlug={product.slug}
                userId={userId || null}
                heart={true}
              />
            </div>
          )}

          {/* Brand Badge */}
          <div className='absolute bottom-3 left-3'>
            <Badge
              variant='secondary'
              className='bg-black/70 text-white backdrop-blur-sm border-0'>
              {product.brand}
            </Badge>
          </div>
        </Link>
      </CardHeader>

      {/* Product Info */}
      <CardContent className='p-4 space-y-3'>
        {/* Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className='font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight text-sm'>
            {product.name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <Rating value={Number(product.rating)} />
            <span className='text-xs text-gray-600 font-medium'>
              {Number(product.rating).toFixed(1)}
            </span>
          </div>
          {product.numReviews > 0 && (
            <>
              <div className='w-1 h-1 bg-gray-300 rounded-full'></div>
              <span className='text-xs text-gray-500'>
                {product.numReviews}{" "}
                {product.numReviews === 1 ? "review" : "reviews"}
              </span>
            </>
          )}
        </div>

        {/* Price and Stock Status */}
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <ProductPrice
              value={Number(product.price)}
              className='text-lg font-bold text-gray-900'
            />
            {product.stock > 0 && (
              <div className='flex items-center gap-1 text-xs text-gray-500'>
                <div
                  className={`w-2 h-2 rounded-full ${isLowStock ? "bg-orange-500" : "bg-green-500"}`}></div>
                {isLowStock ? `Only ${product.stock} left` : "In Stock"}
              </div>
            )}
          </div>

          {/* Quick Add to Cart */}
          {product.stock > 0 && showActions && (
            <Button
              size='sm'
              className='bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'>
              <ShoppingBag className='h-4 w-4' />
            </Button>
          )}
        </div>

        {/* Additional Features */}
        <div className='flex items-center justify-between text-xs text-gray-500'>
          <div className='flex items-center gap-1'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            Free delivery
          </div>
          {Number(product.price) > 1000 && (
            <div className='flex items-center gap-1 text-blue-600 font-medium'>
              <Star className='h-3 w-3 fill-blue-600' />
              eB Points
            </div>
          )}
        </div>

        {/* Color Variants (Placeholder) */}
        {product.images.length > 1 && (
          <div className='flex gap-1 pt-2 border-t border-gray-100'>
            {product.images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className='w-6 h-6 rounded border border-gray-200 overflow-hidden'>
                <Image
                  src={image}
                  alt={`${product.name} variant ${index + 1}`}
                  width={24}
                  height={24}
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
            {product.images.length > 3 && (
              <div className='w-6 h-6 rounded border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-500'>
                +{product.images.length - 3}
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Special Offers Ribbon */}
      {Number(product.price) > 1500 && (
        <div className='absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-8 -translate-y-2 shadow-lg'>
          PREMIUM
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
