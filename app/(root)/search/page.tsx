/** @format */
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/shared/product/product-card";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/products.actions";
import { Product } from "@/types";
import Link from "next/link";

import { Suspense } from "react";
import ActiveFilters from "./ActiveFilters";
import MobileFilterDrawer from "./MobileFilterDrawer";
import MobileSortDrawer from "./MobileSortDrawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Pagination from "@/components/ui/shared/pagination";
import SearchResultsSkeleton from "@/components/ui/shared/product/SearchResultsSkeleton";
import FilterSkeleton from "@/components/ui/shared/product/FilterSkeleton";

const prices = [
  {
    name: "R1 to R500",
    value: "1-500",
  },
  {
    name: "R501 to R1000",
    value: "501-1000",
  },
  {
    name: "R1001 to R2000",
    value: "1001-2000",
  },
  {
    name: "R2001 to R3000",
    value: "2001-3000",
  },
];

const ratings = [4, 3, 2, 1];

const sortOrders = [
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Price: Low to High" },
  { value: "highest", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ""}  ${
        isCategorySet ? ": Category " + category : ""
      } ${isPriceSet ? ": Price" + price : ""} ${
        isRatingSet ? ": Rating" + rating : ""
      }`,
    };
  }

  return {
    title: "Search Products",
  };
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    page = "1",
    price = "all",
    rating = "all",
    sort = "newest",
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, page, price, rating, sort };

    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const [products, categories] = await Promise.all([
    getAllProducts({
      page: Number(page),
      query: q,
      category,
      price,
      rating,
      sort,
    }),
    getAllCategories(),
  ]);

  // Prepare active filters for display
  const activeFilters = [];
  if (q !== "all" && q.trim() !== "") {
    activeFilters.push({ key: "q", value: q, label: "Query" });
  }
  if (category !== "all" && category.trim() !== "") {
    activeFilters.push({ key: "category", value: category, label: "Category" });
  }
  if (price !== "all" && price.trim() !== "") {
    const priceLabel = prices.find((p) => p.value === price)?.name || price;
    activeFilters.push({ key: "price", value: priceLabel, label: "Price" });
  }
  if (rating !== "all" && rating.trim() !== "") {
    activeFilters.push({
      key: "rating",
      value: `${rating} stars & up`,
      label: "Rating",
    });
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
        {/* Desktop Filters */}
        <aside className='hidden lg:block'>
          <Suspense fallback={<FilterSkeleton />}>
            <div className='bg-white rounded-lg border p-4 shadow-sm sticky top-4'>
              <h2 className='text-xl font-bold mb-4'>Filters</h2>

              {/* Categories Accordion */}
              <Accordion
                type='single'
                collapsible
                defaultValue='department'
                className='mb-4'>
                <AccordionItem value='department'>
                  <AccordionTrigger className='font-medium'>
                    Department
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <ul className='space-y-2'>
                        <li>
                          <Link
                            className={`block py-1 ${category === "all" || category === "" ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                            href={getFilterUrl({ c: "all" })}>
                            Any
                          </Link>
                        </li>
                        {categories.map((x) => (
                          <li key={x.category}>
                            <Link
                              className={`block py-1 ${category === x.category ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                              href={getFilterUrl({ c: `${x.category}` })}>
                              {x.category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Price Accordion */}
              <Accordion
                type='single'
                collapsible
                defaultValue='price'
                className='mb-4'>
                <AccordionItem value='price'>
                  <AccordionTrigger className='font-medium'>
                    Price
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <ul className='space-y-2'>
                        <li>
                          <Link
                            className={`block py-1 ${price === "all" ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                            href={getFilterUrl({ p: "all" })}>
                            Any
                          </Link>
                        </li>
                        {prices.map((x) => (
                          <li key={x.value}>
                            <Link
                              className={`block py-1 ${price === x.value ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                              href={getFilterUrl({ p: `${x.value}` })}>
                              {x.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Rating Accordion */}
              <Accordion type='single' collapsible defaultValue='rating'>
                <AccordionItem value='rating'>
                  <AccordionTrigger className='font-medium'>
                    Customer Rating
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <ul className='space-y-2'>
                        <li>
                          <Link
                            className={`block py-1 ${rating === "all" ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                            href={getFilterUrl({ r: "all" })}>
                            Any
                          </Link>
                        </li>
                        {ratings.map((r) => (
                          <li key={r}>
                            <Link
                              className={`block py-1 ${rating === r.toString() ? "font-bold text-black" : "text-gray-700 hover:text-black"}`}
                              href={getFilterUrl({ r: `${r}` })}>
                              {`${r} stars & up`}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </Suspense>
        </aside>

        {/* Main Content */}
        <div className='lg:col-span-3 space-y-6'>
          {/* Header with filters and sorting */}
          <div className='bg-white rounded-lg border p-4 shadow-sm'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
              <div>
                <h1 className='text-2xl font-bold'>Search Results</h1>
                {products.data.length > 0 && (
                  <p className='text-sm text-muted-foreground my-1'>
                    {products.data.length} products found
                  </p>
                )}
              </div>

              <div className='flex items-center gap-2'>
                {/* Mobile Filters */}
                <div className='lg:hidden flex gap-2'>
                  <MobileFilterDrawer
                    categories={categories}
                    getFilterUrl={getFilterUrl}
                    currentCategory={category}
                    currentPrice={price}
                    currentRating={rating}
                  />
                  <MobileSortDrawer
                    getFilterUrl={getFilterUrl}
                    currentSort={sort}
                  />
                </div>

                {/* Desktop Sort */}
                <div className='hidden lg:flex items-center gap-2'>
                  <span className='text-sm font-medium'>Sort by:</span>
                  <div className='flex gap-1'>
                    {sortOrders.map((s) => (
                      <Link
                        key={s.value}
                        className={`px-3 py-1 text-sm rounded-full ${sort === s.value ? "bg-black text-white font-medium" : "text-gray-600 hover:bg-gray-100"}`}
                        href={getFilterUrl({ s: `${s.value}` })}>
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <ActiveFilters filters={activeFilters} clearUrl='/search' />
          </div>

          {/* Products Grid */}
          <Suspense fallback={<SearchResultsSkeleton />}>
            {products.data.length > 0 ? (
              <>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {products.data.map((product: Product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {products.totalPages > 1 && (
                  <div className='mt-8'>
                    {products.totalPages > 1 && (
                      <Pagination
                        page={Number(page) || 1}
                        totalPages={products.totalPages}
                      />
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className='bg-white rounded-lg border p-8 text-center shadow-sm mb-2'>
                <div className='mx-auto max-w-md'>
                  <h3 className='text-xl font-semibold mb-2'>
                    No products found
                  </h3>
                  <p className='text-muted-foreground mb-4'>
                    Try adjusting your search filters or search for something
                    else.
                  </p>
                  <Link href='/search'>
                    <Button>Clear all filters</Button>
                  </Link>
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
