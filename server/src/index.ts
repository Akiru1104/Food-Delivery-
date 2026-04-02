import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application } from "express";
import { categoryRouter, foodRouter, userRouter } from "./routers";
import { orderRouter } from "./routers/order.routers";
import connectToMongoDB from "./utils/mongodb";

configDotenv();

const app: Application = express();

const port = 8000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

app.listen(8000, async () => {
  await connectToMongoDB();
  console.log(`http://localhost:${port}`);
});
