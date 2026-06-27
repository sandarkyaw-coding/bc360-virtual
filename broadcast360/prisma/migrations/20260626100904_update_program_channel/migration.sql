/*
  Warnings:

  - Added the required column `channelId` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "channelId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
