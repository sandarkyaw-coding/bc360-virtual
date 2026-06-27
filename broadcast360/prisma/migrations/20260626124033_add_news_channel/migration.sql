-- AlterTable
ALTER TABLE "News" ADD COLUMN     "channelId" INTEGER;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
