/** @format */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowDownWideNarrow, CircleX } from "lucide-react";
import Link from "next/link";
function MobileSortDrawer({
  getFilterUrl,
  currentSort,
}: {
  getFilterUrl: (params: { s?: string }) => string;
  currentSort: string;
}) {
  const sortOrders = [
    { value: "newest", label: "Newest" },
    { value: "lowest", label: "Price: Low to High" },
    { value: "highest", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  return (
    <Drawer direction='left'>
      <DrawerTrigger className='flex rounded-full gap-2 bg-black py-2 px-4 text-white items-center text-sm justify-between'>
        Sort <ArrowDownWideNarrow size={15} />
      </DrawerTrigger>
      <DrawerContent className='h-full max-w-[85%] rounded-none'>
        <DrawerHeader className='border-b'>
          <DrawerTitle className='text-xl'>Sort By</DrawerTitle>
        </DrawerHeader>
        <div className='px-6 py-4 flex flex-col space-y-3'>
          {sortOrders.map((s) => (
            <Link
              key={s.value}
              className={`py-2 px-3 rounded-lg ${currentSort === s.value ? "bg-blue-50 font-medium text-black" : "text-gray-700 hover:bg-gray-50"}`}
              href={getFilterUrl({ s: `${s.value}` })}>
              {s.label}
            </Link>
          ))}
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

export default MobileSortDrawer;
