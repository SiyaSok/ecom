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
                <FormLabel>Category</FormLabel>
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
                      field.onChange(selected.map((option) => option.value));
                    }}
                  />
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
        <div>
          <Button
            type='submit'
            size='lg'
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full'>
            {form.formState.isSubmitting ? "Submitting" : `${type} Collection`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CollectionForm;
