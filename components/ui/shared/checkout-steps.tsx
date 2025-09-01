/** @format */

import React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

const CheckoutSteps = ({ current = 0 }) => {
  const steps = [
    "User Login",
    "Shipping Address",
    "Payment Method",
    "Place Order",
  ];

  return (
    <div className='w-full mb-10'>
      {/* Mobile View */}
      <div className='md:hidden flex flex-col space-y-4'>
        <div className='text-sm font-medium text-center'>
          Step {current + 1} of {steps.length}
        </div>
        <div className='flex items-center justify-center space-x-2'>
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 w-2 rounded-full",
                index <= current ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        <div className='text-center font-medium'>{steps[current]}</div>
      </div>

      {/* Desktop View */}
      <div className='hidden md:flex items-center justify-center'>
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className='flex items-center'>
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium",
                  index < current
                    ? "bg-primary border-primary text-primary-foreground"
                    : index === current
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-background text-muted-foreground"
                )}>
                {index < current ? <Check className='h-4 w-4' /> : index + 1}
              </div>
              <div
                className={cn(
                  "ml-2 text-sm font-medium",
                  index <= current ? "text-foreground" : "text-muted-foreground"
                )}>
                {step}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className='mx-4 flex items-center'>
                <ChevronRight
                  className={cn(
                    "h-5 w-5",
                    index < current ? "text-primary" : "text-muted"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress Bar */}
      <div className='mt-4 hidden md:block'>
        <div className='relative pt-1'>
          <div className='overflow-hidden h-2 text-xs flex rounded bg-muted'>
            <div
              style={{ width: `${((current + 1) / steps.length) * 100}%` }}
              className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-300'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
