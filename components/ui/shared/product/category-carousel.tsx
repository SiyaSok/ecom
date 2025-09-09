/** @format */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SubCategory } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../../card";
import Link from "next/link";

const CategorytCarousel = ({ data }: { data: SubCategory[] }) => {
  return (
    <div className='my-10'>
      <h2 className='text-xl font-bold mb-4'>Browse Categories</h2>

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
          {data.map((cat) => (
            <CarouselItem
              key={cat.id}
              className='pl-1 md:basis-1/2 lg:basis-1/4 '>
              <div className='p-1 '>
                <Link href={"/"} className='text-xl font-semibold'>
                  <Card className=''>
                    <CardContent className='flex aspect-square items-center justify-center p-4  text-white bg-black h-32 w-full'>
                      {cat.name}
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden md:flex' />
        <CarouselNext className='hidden md:flex' />
      </Carousel>
    </div>
  );
};

export default CategorytCarousel;
