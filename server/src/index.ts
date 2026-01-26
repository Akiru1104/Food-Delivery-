import cors from "cors";
import { config, configDotenv } from "dotenv";
import express, { Application } from "express";

configDotenv();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.listen(8000, () => console.log("http://localhost:8000"));
