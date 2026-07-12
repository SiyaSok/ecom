/** @format */

"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, FormatError } from "../utils";
import { insertCollectionSchema, updateCollectionSchema } from "../vaildators";
import { revalidatePath } from "next/cache";
import z from "zod";
import { PAGE_SIZE } from "../constants";

//create Collection
//create product
export async function createCollection(
  data: z.infer<typeof insertCollectionSchema>,
) {
  try {
    const collection = insertCollectionSchema.parse(data);

    const { categoryIds, ...rest } = collection;

    await prisma.collection.create({
      data: {
        ...rest,
        categories: {
          connect: categoryIds?.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/adminn/collections");

    return { success: true, message: "A new collection has been created..." };
  } catch (error) {
    console.log(FormatError(error));
    return { success: false, message: FormatError(error) };
  }
}

// update products

export async function updateCollection(
  data: z.infer<typeof updateCollectionSchema>,
) {
  try {
    const collection = updateCollectionSchema.parse(data);

    const existingProd = await prisma.collection.findFirst({
      where: { id: collection.id },
    });

    if (!existingProd) throw new Error("Product not found!! ");

    const { id, categoryIds, ...rest } = collection;

    await prisma.collection.update({
      where: { id },
      data: {
        ...rest,
        categories: {
          connect: categoryIds?.map((id) => ({ id })),
        },
      },
    });

    revalidatePath("/adminn/products");

    return { success: true, message: "Collection has been updated..." };
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

// Get all categories
export async function getAllCollections({
  limit = PAGE_SIZE,
  // page,
  // query,
}: {
  limit?: number;
}) {
  const data = await prisma.collection.findMany({
    where: {
      // categories: {
      //   some: {
      //     subCategories: {
      //       some: {
      //         products: {
      //           some: {}, // checks that at least one product exists
      //         },
      //       },
      //     },
      //   },
      // },
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
          products: true,
          subCategories: {
            select: {
              id: true,
              name: true,
              slug: true,
              products: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
    take: limit,
  });

  const dataCount = await prisma.collection.count({});

  return convertToPlainObject({
    data,
    totalPages: Math.ceil(dataCount / limit),
  });
}
// export async function getAllCollectionsSimple() {
//   try {
//     const collections = await prisma.collection.findMany({
//       where: {
//         // Only include collections that have categories with products
//         categories: {
//           some: {
//             // Category must have either direct products or subcategories with products
//             OR: [
//               {
//                 products: {
//                   some: {
//                     // Add any product status filters if needed
//                     // status: "ACTIVE"
//                   },
//                 },
//               },
//               {
//                 subCategories: {
//                   some: {
//                     products: {
//                       some: {
//                         // status: "ACTIVE"
//                       },
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       },
//       include: {
//         categories: {
//           where: {
//             // Only include categories that have products
//             OR: [
//               {
//                 products: {
//                   some: {},
//                 },
//               },
//               {
//                 subCategories: {
//                   some: {
//                     products: {
//                       some: {},
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//           include: {
//             products: {
//               take: 1, // We only need to know if products exist, not the actual products
//               select: {
//                 id: true,
//               },
//             },
//             subCategories: {
//               where: {
//                 products: {
//                   some: {},
//                 },
//               },
//               include: {
//                 products: {
//                   take: 1,
//                   select: {
//                     id: true,
//                   },
//                 },
//               },
//               orderBy: {
//                 name: "asc",
//               },
//             },
//           },
//           orderBy: {
//             name: "asc",
//           },
//         },
//         // images: true,
//       },
//       orderBy: {
//         createdAt: "asc",
//       },
//       take: PAGE_SIZE,
//     });

//     const totalCount = await prisma.collection.count({
//       where: {
//         categories: {
//           some: {
//             OR: [
//               {
//                 products: {
//                   some: {},
//                 },
//               },
//               {
//                 subCategories: {
//                   some: {
//                     products: {
//                       some: {},
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//         },
//       },
//     });

//     // Convert to plain object to handle Date objects and other non-serializable types
//     const serializableCollections = collections.map((collection) => ({
//       ...collection,
//       createdAt: collection.createdAt.toISOString(),
//       updatedAt: collection.updatedAt?.toISOString() || null,
//       categories: collection.categories.map((category) => ({
//         ...category,
//         createdAt: category.createdAt.toISOString(),
//         updatedAt: category.updatedAt?.toISOString() || null,
//         subCategories: category.subCategories.map((subCategory) => ({
//           ...subCategory,
//           createdAt: subCategory.createdAt.toISOString(),
//           updatedAt: subCategory.updatedAt?.toISOString() || null,
//         })),
//       })),
//     }));

//     return {
//       data: serializableCollections,
//       totalPages: Math.ceil(totalCount / PAGE_SIZE),
//       totalCount,
//     };
//   } catch (error) {
//     console.error("Error fetching collections:", error);
//     return {
//       data: [],
//       totalPages: 0,
//       totalCount: 0,
//     };
//   }
// }

export async function getAllCollectionsSimple() {
  try {
    // 1. Pull just the FK triplets we need to know "what actually exists together"
    //    groupBy is much lighter than fetching full product rows.
    const grouped = await prisma.product.groupBy({
      by: ["collectionId", "categoryId", "subCategoryId"] as const,
    });

    // 2. Build collectionId -> categoryId -> Set(subCategoryId) map
    const collectionCategoryMap = new Map();
    for (const row of grouped) {
      if (!row.collectionId || !row.categoryId) continue;
      if (!collectionCategoryMap.has(row.collectionId)) {
        collectionCategoryMap.set(row.collectionId, new Map());
      }
      const catMap = collectionCategoryMap.get(row.collectionId);
      if (!catMap.has(row.categoryId)) {
        catMap.set(row.categoryId, new Set());
      }
      if (row.subCategoryId) {
        catMap.get(row.categoryId).add(row.subCategoryId);
      }
    }

    const validCollectionIds = Array.from(collectionCategoryMap.keys());

    // 3. Fetch the full tree for only those collections, unfiltered
    const collections = await prisma.collection.findMany({
      where: { id: { in: validCollectionIds } },
      include: {
        categories: {
          include: { subCategories: true },
          orderBy: { name: "asc" },
        },
      },
      orderBy: { createdAt: "asc" },
      take: PAGE_SIZE,
    });

    // 4. Filter categories/subcategories per-collection using the map — this is
    //    the step that actually scopes "has products" to THIS collection.
    const serializableCollections = collections.map((collection) => {
      const catMap = collectionCategoryMap.get(collection.id) || new Map();

      const filteredCategories = collection.categories
        .filter((category) => catMap.has(category.id))
        .map((category) => {
          const subIds = catMap.get(category.id) || new Set();
          const filteredSubs = category.subCategories
            .filter((sub) => subIds.has(sub.id))
            .map((sub) => ({
              ...sub,
              createdAt: sub.createdAt.toISOString(),
              updatedAt: sub.updatedAt?.toISOString() || null,
            }));

          return {
            ...category,
            createdAt: category.createdAt.toISOString(),
            updatedAt: category.updatedAt?.toISOString() || null,
            subCategories: filteredSubs,
          };
        });

      return {
        ...collection,
        createdAt: collection.createdAt.toISOString(),
        updatedAt: collection.updatedAt?.toISOString() || null,
        categories: filteredCategories,
      };
    });

    return {
      data: serializableCollections,
      totalPages: Math.ceil(serializableCollections.length / PAGE_SIZE),
      totalCount: serializableCollections.length,
    };
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { data: [], totalPages: 0, totalCount: 0 };
  }
}

//get single collection  by id
export async function getSingleCollectiontById(id: string) {
  try {
    const data = await prisma.collection.findFirst({
      where: { id: id },
      include: {
        categories: {
          include: {
            subCategories: true,
          },
        },
      },
    });
    return convertToPlainObject(data);
  } catch (error) {
    return { success: false, message: FormatError(error) };
  }
}

//get single Collection By Slug
export async function getSingleCollectionBySlug(slug: string) {
  const data = await prisma.collection.findFirst({
    where: { slug: slug.toLowerCase() },
    include: {
      products: {
        include: {
          collection: {
            select: { name: true, slug: true },
          },
          category_: {
            select: { name: true, slug: true },
          },
        },
      },
    },
  });

  const dataCount = await prisma.product.count({
    where: {
      collection: {
        slug: slug,
      },
    },
  });

  return {
    data,
    dataCount,
  };
}
