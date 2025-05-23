/** @format */
"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/vaildators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/user.action";
const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address,
  });

  const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      console.log(res);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }

      router.push("/payment-method");
    });
  };

  return (
    <div className='max-w-md mx-auto space-y-4'>
      <h1 className='h2-bold mt-2'> Shipping Address</h1>
      <p className='text-sm text-muted-foreground'>
        {" "}
        Please enter an address to ship to
      </p>
      <Form {...form}>
        <form
          method='post'
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='fullName'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Full name.' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='streetAddress'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter Address' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='city'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter city' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='postalCode'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter postal code' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='country'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Counttry</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter country' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-2'>
            {" "}
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? (
                <Loader className='h-4 w-4' />
              ) : (
                <ArrowRight className='h-4 w-4' />
              )}{" "}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
