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
import { getCategories } from "@/lib/actions/category-action";
import { rquireAdmin } from "@/lib/auth-guard";
import { formatDateTime, formatId } from "@/lib/utils";
import {
  SquarePen,
  FolderOpen,
  Layers,
  Users,
  Baby,
  School,
} from "lucide-react";
import Link from "next/link";

const CategoriesPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await rquireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";

  const categories = await getCategories({});

  // Calculate stats from the actual data
  const totalCategories = categories.data.length;
  const totalSubCategories = categories.data.reduce(
    (acc, category) => acc + category.subCategories.length,
    0
  );
  const categoriesWithSubCategories = categories.data.filter(
    (cat) => cat.subCategories.length > 0
  ).length;

  // Get icon for category
  const getCategoryIcon = (categoryName: string) => {
    if (categoryName.includes("Ladies")) return <Users className='w-5 h-5' />;
    if (categoryName.includes("Men")) return <Users className='w-5 h-5' />;
    if (categoryName.includes("Baby")) return <Baby className='w-5 h-5' />;
    if (categoryName.includes("School")) return <School className='w-5 h-5' />;
    if (categoryName.includes("Ladies")) return <Users className='w-5 h-5' />;
    return <FolderOpen className='w-5 h-5' />;
  };

  // Get color for category card
  const getCategoryColor = (index: number) => {
    const colors = [
      {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/20",
      },
      {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/20",
      },
      {
        bg: "bg-pink-500/20",
        text: "text-pink-300",
        border: "border-pink-500/20",
      },
      {
        bg: "bg-green-500/20",
        text: "text-green-300",
        border: "border-green-500/20",
      },
      {
        bg: "bg-orange-500/20",
        text: "text-orange-300",
        border: "border-orange-500/20",
      },
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <section className='relative bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-2xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent'></div>

        {/* Floating Icons */}
        {/* <div className='absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <FolderOpen className='w-8 h-8 text-blue-300' />
        </div> */}
        <div className='absolute bottom-10 right-10 w-16 h-16 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <Layers className='w-6 h-6 text-blue-300' />
        </div>
        {/* <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-pink-500/10 rounded-full backdrop-blur-sm border border-pink-500/20 flex items-center justify-center'>
          <Settings className='w-5 h-5 text-pink-300' />
        </div> */}

        {/* Main Content */}
        <div className='relative max-w-7xl mx-auto px-6 py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
            {/* Text Content */}
            <div className='space-y-6'>
              <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2'>
                  <FolderOpen className='w-4 h-4 text-green-300' />
                  <span className='text-sm text-green-200 font-medium'>
                    Category Management
                  </span>
                </div>

                <h1 className='text-4xl lg:text-5xl font-bold text-white tracking-tight'>
                  Product{" "}
                  <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400'>
                    Categories
                  </span>
                </h1>

                <p className='text-lg text-gray-300 max-w-lg'>
                  Manage and organize your product categories across all
                  departments - from Ladies fashion to Kids and Accessories.
                  Create, edit, and maintain your store&apos;s category
                  structure for better product organization.
                </p>
              </div>

              {/* Stats */}
              <div className='flex gap-6'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-white'>
                    {totalCategories}
                  </div>
                  <div className='text-sm text-gray-400'>Main Categories</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-white'>
                    {totalSubCategories}
                  </div>
                  <div className='text-sm text-gray-400'>Sub Categories</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-white'>
                    {categoriesWithSubCategories}
                  </div>
                  <div className='text-sm text-gray-400'>
                    With Subcategories
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className='flex gap-4'>
                <Button
                  asChild
                  className='bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 border-0 text-white px-8 py-3  font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                  <Link href={"/admin/categories/create"}>
                    Create New Category
                  </Link>
                </Button>
              </div>
            </div>

            {/* Category Cards Preview */}
            <div className='relative'>
              <div className='grid grid-cols-2 gap-4'>
                {categories.data.slice(0, 4).map((category, index) => {
                  const color = getCategoryColor(index);
                  return (
                    <div
                      key={category.id}
                      className={`bg-white/10 backdrop-blur-sm border ${color.border} rounded-xl p-4 hover:bg-white/15 transition-all duration-300 group ${
                        index === 1 || index === 3
                          ? "transform translate-y-4"
                          : ""
                      }`}>
                      <div className='flex items-center gap-3'>
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.bg}`}>
                          <div className={color.text}>
                            {getCategoryIcon(category.name)}
                          </div>
                        </div>
                        <div>
                          <h3 className='font-semibold text-white text-sm group-hover:text-blue-200 transition-colors'>
                            {category.name}
                          </h3>
                          <p className='text-xs text-gray-400'>
                            {category.subCategories.length} sub-categories
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floating Elements */}
              <div className='absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse'></div>
              <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/20 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse delay-1000'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div>
        <div className='flex-between'>
          <div className='flex items-center gap-3'>
            {searchText && (
              <div>
                Filted by <i>&quot;{searchText}&quot;</i>{" "}
                <Link href={"/admin/categories"}>
                  <Button variant='outline' size='sm'>
                    Remove Filter
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* <Button asChild variant='outline' size={"lg"}>
              <Link href={"/admin/categories/create"} className=''>
                Create Category
              </Link>
            </Button> */}
        </div>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Sub Categories</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>CREATE AT</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{formatId(category.id)}</TableCell>
                  <TableCell className='font-semibold'>
                    {category.name}
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-wrap gap-1'>
                      {category.subCategories &&
                      category.subCategories.length > 0 ? (
                        category.subCategories.slice(0, 3).map((subCat) => (
                          <span
                            key={subCat.id}
                            className='inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full border'>
                            {subCat.name}
                          </span>
                        ))
                      ) : (
                        <span className='text-gray-400 text-sm'>
                          No sub-categories
                        </span>
                      )}
                      {category.subCategories &&
                        category.subCategories.length > 3 && (
                          <span className='inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full'>
                            +{category.subCategories.length - 3} more
                          </span>
                        )}
                    </div>
                  </TableCell>
                  <TableCell className='text-sm text-gray-600'>
                    {category.slug}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(category.createdAt).dateTime}
                  </TableCell>
                  <TableCell>
                    <Button size='sm' variant='outline'>
                      <Link href={`/admin/categories/${category.id}`}>
                        <SquarePen className='w-4 h-4' />
                      </Link>
                    </Button>
                    {/* <DeleteDialog id={category.id} action={deleteCategory} /> */}
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
    </>
  );
};

export default CategoriesPage;
