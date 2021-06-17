import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import config from "./config";
import controller from "./controllers";
import redirect from "./controllers/redirect";

const app = express();
const PORT = config.port;

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

app.use("/re", redirect);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

