/*
  Warnings:

  - Added the required column `brand` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breadcrumbs` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highlights` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `href` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizes` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Men', 'Women', 'Unisex');

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "breadcrumbs" JSONB NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "highlights" JSONB NOT NULL,
ADD COLUMN     "href" TEXT NOT NULL,
ADD COLUMN     "images" JSONB NOT NULL,
ADD COLUMN     "sizes" JSONB NOT NULL;
