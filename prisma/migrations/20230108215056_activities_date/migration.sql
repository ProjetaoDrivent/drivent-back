/*
  Warnings:

  - You are about to drop the column `date` on the `Activities` table. All the data in the column will be lost.
  - Added the required column `activitiesDateId` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "date",
ADD COLUMN     "activitiesDateId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ActivitiesDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weekday" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitiesDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivitiesDate_date_key" ON "ActivitiesDate"("date");

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_activitiesDateId_fkey" FOREIGN KEY ("activitiesDateId") REFERENCES "ActivitiesDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
