/** @format */
"use client";

import { useToast } from "@/hooks/use-toast";
import { productDefaultValues } from "@/lib/constants";
import { insertCategorySchema, updateCategorySchema } from "@/lib/vaildators";
import { Category, SubCategory } from "@/types";
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
import Select from "react-select";

import { createCategory, updateCategory } from "@/lib/actions/category-action";
import { ArrowLeft, ChartBarStackedIcon, Plus, Sparkles } from "lucide-react";

const CategoryForm = ({
  type,
  category,
  categoryId,
  subcategory,
}: {
  type: "Create" | "Update";
  subcategory?: SubCategory[];
  category?: Category;
  categoryId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertCategorySchema>>({
    resolver: zodResolver(
      type === "Update" ? updateCategorySchema : insertCategorySchema
    ),
    defaultValues:
      category && type === "Update"
        ? {
            ...category,
            subcategoryIds: category.subCategories?.map((sc) => sc.id) ?? [],
          }
        : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertCategorySchema>> = async (
    values
  ) => {
    // On Create
    if (type === "Create") {
      const res = await createCategory(values);
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push("/admin/categories");
      }
    }
    // On Update
    if (type === "Update") {
      if (!categoryId) {
        router.push("/admin/categories");
        return;
      }
      const res = await updateCategory({ ...values, id: categoryId });
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push("/admin/categories");
      }
    }
  };

  return (
    <>
      <div className='flex items-center'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.push("/admin/categories")}
          className='border-white/30 text-black hover:bg-blue/10 backdrop-blur-sm'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Categories
        </Button>
      </div>
      {/* Hero Header */}
      <section className='relative bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-2xl overflow-hidden'>
        {/* Floating Icons */}
        <div className='absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full backdrop-blur-sm border border-blue-500/20 flex items-center justify-center'>
          <ChartBarStackedIcon className='w-8 h-8 text-blue-300' />
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
                  Category
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
            Category Details
          </h2>
          <p className='text-sm text-gray-600 mt-1'>
            Fill in the basic information about your category
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
                            placeholder='Enter product name'
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
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Product Description
                </h3>

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className='resize-none'
                          placeholder='Enter product category'
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Organization */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Organization
                </h3>

                <div className='flex flex-col gap-5 md:flex-row'>
                  <FormField
                    control={form.control}
                    name='subcategoryIds'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Subcategories</FormLabel>
                        <FormControl>
                          <Select
                            isMulti
                            options={subcategory?.map((item) => ({
                              value: item.id,
                              label: item.name,
                            }))}
                            value={subcategory
                              ?.filter((item) => field.value?.includes(item.id))
                              .map((item) => ({
                                value: item.id,
                                label: item.name,
                              }))}
                            onChange={(selected) =>
                              field.onChange(
                                selected.map((option) => option.value)
                              )
                            }
                            className='react-select-container'
                            classNamePrefix='react-select'
                          />
                        </FormControl>
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
                  onClick={() => router.push("/admin/categories")}
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
                    : `${type} Category`}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
