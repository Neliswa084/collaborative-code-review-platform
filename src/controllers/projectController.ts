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