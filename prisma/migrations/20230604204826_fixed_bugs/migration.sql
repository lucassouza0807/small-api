/*
  Warnings:

  - You are about to drop the `TokensBlockedList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TokensBlockedList";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "InnactiveTokens" (
    "token_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date_time" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InnactiveTokens_token_key" ON "InnactiveTokens"("token");
