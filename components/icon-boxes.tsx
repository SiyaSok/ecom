/** @format */

import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className='grid md:grid-cols-4 gap-4 p-6'>
          <div className='space-y-2'>
            <ShoppingBag className='w-10 h-10' />
            <div className='text-sm font-bold'>Free Shipping</div>
            <div className='text-sm text-muted-foreground'>
              Free Shipping order over R600
            </div>
          </div>
          <div className='space-y-2'>
            <DollarSign className='w-10 h-10' />
            <div className='text-sm font-bold'>Money Back Gurantee</div>
            <div className='text-sm text-muted-foreground'>
              Money back gurantee within 30 days.
            </div>
          </div>

          <div className='space-y-2'>
            <WalletCards className='w-10 h-10' />
            <div className='text-sm font-bold'>Flexible Payments</div>
            <div className='text-sm text-muted-foreground'>
              Pay with credit card , PayPal or Cash on delivery
            </div>
          </div>
          <div className='space-y-2'>
            <Headset className='w-10 h-10' />
            <div className='text-sm font-bold'>24/7 Support</div>
            <div className='text-sm text-muted-foreground'>
              Get support anytime{" "}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
