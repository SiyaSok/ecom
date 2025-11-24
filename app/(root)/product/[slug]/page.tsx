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
import { TruckIcon } from "lucide-react";
import AddToWishList from "@/components/ui/shared/product/add-to-wishlish";
import Breadcrumbs from "@/components/ui/shared/product/Breadcrumbs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RelatedProducts from "@/components/ui/shared/product/related-products";

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
    <div className='wrapper'>
      <Breadcrumbs
        collectionName={product?.collection?.name}
        categoryName={product?.category_?.name}
        subCategoryName={product?.SubCategory?.name}
        productName={product.name}
      />

      <section>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>
          <div className='col-span-2 p-2 md:p-5'>
            <div className='flex flex-col gap-2'>
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className='text-2xl'>{product.name}</h1>
              <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                <ProductPrice
                  value={Number(product.price)}
                  className='font-bold my-1 italic text-2xl'
                />
              </div>
              <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                <p className='text-sm text-muted-foreground'>
                  eB:{Number(product.price) * 10}
                </p>
              </div>
              {/* {product.rating} of {product.numReviews} Reviews */}
              <div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-4'>
                <Rating value={Number(product.rating) || 0} />
                <p className='mt-2'> {product.numReviews} reviews</p>
              </div>
            </div>
            <div>
              {product.stock > 0 && (
                <div className='grid grid-cols-2 gap-2'>
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
                  <AddToWishList
                    productSlug={product.slug}
                    userId={userId || null}
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
              <Accordion type='single' collapsible>
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='flex  flex-col items-start'>
                    <p className='text-start'>
                      GET IT NOW, PAY LATER Pay using our credit options,
                      Payflex,
                    </p>
                    <p className='text-muted-foreground text-sm mt-2'>
                      {" "}
                      PayJustNow, Mobicred or RCS.
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className='space-y-4'>
                    <p>
                      Simply choose the option that best suits you at checkout,
                      and we’ll ship it immediately once the order is approved.
                    </p>
                    <p>
                      From R174.75 every 2 weeks Pay for your order in either 4
                      interest-free payments over 6 weeks OR 3 interest-free
                      payments over 3 paydays – all at 0% interest.
                    </p>
                    <p>
                      R233.00 every month Super simple and easy sign-up. Pay for
                      your purchases over 3 instalments, interest and fee free.
                    </p>
                    <p>
                      R65p.m x 12 months Easy online application, instant
                      response. Apply online and repay in convenient monthly
                      instalments.
                    </p>
                    <p>
                      R64p.m x 12 months Affordable monthly instalments, with
                      flexible payment options: Revolving, 24 or 36 months
                      budget plans.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
      <RelatedProducts
        collectionSlug={product?.collection.slug ?? ""}
        categorySlug={product?.category_?.slug ?? ""}
      />
    </div>
  );
};

export default ProductDatailsPage;
