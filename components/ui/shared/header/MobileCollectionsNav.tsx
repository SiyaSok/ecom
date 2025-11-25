/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, X, Search, User, ShoppingBag } from "lucide-react";

const collectionsData = [
  // Your data here (same as provided)
  {
    id: "8cbcf71b-2d9d-4a5c-8690-1c0e6550fc41",
    name: "Women",
    slug: "women",
    images: [
      "https://utfs.io/f/X55GebA8RFI0npioFusjISmDoVr42YAfdxHytPX5Zb6M7cGF",
    ],
    categories: [
      {
        id: "61a02bf0-94d8-4145-b09c-5b5e2648bf01",
        slug: "ladies-accessories",
        name: "Ladies Accessories",
        subCategories: [
          {
            id: "2fe0fa1c-d26c-4fb0-94ab-4404eb6d6de8",
            name: "Bags for Women",
            slug: "bags-for-women",
            products: [{ id: "9b4c5370-26c7-4505-8465-e218bca92d9f" }],
          },
          {
            id: "c2ee3774-2837-4205-908f-0753057c37be",
            name: "Purses for Women",
            slug: "purses-for-women",
            products: [{ id: "72dac229-9b60-4e0a-8c14-f0db7b04ff93" }],
          },
        ],
      },
      {
        id: "3414dd73-1613-45b3-bfd5-4bd2067ce06b",
        slug: "ladies-clothing",
        name: "Ladies Clothing",
        subCategories: [
          {
            id: "bcab6197-3016-4bcc-8b56-1feaedfbc8a3",
            name: "Dresses for Women",
            slug: "dresses-for-women",
            products: [{ id: "02aacc82-298e-444d-ad23-601db17aac7a" }],
          },
          {
            id: "58b492e1-b084-48de-bbd9-2d9923dfd9e4",
            name: "Jeans for Women",
            slug: "jeans-for-women",
            products: [{ id: "77210c12-1863-4a17-a30e-c0d8f92163bf" }],
          },
        ],
      },
    ],
  },
  {
    id: "1d4d9aed-f27e-43de-99c2-94953723962a",
    name: "Men",
    slug: "men",
    images: [
      "https://utfs.io/f/X55GebA8RFI0c9NDjTPBqK3Rl1ozex86ktpgHIv4VFUM2TXb",
    ],
    categories: [
      {
        id: "c74fcc59-8f6f-4c8c-92ee-59992b1182c3",
        slug: "mens-shoes",
        name: "Men's Shoes",
        subCategories: [
          {
            id: "270b93c2-6137-4f91-ab42-304417de00f6",
            name: "Sneakers for Men",
            slug: "sneakers-for-men",
            products: [{ id: "4859e6aa-8c26-4ee9-a25c-ba15390900d5" }],
          },
        ],
      },
    ],
  },
  {
    id: "a02c6a3e-3e33-4661-a628-d02a63bd7605",
    name: "Sports",
    slug: "sports",
    images: [
      "https://utfs.io/f/X55GebA8RFI0VJMPfeGQ1jPpvgwALW3o86RnVBOUdehuyqQM",
    ],
    categories: [
      {
        id: "sports-category",
        slug: "sports-gear",
        name: "Sports Gear",
        subCategories: [
          {
            id: "running-shoes",
            name: "Running Shoes",
            slug: "running-shoes",
            products: [{ id: "running-shoe-1" }],
          },
        ],
      },
    ],
  },
];

