import express from "express";

import {
  createBooking,
  createPaymentIntent,
  getAllBooking,
  getBooking,
  verifyPayment,
} from "../controllers/bookingController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/create-payment-intent",  createPaymentIntent);
router.post("/", verifyUser, createBooking);
router.post("/verify-payment",  verifyPayment);
router.get("/:id", verifyUser, getBooking);
router.get("/", verifyAdmin, getAllBooking);

export default router;
