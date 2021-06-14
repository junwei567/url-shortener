import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import config from "./config";
import controller from "./controllers";

const app = express();
const PORT = 3000;

// const mongo = process.env.MONGO_URL;
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    console.log("Connected to mongoDB!");
  })
  .catch((err) => {
    console.error("MongoDB connection error.", err);
  });

app.use(express.json());
app.use(cors());
app.use("/api", controller);

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/health");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});