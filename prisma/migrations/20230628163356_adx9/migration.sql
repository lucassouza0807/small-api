-- CreateTable
CREATE TABLE `category` (
    `categoryId` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subCategory` (
    `subCategoryId` VARCHAR(191) NOT NULL,
    `subCategory` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`subCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
