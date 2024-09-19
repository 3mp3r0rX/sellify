/*
  Warnings:

  - You are about to drop the column `category` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Ad` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "category",
DROP COLUMN "createdAt",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
