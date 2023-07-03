/*
  Warnings:

  - A unique constraint covering the columns `[category]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subCategory]` on the table `subCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `category_category_key` ON `category`(`category`);

-- CreateIndex
CREATE UNIQUE INDEX `subCategory_subCategory_key` ON `subCategory`(`subCategory`);
