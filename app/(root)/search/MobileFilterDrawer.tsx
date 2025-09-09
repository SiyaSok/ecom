/** @format */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CircleX, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import FilterSection from "./FilterSection";
import { Button } from "@/components/ui/button";
// Mobile filter drawer component
function MobileFilterDrawer({
  categories,
  getFilterUrl,
  currentCategory,
  currentPrice,
  currentRating,
}: {
  categories: { category: string }[];
  getFilterUrl: (params: { c?: string; p?: string; r?: string }) => string;
  currentCategory: string;
  currentPrice: string;
  currentRating: string;
}) {
  const ratings = [4, 3, 2, 1];
  const prices = [
    {
      name: "R1 to R500",
      value: "1-500",
    },
    {
      name: "R501 to R1000",
      value: "501-1000",
    },
    {
      name: "R1001 to R2000",
      value: "1001-2000",
    },
    {
      name: "R2001 to R3000",
      value: "2001-3000",
    },
  ];
  return (
    <Drawer direction='left'>
      <DrawerTrigger className='flex rounded-full gap-2 bg-black py-2 px-4 text-white items-center text-sm justify-between'>
        Filters
        <SlidersHorizontal size={15} />
      </DrawerTrigger>
      <DrawerContent className='h-full max-w-[85%] rounded-none'>
        <DrawerHeader className='border-b'>
          <DrawerTitle className='text-xl'>Filters</DrawerTitle>
        </DrawerHeader>
        <div className='px-6 py-4 overflow-y-auto'>
          {/* Categories Filter */}
          <FilterSection title='Department'>
            <ul className='space-y-2'>
              <li>
                <Link
                  className={`block py-1 ${currentCategory === "all" || currentCategory === "" ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                  href={getFilterUrl({ c: "all" })}>
                  Any
                </Link>
              </li>
              {categories.map((x) => (
                <li key={x.category}>
                  <Link
                    className={`block py-1 ${currentCategory === x.category ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                    href={getFilterUrl({ c: `${x.category}` })}>
                    {x.category}
                  </Link>
                </li>
              ))}
            </ul>
          </FilterSection>

          {/* Price Filter */}
          <FilterSection title='Price'>
            <ul className='space-y-2'>
              <li>
                <Link
                  className={`block py-1 ${currentPrice === "all" ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                  href={getFilterUrl({ p: "all" })}>
                  Any
                </Link>
              </li>
              {prices.map((x) => (
                <li key={x.value}>
                  <Link
                    className={`block py-1 ${currentPrice === x.value ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                    href={getFilterUrl({ p: `${x.value}` })}>
                    {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection title='Customer Rating'>
            <ul className='space-y-2'>
              <li>
                <Link
                  className={`block py-1 ${currentRating === "all" ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                  href={getFilterUrl({ r: "all" })}>
                  Any
                </Link>
              </li>
              {ratings.map((r) => (
                <li key={r}>
                  <Link
                    className={`block py-1 ${currentRating === r.toString() ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                    href={getFilterUrl({ r: `${r}` })}>
                    {`${r} stars & up`}
                  </Link>
                </li>
              ))}
            </ul>
          </FilterSection>
        </div>
        <DrawerClose className='absolute top-4 right-4'>
          <Button variant='outline' size='icon' className='rounded-full'>
            <CircleX size={18} />
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileFilterDrawer;
