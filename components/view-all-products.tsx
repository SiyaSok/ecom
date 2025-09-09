/** @format */

import Link from "next/link";
import { Button } from "./ui/button";

const ViewAllProducts = () => {
  return (
    <div className='my-4 w-full flex items-center justify-center'>
      <Button asChild>
        <Link href='/search'>View All Products</Link>
      </Button>
    </div>
  );
};

export default ViewAllProducts;
