-- CreateTable
CREATE TABLE "BlockingHistoric" (
    "block_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "block_date" TEXT NOT NULL,
    "unblock_date" TEXT NOT NULL DEFAULT 'N/A',
    "reason" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserTokens" (
    "token_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "date_time" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TokensBlockedList" (
    "token_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date_time" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Logs" (
    "log_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "log_level" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTokens_token_key" ON "UserTokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TokensBlockedList_token_key" ON "TokensBlockedList"("token");
