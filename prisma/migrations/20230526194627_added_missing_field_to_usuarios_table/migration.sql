/*
  Warnings:

  - Added the required column `cpf` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuarios" (
    "usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Usuarios_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles" ("role_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuarios" ("cargo", "email", "isActive", "isBlocked", "password", "role_id", "usuario_id") SELECT "cargo", "email", "isActive", "isBlocked", "password", "role_id", "usuario_id" FROM "Usuarios";
DROP TABLE "Usuarios";
ALTER TABLE "new_Usuarios" RENAME TO "Usuarios";
CREATE UNIQUE INDEX "Usuarios_cpf_key" ON "Usuarios"("cpf");
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
