import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import config from "./config";
import controller from "./controllers";

const app = express();
const PORT = config.port;

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

/**
 * take in a link
 * check if valid link
 * get hashed link
 * take first 8 characters
 * check hash inside mongoDB
 * if not found, insert long url and new short url
 * if found, check whether the long url is equal
 * if equal, use the same short url
 * if not equal, take the next 8 characters (or take 9 characters?) of the prev generated hash
 * check if hash inside mongoDB (perhaps a while loop now?)
 *
 * give user the new short url
 */

/**
 * create simple UI with an input box
 * display old and new urls
 *
 * write tests
 */

