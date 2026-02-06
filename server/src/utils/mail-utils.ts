import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const { AUTH_MAIL, AUTH_PASS } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: AUTH_MAIL,
    pass: AUTH_PASS,
  },
});

export const verifyUserEmail = async (receiver: string, verifyLink: string) => {
  await transport.sendMail({
    from: `"Food Delivery " ${AUTH_MAIL}`,
    to: receiver,
    subject: "Verify user",
    html: `<div style="width: 300px; height: 250px; border-radius: 8px; background-color: aquamarine;">
    <a href="${verifyLink}" target="_blank" style="font-size: 18px; color:blue">Verify user</a>
</div>`,
    text: "Test",
  });
};
