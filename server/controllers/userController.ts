import { Request, Response } from "express";
import * as Sentry from "@sentry/node";
import { prisma } from "../configs/prisma.js";

// get user credits
export const getUserCredits = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();

    if (!userId) res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.status(200).json({ credits: user?.credits });
  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({
      message: error.code || error.message || "Internal server error",
    });
  }
};

// get all user projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();

    if (!userId) res.status(401).json({ message: "Unauthorized" });

    const projects = await prisma.project.findMany({
      where: {
        id: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ projects });
  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({
      message: error.code || error.message || "Internal server error",
    });
  }
};

// get porject by id

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const { projectId } = req.params;

    if (!userId) res.status(401).json({ message: "Unauthorized" });
    if (!projectId || Array.isArray(projectId)) {
      throw new Error("Invalid projectId");
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    });

    if (!project) res.status(404).json({ message: "Project not found" });

    res.status(200).json({ project });
  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({
      message: error.code || error.message || "Internal server error",
    });
  }
};

// publish/unpublish

export const toggleProjectPublic = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    const { projectId } = req.params;

    if (!userId) res.status(401).json({ message: "Unauthorized" });
    if (!projectId || Array.isArray(projectId)) {
      throw new Error("Invalid projectId");
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId,
      },
    });

    if (!project?.generatedImage && !project?.generatedVideo)
      res.status(404).json({ message: "image or video not generated" });
    if (!project) res.status(404).json({ message: "Project not found" });

    await prisma.project.update({
      where: { id: projectId },
      data: { isPublished: !project?.isPublished },
    });

    res.status(200).json({ isPublished: !project?.isPublished });
  } catch (error: any) {
    Sentry.captureException(error);
    res.status(500).json({
      message: error.code || error.message || "Internal server error",
    });
  }
};
