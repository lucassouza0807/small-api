/*
  Warnings:

  - You are about to drop the column `roles` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Role" (
    "role_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL DEFAULT 'lider',
    "permissions" TEXT NOT NULL DEFAULT 'can:read, can:update'
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Usuario_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("role_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("cargo", "email", "isActive", "isBanned", "password", "usuario_id") SELECT "cargo", "email", "isActive", "isBanned", "password", "usuario_id" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
