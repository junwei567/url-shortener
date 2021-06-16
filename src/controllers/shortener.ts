import express, { Request, Response } from "express";
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
    const url = await getHashedUrl(req.body.hash);
    res.status(200).json(url);
  } catch (err) {
    console.error(err);
    res.status(500);
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
        const check = await getHashedUrl(hash.substring(first, last));
        if (!check) {
          const newHash = config.domain + "re/" + hash.substring(first, last);
          await insertUrlEntry(hash.substring(first, last), url, newHash);

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
        "Message": "Please use a proper URL that starts with HTTP"
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