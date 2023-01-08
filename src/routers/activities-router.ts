import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivityDays } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/dayActivities", getActivityDays);

export { activitiesRouter };
