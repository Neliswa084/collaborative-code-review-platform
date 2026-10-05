import { query } from "../config/database";
import { Review } from "../models/reviews.type"

export const createReview = async (
    submissionId: number,
    reviewerId: number,
    decision: 'approved' | 'changes_requested',
    feedback: string | null
): Promise<Review> => {
    const { rows } = await query(
        "INSERT INTO reviews (submission_id, reviewer_id, decision, feedback) VALUES ($1, $2, $3, $4) RETURNING *",
        [submissionId, reviewerId, decision, feedback]
    );

    await query(
        "UPDATE submissions SET status = $1, updated_at = NOW() WHERE id = $2",
        [decision, submissionId]
    );

    return rows[0];
};
export const findReviewsBySubmission = async (submissionId: number) => {
    const { rows } = await query(
        "SELECT * FROM reviews WHERE submission_id = $1 ORDER BY created_at DESC",
        [submissionId]
    );
    return rows;
};