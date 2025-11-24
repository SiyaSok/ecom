/** @format */

import { getAllCollectionsSimple } from "@/lib/actions/collection-action";
import Image from "next/image";
import Link from "next/link";

const CollectionsMenu = async () => {
  const collections = await getAllCollectionsSimple();

  if (!collections.data || collections.data.length === 0) {
    return (
      <div className='w-full max-w-[1200px] mx-auto bg-white border-b border-gray-100 py-4'>
        <div className='text-center text-gray-500'>
          No collections available
        </div>
      </div>
    );
  }

  const cleanName = (name: string): string => {
    const patterns = [
      "Ladies ",
      "Women's ",
      "Mens ",
      "for Women ",
      "for Men ",
      "for Women",
    ];

    return patterns.reduce(
      (cleanedName, pattern) => cleanedName.replaceAll(pattern, ""),
      name
    );
  };

  return (
    <div className='w-full max-w-[1200px] mx-auto bg-white border-b border-gray-100'>
      <div className='relative'>
        <div className='px-4 md:px-6'>
          <div className='flex items-center justify-start whitespace-nowrap'>
            {/* All Products Link */}
            <div className='flex items-center py-4'>
              <Link
                href='/search'
                className='flex h-8 items-center rounded-full px-3 text-base font-bold no-underline transition-all duration-300 hover:bg-black hover:text-white'>
                All
              </Link>
            </div>

            {/* Collections Navigation */}
            <div className='flex w-full overflow-x-auto lg:overflow-x-visible lg:w-auto'>
              {collections.data.map((collection) => (
                <div
                  key={collection.id}
                  className='group px-1 first:pl-0 last:pr-0'>
                  <div className='flex items-center py-4'>
                    <Link
                      href={`/collections/${collection.slug}`}
                      className='flex h-8 items-center rounded-full px-3 text-base font-bold no-underline transition-all duration-300 hover:bg-black hover:text-white'>
                      {cleanName(collection.name)}
                    </Link>
                  </div>

                  {/* Mega Dropdown Menu */}
                  {collection.categories &&
                    collection.categories.length > 0 && (
                      <div className='absolute left-0 right-0 top-16 z-50 hidden max-h-[566px] w-full overflow-y-auto border-t border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 group-hover:block'>
                        <div className='mx-auto flex justify-between'>
                          {/* Categories Section */}
                          <div className='flex gap-12'>
                            {collection.categories.map((category) => (
                              <div key={category.id} className='min-w-[180px]'>
                                {/* Category Header */}
                                <Link
                                  href={`/collections/${collection.slug}/${category.slug}`}
                                  className='mb-4 block text-lg font-bold text-black no-underline hover:underline'>
                                  {cleanName(category.name)}
                                </Link>

                                {/* Subcategories */}
                                <div className='flex flex-col space-y-2'>
                                  {category.subCategories?.map(
                                    (subCategory) => (
                                      <Link
                                        key={subCategory.id}
                                        href={`/collections/${collection.slug}/${category.slug}/${subCategory.slug}`}
                                        className='text-sm text-gray-600 no-underline transition-colors hover:text-black hover:underline'>
                                        {cleanName(subCategory.name)}
                                      </Link>
                                    )
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Collection Image */}
                          {collection.images &&
                            collection.images.length > 0 && (
                              <div className='hidden lg:block'>
                                <Image
                                  src={collection.images[0]}
                                  alt={collection.name}
                                  width={280}
                                  height={280}
                                  className='rounded-lg object-cover'
                                  priority={false}
                                />
                              </div>
                            )}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsMenu;
