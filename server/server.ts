import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
import { clerkMiddleware } from "@clerk/express";
// Middleware
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
