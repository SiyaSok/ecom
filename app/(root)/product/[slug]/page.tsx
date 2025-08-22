/** @format */

import { getSingleProductBySlug } from "@/lib/actions/products.actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ProductPrice from "@/components/ui/shared/product/product-price";
import ProductImages from "@/components/ui/shared/product/product-images";
import AddToCart from "@/components/ui/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.action";
import { auth } from "@/auth";
import ReviewList from "./review-list";
import Rating from "@/components/ui/shared/product/rating";
import { Button } from "@/components/ui/button";
import { Heart, TruckIcon } from "lucide-react";
const ProductDatailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getSingleProductBySlug(slug);
  const session = await auth();
  const userId = session?.user?.id;

  const cart = await getMyCart();

  if (!product) notFound();
  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>
          <div className='col-span-2 p-5'>
            <div className='flex flex-col gap-2'>
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className='h3-bold'>{product.name}</h1>
              <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                <ProductPrice
                  value={Number(product.price)}
                  className='font-bold my-1'
                />
              </div>
              <p>
                {/* {product.rating} of {product.numReviews} Reviews */}
                <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-4'>
                  <Rating value={Number(product.rating) || 0} />
                  <p className='mt-2'> {product.numReviews} reviews</p>
                </div>
              </p>
            </div>
            <div>
              {product.stock > 0 && (
                <div className='flex-center'>
                  <Button variant='outline' className='mr-2 w-24 h-14'>
                    <Heart />
                  </Button>
                  <AddToCart
                    cart={cart}
                    item={{
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      qty: 1,
                      image: product.images![0],
                    }}
                  />
                </div>
              )}
            </div>
            <Badge className='mb-4 mt-5'>
              <TruckIcon />{" "}
              <p className='text-lg ml-2 font-semibold'>Free delivery</p>
            </Badge>
            <div className='mt-2'>
              <p className='font-semibold'>
                Or 6 payments of R {(Number(product.price) / 6).toFixed(2)} at
                0% interest.
              </p>
            </div>
            <div className='mt-4'>
              {/* <p className='font-semibold'>Description</p> */}
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section className='mt-10'>
        <h2 className='h2-bold'>Customer Reviews</h2>
        <ReviewList
          userId={userId || ""}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>
    </>
  );
};

export default ProductDatailsPage;
