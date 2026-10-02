import { Request, Response } from "express";
import * as commentService from "../services/commentService";
import * as submissionService from "../services/submissionService";

export const addComment = async (req: Request, res: Response) => {
    try {
        const submissionId = parseInt(String(req.params.id));
        const { general_comment, inline_comment, line_number } = req.body;

        if (req.user!.role !== 'reviewer') {
            return res.status(403).json({ message: "Only reviewers can comment" });
        }
        if (!general_comment && !inline_comment) {
            return res.status(400).json({ message: "Provide a general_comment or an inline_comment" });
        }
        if (inline_comment && !line_number) {
            return res.status(400).json({ message: "line_number is required for an inline comment" });
        }

        const submission = await submissionService.findSubmissionById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        const comment = await commentService.createComment(
            submissionId,
            req.user!.id,
            { general_comment, inline_comment, line_number }
        );
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding comment" });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {
        const submissionId = parseInt(String(req.params.id));

        const submission = await submissionService.findSubmissionById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        const comments = await commentService.findCommentsBySubmission(submissionId);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving comments" });
    }
};

export const updateCommentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params.id));
        const { general_comment, inline_comment, line_number } = req.body;

        if (!general_comment && !inline_comment) {
            return res.status(400).json({ message: "Provide a general_comment or an inline_comment" });
        }
        if (inline_comment && !line_number) {
            return res.status(400).json({ message: "line_number is required for an inline comment" });
        }

        const existing = await commentService.findCommentById(id);
        if (!existing) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (existing.author_id !== req.user!.id) {
            return res.status(403).json({ message: "You can only edit your own comments" });
        }

        const updated = await commentService.updateComment(id, { general_comment, inline_comment, line_number });
        res.status(200).json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating comment" });
    }
};

export const deleteCommentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(String(req.params.id));

        const existing = await commentService.findCommentById(id);
        if (!existing) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (existing.author_id !== req.user!.id) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }

        await commentService.deleteComment(id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting comment" });
    }
};