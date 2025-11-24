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
import { getAllSubCategories } from "@/lib/actions/subcategory-action";
import { rquireAdmin } from "@/lib/auth-guard";
import { formatDateTime, formatId } from "@/lib/utils";
import { SquarePen, Tags, Layers, Package, Hash } from "lucide-react";
import Link from "next/link";

const SubCategoriesPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await rquireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";

  const categories = await getAllSubCategories({});

  // Calculate stats from subcategory data
  const totalSubCategories = categories.data.length;
  const totalCharacters = categories.data.reduce(
    (acc, category) => acc + (category.description?.length || 0),
    0
  );
  const averageDescriptionLength =
    Math.round(totalCharacters / totalSubCategories) || 0;

  // Get subcategory color
  const getSubCategoryColor = (index: number) => {
    const colors = [
      {
        bg: "bg-teal-500/20",
        text: "text-teal-300",
        border: "border-teal-500/20",
      },
      {
        bg: "bg-indigo-500/20",
        text: "text-indigo-300",
        border: "border-indigo-500/20",
      },
      {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/20",
      },
      {
        bg: "bg-rose-500/20",
        text: "text-rose-300",
        border: "border-rose-500/20",
      },
    ];
    return colors[index % colors.length];
  };

  // Get icon for subcategory
  const getSubCategoryIcon = (name: string) => {
    if (
      name.toLowerCase().includes("heel") ||
      name.toLowerCase().includes("shoe")
    )
      return "👠";
    if (
      name.toLowerCase().includes("bag") ||
      name.toLowerCase().includes("purse")
    )
      return "👜";
    if (name.toLowerCase().includes("dress")) return "👗";
    if (
      name.toLowerCase().includes("jean") ||
      name.toLowerCase().includes("pant")
    )
      return "👖";
    if (
      name.toLowerCase().includes("top") ||
      name.toLowerCase().includes("shirt")
    )
      return "👕";
    if (
      name.toLowerCase().includes("jewel") ||
      name.toLowerCase().includes("ring")
    )
      return "💍";
    if (name.toLowerCase().includes("accessory")) return "👓";
    return "🏷️";
  };

  // Get description excerpt
  const getDescriptionExcerpt = (
    description: string,
    maxLength: number = 60
  ) => {
    if (!description) return "No description available";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div className='space-y-6'>
      {/* Cool Hero Header */}
      <section className='relative bg-gradient-to-br  from-slate-900 via-black to-slate-900  rounded-2xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-600/20 via-transparent to-transparent'></div>

        {/* Floating Icons */}
        {/* <div className='absolute top-10 left-10 w-20 h-20 bg-teal-500/10 rounded-full backdrop-blur-sm border border-teal-500/20 flex items-center justify-center'>
          <Tags className='w-8 h-8 text-teal-300' />
        </div>
        <div className='absolute bottom-10 right-10 w-16 h-16 bg-indigo-500/10 rounded-full backdrop-blur-sm border border-indigo-500/20 flex items-center justify-center'>
          <FolderTree className='w-6 h-6 text-indigo-300' />
        </div> */}
        <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <Layers className='w-5 h-5 text-blue-300' />
        </div>

        {/* Main Content */}
        <div className='relative max-w-7xl mx-auto px-6 py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            {/* Text Content */}
            <div className='space-y-6'>
              <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2'>
                  <Tags className='w-4 h-4 text-teal-300' />
                  <span className='text-sm text-teal-200 font-medium'>
                    Subcategory Management
                  </span>
                </div>

                <h1 className='text-4xl lg:text-5xl font-bold text-white tracking-tight'>
                  Product{" "}
                  <span className=' text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400'>
                    Subcategories
                  </span>
                </h1>

                <p className='text-lg text-gray-300 max-w-lg'>
                  Organize your products with detailed subcategories. Create
                  specific product groupings that help customers find exactly
                  what they`&apos;`re looking for with precision and ease.
                </p>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {totalSubCategories}
                  </div>
                  <div className='text-sm text-gray-400'>
                    Total Subcategories
                  </div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {averageDescriptionLength}
                  </div>
                  <div className='text-sm text-gray-400'>Avg Desc Length</div>
                </div>

                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {Math.round(
                      (categories.data.filter(
                        (cat) => (cat.description ?? "").length > 0
                      ).length /
                        totalSubCategories) *
                        100
                    )}
                    %
                  </div>
                  <div className='text-sm text-gray-400'>With Descriptions</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='flex gap-4'>
                <Button
                  asChild
                  className='bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 border-0 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                  <Link href={"/admin/subcategories/create"}>
                    Create New Subcategory
                  </Link>
                </Button>
                {/* <Button
                  variant='outline'
                  className='border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold backdrop-blur-sm'>
                  Category Analytics
                </Button> */}
              </div>
            </div>

            {/* Subcategory Cards Preview */}
            <div className='relative'>
              <div className='space-y-4'>
                {categories.data.slice(0, 3).map((category, index) => {
                  const color = getSubCategoryColor(index);
                  return (
                    <div
                      key={category.id}
                      className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 group'>
                      <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-3 flex-1 min-w-0'>
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${color.bg} ${color.border}`}>
                            <span className='text-xl'>
                              {getSubCategoryIcon(category.name)}
                            </span>
                          </div>

                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2 mb-1'>
                              <h3 className='font-semibold text-white text-sm group-hover:text-teal-200 transition-colors truncate'>
                                {category.name}
                              </h3>
                              <code className='text-xs text-gray-400 bg-white/10 px-1.5 py-0.5 rounded'>
                                /{category.slug}
                              </code>
                            </div>

                            <p className='text-xs text-gray-400 line-clamp-2 mb-2'>
                              {getDescriptionExcerpt(
                                category.description ?? ""
                              )}
                            </p>

                            <div className='flex items-center gap-4'>
                              <div className='flex items-center gap-1 text-xs text-gray-400'>
                                <Hash className='w-3 h-3' />
                                <span>{formatId(category.id)}</span>
                              </div>
                              <div className='flex items-center gap-1 text-xs text-gray-400'>
                                <Package className='w-3 h-3' />
                                <span>
                                  UPDATED{" "}
                                  {
                                    formatDateTime(
                                      category.updatedAt ?? new Date()
                                    ).dateOnly
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-teal-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse delay-1000'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <h1 className='h2-bold'>All Subcategories</h1>
            {searchText && (
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600'>
                  Filtered by <i>&quot;{searchText}&quot;</i>
                </span>
                <Link href={"/admin/subcategories"}>
                  <Button variant='outline' size='sm'>
                    Remove Filter
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className='flex items-center gap-4'>
            <div className='text-sm text-gray-600'>
              Showing {categories.data.length} of {totalSubCategories}{" "}
              subcategories
            </div>
            <Button asChild variant='outline' size={"lg"}>
              <Link
                href={"/admin/subcategories/create"}
                className='flex items-center gap-2'>
                <Tags className='w-4 h-4' />
                Create Subcategory
              </Link>
            </Button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SUBCATEGORY ID</TableHead>
                <TableHead>SUBCATEGORY</TableHead>
                <TableHead>SLUG</TableHead>
                <TableHead>DESCRIPTION</TableHead>
                <TableHead>CREATED</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.data.map((category) => {
                const color = getSubCategoryColor(
                  categories.data.indexOf(category) % 4
                );
                return (
                  <TableRow key={category.id} className='hover:bg-gray-50/50'>
                    <TableCell className='font-mono text-sm'>
                      {formatId(category.id)}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.bg}`}>
                          <span className='text-lg'>
                            {getSubCategoryIcon(category.name)}
                          </span>
                        </div>
                        <div>
                          <div className='font-medium'>{category.name}</div>
                          <div className='text-xs text-gray-500'>
                            ID: {formatId(category.id)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className='text-sm bg-gray-100 px-2 py-1 rounded text-gray-700'>
                        /{category.slug}
                      </code>
                    </TableCell>
                    <TableCell className='max-w-md'>
                      <div className='text-sm text-gray-600'>
                        {category.description ? (
                          <div className='space-y-1'>
                            <p className='line-clamp-2'>
                              {category.description}
                            </p>
                            <div className='flex items-center gap-2 text-xs text-gray-400'>
                              <span>
                                {category.description.length} characters
                              </span>
                              {category.description.length > 100 && (
                                <span className='bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-xs'>
                                  Detailed
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className='text-gray-400 italic'>
                            No description provided
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>
                          {formatDateTime(category.createdAt).dateOnly}
                        </span>
                        <span className='text-xs text-gray-500'>
                          {formatDateTime(category.createdAt).timeOnly}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className='flex gap-2'>
                        <Button size='sm' variant='outline'>
                          <Link href={`/admin/subcategories/${category.id}`}>
                            <SquarePen className='w-4 h-4' />
                          </Link>
                        </Button>
                        {/* <DeleteDialog id={category.id} action={deleteSubCategory} /> */}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </div>
  );
};

export default SubCategoriesPage;
