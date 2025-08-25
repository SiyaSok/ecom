/** @format */

import { Product } from "@/types";
import ProductCard from "./product-card";

const ProductList = ({
  data,
  title,
  limit,
  productCount,
}: {
  data: Product[];
  title?: string;
  limit?: number;
  productCount?: number;
}) => {
  const limitData = limit ? data.slice(0, limit) : data;

  return (
    <div className='my-10'>
      {title && (
        <h2 className='h2-bold mb-4'>
          {title}{" "}
          {productCount && (
            <span className='text-xl text-gray-400 font-normal'>
              {productCount} items
            </span>
          )}
        </h2>
      )}
      {limitData.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
          {limitData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No product found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
