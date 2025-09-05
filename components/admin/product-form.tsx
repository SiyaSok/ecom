/** @format */
"use client";

import { useToast } from "@/hooks/use-toast";
import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/vaildators";
import { Category, Collection, Product } from "@/types";
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
import { UploadButton } from "@/lib/uploadthing";
import slugify from "slugify";
import {
  createProducts,
  updateeProducts,
} from "@/lib/actions/products.actions";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getSingleCollectiontById } from "@/lib/actions/collection-action";
import { useEffect, useState, useTransition } from "react";
import { getSingleCategoryById } from "@/lib/actions/category-action";
import { Loader2 } from "lucide-react";

const ProductForm = ({
  type,
  product,
  productId,
  collections,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
  collections: Collection[];
}) => {
  const [collectionData, setCollectionData] = useState<Collection | null>(null);
  const [categoryData, setcategoryData] = useState<Category | null>(null);

  const [isPendingCollection, startTransitionCollection] = useTransition();
  const [isPendingCategory, startTransitionCategory] = useTransition();

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(
      type === "Update" ? updateProductSchema : insertProductSchema
    ),
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values
  ) => {
    // On Create
    if (type === "Create") {
      const res = await createProducts(values);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push("/admin/products");
      }
    }

    // On Update
    if (type === "Update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }

      const res = await updateeProducts({ ...values, id: productId });

      console.log("Update Response:", res);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      } else {
        toast({
          description: res.message,
        });
        router.push("/admin/products");
      }
    }
  };

  const images = form.watch("images");
  const isFeatured = form.watch("isFeatured");
  const banner = form.watch("banner");
  const selectedCollectionId = form.watch("collectionId");
  const selectedCategoryId = form.watch("categoryId");

  useEffect(() => {
    if (!selectedCollectionId) return;

    startTransitionCollection(async () => {
      const res = await getSingleCollectiontById(selectedCollectionId);
      if (res) {
        setCollectionData(res as Collection);
      } else {
        setCollectionData(null);
      }
    });
  }, [selectedCollectionId]);

  useEffect(() => {
    if (!selectedCategoryId) return;

    startTransitionCategory(async () => {
      const res = await getSingleCategoryById(selectedCategoryId);
      setcategoryData(res);
    });
  }, [selectedCategoryId]);

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
                  <Input placeholder='Enter product name' {...field} />
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
                    <Input placeholder='Enter product slug' {...field} />
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
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product category' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='brand'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product brand' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='collectionId'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Collection</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                    defaultValue={field.value ?? undefined}>
                    <SelectTrigger className='w-full flex items-center justify-between'>
                      <SelectValue placeholder='Select a collection' />
                      {isPendingCollection && (
                        <Loader2 className='h-4 w-4 animate-spin ml-2' />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {collectionData?.categories && (
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                      defaultValue={field.value ?? undefined}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a category' />
                        {isPendingCategory && (
                          <Loader2 className='h-4 w-4 animate-spin ml-2' />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {collectionData?.categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {categoryData?.subCategories && (
            <FormField
              control={form.control}
              name='subCategoryId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Sub categories</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? undefined}
                      defaultValue={field.value ?? undefined}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryData?.subCategories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product price' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder='Enter product Stock' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                          className='W-20 h-20 object-cover rounded-sm'
                          width={100}
                          height={100}
                        />
                      ))}
                    </div>

                    <FormControl>
                      <UploadButton
                        endpoint='imageUploader'
                        onClientUploadComplete={(res: { url: string }[]) => {
                          form.setValue("images", [...images, res[0].url]);
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
        <div className='upload-field'>
          Featured Product
          <Card>
            <CardContent className='space-y-2 mt-2'>
              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='flex items-center space-x-2'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Is Featured</FormLabel>
                  </FormItem>
                )}
              />
              {isFeatured && banner && (
                <Image
                  src={banner}
                  alt='Featured image'
                  className='w-full object-center object-cover rounded-sm'
                  width={1920}
                  height={680}
                />
              )}
              {isFeatured && !banner && (
                <UploadButton
                  endpoint='imageUploader'
                  onClientUploadComplete={(res: { url: string }[]) => {
                    form.setValue("banner", res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      variant: "destructive",
                      description: error.message,
                    });
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className='resize-none'
                    placeholder='Enter product description'
                    {...field}
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
            {form.formState.isSubmitting ? "Submitting" : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
