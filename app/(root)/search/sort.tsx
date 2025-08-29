/** @format */

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface SortProps {
  sort: string;
  sortOrders: string[];
}

export default function Sort({ sort, sortOrders }: SortProps) {
  const router = useRouter();

  const handleSortChange = (value: string) => {
    // Get current URL search params
    const params = new URLSearchParams(window.location.search);
    params.set("sort", value);

    // Navigate to the new URL
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Select value={sort} onValueChange={handleSortChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        {sortOrders.map((s) => (
          <SelectItem key={s} value={s}>
            <span className={`mx-2 ${sort === s ? "font-bold" : ""}`}>{s}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
