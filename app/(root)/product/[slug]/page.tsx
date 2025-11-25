/** @format */

import { getSingleProductBySlug } from "@/lib/actions/products.actions";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/ui/shared/product/product-price";
import ProductImages from "@/components/ui/shared/product/product-images";
import AddToCart from "@/components/ui/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.action";
import { auth } from "@/auth";
import ReviewList from "./review-list";
import Rating from "@/components/ui/shared/product/rating";
import {
  Clock,
  CreditCard,
  Package,
  RotateCcw,
  Shield,
  TruckIcon,
  Zap,
} from "lucide-react";
import AddToWishList from "@/components/ui/shared/product/add-to-wishlish";
import Breadcrumbs from "@/components/ui/shared/product/Breadcrumbs";

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

  const paymentOptions = [
    {
      icon: <Zap className='h-5 w-5' />,
      title: "4 interest-free payments",
      amount: `R ${(Number(product.price) / 4).toFixed(2)}`,
      period: "every 2 weeks",
      description: "Payflex - 0% interest",
    },
    {
      icon: <CreditCard className='h-5 w-5' />,
      title: "3 instalments",
      amount: `R ${(Number(product.price) / 3).toFixed(2)}`,
      period: "over 3 months",
      description: "Interest and fee free",
    },
    {
      icon: <Clock className='h-5 w-5' />,
      title: "12 monthly payments",
      amount: `R ${(Number(product.price) / 12).toFixed(2)}`,
      period: "flexible terms",
      description: "Easy online application",
    },
  ];

  const features = [
    { icon: <TruckIcon className='h-25 w-25' />, text: "Free delivery" },
    {
      icon: <Package className='h-25 w-25' />,
      text: "Free returns within 30 days",
    },
    { icon: <Shield className='h-25 w-25' />, text: "2-year warranty" },
    { icon: <RotateCcw className='h-25 w-25' />, text: "Easy exchanges" },
  ];

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

            {/* Payment Options */}
            <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 mt-6'>
              <h3 className='font-semibold text-lg mb-4 text-gray-900'>
                Flexible Payment Options
              </h3>
              <div className='space-y-3'>
                {paymentOptions.map((option, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200'>
                    <div className='flex items-center gap-3'>
                      <div className='text-blue-600'>{option.icon}</div>
                      <div>
                        <p className='font-medium text-sm text-gray-900'>
                          {option.title}
                        </p>
                        <p className='text-xs text-gray-600'>
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold text-gray-900'>{option.amount}</p>
                      <p className='text-xs text-gray-600'>{option.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-4'>
              {/* <p className='font-semibold'>Description</p> */}
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        {/* Quick Features */}
        <div className='mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex flex-row items-center gap-2 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-gray-100 shadow-sm'>
              <div className='text-blue-600 text-5xl'>{feature.icon}</div>
              <span className='text-sm font-medium text-gray-700'>
                {feature.text}
              </span>
            </div>
          ))}
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

      {/* <RelatedProducts
        collectionSlug={product?.collection.slug ?? ""}
        categorySlug={product?.category_?.slug ?? ""}
      /> */}

      {/* Related Products */}
      <section className='mt-20'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            You Might Also Like
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Discover similar products that match your style and preferences
          </p>
        </div>
        <RelatedProducts
          collectionSlug={product?.collection.slug ?? ""}
          categorySlug={product?.category_?.slug ?? ""}
        />
      </section>
    </div>
  );
};

export default ProductDatailsPage;
