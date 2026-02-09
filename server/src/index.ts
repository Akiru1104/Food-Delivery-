import cors from "cors";
import { config, configDotenv } from "dotenv";
import express, { Application } from "express";
import connectToMongoDB from "./utils/mongodb";
import { userRouter } from "./routers/index";

configDotenv();

const app: Application = express();

const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(8000, async () => {
  await connectToMongoDB();
  console.log(`http://localhost:${port}`);
});
