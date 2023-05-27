/*
  Warnings:

  - You are about to drop the column `isBanned` on the `Usuarios` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuarios" (
    "usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Usuarios_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles" ("role_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuarios" ("cargo", "email", "isActive", "password", "role_id", "usuario_id") SELECT "cargo", "email", "isActive", "password", "role_id", "usuario_id" FROM "Usuarios";
DROP TABLE "Usuarios";
ALTER TABLE "new_Usuarios" RENAME TO "Usuarios";
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
