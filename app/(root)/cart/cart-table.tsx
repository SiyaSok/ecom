/** @format */
"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { Plus, Minus, ArrowRight, Loader } from "lucide-react";
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
    <>
      <h1 className='py-4 h2-bold'>Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty <Link href='/products'>Go to shop.</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead className=''>Item</TableHead>
                  <TableHead className='text-center'>Quantity</TableHead>
                  <TableHead className='text-right'>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell className='font-medium'>
                      <Link
                        href={`product/${item.slug}`}
                        className='flex items-center'>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                        />
                        <span className='px-2'>{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className='text-center'>
                      <Button
                        disabled={isPending}
                        type='button'
                        variant='outline'
                        onClick={() =>
                          startTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId
                            );
                            toast({
                              variant: res.success ? "default" : "destructive",
                              description: res.message,
                            });
                          })
                        }>
                        {isPending ? (
                          <Loader className='h-2 w-2 animate-spin' />
                        ) : (
                          <Minus className='h-2 w-2' />
                        )}
                      </Button>
                      <span className='px-2'> {item.qty}</span>
                      <Button
                        disabled={isPending}
                        type='button'
                        variant='outline'
                        onClick={() =>
                          startTransition(async () => {
                            const res = await addItemToCart(item);
                            if (!res.success) {
                              toast({
                                variant: "destructive",
                                description: res.message,
                              });
                            }
                            toast({
                              description: res.message,
                            });
                          })
                        }>
                        {isPending ? (
                          <Loader className='h-2 w-2 animate-spin' />
                        ) : (
                          <Plus className='h-2 w-2' />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className='text-right'>R {item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className='p-4 gap-4'>
              <div className='pb-3 text-xl'>
                Subtotal ({cart.items.reduce((acc, item) => acc + item.qty, 0)}
                ):
                <span className='font-bold'>
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className='w-full'
                disabled={isPending}
                onClick={() =>
                  startTransition(() => router.push("/shipping-address"))
                }>
                {isPending ? (
                  <Loader className='h-2 w-2 animate-spin' />
                ) : (
                  <ArrowRight className='h-2 w-2' />
                )}{" "}
                Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
