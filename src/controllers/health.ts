import express, { Request, Response } from "express";
import moment from "moment";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = {
      status: "success",
      time: moment().format("YYYYMMDD HH:mm:ss"),
      uptime: process.uptime(),
    }
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

export default router;