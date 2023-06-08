/*
  Warnings:

  - You are about to drop the column `user` on the `UserTokens` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `UserTokens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserTokens" (
    "token_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date_time" TEXT NOT NULL
);
INSERT INTO "new_UserTokens" ("date_time", "token", "token_id") SELECT "date_time", "token", "token_id" FROM "UserTokens";
DROP TABLE "UserTokens";
ALTER TABLE "new_UserTokens" RENAME TO "UserTokens";
CREATE UNIQUE INDEX "UserTokens_token_key" ON "UserTokens"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
