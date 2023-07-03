/*
  Warnings:

  - You are about to drop the column `productImageCover` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productImages` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productSpecifications` on the `Products` table. All the data in the column will be lost.
  - Added the required column `imageCover` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specifications` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Products` DROP COLUMN `productImageCover`,
    DROP COLUMN `productImages`,
    DROP COLUMN `productName`,
    DROP COLUMN `productSpecifications`,
    ADD COLUMN `imageCover` VARCHAR(191) NOT NULL,
    ADD COLUMN `images` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `specifications` VARCHAR(191) NOT NULL;
