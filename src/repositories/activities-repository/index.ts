import { prisma } from "@/config";

async function findActivitiesDays() {
  return prisma.activitiesDate.findMany({
    orderBy: {
      date: "asc"
    }
  });
}

async function findActivitiesLocals() {
  return prisma.activitiesLocals.findMany();
}

async function findActivitiesbyDate(activitiesDateId: number, localId: number) {
  return prisma.activities.findMany({
    where: {
      activitiesDateId: activitiesDateId,
      localId: localId
    },
    orderBy: {
      startsAt: "asc"
    }
  });
}

const activitiesRepository = {
  findActivitiesDays,
  findActivitiesLocals,
  findActivitiesbyDate
};

export default activitiesRepository;
