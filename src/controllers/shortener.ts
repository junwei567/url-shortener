import express, { Request, Response } from "express";

import { shortUrl } from "../utils/shortenerUtils";
import { getUrl } from "./dbUtils";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const urls = await getUrl();
    res.status(200).json({
      urls,
      count: urls.length
    });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

router.post("/shorten", shortUrl, (req: Request, res: Response) => {
  res.json(req.payload);
})

export default router;