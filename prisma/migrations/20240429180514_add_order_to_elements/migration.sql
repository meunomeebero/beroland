/*
  Warnings:

  - Added the required column `order` to the `elements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `elements` ADD COLUMN `order` INTEGER NOT NULL;
