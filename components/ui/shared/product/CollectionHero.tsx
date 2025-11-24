/** @format */

import { Collection, Product } from "@/types";
import Image from "next/image";

interface CollectionHeroProps {
  collection: Collection | null;
  products: Product[] | null;
}

export default function CollectionHero({
  collection,
  products,
}: CollectionHeroProps) {
  // Get featured products or first few products for display
  const featuredProducts = products
    ?.filter((product) => product.isFeatured)
    .slice(0, 3);

  // Fallback to first 3 products if no featured ones
  const displayProducts =
    (featuredProducts?.length ?? 0 > 0)
      ? featuredProducts
      : products?.slice(0, 3);

  return (
    <section className='relative min-h-[500px] bg-black overflow-hidden mb-10'>
      {/* Background Pattern */}
      <div className='absolute inset-0 from-pink-200/20 via-transparent to-transparent'></div>

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Text Content */}
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h1 className='text-5xl lg:text-6xl font-bold text-gray-100 tracking-tight'>
                {collection?.name}
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-600'>
                  Collection
                </span>
              </h1>

              <p className='text-lg text-gray-100 max-w-lg'>
                Discover the latest trends in women&apos;s fashion. From stylish
                bags to comfortable sneakers and elegant clothing, find
                everything you need to express your unique style.
              </p>
            </div>

            {/* Stats */}
            <div className='flex gap-8'>
              <div>
                <div className='text-2xl font-bold text-gray-100'>
                  {products?.length}
                </div>
                <div className='text-sm text-gray-500'>Products</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-gray-100'>
                  {new Set(products?.map((p) => p.brand)).size}
                </div>
                <div className='text-sm text-gray-500'>Brands</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-gray-100'>
                  {new Set(products?.map((p) => p.category)).size}
                </div>
                <div className='text-sm text-gray-500'>Categories</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='flex gap-4'>
              <button className='bg-gradient-to-r  from-indigo-400 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                Shop Collection
              </button>
              <button className='border-2 border-gray-300 bg-gray-300 text-gray-900 px-8 py-3 rounded-full font-semibold hover:border-gray-400 transition-all duration-200'>
                View All
              </button>
            </div>
          </div>

          {/* Product Showcase */}
          <div className='relative'>
            <div className='grid grid-cols-2 gap-4'>
              {displayProducts?.map((product, index) => (
                <div
                  key={product.id}
                  className={`relative group ${
                    index === 1 ? "transform translate-y-8" : ""
                  }`}>
                  <div className='aspect-square rounded-2xl overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-all duration-300'>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      width={200}
                      height={200}
                    />
                  </div>

                  {/* Product Info Overlay */}
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <h3 className='text-white font-semibold text-sm line-clamp-1'>
                      {product.name}
                    </h3>
                    <p className='text-white/80 text-xs'>
                      {product.brand} • R{product.price}
                    </p>
                  </div>

                  {/* Category Badge */}
                  <div className='absolute top-3 left-3'>
                    <span className='bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700'>
                      {product.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
