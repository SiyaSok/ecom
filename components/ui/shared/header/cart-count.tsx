/** @format */

import { getMyCart } from "@/lib/actions/cart.action";

const CartCount = async () => {
  const cart = await getMyCart();
  const count = cart?.items.length || 0;

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.qty;
  });

  if (count === 0) return null;

  return (
    <span className='absolute top-[-10px] bg-blue-600 right-[-8px] flex items-center justify-center h-5 w-5 text-xs font-bold text-white rounded-full'>
      {totalPrice > 9 ? "9+" : totalPrice}
    </span>
  );
};

export default CartCount;
