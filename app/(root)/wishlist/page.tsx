/** @format */

import { auth } from "@/auth";
import ProductCard from "@/components/ui/shared/product/product-card";
import { getUserById } from "@/lib/actions/user.action";
import { Product } from "@/types";

type WishlistItem = {
  id: string;
  userId: string;
  productSlug: string;
  createdAt: Date;
  product: Product;
};
const Wishlist = async () => {
  const session = await auth();

  if (!session) throw new Error("Please log in ");

  const user = await getUserById(session?.user?.id || "");

  return (
    <div>
      {user.Wishlist.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
          {user.Wishlist.map((product: WishlistItem) => (
            <ProductCard key={product.product.slug} product={product.product} />
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

export default Wishlist;
