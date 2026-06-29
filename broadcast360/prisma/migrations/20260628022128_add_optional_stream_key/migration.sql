/*
  Warnings:

  - A unique constraint covering the columns `[streamKey]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "streamKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_streamKey_key" ON "Channel"("streamKey");
