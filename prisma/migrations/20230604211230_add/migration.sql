/*
  Warnings:

  - You are about to drop the column `user_id` on the `UserTokens` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `InnactiveTokens` table. All the data in the column will be lost.
  - Added the required column `usuario_id` to the `UserTokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `InnactiveTokens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserTokens" (
    "token_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "date_time" TEXT NOT NULL
);
INSERT INTO "new_UserTokens" ("date_time", "token", "token_id") SELECT "date_time", "token", "token_id" FROM "UserTokens";
DROP TABLE "UserTokens";
ALTER TABLE "new_UserTokens" RENAME TO "UserTokens";
CREATE UNIQUE INDEX "UserTokens_token_key" ON "UserTokens"("token");
CREATE TABLE "new_InnactiveTokens" (
    "token_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "date_time" INTEGER NOT NULL
);
INSERT INTO "new_InnactiveTokens" ("date_time", "token", "token_id") SELECT "date_time", "token", "token_id" FROM "InnactiveTokens";
DROP TABLE "InnactiveTokens";
ALTER TABLE "new_InnactiveTokens" RENAME TO "InnactiveTokens";
CREATE UNIQUE INDEX "InnactiveTokens_token_key" ON "InnactiveTokens"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
