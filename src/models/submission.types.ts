export interface Submission {
    id: number ;
    project_id: number;
    submitter_id: number;
    title: string;
    code: string;
    status: 'pending' | 'in_review' | 'approved' | 'changes_requested';
    created_at: Date;
    updated_at: Date;

}
export type NewSubmission = Pick<Submission, 'project_id' | 'title' | 'code'>;