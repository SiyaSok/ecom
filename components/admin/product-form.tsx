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
import { Loader2, Package, Plus, ArrowLeft, Sparkles } from "lucide-react";

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
    <div className='space-y-6'>
      <div className='flex items-center'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => router.push("/admin/products")}
          className='border-white/30 text-black hover:bg-blue/10 backdrop-blur-sm'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Products
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
                  Product
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

      {/* Form Section */}
      <div className='bg-white rounded-2xl shadow-lg border'>
        <div className='p-6 border-b'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Product Details
          </h2>
          <p className='text-sm text-gray-600 mt-1'>
            Fill in the basic information about your product
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

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter product name'
                            {...field}
                            className='h-11'
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
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Slug
                        </FormLabel>
                        <FormControl>
                          <div className='flex gap-2'>
                            <Input
                              placeholder='Enter product slug'
                              {...field}
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
                              Generate
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Category
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter product category'
                            {...field}
                            className='h-11'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='brand'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Brand
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter product brand'
                            {...field}
                            className='h-11'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Organization */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Organization
                </h3>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                  <FormField
                    control={form.control}
                    name='collectionId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Collection
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ?? undefined}
                            defaultValue={field.value ?? undefined}>
                            <SelectTrigger className='w-full h-11 flex items-center justify-between'>
                              <SelectValue placeholder='Select a collection' />
                              {isPendingCollection && (
                                <Loader2 className='h-4 w-4 animate-spin ml-2' />
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              {collections.map((collection) => (
                                <SelectItem
                                  key={collection.id}
                                  value={collection.id}>
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
                        <FormItem>
                          <FormLabel className='text-sm font-medium'>
                            Category
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value ?? undefined}
                              defaultValue={field.value ?? undefined}>
                              <SelectTrigger className='w-full h-11'>
                                <SelectValue placeholder='Select a category' />
                                {isPendingCategory && (
                                  <Loader2 className='h-4 w-4 animate-spin ml-2' />
                                )}
                              </SelectTrigger>
                              <SelectContent>
                                {collectionData?.categories?.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}>
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
                        <FormItem>
                          <FormLabel className='text-sm font-medium'>
                            Sub Category
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value ?? undefined}
                              defaultValue={field.value ?? undefined}>
                              <SelectTrigger className='w-full h-11'>
                                <SelectValue placeholder='Select sub category' />
                              </SelectTrigger>
                              <SelectContent>
                                {categoryData?.subCategories?.map(
                                  (category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Pricing & Inventory
                </h3>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter product price'
                            {...field}
                            className='h-11'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='stock'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-medium'>
                          Stock
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter product stock'
                            {...field}
                            className='h-11'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Images */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Product Images
                </h3>

                <FormField
                  control={form.control}
                  name='images'
                  render={() => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Product Images
                      </FormLabel>
                      <Card className='border-2 border-dashed border-gray-300'>
                        <CardContent className='p-6 space-y-4'>
                          {images.length > 0 && (
                            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                              {images.map((image: string) => (
                                <div key={image} className='relative group'>
                                  <Image
                                    src={image}
                                    alt='product image'
                                    className='w-full h-24 object-cover rounded-lg border'
                                    width={100}
                                    height={100}
                                  />
                                  <Button
                                    type='button'
                                    variant='destructive'
                                    size='sm'
                                    className='absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity'
                                    onClick={() => {
                                      form.setValue(
                                        "images",
                                        images.filter((img) => img !== image)
                                      );
                                    }}>
                                    ×
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className='text-center'>
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
                                  toast({
                                    description: "Image uploaded successfully!",
                                  });
                                }}
                                onUploadError={(error: Error) => {
                                  toast({
                                    variant: "destructive",
                                    description: error.message,
                                  });
                                }}
                                className='ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:text-white'
                              />
                            </FormControl>
                            <p className='text-sm text-gray-500 mt-2'>
                              Upload product images (max 6 images recommended)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Featured Product */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Featured Settings
                </h3>

                <Card className='border'>
                  <CardContent className='p-6 space-y-4'>
                    <FormField
                      control={form.control}
                      name='isFeatured'
                      render={({ field }) => (
                        <FormItem className='flex items-center space-x-3'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className='h-5 w-5'
                            />
                          </FormControl>
                          <div className='space-y-1'>
                            <FormLabel className='text-sm font-medium'>
                              Feature this product
                            </FormLabel>
                            <p className='text-sm text-gray-500'>
                              Show this product in featured sections and
                              promotions
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />

                    {isFeatured && (
                      <div className='space-y-4 border-t pt-4'>
                        <FormLabel className='text-sm font-medium'>
                          Featured Banner Image
                        </FormLabel>
                        {banner ? (
                          <div className='space-y-2'>
                            <Image
                              src={banner}
                              alt='Featured banner'
                              className='w-full max-w-md h-32 object-cover rounded-lg border'
                              width={400}
                              height={128}
                            />
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              onClick={() => form.setValue("banner", "")}>
                              Change Banner
                            </Button>
                          </div>
                        ) : (
                          <UploadButton
                            endpoint='imageUploader'
                            onClientUploadComplete={(
                              res: { url: string }[]
                            ) => {
                              form.setValue("banner", res[0].url);
                              toast({
                                description: "Banner image uploaded!",
                              });
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                variant: "destructive",
                                description: error.message,
                              });
                            }}
                          />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <div className='space-y-6'>
                <h3 className='text-lg font-medium text-gray-900 border-b pb-2'>
                  Product Description
                </h3>

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-medium'>
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className='resize-none min-h-32'
                          placeholder='Enter detailed product description...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className='flex gap-4 pt-6 border-t'>
                <Button
                  size='lg'
                  type='button'
                  variant='outline'
                  onClick={() => router.push("/admin/products")}
                  className='flex-1'>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  size='lg'
                  disabled={form.formState.isSubmitting}
                  className='flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin mr-2' />
                      {type === "Create" ? "Creating..." : "Updating..."}
                    </>
                  ) : (
                    `${type} Product`
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
