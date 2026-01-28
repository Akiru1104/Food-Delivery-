import cors from "cors";
import { config, configDotenv } from "dotenv";
import express, { Application } from "express";
import connectToMongoDB from "./routers/mongodb";
import { signUpUser } from "./controllers/users/sign-up-user.controller";
import { signInUser } from "./controllers/users/sign-in-user.controller";

configDotenv();

const app: Application = express();

const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/sign-up", signUpUser);
app.use("/sign-in", signInUser);

app.listen(8000, async () => {
  await connectToMongoDB();
  console.log(`http://localhost:${port}`);
});