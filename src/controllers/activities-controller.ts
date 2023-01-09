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

export async function getActivityLocals(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const activitiesLocals = await activitiesService.getActivityLocals(Number(userId));
    return res.status(httpStatus.OK).send(activitiesLocals);
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

export async function getActivitiesByDate(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const activitiesDateId = Number(req.params.activitiesDateId);
  const localId = Number (req.params.localId);

  try {
    const activitiesDays = await activitiesService.getActivitiesByDate(userId, activitiesDateId, localId);
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
