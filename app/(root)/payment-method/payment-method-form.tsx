/** @format */
"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { updateUserPaymentMethod } from "@/lib/actions/user.action";
import { paymentMethodSchema } from "@/lib/vaildators";
import { DEFAULT_PAYMENT_METHODS, PAYMENT_METHODS } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHODS,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof paymentMethodSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }

      router.push("/place-order");
    });
  };

  return (
    <div className='max-w-md mx-auto space-y-4'>
      <h1 className='h2-bold mt-2'>Payment Method</h1>
      <p className='text-sm text-muted-foreground'>
        {" "}
        Please select a payment method.
      </p>
      <Form {...form}>
        <form
          method='post'
          className='space-y-4'
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='type'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof paymentMethodSchema>
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className='flex flex-col space-y-2'>
                      {PAYMENT_METHODS.map((paymentMethod) => (
                        <FormItem
                          key={paymentMethod}
                          className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem
                              value={paymentMethod}
                              checked={field.value === paymentMethod}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {paymentMethod}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
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

export default PaymentMethodForm;
