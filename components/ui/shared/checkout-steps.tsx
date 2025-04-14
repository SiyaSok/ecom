/** @format */

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronsRight } from "lucide-react";
const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className='flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10'>
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <React.Fragment key={step}>
            <div
              className={cn(
                "p-2 w-56 rounded-full text-sm text-center",
                index === current ? "bg-secondary" : ""
              )}>
              {step}
            </div>
            {step !== "Place Order" && (
              <ChevronsRight className='text-gray-300' />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default CheckoutSteps;
