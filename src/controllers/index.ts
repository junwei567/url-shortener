import express from "express";

import health from "./health";
import shortener from "./shortener";

const router = express.Router();

router.use("/health", health);
router.use("/shortener", shortener);

export default router;