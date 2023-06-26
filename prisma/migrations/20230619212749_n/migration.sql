/*
  Warnings:

  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_cpf_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `cpf`,
    DROP COLUMN `password`;
