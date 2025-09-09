/** @format */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/shared/product/product-card";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/products.actions";
import { Product } from "@/types";
import { ArrowDownWideNarrow, CircleX, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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

const sortOrders = ["newest", "lowest", "highest", "rating"];

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
    title: "Search Page",
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

  // create a  filter url

  const getFilerUrl = ({
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

  const products = await getAllProducts({
    page: Number(page),
    query: q,
    category,
    price,
    rating,
    sort,
  });

  const categories = await getAllCategories();

  return (
    <div className='grid grid-cols-1 md:grid-cols-5 md:gap-2'>
      <div className='hidden md:block filter-links mt-10'>
        {/* Categories Links */}
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Department</AccordionTrigger>
            <AccordionContent>
              <div>
                <ul className='space-y-1'>
                  <li>
                    <Link
                      className={`${
                        (category === "all" || category === "") && "font-bold"
                      }`}
                      href={getFilerUrl({ c: "all" })}>
                      Any
                    </Link>
                  </li>
                  {categories.map((x) => (
                    <li key={x.category}>
                      <Link
                        className={`${category === x.category && "font-bold"}`}
                        href={getFilerUrl({ c: `${x.category}` })}>
                        {x.category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Price Links */}
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>
              <div>
                <ul className='space-y-1'>
                  <li>
                    <Link
                      className={`${price === "all" && "font-bold"}`}
                      href={getFilerUrl({ p: "all" })}>
                      Any
                    </Link>
                  </li>
                  {prices.map((x) => (
                    <li key={x.value}>
                      <Link
                        className={`${price === x.value && "font-bold"}`}
                        href={getFilerUrl({ p: `${x.value}` })}>
                        {x.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Rating Links */}
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Customer Rating</AccordionTrigger>
            <AccordionContent>
              <div>
                <ul className='space-y-1'>
                  <li>
                    <Link
                      className={`${rating === "all" && "font-bold"}`}
                      href={getFilerUrl({ r: "all" })}>
                      Any
                    </Link>
                  </li>
                  {ratings.map((r) => (
                    <li key={r}>
                      <Link
                        className={`${rating === r.toString() && "font-bold"}`}
                        href={getFilerUrl({ r: `${r}` })}>
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

      <div className='space-y-4 md:col-span-4'>
        <div className='flex gap-4 items-center justify-end px-4 mt-2'>
          <div className='md:hidden relative'>
            <Drawer direction='left'>
              <DrawerTrigger className='flex rounded-full gap-2 bg-black py-1 px-2 text-white items-center text-xs justify-between'>
                Filters
                <SlidersHorizontal size={15} />
              </DrawerTrigger>
              <DrawerContent className='h-full max-w-[80%]'>
                <DrawerHeader>
                  <DrawerTitle>Filers</DrawerTitle>
                </DrawerHeader>
                <div className='px-4'>
                  {/* Categories Links */}
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>Department</AccordionTrigger>
                      <AccordionContent>
                        <div>
                          <ul className='space-y-1'>
                            <li>
                              <Link
                                className={`${
                                  (category === "all" || category === "") &&
                                  "font-bold"
                                }`}
                                href={getFilerUrl({ c: "all" })}>
                                Any
                              </Link>
                            </li>
                            {categories.map((x) => (
                              <li key={x.category}>
                                <Link
                                  className={`${category === x.category && "font-bold"}`}
                                  href={getFilerUrl({ c: `${x.category}` })}>
                                  {x.category}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Price Links */}
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>Price</AccordionTrigger>
                      <AccordionContent>
                        <div>
                          <ul className='space-y-1'>
                            <li>
                              <Link
                                className={`${price === "all" && "font-bold"}`}
                                href={getFilerUrl({ p: "all" })}>
                                Any
                              </Link>
                            </li>
                            {prices.map((x) => (
                              <li key={x.value}>
                                <Link
                                  className={`${price === x.value && "font-bold"}`}
                                  href={getFilerUrl({ p: `${x.value}` })}>
                                  {x.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Rating Links */}
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>Customer Rating</AccordionTrigger>
                      <AccordionContent>
                        <div>
                          <ul className='space-y-1'>
                            <li>
                              <Link
                                className={`${rating === "all" && "font-bold"}`}
                                href={getFilerUrl({ r: "all" })}>
                                Any
                              </Link>
                            </li>
                            {ratings.map((r) => (
                              <li key={r}>
                                <Link
                                  className={`${rating === r.toString() && "font-bold"}`}
                                  href={getFilerUrl({ r: `${r}` })}>
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
                <DrawerClose className='absolute top-1 right-1'>
                  <Button variant='outline' className='text-black'>
                    <CircleX />
                  </Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </div>

          <div className='md:hidden relative'>
            <Drawer direction='left'>
              <DrawerTrigger className='flex rounded-full gap-2 bg-black py-1 px-2 text-white items-center text-xs justify-between'>
                Sort <ArrowDownWideNarrow size={15} />
              </DrawerTrigger>
              <DrawerContent className='h-full max-w-[80%]'>
                <DrawerHeader>
                  <DrawerTitle>Sort</DrawerTitle>
                </DrawerHeader>
                <div className='px-4 flex flex-col'>
                  {sortOrders.map((s) => (
                    <Link
                      key={s}
                      className={`mx-2 ${sort === s && "font-bold"}`}
                      href={getFilerUrl({ s: `${s}` })}>
                      {s}
                    </Link>
                  ))}
                </div>
                <DrawerClose className='absolute top-1 right-1'>
                  <Button variant='outline'>
                    <CircleX className='text-black' />
                  </Button>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className='flex-between flex-col md:flex-row my-4'>
          <div className='flex items-center gap-2'>
            {q !== "all" && q !== "" && <Badge>{"Query: " + q}</Badge>}
            {category !== "all" && <Badge>{"Category: " + category}</Badge>}
            {price !== "all" && <Badge>{"Price: " + price}</Badge>}{" "}
            {rating !== "all" && (
              <Badge>{"Rating: " + rating + " stars & up"}</Badge>
            )}{" "}
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            price !== "all" ||
            rating !== "all" ? (
              <Button asChild variant='outline' className='ml-3 py-1'>
                <Link href='/search'>
                  <CircleX />
                </Link>
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className='hidden md:block'>
            {/* Sort */}
            Sort by{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 ${sort === s && "font-bold"}`}
                href={getFilerUrl({ s: `${s}` })}>
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {products.data.length > 0 ? (
            products.data.map((product: Product) => (
              <ProductCard key={product.slug} product={product} />
            ))
          ) : (
            <div>
              <p>No product found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
