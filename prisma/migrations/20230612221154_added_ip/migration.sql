-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sessions" (
    "session_pk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session_id" TEXT NOT NULL,
    "start" TEXT NOT NULL DEFAULT 'N/A',
    "end" TEXT NOT NULL DEFAULT 'N/A',
    "user_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "ip" TEXT NOT NULL DEFAULT 'N/A'
);
INSERT INTO "new_Sessions" ("end", "session_id", "session_pk", "start", "user_id") SELECT "end", "session_id", "session_pk", "start", "user_id" FROM "Sessions";
DROP TABLE "Sessions";
ALTER TABLE "new_Sessions" RENAME TO "Sessions";
CREATE UNIQUE INDEX "Sessions_session_id_key" ON "Sessions"("session_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
