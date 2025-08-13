/** @format */

import { rquireAdmin } from "@/lib/auth-guard";

const ProductsPage = async () => {
  await rquireAdmin();

  return <>Products Page</>;
};

export default ProductsPage;
