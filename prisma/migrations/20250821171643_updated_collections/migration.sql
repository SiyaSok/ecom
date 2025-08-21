/*
  Warnings:

  - You are about to drop the column `productId` on the `Collection` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Collection_productId_key";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "productId";
