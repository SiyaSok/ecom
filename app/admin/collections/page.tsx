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
import { getAllCollections } from "@/lib/actions/collection-action";
import { rquireAdmin } from "@/lib/auth-guard";
import { formatDateTime, formatId } from "@/lib/utils";
import { SquarePen, Layers, Package, Tag, Image } from "lucide-react";
import Link from "next/link";
// import Image from "next/image";

const CollectionsPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await rquireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";

  const collections = await getAllCollections({
    // page: page,
    // query: searchText,
  });

  // Calculate stats from collection data
  const totalCollections = collections.data.length;
  const totalProducts = collections.data.reduce(
    (acc, collection) =>
      acc +
      (collection.categories?.reduce(
        (catAcc, category) => catAcc + (category.products?.length || 0),
        0
      ) || 0),
    0
  );
  const totalCategories = collections.data.reduce(
    (acc, collection) => acc + (collection.categories?.length || 0),
    0
  );

  // Get product count for collection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getProductCount = (collection: any) => {
    return (
      collection.categories?.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: number, category: any) => acc + (category.products?.length || 0),
        0
      ) || 0
    );
  };

  // Get category count for collection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCategoryCount = (collection: any) => {
    return collection.categories?.length || 0;
  };

  return (
    <div className='space-y-6'>
      {/* Cool Hero Header */}
      <section className='relative bg-gradient-to-br  from-slate-900 via-black to-slate-900  rounded-2xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent'></div>
        <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <Tag className='w-5 h-5 text-blue-300' />
        </div>

        {/* Main Content */}
        <div className='relative max-w-7xl mx-auto px-6 py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            {/* Text Content */}
            <div className='space-y-6'>
              <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2'>
                  <Layers className='w-4 h-4 text-green-300' />
                  <span className='text-sm text-green-200 font-medium'>
                    Collection Management
                  </span>
                </div>

                <h1 className='text-4xl lg:text-5xl font-bold text-white tracking-tight'>
                  Product{" "}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400'>
                    Collections
                  </span>
                </h1>

                <p className='text-lg text-gray-300 max-w-lg'>
                  Organize your products into beautiful collections. Create
                  curated shopping experiences and showcase your products in
                  meaningful categories that drive engagement and sales.
                </p>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {totalCollections}
                  </div>
                  <div className='text-sm text-gray-400'>Collections</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {totalProducts}
                  </div>
                  <div className='text-sm text-gray-400'>Total Products</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {totalCategories}
                  </div>
                  <div className='text-sm text-gray-400'>Categories</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='flex gap-4'>
                <Button
                  asChild
                  className='bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-0 text-white px-8 py-3  font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                  <Link href={"/admin/collections/create"}>
                    Create New Collection
                  </Link>
                </Button>
                {/* <Button
                  variant='outline'
                  className='border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold backdrop-blur-sm'>
                  View Analytics
                </Button> */}
              </div>
            </div>

            {/* Collection Cards Preview */}
            <div className='relative'>
              <div className='space-y-4'>
                {collections.data.slice(0, 3).map((collection) => {
                  const productCount = getProductCount(collection);
                  const categoryCount = getCategoryCount(collection);

                  return (
                    <div
                      key={collection.id}
                      className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 group'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-3 flex-1 min-w-0'>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='font-semibold text-white text-sm group-hover:text-blue-200 transition-colors truncate'>
                                {collection.name}
                              </h3>
                              <span className='text-xs text-gray-400'>
                                /{collection.slug}
                              </span>
                            </div>

                            <p className='text-xs text-gray-400 line-clamp-2 mb-2'>
                              {collection.description ||
                                "No description available"}
                            </p>

                            <div className='flex items-center gap-4'>
                              <div className='flex items-center gap-1 text-xs text-gray-400'>
                                <Package className='w-3 h-3' />
                                <span>{productCount} products</span>
                              </div>
                              <div className='flex items-center gap-1 text-xs text-gray-400'>
                                <Layers className='w-3 h-3' />
                                <span>{categoryCount} categories</span>
                              </div>
                              {collection.images &&
                                collection.images.length > 0 && (
                                  <div className='flex items-center gap-1 text-xs text-gray-400'>
                                    <Image className='w-3 h-3' />
                                    <span>
                                      {collection.images.length} images
                                    </span>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse delay-1000'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {searchText && (
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600'>
                  Filtered by <i>&quot;{searchText}&quot;</i>
                </span>
                <Link href={"/admin/collections"}>
                  <Button variant='outline' size='sm'>
                    Remove Filter
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>COLLECTION</TableHead>
                <TableHead>SLUG</TableHead>
                <TableHead>DESCRIPTION</TableHead>
                <TableHead>CATEGORIES</TableHead>
                <TableHead>PRODUCTS</TableHead>
                <TableHead>CREATED AT</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.data.map((collection) => {
                const productCount = getProductCount(collection);
                const categoryCount = getCategoryCount(collection);

                return (
                  <TableRow key={collection.id} className='hover:bg-gray-50/50'>
                    <TableCell className='font-mono text-sm'>
                      {formatId(collection.id)}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-500 flex items-center justify-center'>
                          <Package className='w-5 h-5 text-white' />
                        </div>
                        <div>
                          <div className='font-medium'>{collection.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className='text-sm bg-gray-100 px-2 py-1 rounded'>
                        /{collection.slug}
                      </code>
                    </TableCell>
                    <TableCell className='max-w-xs'>
                      <div className='text-sm text-gray-600 line-clamp-2'>
                        {collection.description || (
                          <span className='text-gray-400 italic'>
                            No description
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Layers className='w-4 h-4 text-blue-500' />
                        <span className='text-sm font-medium'>
                          {categoryCount}
                        </span>
                        <div className='flex flex-wrap gap-1'>
                          {collection.categories
                            ?.slice(0, 2)
                            .map((category) => (
                              <span
                                key={category.id}
                                className='inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full'>
                                {category.name}
                              </span>
                            ))}
                          {collection.categories &&
                            collection.categories.length > 2 && (
                              <span className='inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full'>
                                +{collection.categories.length - 2} more
                              </span>
                            )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <Package className='w-4 h-4 text-green-500' />
                        <span className='text-sm font-medium'>
                          {productCount}
                        </span>
                        <span className='text-xs text-gray-500'>products</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>
                          {formatDateTime(collection.createdAt).dateOnly}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {formatDateTime(collection.createdAt).timeOnly}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <Button size='sm' variant='outline'>
                          <Link href={`/admin/collections/${collection.id}`}>
                            <SquarePen className='w-4 h-4' />
                          </Link>
                        </Button>
                        {/* <DeleteDialog id={collection.id} action={deleteCollection} /> */}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {collections.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={collections.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default CollectionsPage;
