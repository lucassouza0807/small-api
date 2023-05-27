-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT NOT NULL DEFAULT 'can:read',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBanned" BOOLEAN NOT NULL DEFAULT false
);
