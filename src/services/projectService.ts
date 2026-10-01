import { query } from "../config/database";
import { Project ,NewProject} from "../models/project.types";

export const createProject = async (appData: NewProject, userId:number): Promise<Project> =>{
    const{name,description} = appData
    const {rows} = await query(
        "INSERT INTO projects (name,description, owner_id) VALUES ($1 , $2, $3) RETURNING *",
        [name,description,userId]
    )
    return rows[0];
}

export const findAllProjects = async (): Promise<Project[]> => {
    const {rows} = await query(
        "SELECT * FROM projects ORDER BY id"
    );
    return rows
}

export const findProjectById = async (id: number): Promise<Project | null> => {
    const { rows } = await query("SELECT * FROM projects WHERE id = $1", [id]);
    return rows[0] || null;
};

export const addMember = async (projectId: number, userId: number) => {
    const { rows } = await query(
        "INSERT INTO project_members (project_id, user_id) VALUES ($1, $2) RETURNING *",
        [projectId, userId]
    );
    return rows[0];
};

export const removeMember = async (projectId: number, userId: number) => {
    const { rows } = await query(
        "DELETE FROM project_members WHERE project_id = $1 AND user_id = $2 RETURNING *",
        [projectId, userId]
    );
    return rows[0] || null;
};




