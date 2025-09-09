/** @format */

import { cn } from "@/lib/utils";
const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const stringValue = value.toFixed(2);

  const [intValue, floatValue] = stringValue.split(".");

  return (
    <p className={cn("text-xl md:text-xl", className)}>
      <span className='text-xs align-super mt-1'>R</span>
      {intValue}
      <span className='text-sm align-super mt-1'>.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
