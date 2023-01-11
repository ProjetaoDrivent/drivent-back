import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivitiesByDate, getActivityDays, getActivityLocals } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/activitiesDays", getActivityDays)
  .get("/activitiesLocals", getActivityLocals)
  .get("/:activitiesDateId/:localId", getActivitiesByDate);

export { activitiesRouter };
