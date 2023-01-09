import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, userBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("", listBooking)
  .post("", bookingRoom)
  .get("/resumeRoom", userBooking)
  .put("/:bookingId", changeBooking);

export { bookingRouter };
