-- CreateTable
CREATE TABLE "Sessions" (
    "session_pk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session_id" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_session_id_key" ON "Sessions"("session_id");
