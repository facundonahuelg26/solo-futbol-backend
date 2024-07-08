/*
  Warnings:

  - Made the column `brandId` on table `Products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clubId` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_clubId_fkey";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "brandId" SET NOT NULL,
ALTER COLUMN "clubId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
