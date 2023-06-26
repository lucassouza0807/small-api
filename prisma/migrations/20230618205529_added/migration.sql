/*
  Warnings:

  - You are about to drop the column `create_at` on the `UserAccount` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserAccount` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    MODIFY `updated_at` VARCHAR(191) NULL;
