import { query } from "../config/database";
import { Comment, NewComment } from "../models/comment.types";

export const createComment = async (submissionId: number,authorId: number, appData: NewComment
): Promise<Comment> => {
    const { general_comment, inline_comment, line_number } = appData;
    const { rows } = await query(
        `INSERT INTO comments (submission_id, author_id, general_comment, inline_comment, line_number)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [submissionId, authorId, general_comment || null, inline_comment || null, line_number || null]
    );
    return rows[0];
};

export const findCommentsBySubmission = async (submissionId: number): Promise<Comment[]> => {
    const { rows } = await query(
        "SELECT * FROM comments WHERE submission_id = $1 ORDER BY created_at ASC",
        [submissionId]
    );
    return rows;
};

export const findCommentById = async (id: number): Promise<Comment | null> => {
    const { rows } = await query("SELECT * FROM comments WHERE id = $1", [id]);
    return rows[0] || null;
};

export const updateComment = async (id: number, data: NewComment): Promise<Comment | null> => {
    const { general_comment, inline_comment, line_number } = data;
    const { rows } = await query(
        `UPDATE comments
         SET general_comment = $1, inline_comment = $2, line_number = $3, updated_at = NOW()
         WHERE id = $4 RETURNING *`,
        [general_comment || null, inline_comment || null, line_number || null, id]
    );
    return rows[0] || null;
};

export const deleteComment = async (id: number): Promise<Comment | null> => {
    const { rows } = await query("DELETE FROM comments WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
};