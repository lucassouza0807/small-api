/*
  Warnings:

  - Added the required column `bairro` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `bairro` VARCHAR(191) NOT NULL,
    MODIFY `complemento` VARCHAR(191) NULL,
    MODIFY `referencia` VARCHAR(191) NULL;
