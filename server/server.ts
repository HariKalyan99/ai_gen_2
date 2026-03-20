import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerk.js";
// Middleware
app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks,
);
const port = process.env.PORT || 8081;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
