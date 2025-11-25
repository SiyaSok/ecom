/** @format */

import { auth } from "@/auth";
import ProductCard from "@/components/ui/shared/product/product-card";
import { getUserById } from "@/lib/actions/user.action";
import { Product } from "@/types";
import {
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  Share2,
  ShoppingBag,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type WishlistItem = {
  id: string;
  userId: string;
  productSlug: string;
  createdAt: Date;
  product: Product;
};

const Wishlist = async () => {
  const session = await auth();

  if (!session) throw new Error("Please log in");

  const user = await getUserById(session?.user?.id || "");

  // Calculate wishlist stats
  const totalItems = user.Wishlist.length;
  const totalValue = user.Wishlist.reduce(
    (sum: number, item: WishlistItem) => sum + Number(item.product.price),
    0
  );
  const featuredItems = user.Wishlist.filter(
    (item: WishlistItem) => item.product.isFeatured
  ).length;

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Header Section */}
      <div className='bg-gradient-to-br  from-slate-900 via-black to-slate-900   text-white'>
        <div className='wrapper py-12'>
          <div className='flex items-center justify-between'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-white/20 p-3 rounded-full backdrop-blur-sm'>
                  <Heart className='h-8 w-8' fill='white' />
                </div>
                <div>
                  <h1 className='text-4xl font-bold'>My Wishlist</h1>
                  <p className='text-pink-100 text-lg'>
                    Your curated collection of favorite items
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className='flex flex-wrap gap-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>{totalItems}</div>
                  <div className='text-pink-100 text-sm'>Items Saved</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>
                    R {totalValue.toFixed(2)}
                  </div>
                  <div className='text-pink-100 text-sm'>Total Value</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold'>{featuredItems}</div>
                  <div className='text-pink-100 text-sm'>Featured Items</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-3'>
              <Button
                variant='secondary'
                className='bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30'>
                <Share2 className='h-4 w-4 mr-2' />
                Share List
              </Button>
              {totalItems > 0 && (
                <Button
                  variant='secondary'
                  className='bg-white hover:bg-gray-100 text-pink-600 border-white'>
                  <ShoppingBag className='h-4 w-4 mr-2' />
                  Add All to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='wrapper py-8'>
        {/* Controls Bar */}
        {totalItems > 0 && (
          <Card className='mb-8'>
            <CardContent className='p-4'>
              <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                {/* Search and Filter */}
                <div className='flex items-center gap-4 flex-1 w-full sm:w-auto'>
                  <div className='relative flex-1 max-w-md'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    <Input
                      placeholder='Search in wishlist...'
                      className='pl-10'
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='outline'
                        className='flex items-center gap-2'>
                        <Filter className='h-4 w-4' />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                      <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                      <DropdownMenuItem>Recently Added</DropdownMenuItem>
                      <DropdownMenuItem>Brand</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className='flex items-center gap-1 border rounded-lg p-1'>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <Grid3X3 className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='icon' className='h-8 w-8'>
                      <List className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                {/* View Options */}
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <span>{totalItems} items</span>
                  <span className='text-gray-300'>•</span>
                  <span>R {totalValue.toFixed(2)} total</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wishlist Content */}
        {user.Wishlist.length > 0 ? (
          <div className='space-y-6'>
            {/* Products Grid */}
            {user.Wishlist.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
                {user.Wishlist.map((product: WishlistItem) => (
                  <ProductCard
                    key={product.product.slug}
                    product={product.product}
                  />
                ))}
              </div>
            ) : (
              <div>
                <p>No product found</p>
              </div>
            )}

            {/* Summary Card */}
            <Card className='bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'>
              <CardContent className='p-6'>
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-2'>
                      Ready to make them yours?
                    </h3>
                    <p className='text-gray-600 text-sm'>
                      Add all items to your cart and complete your collection
                    </p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='text-right'>
                      <div className='text-2xl font-bold text-gray-900'>
                        R {totalValue.toFixed(2)}
                      </div>
                      <div className='text-sm text-gray-600'>
                        Total for {totalItems} items
                      </div>
                    </div>
                    <Button className='bg-blue-600 hover:bg-blue-700'>
                      <ShoppingBag className='h-4 w-4 mr-2' />
                      Add All to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Empty State */
          <Card className='text-center py-16 max-w-2xl mx-auto'>
            <CardContent className='space-y-6'>
              <div className='bg-gradient-to-br from-pink-100 to-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto'>
                <Heart className='h-12 w-12 text-pink-500' />
              </div>

              <div className='space-y-3'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Your wishlist is empty
                </h2>
                <p className='text-gray-600 max-w-md mx-auto'>
                  Start building your collection! Save items you love by
                  clicking the heart icon on any product.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button asChild className='bg-pink-500 hover:bg-pink-600'>
                  <a href='/search'>
                    <Search className='h-4 w-4 mr-2' />
                    Start Shopping
                  </a>
                </Button>
                <Button asChild variant='outline'>
                  <Link href='/collections/women'>
                    <Eye className='h-4 w-4 mr-2' />
                    Browse Women`&apos;`s Collection
                  </Link>
                </Button>
              </div>

              {/* Feature Highlights */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8'>
                {[
                  {
                    icon: <Heart className='h-6 w-6 text-pink-500' />,
                    title: "Save Favorites",
                    description: "Keep track of items you love",
                  },
                  {
                    icon: <ShoppingBag className='h-6 w-6 text-blue-500' />,
                    title: "Quick Checkout",
                    description: "Add multiple items to cart at once",
                  },
                  {
                    icon: <Share2 className='h-6 w-6 text-green-500' />,
                    title: "Share Lists",
                    description: "Create and share wishlists with friends",
                  },
                ].map((feature, index) => (
                  <div key={index} className='text-center space-y-2'>
                    <div className='bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto'>
                      {feature.icon}
                    </div>
                    <h4 className='font-semibold text-gray-900'>
                      {feature.title}
                    </h4>
                    <p className='text-sm text-gray-600'>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
