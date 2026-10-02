import { query } from "../config/database";
import { Submission , NewSubmission} from "../models/submission.types";



    export const createCodeSubmission = async (appData: NewSubmission, userId:number) : Promise<Submission> =>{
        const {project_id , title , code , status} = appData
        const {rows} = await query(
            "INSERT INTO submissions (project_id ,title,code,status,submitter_id ) VALUES ($1 , $2 , $3 , $4 ,$5) RETURNING *",
            [project_id ,title,code,status,userId]
        )
        return rows[0];
    }

export const findSubmissionsByProject = async (projectId: number): Promise<Submission[]> => {
    const { rows } = await query(
        "SELECT * FROM submissions WHERE project_id = $1 ORDER BY created_at DESC",
        [projectId]
    );
    return rows;
};

export const findSubmissionById = async (id: number): Promise<Submission | null> => {
    const { rows } = await query("SELECT * FROM submissions WHERE id = $1", [id]);
    return rows[0] || null;
};

export const updateSubmissionStatus = async (id: number, status: string): Promise<Submission | null> => {
    const { rows } = await query(
        "UPDATE submissions SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
        [status, id]
    );
    return rows[0] || null;
};

export const deleteSubmission = async (id: number): Promise<Submission | null> => {
    const { rows } = await query("DELETE FROM submissions WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
};