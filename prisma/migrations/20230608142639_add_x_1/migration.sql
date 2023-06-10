-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InnactiveTokens" (
    "token_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "date_time" TEXT NOT NULL
);
INSERT INTO "new_InnactiveTokens" ("date_time", "token", "token_id", "usuario_id") SELECT "date_time", "token", "token_id", "usuario_id" FROM "InnactiveTokens";
DROP TABLE "InnactiveTokens";
ALTER TABLE "new_InnactiveTokens" RENAME TO "InnactiveTokens";
CREATE UNIQUE INDEX "InnactiveTokens_token_key" ON "InnactiveTokens"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
