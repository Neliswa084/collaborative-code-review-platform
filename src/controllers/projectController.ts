import { Request , Response } from "express";

import * as projectService from "../services/projectService"

export const addProject = async (req: Request, res: Response) => {
    try{
        const newProject = await projectService.createProject(req.body ,req.user!.id)
    res.status(201).json(newProject)
  } catch (error) {
    console.log("Application error:", error)
    res.status(500).json({ message: "Error in creating project" });
  }
}

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.findAllProjects();
    res.status(200).json(projects);
  } catch (error){
   res.status(500).json({ message: "Error retrieving projects" });
  } 
}

export const addProjectMember = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(String(req.params.id));
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const project = await projectService.findProjectById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.owner_id !== req.user!.id) {
            return res.status(403).json({ message: "Only the project owner can add members" });
        }

        const member = await projectService.addMember(projectId, userId);
        res.status(201).json(member);
    } catch (error: any) {
        if (error.code === "23505") {
            return res.status(409).json({ message: "User is already a member" });
        }
        if (error.code === "23503") {
            return res.status(404).json({ message: "User not found" });
        }
        console.error(error);
        res.status(500).json({ message: "Error adding member" });
    }
};

export const removeProjectMember = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(String(req.params.id));
        const userId = parseInt(String(req.params.userId));

        const project = await projectService.findProjectById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.owner_id !== req.user!.id) {
            return res.status(403).json({ message: "Only the project owner can remove members" });
        }

        const removed = await projectService.removeMember(projectId, userId);
        if (!removed) {
            return res.status(404).json({ message: "User is not a member of this project" });
        }
        res.status(200).json({ message: "Member removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing member" });
    }
};