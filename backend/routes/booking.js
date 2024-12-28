import express from "express";
import { getSlotsForDate, bookSlot } from "../controllers/bookingController.js";
const router = express.Router();

router.get("/slots/:date", getSlotsForDate);

router.post("/book", bookSlot);

export default router;
