/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(32),
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
