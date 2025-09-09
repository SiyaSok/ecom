/** @format */

import { Product } from "@/types";
import ProductCard from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductList = ({
  data,
  title,
  limit,
  productCount,
}: {
  data: Product[];
  title?: string;
  limit?: number;
  productCount?: number;
}) => {
  const limitData = limit ? data.slice(0, limit) : data;

  if (limitData.length === 0) {
    return (
      <div className='my-10'>
        {title && <h2 className='text-xl font-bold mb-4'>{title}</h2>}
        <p className='text-muted-foreground'>No products found</p>
      </div>
    );
  }

  return (
    <div className='my-10'>
      {
        <Carousel
          className='w-full'
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
          }}>
          <div className='flex justify-between items-center mb-4'>
            {title && (
              <h2 className='text-xl font-bold'>
                {title}
                {productCount && (
                  <span className='text-muted-foreground font-normal ml-2'>
                    ({productCount} items)
                  </span>
                )}
              </h2>
            )}
          </div>

          <CarouselContent className='-ml-2'>
            {limitData.map((product: Product) => (
              <CarouselItem
                key={product.slug}
                className='pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5'>
                <div className='p-1'>
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='hidden md:flex' />
          <CarouselNext className='hidden md:flex' />
        </Carousel>
      }
    </div>
  );
};

export default ProductList;
