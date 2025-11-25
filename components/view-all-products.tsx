/** @format */

import Link from "next/link";
import { Button } from "./ui/button";

const ViewAllProducts = () => {
  return (
    <div className='my-4 w-full flex items-center justify-center'>
      <Button
        asChild
        className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'>
        <Link href='/search'>View All Products</Link>
      </Button>
    </div>
  );
};

export default ViewAllProducts;
