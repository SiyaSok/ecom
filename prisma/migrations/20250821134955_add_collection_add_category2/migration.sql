-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "collectionId" UUID;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
