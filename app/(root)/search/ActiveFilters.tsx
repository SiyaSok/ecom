/** @format */

import { Badge } from "@/components/ui/badge";
import { CircleX } from "lucide-react";
import Link from "next/link";

const ActiveFilters = ({
  filters,
  clearUrl,
}: {
  filters: { key: string; value: string; label: string }[];
  clearUrl: string;
}) => {
  if (filters.length === 0) return null;

  return (
    <div className='flex flex-wrap items-center gap-2 mb-4'>
      <span className='text-sm text-muted-foreground'>Active filters:</span>
      {filters.map((filter) => (
        <Badge
          key={filter.key}
          variant='secondary'
          className='flex items-center gap-1'>
          {filter.label}: {filter.value}
        </Badge>
      ))}
      <Link
        href={clearUrl}
        className='flex items-center text-sm text-black hover:text-blue-800'>
        <CircleX size={16} className='mr-1' />
        Clear all
      </Link>
    </div>
  );
};

export default ActiveFilters;
