/** @format */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { Collection, Product } from "@/types";
import { getAllCollectionsSimple } from "@/lib/actions/collection-action";
import { cleanName } from "@/lib/utils";

// Define interfaces that match your API response structure
interface SubCategory {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
  products: Product[];
}

interface Category {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
  products: Product[];
  subCategories: SubCategory[];
}

interface CollectionWithCategories extends Collection {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  images: string[];
  createdAt: string;
  updatedAt: string | null;
  categories: Category[];
}

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [collections, setCollections] = useState<CollectionWithCategories[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await getAllCollectionsSimple();
        console.log("API Response:", data.data);

        // Type assertion to handle the API response
        const collectionsData = data.data as CollectionWithCategories[];
        setCollections(collectionsData || []);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, []);

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
    collections.find((c) => c.id === activeCollection);

  const getCurrentCategory = () => {
    const currentCollection = getCurrentCollection();
    return currentCollection?.categories?.find((c) => c.id === activeCategory);
  };

  // Helper function to generate safe URLs
  // const getCategoryUrl = (
  //   collectionSlug: string | null,
  //   categorySlug: string | null
  // ) => {
  //   if (!collectionSlug || !categorySlug) return "/search";
  //   return `/collections/${collectionSlug}/${categorySlug}`;
  // };

  const getSubCategoryUrl = (
    collectionSlug: string | null,
    categorySlug: string | null,
    subCategorySlug: string | null
  ) => {
    if (!collectionSlug || !categorySlug || !subCategorySlug) return "/search";
    return `/collections/${collectionSlug}/${categorySlug}/${subCategorySlug}`;
  };

  if (loading) {
    return <>...</>;
  }

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
              className='fixed top-0 left-0 h-full w-80 max-w-[95vw] bg-white shadow-xl z-50 lg:hidden overflow-hidden'>
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
                        {collections.map((collection) => (
                          <button
                            key={collection.id}
                            onClick={() => handleCollectionClick(collection.id)}
                            className='w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group'>
                            <span className='font-medium text-gray-900 group-hover:text-black'>
                              {cleanName(collection.name)}
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
                                {cleanName(category.name)}
                              </div>
                              <div className='text-xs text-gray-500 mt-1'>
                                {category.subCategories?.length || 0} categories
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
                              href={getSubCategoryUrl(
                                getCurrentCollection()?.slug || null,
                                getCurrentCategory()?.slug || null,
                                subCategory.slug
                              )}
                              className='block p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-200'
                              onClick={() => setIsOpen(false)}>
                              <div className='font-medium text-gray-900 group-hover:text-black'>
                                {cleanName(subCategory.name)}
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
