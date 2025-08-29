/*
  Warnings:

  - You are about to drop the column `productId` on the `Wishlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productSlug]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productSlug` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_productId_fkey";

-- DropIndex
DROP INDEX "Wishlist_userId_productId_key";

-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "productId",
ADD COLUMN     "productSlug" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_productSlug_key" ON "Wishlist"("userId", "productSlug");

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_productSlug_fkey" FOREIGN KEY ("productSlug") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
