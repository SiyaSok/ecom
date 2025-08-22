/*
  Warnings:

  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToCollection` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `collectionId` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCollection" DROP CONSTRAINT "_CategoryToCollection_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCollection" DROP CONSTRAINT "_CategoryToCollection_B_fkey";

-- DropIndex
DROP INDEX "Category_productId_key";

-- DropIndex
DROP INDEX "product_slug_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "rating" DROP DEFAULT,
ALTER COLUMN "rating" SET DATA TYPE TEXT,
ALTER COLUMN "isFeatured" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "collectionId" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL;

-- DropTable
DROP TABLE "_CategoryToCollection";

-- CreateTable
CREATE TABLE "_CategoryCollections" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_CategoryCollections_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryCollections_B_index" ON "_CategoryCollections"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryCollections" ADD CONSTRAINT "_CategoryCollections_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryCollections" ADD CONSTRAINT "_CategoryCollections_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
