import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";
import * as submissionService from "../services/submissionService";

const submitReview = async (
    req: Request,
    res: Response,
    decision: 'approved' | 'changes_requested'
) => {
    try {
        const submissionId = parseInt(String(req.params.id));
        const feedback = req.body?.feedback || null;

        if (req.user!.role !== 'reviewer') {
            return res.status(403).json({ message: "Only reviewers can review submissions" });
        }

        const submission = await submissionService.findSubmissionById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }
        if (submission.submitter_id === req.user!.id) {
            return res.status(403).json({ message: "You cannot review your own submission" });
        }

        const review = await reviewService.createReview(submissionId, req.user!.id, decision, feedback);
        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error submitting review" });
    }
};

export const approveSubmission = (req: Request, res: Response) =>
    submitReview(req, res, 'approved');

export const requestChanges = (req: Request, res: Response) =>
    submitReview(req, res, 'changes_requested');

export const getReviewHistory = async (req: Request, res: Response) => {
    try {
        const submissionId = parseInt(String(req.params.id));

        const submission = await submissionService.findSubmissionById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        const reviews = await reviewService.findReviewsBySubmission(submissionId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving review history" });
    }
};