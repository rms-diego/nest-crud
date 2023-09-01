/*
  Warnings:

  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountId` on the `transactions` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `walletId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_accountId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
DROP COLUMN "accountId",
ADD COLUMN     "walletId" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "amount" SET DATA TYPE INTEGER,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "account";

-- CreateTable
CREATE TABLE "wallet" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallet_userId_key" ON "wallet"("userId");

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
