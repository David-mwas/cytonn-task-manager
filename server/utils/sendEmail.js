import nodemailer from "nodemailer";
import { convert } from "html-to-text";

/**
 * Sends an email using Gmail SMTP.
 * @param {Object} param0
 * @param {string} param0.to - Recipient email
 * @param {string} param0.subject - Subject line
 * @param {string} param0.html - HTML content
 */
const sendEmail = async ({ to, subject, html }) => {
  if (!to || !subject || !html) {
    throw new Error("Missing required email parameters");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const text = convert(html, { wordwrap: 130 });

  const mailOptions = {
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    console.log("Sending email from:", process.env.EMAIL_USER);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (err) {
    console.error("Email error:", err);
    throw err;
  }
};

export default sendEmail;
