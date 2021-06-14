import express, { Request, Response } from "express";
import moment from "moment";

import { getLongUrl, getUrl, makeUrl } from "./url";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const urls = await getUrl();
    res.status(200).json({
      urls: urls,
      count: urls.length
    });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

router.get("/get/url", async (req: Request, res: Response) => {
  try {
    const urls = await getLongUrl(req.body.long);
    res.status(200).json(urls);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

router.post("/post/url", async (req: Request, res: Response) => {
  try {
    const short = req.body.short;
    const long = req.body.long;

    const check = await getLongUrl(long);
    if (check) {
      res.status(400).json({
        message: "Long URL already exists"
      });
    } else {
      const data = await makeUrl(short, long);
      res.status(200).json({
        data: data
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
      err
    });
  }
})

export default router;