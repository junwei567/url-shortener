import express, { Request, Response } from "express";
import moment from "moment";
const router = express.Router();

// shortening logic here

router.get("/", async (req: Request, res: Response) => {
  try {

    res.status(200).json();
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

export default router;