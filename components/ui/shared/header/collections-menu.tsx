/** @format */

import { getAllCollections } from "@/lib/actions/collection-action";
import Link from "next/link";
const CollectionsMenu = async () => {
  const collections = await getAllCollections({ limit: 10 });

  return (
    <div
      className='z-[4] w-full max-w-[1200px] m-auto bg-white shadow-sm'
      id='collections'>
      <div className='relative h-full'>
        <div className='z-[1] bg-white relative sm:px-4 md:px-6 lg:z-10 lg:p-0'>
          <div className='flex items-center justify-start whitespace-nowrap lg:p-0'>
            <div className='flex justify-center w-full overflow-x-auto lg:overflow-x-visible lg:w-auto'>
              {collections.data.map((collection, index) => (
                <div
                  key={index}
                  className='group px-1 first:pl-0 first:pr-1 last:pl-1 last:pr-0'>
                  <div className='flex w-max items-center py-4'>
                    <Link
                      data-testid='link'
                      className={`flex h-[32px] w-max cursor-pointer items-center rounded-[40px] px-3 text-base font-bold leading-4 no-underline duration-300 ease-out hover:bg-black hover:text-white `}
                      href={`/collections/${collection.slug}`}>
                      {collection.name}
                    </Link>
                  </div>

                  {/* Mega Nav Dropdown */}
                  {collection.categories && (
                    <div className='custom-scrollbar  border-gray-200 bg-white absolute inset-x-0 top-16 z-[1] hidden max-h-[566px] w-full overflow-y-auto overscroll-y-none border-t p-3 pb-8 pt-4 shadow-md transition duration-300 ease-out lg:group-hover:block'>
                      <div className='mx-auto h-full transition duration-300 ease-out'>
                        <div className='flex flex-col'>
                          <div className='font-bold text-lg mb-2'>Clothing</div>
                          {collection.categories.map((navItem, navIndex) => (
                            <div key={navIndex} className='leading-[18px]'>
                              <Link
                                data-testid='link'
                                className='cursor-pointer text-wrap text-base font-bold leading-[18px] no-underline text-gray-500 hover:underline block mb-3'
                                href={`/collections/${collection.name.toLowerCase()}/clothing/${navItem.slug}`}>
                                {navItem.name}
                              </Link>
                              {/* <div className='flex flex-col leading-[18px]'>
                                {navItem.links.map((link, linkIndex) => (
                                  <a
                                    key={linkIndex}
                                    data-testid='link'
                                    className='text-gray-600 hover:text-black mt-2 cursor-pointer text-wrap text-sm leading-[18px] no-underline hover:underline'
                                    href={`/${department.name.toLowerCase()}/${link.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}>
                                    {link}
                                  </a>
                                ))}
                              </div> */}
                            </div>
                          ))}
                        </div>
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
