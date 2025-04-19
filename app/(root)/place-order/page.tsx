/** @format */
import { Metadata } from "next";
import CheckoutSteps from "@/components/ui/shared/checkout-steps";
import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.action";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import PlaceOrderForm from "./place-order-form";
export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrder = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found!!");

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect("/cart");

  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className='py-4 text-2xl'>Place Order</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='md:col-span-2 overflow-x-auto spaace-y-4 gap-4'>
          <Card>
            <CardContent className='p-4 gap-2'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city}
                {userAddress.postalCode}, {userAddress.country}
              </p>
              <div className='mt-3'>
                <Link href='/shipping-address'>
                  <Button className='outline'>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='mt-4'>
            <CardContent className='p-4 gap-2'>
              <h2 className='text-xl pb-4'>Payment Method</h2>
              <p>{user.paymentMethod}</p>

              <div className='mt-3'>
                <Link href='/payment-method'>
                  <Button className='outline'>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className='mt-4'>
            <CardContent className='p-4 gap-2'>
              <h2 className='text-xl pb-4'>Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quanity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((Item) => (
                    <TableRow key={Item.slug}>
                      <TableCell>
                        <Link
                          className='flex gap-2 items-center'
                          href={`product/${Item.slug}`}>
                          <Image
                            src={Item.image}
                            alt={Item.name}
                            width={40}
                            height={40}
                          />
                          <span className='px-2'>{Item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className='text-center'>
                        {" "}
                        <span className='px-2'>{Item.qty}</span>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <span className='px-2'>
                          {formatCurrency(Item.price)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Tax</div>
                <div>{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Shipping</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Total</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>
              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
