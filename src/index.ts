import express, { Request, Response } from "express";
import cors from "cors";

import controller from "./controllers";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/api", controller);

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/health");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});