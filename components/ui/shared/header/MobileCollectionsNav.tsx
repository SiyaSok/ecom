/** @format */

import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllCollections } from "@/lib/actions/collection-action";

export default async function MobileCollectionsNav() {
  const collections = await getAllCollections({});

  // Filter out collections without any products
  const collectionsWithProducts = collections.data.filter((collection) => {
    return collection.categories?.some(
      (category) => category?.subCategories.length > 0
    );
  });

  return (
    <div className='w-full bg-white border-b border-gray-100 lg:hidden'>
      {/* "All" link */}
      <div className='px-4 py-2'>
        <Link
          href='/search'
          className='block px-3 py-2 text-base font-bold rounded-md hover:bg-black hover:text-white'>
          All
        </Link>
      </div>

      {/* Collections accordion */}
      <Accordion type='single' collapsible className='w-full divide-y'>
        {collectionsWithProducts.map((collection) => (
          <AccordionItem key={collection.id} value={collection.id}>
            <AccordionTrigger className='px-4 py-3 text-base font-bold hover:no-underline'>
              {collection.name}
            </AccordionTrigger>

            <AccordionContent className='px-6 pb-4'>
              {/* Categories */}
              {collection.categories?.map((category) => (
                <div key={category.id} className='mb-4 text-start'>
                  <Link
                    href={`/collections/${collection.slug}/${category.slug}`}
                    className='block text-base font-semibold mb-2 hover:underline'>
                    {category.name}
                  </Link>

                  {/* Subcategories */}
                  <div className='space-y-2'>
                    {category.subCategories
                      ?.filter((sub) => sub.products?.length)
                      .map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/collections/${collection.slug}/${category.slug}/${sub.slug}`}
                          className='block text-sm text-gray-600 hover:text-black'>
                          {sub.name}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}

              {/* Image */}
              {collection.images && collection.images.length > 0 && (
                <div className='mt-4'>
                  <Image
                    src={collection.images[0]}
                    alt={collection.name}
                    width={200}
                    height={200}
                    className='rounded-lg'
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
