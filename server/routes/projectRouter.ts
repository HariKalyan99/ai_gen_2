import express from "express";
import {
  createProject,
  createVideo,
  deleteProject,
  getAllPublishedProjects,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/auth.js";
import upload from "../configs/multer.js";

const projectRouter = express.Router();

projectRouter.post(
  "/create",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "modelImage", maxCount: 1 },
  ]),
  protect,
  createProject,
);
projectRouter.post("/video", protect, createVideo);
projectRouter.get("/published", getAllPublishedProjects);
projectRouter.delete("/:projectId", deleteProject);

export default projectRouter;
