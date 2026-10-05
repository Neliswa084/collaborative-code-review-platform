export interface Review {
    id: number;
    submission_id: number;
    reviewer_id: number;
    decision: 'approved' | 'changes_requested';
    feedback: string | null;
    created_at: Date;
}