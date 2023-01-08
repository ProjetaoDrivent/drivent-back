import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListActivitiesError } from "@/errors/cannot-list-activities-error";
import activitiesRepository from "@/repositories/activities-repository";

async function listActivities(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) {
    throw cannotListActivitiesError();
  }
}

async function getActivityDays(userId: number) {
  await listActivities(userId);

  const activitiesDays = await activitiesRepository.findActivitiesDays();

  if (!activitiesDays) {
    throw notFoundError();
  }
  return activitiesDays;
}

const activitiesService = {
  getActivityDays
};

export default activitiesService;
