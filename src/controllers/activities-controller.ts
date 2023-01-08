import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import activitiesService from "@/services/activities-service";

export async function getActivityDays(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const activitiesDays = await activitiesService.getActivityDays(Number(userId));
    return res.status(httpStatus.OK).send(activitiesDays);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListActivitiesError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
