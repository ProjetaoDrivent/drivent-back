-- CreateTable
CREATE TABLE "ActivitiesLocals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitiesLocals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "startsAt" TIME(6) NOT NULL,
    "endsAt" TIME(6) NOT NULL,
    "localId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesBooking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activitieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitiesBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivitiesLocals_name_key" ON "ActivitiesLocals"("name");

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_localId_fkey" FOREIGN KEY ("localId") REFERENCES "ActivitiesLocals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitiesBooking" ADD CONSTRAINT "ActivitiesBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivitiesBooking" ADD CONSTRAINT "ActivitiesBooking_activitieId_fkey" FOREIGN KEY ("activitieId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
