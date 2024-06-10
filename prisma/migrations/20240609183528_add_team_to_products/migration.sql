/*
  Warnings:

  - Added the required column `team` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN "team" VARCHAR NOT NULL DEFAULT 'unknown_team';
