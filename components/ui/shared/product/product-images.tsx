/** @format */
"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCutrrent] = useState(0);

  return (
    <div className='space-y-4'>
      <Image
        src={images[current]}
        alt='product-image'
        width={800}
        height={800}
        className='min-h-[200px] object-cover object-center'
      />
      <div className='flex'>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCutrrent(index)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-black",
              current === index && "border-black"
            )}>
            <Image src={image} alt='image' width={80} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductImages;
