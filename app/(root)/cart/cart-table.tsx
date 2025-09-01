/** @format */
"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import {
  Plus,
  Minus,
  ArrowRight,
  Loader,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Cart } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <div className='max-w-6xl mx-auto px-4 py-4'>
      <div className='flex items-center mb-6'>
        <Button
          variant='ghost'
          onClick={() => router.back()}
          className='flex items-center gap-2 text-muted-foreground hover:text-foreground'>
          <ArrowLeft className='h-4 w-4' />
          Continue Shopping
        </Button>
      </div>

      <h1 className='text-3xl font-bold mb-8'>Your Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 text-center'>
          <div className='rounded-full bg-muted p-6 mb-6'>
            <ShoppingCart className='h-12 w-12 text-muted-foreground' />
          </div>
          <h2 className='text-2xl font-semibold mb-4'>Your cart is empty</h2>
          <p className='text-muted-foreground mb-8 max-w-md'>
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href='/products' className='flex items-center gap-2'>
              Start Shopping
              <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Cart Items - Mobile View */}
          <div className='lg:hidden space-y-4'>
            {cart.items.map((item) => (
              <Card key={item.slug} className='p-4'>
                <div className='flex gap-4'>
                  <div className='relative h-16 w-16 overflow-hidden rounded-md border'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <Link
                      href={`/product/${item.slug}`}
                      className='font-medium hover:underline'>
                      {item.name}
                    </Link>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {formatCurrency(item.price)}
                    </p>

                    <div className='flex items-center justify-between mt-3'>
                      <div className='flex items-center border rounded-md'>
                        <Button
                          disabled={isPending}
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 rounded-r-none'
                          onClick={() =>
                            startTransition(async () => {
                              const res = await removeItemFromCart(
                                item.productId
                              );
                              toast({
                                variant: res.success
                                  ? "default"
                                  : "destructive",
                                description: res.message,
                              });
                            })
                          }>
                          {isPending ? (
                            <Loader className='h-3 w-3 animate-spin' />
                          ) : (
                            <Minus className='h-3 w-3' />
                          )}
                        </Button>
                        <div className='flex h-8 w-10 items-center justify-center border-x'>
                          <span className='text-sm font-medium'>
                            {item.qty}
                          </span>
                        </div>
                        <Button
                          disabled={isPending}
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 rounded-l-none'
                          onClick={() =>
                            startTransition(async () => {
                              const res = await addItemToCart(item);
                              toast({
                                variant: res.success
                                  ? "default"
                                  : "destructive",
                                description: res.message,
                              });
                            })
                          }>
                          {isPending ? (
                            <Loader className='h-3 w-3 animate-spin' />
                          ) : (
                            <Plus className='h-3 w-3' />
                          )}
                        </Button>
                      </div>

                      <div className='text-right font-medium'>
                        {formatCurrency(Number(item.price) * item.qty)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Cart Items - Desktop View */}
          <div className='hidden lg:block flex-1'>
            <Card>
              <CardContent className='p-0'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-1/2'>Product</TableHead>
                      <TableHead className='text-center'>Quantity</TableHead>
                      <TableHead className='text-right'>Price</TableHead>
                      <TableHead className='text-right'>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.items.map((item) => (
                      <TableRow key={item.slug} className='group'>
                        <TableCell>
                          <Link
                            href={`/product/${item.slug}`}
                            className='flex items-center gap-4 hover:opacity-80 transition-opacity'>
                            <div className='relative h-16 w-16 overflow-hidden rounded-md border'>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className='object-cover'
                              />
                            </div>
                            <div>
                              <p className='font-medium'>{item.name}</p>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center justify-center'>
                            <div className='flex items-center border rounded-md'>
                              <Button
                                disabled={isPending}
                                type='button'
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-r-none'
                                onClick={() =>
                                  startTransition(async () => {
                                    const res = await removeItemFromCart(
                                      item.productId
                                    );
                                    toast({
                                      variant: res.success
                                        ? "default"
                                        : "destructive",
                                      description: res.message,
                                    });
                                  })
                                }>
                                {isPending ? (
                                  <Loader className='h-3 w-3 animate-spin' />
                                ) : (
                                  <Minus className='h-3 w-3' />
                                )}
                              </Button>
                              <div className='flex h-8 w-10 items-center justify-center border-x'>
                                <span className='text-sm font-medium'>
                                  {item.qty}
                                </span>
                              </div>
                              <Button
                                disabled={isPending}
                                type='button'
                                variant='ghost'
                                size='icon'
                                className='h-8 w-8 rounded-l-none'
                                onClick={() =>
                                  startTransition(async () => {
                                    const res = await addItemToCart(item);
                                    toast({
                                      variant: res.success
                                        ? "default"
                                        : "destructive",
                                      description: res.message,
                                    });
                                  })
                                }>
                                {isPending ? (
                                  <Loader className='h-3 w-3 animate-spin' />
                                ) : (
                                  <Plus className='h-3 w-3' />
                                )}
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='text-right'>
                          {formatCurrency(item.price)}
                        </TableCell>
                        <TableCell className='text-right font-medium'>
                          {formatCurrency(Number(item.price) * item.qty)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - Fixed for mobile */}
          <div className='w-full lg:w-80'>
            <Card className='sticky top-4'>
              <CardContent className='p-6'>
                <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>

                <div className='space-y-3 mb-6'>
                  <div className='flex justify-between'>
                    <span>
                      Subtotal (
                      {cart.items.reduce((acc, item) => acc + item.qty, 0)}{" "}
                      items)
                    </span>
                    <span>{formatCurrency(cart.itemsPrice)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span className='text-muted-foreground'>
                      Calculated at checkout
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax</span>
                    <span className='text-muted-foreground'>
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className='border-t pt-4 mb-6'>
                  <div className='flex justify-between font-semibold text-lg'>
                    <span>Estimated Total</span>
                    <span>{formatCurrency(cart.itemsPrice)}</span>
                  </div>
                </div>

                <Button
                  className='w-full mb-4'
                  size='lg'
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() => router.push("/shipping-address"))
                  }>
                  {isPending ? (
                    <Loader className='h-4 w-4 animate-spin mr-2' />
                  ) : (
                    <ArrowRight className='h-4 w-4 mr-2' />
                  )}
                  Proceed to Checkout
                </Button>

                <p className='text-xs text-muted-foreground text-center'>
                  Taxes and shipping calculated at checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartTable;
