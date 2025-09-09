/** @format */
"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type SortSelectProps = {
  sortOrders: string[];
  onChange: (value: string) => void;
};

export default function SortSelect({ sortOrders, onChange }: SortSelectProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        {sortOrders.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
