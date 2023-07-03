-- CreateTable
CREATE TABLE `Logs` (
    `logId` VARCHAR(191) NOT NULL,
    `logLevel` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`logId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
