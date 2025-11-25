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
import { SquarePen, TrendingUp, Star, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

  // Calculate stats from product data
  const totalProducts = products.data.length;
  const totalStock = products.data.reduce(
    (acc, product) => acc + product.stock,
    0
  );
  const featuredProducts = products.data.filter(
    (product) => product.isFeatured
  ).length;
  const totalValue = products.data.reduce(
    (acc, product) => acc + parseFloat(product.price),
    0
  );
  const averagePrice = totalValue / totalProducts;

  // Get brand icon
  const getBrandIcon = (brand: string) => {
    const brandIcons: { [key: string]: string } = {
      Adidas: "text-blue-500",
      Asics: "text-red-500",
      PUMA: "text-black",
      Crocs: "text-green-500",
      "Cotton On": "text-orange-500",
      "Sissy Boy": "text-pink-500",
      Luella: "text-purple-500",
      Nike: "text-black",
      InHouse: "text-gray-500",
      Redbat: "text-yellow-500",
    };
    return brandIcons[brand] || "text-gray-400";
  };

  // Get color for product card
  const getProductColor = (index: number) => {
    const colors = [
      {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/20",
      },
      {
        bg: "bg-green-500/20",
        text: "text-green-300",
        border: "border-green-500/20",
      },
      {
        bg: "bg-purple-500/20",
        text: "text-purple-300",
        border: "border-purple-500/20",
      },
      {
        bg: "bg-pink-500/20",
        text: "text-pink-300",
        border: "border-pink-500/20",
      },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className='space-y-6'>
      {/* Cool Hero Header */}
      <section className='relative bg-gradient-to-br  from-slate-900 via-black to-slate-900  rounded-2xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent'></div>

        {/* Floating Icons */}
        {/* <div className='absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <Package className='w-8 h-8 text-blue-300' />
        </div> */}
        <div className='absolute bottom-10 right-10 w-16 h-16 bg-green-500/10 rounded-full backdrop-blur-sm border border-green-500/20 flex items-center justify-center'>
          <TrendingUp className='w-6 h-6 text-green-300' />
        </div>
        {/* <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-purple-500/10 rounded-full backdrop-blur-sm border border-purple-500/20 flex items-center justify-center'>
          <Star className='w-5 h-5 text-purple-300' />
        </div> */}

        {/* Main Content */}
        <div className='relative max-w-7xl mx-auto px-6 py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            {/* Text Content */}
            <div className='space-y-6'>
              <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2'>
                  <ShoppingBag className='w-4 h-4 text-green-300' />
                  <span className='text-sm text-green-200 font-medium'>
                    Product Management
                  </span>
                </div>

                <h1 className='text-4xl lg:text-5xl font-bold text-white tracking-tight'>
                  Product{" "}
                  <span className=' text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400'>
                    Inventory
                  </span>
                </h1>

                <p className='text-lg text-gray-300 max-w-lg'>
                  Manage your entire product catalog with ease. Track inventory,
                  update pricing, and organize products across categories and
                  collections for optimal store performance.
                </p>
              </div>

              {/* Stats */}
              <div className='flex gap-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-white'>
                    {totalProducts}
                  </div>
                  <div className='text-sm text-gray-400'>Total Products</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-white'>
                    {totalStock}
                  </div>
                  <div className='text-sm text-gray-400'>In Stock</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-white'>
                    {featuredProducts}
                  </div>
                  <div className='text-sm text-gray-400'>Featured</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-white'>
                    {formatCurrency(averagePrice.toFixed(2))}
                  </div>
                  <div className='text-sm text-gray-400'>Avg Price</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className='flex gap-4'>
                <Button
                  asChild
                  className='bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-0 text-white px-8 py-3  font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                  <Link href={"/admin/products/create"}>
                    Create New Product
                  </Link>
                </Button>
              </div>
            </div>

            {/* Product Cards Preview */}
            <div className='relative'>
              <div className='grid grid-cols-2 gap-4'>
                {products.data.slice(0, 4).map((product, index) => {
                  const color = getProductColor(index);
                  return (
                    <div
                      key={product.id}
                      className={`bg-white/10 backdrop-blur-sm border ${color.border} rounded-xl p-4 hover:bg-white/15 transition-all duration-300 group ${
                        index === 1 || index === 3
                          ? "transform translate-y-4"
                          : ""
                      }`}>
                      <div className='flex items-center gap-3'>
                        <div className='relative w-12 h-12 rounded-lg overflow-hidden bg-white/20'>
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className='object-cover group-hover:scale-110 transition-transform duration-300'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-semibold text-white text-sm line-clamp-1 group-hover:text-blue-200 transition-colors'>
                            {product.name.split(" ").slice(0, 3).join(" ")}...
                          </h3>
                          <div className='flex items-center justify-between mt-1'>
                            <span className='text-xs text-gray-400'>
                              {product.brand}
                            </span>
                            <span className='text-xs font-semibold text-white'>
                              {formatCurrency(product.price)}
                            </span>
                          </div>
                          <div className='flex items-center gap-2 mt-1'>
                            <span
                              className={`text-xs ${getBrandIcon(product.brand)}`}>
                              ●
                            </span>
                            <span className='text-xs text-gray-400'>
                              Stock: {product.stock}
                            </span>
                            {product.isFeatured && (
                              <Star className='w-3 h-3 text-yellow-400 fill-current' />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse delay-1000'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='space-y-2 '>
        <div className='flex-between'>
          <div className='flex items-center gap-3'>
            {searchText && (
              <div>
                Filtered by <i>&quot;{searchText}&quot;</i>{" "}
                <Link href={"/admin/products"}>
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
                <TableHead>NAME</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>CATEGORY</TableHead>
                <TableHead>BRAND</TableHead>
                <TableHead>STOCK</TableHead>
                <TableHead>RATING</TableHead>
                <TableHead>FEATURED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{formatId(product.id)}</TableCell>
                  <TableCell className='font-medium max-w-xs truncate'>
                    {product.name}
                  </TableCell>
                  <TableCell className='font-semibold'>
                    {formatCurrency(product.price)}
                  </TableCell>
                  <TableCell>
                    <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800'>
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm font-medium text-gray-700'>
                      {product.brand}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        product.stock > 50
                          ? "bg-green-100 text-green-800"
                          : product.stock > 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1'>
                      <Star className='w-3 h-3 text-yellow-400 fill-current' />
                      <span className='text-sm'>
                        {product.rating.toString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.isFeatured ? (
                      <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800'>
                        Featured
                      </span>
                    ) : (
                      <span className='text-xs text-gray-500'>-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button size='sm' variant='outline'>
                        <Link href={`/admin/products/${product.id}`}>
                          <SquarePen className='w-4 h-4' />
                        </Link>
                      </Button>
                      <DeleteDialog id={product.id} action={deleteProduct} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {products.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={products.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
