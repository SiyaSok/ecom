/** @format */

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import ProductPrice from "./product-price";
import { Product } from "@/types";
import Rating from "./rating";
import AddToWishList from "./add-to-wishlish";
import { auth } from "@/auth";

const ProductCard = async ({ product }: { product: Product }) => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Card className='w-full max-w-sm border-none relative'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
          />
        </Link>
        <div className='absolute top-[68%] right-[10px] z-10'>
          <AddToWishList
            productSlug={product.slug}
            userId={userId || null}
            heart={true}
          />
        </div>
      </CardHeader>
      <CardContent className='p-4 gap-3 md:gap-4 relative space-y-1'>
        <div className='text-sm text-gray-400'>{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-sm font-medium text-nowrap text-ellipsis overflow-hidden'>
            {product.name}
          </h2>
        </Link>

        <div className='flex md:items-center justify-between gap-2 md:gap-4 flex-col md:flex-row  items-start'>
          {/* <p>{product.rating} Stars</p> */}
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className='text-destructive'>Out of stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
