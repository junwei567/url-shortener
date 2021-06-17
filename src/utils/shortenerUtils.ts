import { createHash } from "crypto";
import validURL from "valid-url";
import sanitizeHtml from "sanitize-html";
import { Request, Response, NextFunction } from "express";
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';

import config from "../config";
import { getLongUrl, insertUrlEntry, getHashedUrl } from "../controllers/dbUtils";

function checkHttp(
  url: string
):boolean {
  if (!validURL.isHttpUri(url) && !validURL.isHttpsUri(url)) {
    return false;
  } else {
    return true;
  }
}

async function getHash(
  input: string,
): Promise<string> {
  const hash = createHash("sha512");
  hash.update(input);
  const result = hash.digest("hex");
  return result;
}

const customConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: "-",
  length: 2,
};

export function getReadableName():string {
  return uniqueNamesGenerator(customConfig);
}

export async function shortUrl(req: Request, res: Response, next: NextFunction) {
  try {
    const url = sanitizeHtml(req.body.url);

    if (checkHttp(url) === true) {

      if (req.body.readableUrl) {
        const checkerReadableUrl = await getLongUrl(url, true);
        if (checkerReadableUrl) {
          req.payload = {
            shortenedUrl: checkerReadableUrl.short,
            originalUrl: url
          }
          return next();
        }

        let loop = true;
        while (loop) {
          const randomName = getReadableName();
          const checkRandomName = await getHashedUrl(randomName);
          if (!checkRandomName) {
            loop = false;
            const newUrl = config.domain + randomName;
            await insertUrlEntry(randomName, url, newUrl, true);

            req.payload = {
              shortenedUrl: newUrl,
              originalUrl: url
            }
            return next();
          }
        }
      }

      // check if long URL exists in DB
      const checker = await getLongUrl(url, false);
      if (checker) {
        req.payload = {
          shortenedUrl: checker.short,
          originalUrl: url
        }
        return next();
      }
      const hash = await getHash(url);
      let first = 0;
      let last = 8;
      while (last <= hash.length) {
        // check if hashed url exists in DB
        const check = await getHashedUrl(hash.substring(first, last));
        if (!check) {
          const newHash = config.domain + hash.substring(first, last);
          await insertUrlEntry(hash.substring(first, last), url, newHash, false);

          req.payload = {
            shortenedUrl: newHash,
            originalUrl: url
          }
          return next();
        } else {
          // hash exists in DB, 2 different links have the same hash, what are the chances?
          first += 8;
          last += 8;
        }
      }
      // taking my chances here
      throw new Error("Unexpected Error");
    } else {
      res.status(400).json({
        "Message": "Please use a proper URL that starts with HTTP"
      });
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
}