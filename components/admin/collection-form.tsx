/** @format */
"use client";

import { useToast } from "@/hooks/use-toast";
import { productDefaultValues } from "@/lib/constants";
import {
  insertCollectionSchema,
  updateCollectionSchema,
} from "@/lib/vaildators";
import { Category, Collection } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import slugify from "slugify";
import {
  createCollection,
  updateCollection,
} from "@/lib/actions/collection-action";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Select from "react-select";
import { ArrowLeft, Package, Plus, Sparkles } from "lucide-react";

const CollectionForm = ({
  type,
  collection,
  collectionId,
  categories,
}: {
  type: "Create" | "Update";
  collection?: Collection;
  collectionId?: string;
  categories?: Category[];
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertCollectionSchema>>({
    resolver: zodResolver(
      type === "Update" ? updateCollectionSchema : insertCollectionSchema
    ),
    defaultValues:
      collection && type === "Update"
        ? {
            ...collection,
            categoryIds: collection.categories?.map((c) => c.id) ?? [],
          }
        : productDefaultValues,
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof insertCollectionSchema>
  > = async (values) => {
    // On Create

    if (type === "Create") {
      const res = await createCollection(values);
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push("/admin/collections");
      }
    }
    // On Update
    if (type === "Update") {
      if (!collectionId) {
        router.push("/admin/collections");
        return;
      }
      const res = await updateCollection({ ...values, id: collectionId });
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push("/admin/collections");
      }
    }
  };

  const images = form.watch("images");

  return (
    <>
      <div className='flex items-center'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.push("/admin/collections")}
          className='border-white/30 text-black hover:bg-blue/10 backdrop-blur-sm'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Collection
        </Button>
      </div>
      {/* Hero Header */}
      <section className='relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl overflow-hidden'>
        {/* Background Pattern */}
        {/* <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent'></div> */}

        {/* Floating Icons */}
        <div className='absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <Package className='w-8 h-8 text-blue-300' />
        </div>
        <div className='absolute bottom-10 right-10 w-16 h-16 bg-green-500/10 rounded-full backdrop-blur-sm border border-green-500/20 flex items-center justify-center'>
          <Plus className='w-6 h-6 text-green-300' />
        </div>
        <div className='absolute top-1/2 right-1/4 w-12 h-12 bg-purple-500/10 rounded-full backdrop-blur-sm border border-purple-500/20 flex items-center justify-center'>
          <Sparkles className='w-5 h-5 text-purple-300' />
        </div>

        {/* Main Content */}
        <div className='relative max-w-7xl mx-auto px-6 py-12'>
          <div className='flex items-center justify-between ml-4'>
            <div className='space-y-4 '>
              <h1 className='text-3xl lg:text-4xl font-bold text-white tracking-tight'>
                {type === "Create" ? "Create New " : "Update "}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400'>
                  Collection
                </span>
              </h1>

              <p className='text-lg text-gray-300 max-w-2xl'>
                {type === "Create"
                  ? "Add a new product to your store. Fill in the details below to create an amazing product listing that will attract customers."
                  : "Update your product information. Make changes to pricing, inventory, images, and other important details."}
              </p>
            </div>

            {/* Quick Stats */}
            {/* <div className='hidden lg:block'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {collections.length}
                  </div>
                  <div className='text-sm text-gray-400'>Collections</div>
                </div>
                <div className='text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
                  <div className='text-2xl font-bold text-white'>
                    {product ? "Update" : "New"}
                  </div>
                  <div className='text-sm text-gray-400'>Product</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <div className='bg-white rounded-2xl shadow-lg border'>
        <div className='p-6 border-b'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Collection Details
          </h2>
          <p className='text-sm text-gray-600 mt-1'>
            Fill in the basic information about your collection
          </p>
        </div>

        <div className='p-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Basic Information */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Basic Information
                </h3>
                <div className='flex flex-col gap-5 md:flex-row'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter collection name'
                            {...field}
                            value={field.value ?? ""}
                            className='h-11 flex-1'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='slug'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>slug</FormLabel>
                        <FormControl>
                          <div className='flex gap-2'>
                            <Input
                              placeholder='Enter product slug'
                              {...field}
                              value={field.value ?? ""}
                              className='h-11 flex-1'
                            />
                            <Button
                              type='button'
                              variant='outline'
                              className='h-11 bg-gray-50 hover:bg-gray-100 border-gray-300'
                              onClick={() => {
                                form.setValue(
                                  "slug",
                                  slugify(form.getValues("name"), {
                                    lower: true,
                                  })
                                );
                              }}>
                              Generate{" "}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Product Description
               */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Product Description
                </h3>
                <div className='flex flex-col gap-5 md:flex-row'>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className='resize-none'
                            placeholder='Enter collection description'
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/*Organization */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Organization
                </h3>
                <div className='flex flex-col gap-5 md:flex-row'>
                  <FormField
                    control={form.control}
                    name='categoryIds'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Categories</FormLabel>
                        <FormControl>
                          <Select
                            isMulti
                            options={categories?.map((category) => ({
                              value: category.id,
                              label: category.name,
                            }))}
                            value={categories
                              ?.filter((cat) => field.value?.includes(cat.id))
                              .map((cat) => ({
                                value: cat.id,
                                label: cat.name,
                              }))}
                            onChange={(selected) => {
                              field.onChange(
                                selected.map((option) => option.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/*  Collection Images */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Collection Images
                </h3>
                <div className='upload-field flex flex-col md:flex-row gap-5'>
                  <FormField
                    control={form.control}
                    name='images'
                    render={() => (
                      <FormItem className='w-full'>
                        <FormLabel>Images </FormLabel>
                        <Card>
                          <CardContent className='space-y-2 mt-2 min-h-48'>
                            <div className='flex-start space-x-2'>
                              {images.map((image: string) => (
                                <Image
                                  key={image}
                                  src={image}
                                  alt='product image'
                                  className='w-full h-24 object-cover rounded-lg border'
                                  width={100}
                                  height={100}
                                />
                              ))}
                            </div>

                            <FormControl>
                              <UploadButton
                                endpoint='imageUploader'
                                onClientUploadComplete={(
                                  res: { url: string }[]
                                ) => {
                                  form.setValue("images", [
                                    ...images,
                                    res[0].url,
                                  ]);
                                }}
                                onUploadError={(error: Error) => {
                                  toast({
                                    variant: "destructive",
                                    description: error.message,
                                  });
                                }}
                              />
                            </FormControl>
                          </CardContent>
                        </Card>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex gap-4 pt-6 border-t'>
                <Button
                  size='lg'
                  type='button'
                  variant='outline'
                  onClick={() => router.push("/admin/collections")}
                  className='flex-1'>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  size='lg'
                  disabled={form.formState.isSubmitting}
                  className='flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'>
                  {form.formState.isSubmitting
                    ? "Submitting"
                    : `${type} Collection`}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CollectionForm;
