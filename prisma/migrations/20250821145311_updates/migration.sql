/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_collectionId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "collectionId";

-- CreateTable
CREATE TABLE "_CategoryToCollection" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_CategoryToCollection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToCollection_B_index" ON "_CategoryToCollection"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToCollection" ADD CONSTRAINT "_CategoryToCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCollection" ADD CONSTRAINT "_CategoryToCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
