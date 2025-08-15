/** @format */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../button";
import { formURLQuery } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const SearchParams = useSearchParams();

  const handleClick = async (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;
    const newURL = formURLQuery({
      params: SearchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newURL);
  };

  return (
    <div className='flex gap-2'>
      <Button
        size='lg'
        variant='outline'
        className='w-28'
        disabled={Number(page) <= 1}
        onClick={() => handleClick("prev")}>
        <ChevronsLeft />
      </Button>
      <Button
        size='lg'
        variant='outline'
        className='w-28'
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick("next")}>
        <ChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;
