export interface Comment {
    id: number;
    submission_id: number;
    author_id: number;
    general_comment: string | null;
    inline_comment: string | null;
    line_number: number | null;
    created_at: Date;
    updated_at: Date;
}

export type NewComment = Pick<Comment, 'general_comment' | 'inline_comment' | 'line_number'>;