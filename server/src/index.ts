import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application } from "express";
import { categoryRouter, foodRouter, userRouter } from "./routers/index";
import { orderRouter } from "./routers/order.routers";
import connectToMongoDB from "./utils/mongodb";

configDotenv();

const app: Application = express();

const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

app.listen(8000, async () => {
  await connectToMongoDB();
  console.log(`http://localhost:${port}`);
});
