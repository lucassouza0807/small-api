-- AlterTable
ALTER TABLE `User` ADD COLUMN `cpf` VARCHAR(191) NULL,
    ADD COLUMN `data_nasc` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `tel_celular` VARCHAR(191) NULL,
    ADD COLUMN `tel_fixo` VARCHAR(191) NULL DEFAULT 'N/A';

-- CreateTable
CREATE TABLE `Address` (
    `AddressId` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `identificacao` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `referencia` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `Address_userId_fkey`(`userId`),
    PRIMARY KEY (`AddressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `ordeId` VARCHAR(191) NOT NULL,
    `totalPrice` VARCHAR(191) NULL,
    `products` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `adrressId` VARCHAR(191) NOT NULL,

    INDEX `Orders_adrressId_fkey`(`adrressId`),
    INDEX `Orders_userId_fkey`(`userId`),
    PRIMARY KEY (`ordeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `productId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `subCategory` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `productSpecifications` VARCHAR(191) NOT NULL,
    `productImageCover` VARCHAR(191) NOT NULL,
    `productImages` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShoppingCart` (
    `cartId` VARCHAR(191) NOT NULL,
    `cartItems` VARCHAR(191) NOT NULL,
    `totalPrice` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_adrressId_fkey` FOREIGN KEY (`adrressId`) REFERENCES `Address`(`AddressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
