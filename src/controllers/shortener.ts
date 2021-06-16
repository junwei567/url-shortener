import express, { Request, Response } from "express";
import moment from "moment";
import sanitizeHtml from "sanitize-html";

import config from "../config";
import { getHash } from "../utils/shortenerUtils";
import { getLongUrl, getUrl, insertUrlEntry, getHashedUrl } from "./dbUtils";

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

router.get("/get/longurl", async (req: Request, res: Response) => {
  try {
    const url = await getLongUrl(req.body.long);
    res.status(200).json(url);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

router.get("/get/hashurl", async (req: Request, res: Response) => {
  try {
    const url = await getHashedUrl(req.body.short);
    res.status(200).json(url);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

router.get("/get/id/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const urls = await getLongUrl(req.body.short);
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
      const data = await insertUrlEntry(short, long);
      res.status(200).json({
        data
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
      err
    });
  }
})

router.post("/post/shorten", async (req: Request, res: Response) => {
  try {
    const url = sanitizeHtml(req.body.url);
    
    // check if long URL exists in DB
    const checker = await getLongUrl(url);
    if (checker) {
      
      return res.status(200).json({
        "Shortened URL": checker.short,
        "Original URL": url
      });
    }

    const hash = await getHash(url);
    if (hash) {
      let first = 0;
      let last = 8;
      while (last <= hash.length) {
        // check if hashed url exists in DB
        const check = await getHashedUrl(config.domain + hash.substring(first, last));
        if (!check) {
          const newHash = config.domain + hash.substring(first, last);
          await insertUrlEntry(newHash, url);

          return res.status(200).json({
            "Shortened URL": newHash,
            "Original URL": url
          });
        } else {
          // hash exists in DB
          first += 8;
          last += 8;
        }
      }
      throw new Error("Unexpected Error");
    } else {
      // invalid link
      res.status(400).json({
        "Message": "Please use a proper URL"
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      Message: err.message,
      err
    });
  }
})

export default router;