import express from "express";
import nodemailer from "nodemailer";
import validator from "validator"; // Importing the validator library

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  // Email format validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Admin's email
      subject: "New Subscription",
      html: `
        <p>You have a new subscriber:</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Subscription successful. Email sent to admin.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
