/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_accountId_fkey";

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "account" (
    "id" VARCHAR(40) NOT NULL,
    "wallet" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "userId" VARCHAR(40) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_key" ON "account"("userId");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
