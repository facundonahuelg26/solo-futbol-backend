/*
  Warnings:

  - You are about to drop the column `profileId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profile_profileId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "profileId";
