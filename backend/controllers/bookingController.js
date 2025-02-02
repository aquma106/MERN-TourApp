import Booking from "../models/Booking.js";
import nodemailer from "nodemailer";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentIntent = async (req, res) => {
  try {
    const { totalAmount } = req.body;

    const options = {
      amount: Math.round(totalAmount * 100), // Amount in paise (₹1 = 100 paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Optional unique receipt ID
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id, // Send Razorpay Order ID to the frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};




export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const hmac = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (hmac === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Create a new booking and send an email
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    // Save booking to the database
    const savedBooking = await newBooking.save();

    //console.log("Booking saved to database:", savedBooking);

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Send email to the user's email address
      subject: "Booking Confirmation",
      html: `
        <h3>A New Booking is Confirmed</h3>
        <p><strong>Tour Name:</strong> ${req.body.tourName}</p>
        <p><strong>Full Name:</strong> ${req.body.fullName}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Guest Size:</strong> ${req.body.guestSize}</p>
        <p><strong>Booking Date:</strong> ${req.body.bookAt}</p>
        <p><strong>Total Amount:</strong> ₹${req.body.totalAmount}</p>
        <p>Thank you for booking with us!</p>
      `,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      //console.log("Confirmation email sent to:", req.body.userEmail);
    } catch (emailErr) {
      console.error("Email sending error:", emailErr.message);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send email." });
    }

    res.status(200).json({
      success: true,
      message: "Your tour is booked, and a confirmation email has been sent.",
      data: savedBooking,
    });
  } catch (err) {
    console.error("Booking creation error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: book,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

// Get all bookings
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find(); // Removed unnecessary `id` argument

    res.status(200).json({
      success: true,
      message: "Successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
