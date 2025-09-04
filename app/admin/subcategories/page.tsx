/** @format */

import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/shared/pagination";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { getSubCategories } from "@/lib/actions/subcategory-action";

import { rquireAdmin } from "@/lib/auth-guard";
import { formatDateTime, formatId } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";

const SubCategoriesPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await rquireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";

  const categories = await getSubCategories({});

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <h1 className='h2-bold'>Subcategories</h1>
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
          <Link href={"/admin/subcategories/create"} className=''>
            Create Subcategory
          </Link>
        </Button>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead>CREATE AT </TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.data.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{formatId(category.id)}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell className='w-[500px]'>
                  {category.description}
                </TableCell>
                <TableCell>
                  {formatDateTime(category.createdAt).dateTime}
                </TableCell>
                <TableCell>
                  <Button size='sm' variant='outline'>
                    <Link href={`/admin/subcategories/${category.id}`}>
                      <SquarePen />
                    </Link>
                  </Button>
                  {/* <DeleteDialog id={product.id} action={deleteProduct} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {categories.totalPages > 1 && (
        <Pagination
          page={Number(page) || 1}
          totalPages={categories.totalPages}
        />
      )}
    </div>
  );
};

export default SubCategoriesPage;
