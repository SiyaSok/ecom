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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                  <div className='relative'>
                    <Input
                      placeholder='Enter product slug'
                      {...field}
                      value={field.value ?? ""}
                    />
                    <Button
                      type='button'
                      className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2'
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
                      field.onChange(selected.map((option) => option.value))
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

        <div>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full'>
            {form.formState.isSubmitting ? "Submitting" : `${type} Category`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
