import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routers/tours.js";
import userRoute from "./routers/user.js";
import authRoute from "./routers/auth.js";
import reviewRoute from "./routers/reviews.js";
import bookingRoute from "./routers/bookings.js";
import newsletterRoute from "./routers/newsletter.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json())
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/newsletter", newsletterRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
    app.listen(process.env.PORT, () => {
      console.log("server is running on port:" + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("database connection error");
  });
