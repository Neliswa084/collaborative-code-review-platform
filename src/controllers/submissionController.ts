import { Request , Response } from "express";

import * as projectService from "../services/projectService"
import * as submissionService from "../services/submissionService"


export const addSubmission = async (req: Request , res: Response) => {
    try {
        const newSubmission = await submissionService.createCodeSubmission(req.body , req.user!.id)
        res.status(201).json(newSubmission)
    } catch ( error) {
        console.log( "Application error:" , error)
        res.status(500).json({message : "Error in creating code submission"});
    }
}

export const getSubmissionsByProject = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(String(req.params.id));

        const project = await projectService.findProjectById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const submissions = await submissionService.findSubmissionsByProject(projectId);
        res.status(200).json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving submissions" });
    }
};

export const getSubmissionById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params.id));
        const submission = await submissionService.findSubmissionById(id);

        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving submission" });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params.id));
        const { status } = req.body;

        const allowed = ['pending', 'in_review', 'approved', 'changes_requested'];
        if (!status || !allowed.includes(status)) {
            return res.status(400).json({ message: "Status must be pending, in_review, approved or changes_requested" });
        }

        if (req.user!.role !== 'reviewer') {
            return res.status(403).json({ message: "Only reviewers can update the status" });
        }

        const submission = await submissionService.updateSubmissionStatus(id, status);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating status" });
    }
};

export const deleteSubmissionById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params.id));

        const submission = await submissionService.findSubmissionById(id);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        if (submission.submitter_id !== req.user!.id) {
            return res.status(403).json({ message: "You can only delete your own submissions" });
        }

        await submissionService.deleteSubmission(id);
        res.status(200).json({ message: "Submission deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting submission" });
    }
};