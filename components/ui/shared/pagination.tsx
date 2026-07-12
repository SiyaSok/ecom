/** @format */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../button";
import { formURLQuery } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
  className?: string;
};

const Pagination = ({
  page,
  totalPages,
  urlParamName,
  className,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const currentPage = Number(page);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleNavigation = async (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;

    setIsNavigating(true);

    const newURL = formURLQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: newPage.toString(),
    });

    // Small delay for smooth animation
    await new Promise((resolve) => setTimeout(resolve, 300));

    router.push(newURL);
    setIsNavigating(false);
  };

  const pageNumbers = getPageNumbers();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center gap-2 ${className}`}>
      {/* First Page Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size='lg'
          variant='outline'
          className='h-12 w-12 rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group'
          disabled={currentPage <= 1 || isNavigating}
          onClick={() => handleNavigation(1)}>
          <ChevronsLeft className='h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors' />
        </Button>
      </motion.div>

      {/* Previous Page Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size='lg'
          variant='outline'
          className='h-12 w-12 rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group'
          disabled={currentPage <= 1 || isNavigating}
          onClick={() => handleNavigation(currentPage - 1)}>
          <ChevronLeft className='h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors' />
        </Button>
      </motion.div>

      {/* Page Numbers */}
      <div className='flex items-center gap-1 mx-2'>
        <AnimatePresence mode='wait'>
          {isNavigating ? (
            <motion.div
              key='loading'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex items-center gap-1'>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className='w-3 h-3 bg-blue-500 rounded-full'
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key='pages'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='flex items-center gap-1'>
              {pageNumbers.map((pageNum, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}>
                  {pageNum === "ellipsis" ? (
                    <div className='h-10 w-10 flex items-center justify-center text-gray-400'>
                      <MoreHorizontal className='h-4 w-4' />
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}>
                      <Button
                        size='lg'
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        className={`h-10 w-10 rounded-full font-semibold transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                            : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700"
                        }`}
                        onClick={() => handleNavigation(pageNum as number)}
                        disabled={isNavigating}>
                        {pageNum}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Page Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size='lg'
          variant='outline'
          className='h-12 w-12 rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group'
          disabled={currentPage >= totalPages || isNavigating}
          onClick={() => handleNavigation(currentPage + 1)}>
          <ChevronRight className='h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors' />
        </Button>
      </motion.div>

      {/* Last Page Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size='lg'
          variant='outline'
          className='h-12 w-12 rounded-full border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group'
          disabled={currentPage >= totalPages || isNavigating}
          onClick={() => handleNavigation(totalPages)}>
          <ChevronsRight className='h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors' />
        </Button>
      </motion.div>

      {/* Page Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='hidden sm:flex items-center gap-2 ml-4 text-sm text-gray-600'>
        <span className='font-medium'>Page</span>
        <span className='bg-gray-100 px-2 py-1 rounded font-semibold'>
          {currentPage}
        </span>
        <span className='font-medium'>of</span>
        <span className='bg-gray-100 px-2 py-1 rounded font-semibold'>
          {totalPages}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Pagination;
