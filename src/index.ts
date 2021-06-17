import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";

import config from "./config";
import controller from "./controllers";
import { shortUrl } from "./utils/shortenerUtils";
import { retrieveUrlFromHash } from "./controllers/dbUtils";

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", controller);

function homePage(req: Request, res: Response) {
  const payload = req.payload;
  res.render("index", payload);
}

function resultPage(req: Request, res: Response) {
  const payload = req.payload;
  res.render("result", payload);
}

app.get("/", homePage);

app.post("/shorten", shortUrl, resultPage)

app.get("/:hash", async (req: Request, res: Response) => {
  try {
    const hash: string = req.params.hash;
    const url = await retrieveUrlFromHash(hash);

    if (url) return res.redirect(301, url);
    else return res.status(404);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

