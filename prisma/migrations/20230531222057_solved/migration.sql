/*
  Warnings:

  - You are about to drop the `Logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Logs";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AppLogs" (
    "log_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "log_level" TEXT NOT NULL
);
