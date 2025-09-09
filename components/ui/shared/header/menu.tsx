/** @format */

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
import UserButton from "./user-button";
import CartCount from "./cart-count";

const Menu = () => {
  return (
    <div className='flex justify-end gap-4 items-center'>
      <nav className='flex w-full max-w-xs gap-4 items-center'>
        {/* <ModeToggle /> */}

        {/* Cart Link with Improved Styling */}
        <Link href='/cart' className='relative group'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 rounded-full border bg-white font-bold text-black hover:bg-gray-100'>
            <ShoppingBag className='h-10 w-10 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors' />
            <CartCount />
          </Button>
        </Link>

        <UserButton />
      </nav>

      {/* Mobile Menu */}
      {/* <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='h-10 w-10 rounded-full'>
              <EllipsisVertical className='h-5 w-5' />
            </Button>
          </SheetTrigger>
          <SheetContent className='flex flex-col gap-6 pt-10'>
            <SheetHeader className='text-left'>
              <SheetTitle className='text-2xl'>Menu</SheetTitle>
              <SheetDescription className='text-lg'>
                Quick navigation
              </SheetDescription>
            </SheetHeader>

            <div className='flex flex-col gap-4 mt-4'>
              <div className='flex items-center gap-3'>
                <ModeToggle />
                <span className='text-lg'>Theme</span>
              </div>

              <Button
                asChild
                variant='ghost'
                className='justify-start h-12 px-4 text-lg'>
                <Link href='/cart' className='flex items-center gap-3 w-full'>
                  <ShoppingCart className='h-5 w-5' />
                  <span>Cart</span>
                  <div className='ml-auto'>
                    <CartCount />
                  </div>
                </Link>
              </Button>

              <div className='flex items-center gap-3 px-4 h-12'>
                <UserButton />
                <span className='text-lg'>Account</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav> */}
    </div>
  );
};

export default Menu;
