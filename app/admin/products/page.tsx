/** @format */

import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/ui/shared/delete-dialog";
import Pagination from "@/components/ui/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct, getAllProducts } from "@/lib/actions/products.actions";
import { rquireAdmin } from "@/lib/auth-guard";
import { formatCurrency, formatId } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";

const ProductsPage = async (props: {
  searchParams: Promise<{ page: string; query: string; category: string }>;
}) => {
  await rquireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    page: page,
    query: searchText,
    category: category,
  });

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <h1 className='h2-bold'>Proucts</h1>
          {searchText && (
            <div>
              Filted by <i>&quot;{searchText}&quot;</i>{" "}
              <Link href={"/admin/products"}>
                <Button variant='outline' size='sm'>
                  Remove Filter
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Button asChild variant='outline' size={"lg"}>
          <Link href={"/admin/products/create"} className=''>
            Create Product
          </Link>
        </Button>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STOCK</TableHead>
              <TableHead>RATING</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.data.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating.toString()}</TableCell>

                <TableCell>
                  <Button size='sm' variant='outline'>
                    <Link href={`/admin/products/${product.id}`}>
                      <SquarePen />
                    </Link>
                  </Button>
                  <DeleteDialog id={product.id} action={deleteProduct} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {products.totalPages > 1 && (
        <Pagination page={Number(page) || 1} totalPages={products.totalPages} />
      )}
    </div>
  );
};

export default ProductsPage;
