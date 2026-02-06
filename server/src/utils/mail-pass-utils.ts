// import nodemailer from "nodemailer";

// import { configDotenv } from "dotenv";

// configDotenv();

// const { AUTH_EMAIL, AUTH_PASS } = process.env;

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: AUTH_EMAIL,
//     pass: AUTH_PASS,
//   },
// });

// export const sendResetPasswordRequest = async (
//   receiver: string,
//   verifyLink: string,
// ) => {
//   await transport.sendMail({
//     from: `"Food Delivery " ${AUTH_EMAIL}`,
//     to: receiver,
//     subject: "Reset Password",
//     html: `<div
//   style="
//     width: 300px;
//     height: 250px;
//     border-radius: 8px;
//     background-color: aquamarine;
//   "
// >
//   <a href="" style="font-size: 18px; color: blue">Reset password</a>
// </div>`,
//     text: "Test",
//   });
// };