export default function CoolMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const collectionsWithProducts = collectionsData.filter((collection) =>
    collection.categories?.some((category) => category.subCategories.length > 0)
  );

  const handleCollectionClick = (collectionId: string) => {
    setActiveCollection(collectionId);
    setActiveCategory(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleBack = () => {
    if (activeCategory) {
      setActiveCategory(null);
    } else if (activeCollection) {
      setActiveCollection(null);
    } else {
      setIsOpen(false);
    }
  };

  const getCurrentCollection = () =>
    collectionsWithProducts.find((c) => c.id === activeCollection);

  const getCurrentCategory = () =>
    getCurrentCollection()?.categories?.find((c) => c.id === activeCategory);

  return (
    <>
      {/* Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className='lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'>
        <Menu size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden'
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className='fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 lg:hidden overflow-hidden'>
              {/* Header */}
              <div className='bg-black text-white p-4'>
                <div className='flex items-center justify-between mb-4'>
                  <button
                    onClick={handleBack}
                    className='p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors'>
                    <ChevronRight size={20} className='rotate-180' />
                  </button>
                  <h2 className='text-lg font-bold'>
                    {activeCategory
                      ? getCurrentCategory()?.name
                      : activeCollection
                        ? getCurrentCollection()?.name
                        : "Menu"}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors'>
                    <X size={20} />
                  </button>
                </div>

                {/* Search Bar */}
                <div className='relative'>
                  <Search
                    size={16}
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  />
                  <input
                    type='text'
                    placeholder='Search products...'
                    className='w-full bg-white bg-opacity-10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-300 border border-white border-opacity-20 focus:outline-none focus:border-opacity-40'
                  />
                </div>
              </div>

              {/* Navigation Content */}
              <div className='h-full overflow-y-auto pb-20'>
                <AnimatePresence mode='wait'>
                  {/* Main Menu */}
                  {!activeCollection && (
                    <motion.div
                      key='main'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className='p-4'>
                      {/* Quick Actions */}
                      <div className='grid grid-cols-2 gap-3 mb-6'>
                        <Link
                          href='/search'
                          className='bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors group'
                          onClick={() => setIsOpen(false)}>
                          <ShoppingBag
                            size={20}
                            className='mx-auto mb-2 text-gray-600 group-hover:text-black'
                          />
                          <span className='text-sm font-medium'>
                            All Products
                          </span>
                        </Link>
                        <Link
                          href='/account'
                          className='bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors group'
                          onClick={() => setIsOpen(false)}>
                          <User
                            size={20}
                            className='mx-auto mb-2 text-gray-600 group-hover:text-black'
                          />
                          <span className='text-sm font-medium'>Account</span>
                        </Link>
                      </div>

                      {/* Collections */}
                      <div className='space-y-2'>
                        {collectionsWithProducts.map((collection) => (
                          <button
                            key={collection.id}
                            onClick={() => handleCollectionClick(collection.id)}
                            className='w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group'>
                            <span className='font-medium text-gray-900 group-hover:text-black'>
                              {collection.name}
                            </span>
                            <ChevronRight
                              size={16}
                              className='text-gray-400 group-hover:text-gray-600'
                            />
                          </button>
                        ))}
                      </div>

                      {/* Additional Links */}
                      <div className='mt-6 pt-6 border-t border-gray-200'>
                        <Link
                          href='/new-arrivals'
                          className='block py-2 text-gray-600 hover:text-black transition-colors'
                          onClick={() => setIsOpen(false)}>
                          New Arrivals
                        </Link>
                        <Link
                          href='/sale'
                          className='block py-2 text-red-600 hover:text-red-700 transition-colors font-medium'
                          onClick={() => setIsOpen(false)}>
                          Sale
                        </Link>
                        <Link
                          href='/help'
                          className='block py-2 text-gray-600 hover:text-black transition-colors'
                          onClick={() => setIsOpen(false)}>
                          Help & Support
                        </Link>
                      </div>
                    </motion.div>
                  )}

                  {/* Collection Details */}
                  {activeCollection && !activeCategory && (
                    <motion.div
                      key={`collection-${activeCollection}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className='p-4'>
                      <div className='mb-4'>
                        {getCurrentCollection()?.images?.[0] && (
                          <Image
                            src={getCurrentCollection()!.images[0]}
                            alt={getCurrentCollection()!.name}
                            width={200}
                            height={120}
                            className='w-full h-32 object-cover rounded-lg mb-3'
                          />
                        )}
                      </div>

                      <div className='space-y-3'>
                        {getCurrentCollection()?.categories?.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className='w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-200'>
                            <div className='text-left'>
                              <div className='font-medium text-gray-900 group-hover:text-black'>
                                {category.name}
                              </div>
                              <div className='text-xs text-gray-500 mt-1'>
                                {category.subCategories.length} categories
                              </div>
                            </div>
                            <ChevronRight
                              size={16}
                              className='text-gray-400 group-hover:text-gray-600'
                            />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Category Details */}
                  {activeCategory && (
                    <motion.div
                      key={`category-${activeCategory}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className='p-4'>
                      <div className='space-y-3'>
                        {getCurrentCategory()?.subCategories?.map(
                          (subCategory) => (
                            <Link
                              key={subCategory.id}
                              href={`/collections/${getCurrentCollection()?.slug}/${getCurrentCategory()?.slug}/${subCategory.slug}`}
                              className='block p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-200'
                              onClick={() => setIsOpen(false)}>
                              <div className='font-medium text-gray-900 group-hover:text-black'>
                                {subCategory.name}
                              </div>
                              {subCategory.products && (
                                <div className='text-xs text-gray-500 mt-1'>
                                  {subCategory.products.length} products
                                </div>
                              )}
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className='absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 p-4'>
                <div className='flex justify-between items-center text-sm'>
                  <span className='text-gray-600'>
                    Free shipping on orders over $50
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
