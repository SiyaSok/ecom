/** @format */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}>
      <CarouselContent>
        {data.map((product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className=' relative mx-auto'>
                <Image
                  src={product.banner!}
                  alt={product.name}
                  className='w-full h-auto object-center object-cover rounded-sm'
                  width={0}
                  height={0}
                  sizes='100vw'
                />
                <div className='absolute inset-0 flex items-end justify-start'>
                  <h2 className='bg-gray-900 bg-opacity-50 text-xl font-bold text-white px-2'>
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden md:flex' />
      <CarouselNext className='hidden md:flex' />
    </Carousel>
  );
};

export default ProductCarousel;
