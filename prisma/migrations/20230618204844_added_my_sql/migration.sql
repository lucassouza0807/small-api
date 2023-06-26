-- CreateTable
CREATE TABLE `SysAdmin` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAccount` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isBlocked` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `UserAccount_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `productName` VARCHAR(191) NOT NULL,
    `productCategory` VARCHAR(191) NOT NULL,
    `productSubCategory` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `productImages` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DadosPessoais` (
    `dataId` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `dataNasc` DATETIME(3) NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `DadosPessoais_cpf_key`(`cpf`),
    UNIQUE INDEX `DadosPessoais_cnpj_key`(`cnpj`),
    PRIMARY KEY (`dataId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTokens` (
    `tokenId` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `date_time` VARCHAR(191) NULL,

    PRIMARY KEY (`tokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `enderecoId` INTEGER NOT NULL AUTO_INCREMENT,
    `enderecoTipo` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `UF` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `userAccountUserId` INTEGER NULL,

    PRIMARY KEY (`enderecoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InnactiveTokens` (
    `token_id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `date_time` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `InnactiveTokens_token_key`(`token`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppLogs` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `log_level` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DadosPessoais` ADD CONSTRAINT `DadosPessoais_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserAccount`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_userAccountUserId_fkey` FOREIGN KEY (`userAccountUserId`) REFERENCES `UserAccount`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
