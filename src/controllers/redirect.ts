import express, { Request, Response } from "express";

const router = express.Router();

import { retrieveUrlFromHash } from "./dbUtils";

router.get("/:hash", async (req: Request, res: Response) => {
  try {
    const hash: string = req.params.hash;

    const url = await retrieveUrlFromHash(hash);
    if (url) {
      return res.redirect(301, url);
    } else {
      return res.status(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

export default router;