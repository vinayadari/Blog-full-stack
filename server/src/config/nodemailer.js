import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_TRAP_SMTP_HOST,
  port: process.env.MAIL_TRAP_SMTP_PORT,
  auth: {
    user: process.env.MAIL_TRAP_SMTP_USER,
    pass: process.env.MAIL_TRAP_SMTP_PASS,
  },
});

export default transporter;
