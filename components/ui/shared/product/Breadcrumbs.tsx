/** @format */

import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs = ({
  collectionName,
  categoryName,
  productName,
  subCategoryName,
}: {
  collectionName?: string;
  categoryName?: string;
  productName?: string;
  subCategoryName?: string;
}) => {
  return (
    <div className='border-b border-gray-100 mb-2 text-xs'>
      <Breadcrumb className='mb-3'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className='text-xs' href='/'>
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {collectionName && (
            <>
              <BreadcrumbSeparator>
                <ChevronsRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link
                    className='text-xs'
                    href={`/collections/${collectionName.toLowerCase()}`}>
                    {collectionName}
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {categoryName && collectionName && (
            <>
              <BreadcrumbSeparator>
                <ChevronsRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link
                    className='text-xs'
                    href={`/collections/${collectionName.toLowerCase()}/${categoryName.toLowerCase()}`}>
                    {categoryName}
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {subCategoryName && collectionName && categoryName && (
            <>
              <BreadcrumbSeparator>
                <ChevronsRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link
                    className='text-xs'
                    href={`/collections/${collectionName.toLowerCase()}/${categoryName.toLowerCase()}/${subCategoryName.toLowerCase()}`}>
                    {subCategoryName}
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {productName && (
            <>
              <BreadcrumbSeparator>
                <ChevronsRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className='text-xs'>
                  {productName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
