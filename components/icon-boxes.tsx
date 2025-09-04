/** @format */

import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
  return (
    <div>
      <Card className='border-none'>
        <CardContent className='grid md:grid-cols-4 gap-4 p-4 '>
          <div className='bg-blue-200 p-2 text-start rounded-md flex items-center gap-2'>
            <ShoppingBag className='w-8 h-8' />
            <div>
              <p className='text-sm font-bold'>Free Shipping</p>
              <p className='text-sm text-muted-foreground'>
                Free Shipping order over R600
              </p>
            </div>
          </div>
          <div className='bg-blue-200 p-2 text-start rounded-md flex items-center gap-2'>
            <DollarSign className='w-8 h-8' />
            <div>
              <p className='text-sm font-bold'>Money Back Gurantee</p>
              <p className='text-sm text-muted-foreground'>
                Money back gurantee within 30 days.
              </p>
            </div>
          </div>

          <div className='bg-blue-200 p-2 text-start rounded-md flex items-center gap-2'>
            <WalletCards className='w-8 h-8' />

            <div>
              <p className='text-sm font-bold'>Flexible Payments</p>
              <p className='text-sm text-muted-foreground'>
                Pay with credit card , PayPal or Cash on delivery
              </p>
            </div>
          </div>
          <div className='bg-blue-200 p-2 text-start rounded-md flex items-center gap-2'>
            <Headset className='w-8 h-8' />
            <div>
              <p className='text-sm font-bold'>24/7 Support</p>
              <p className='text-sm text-muted-foreground'>
                Get support anytime
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
