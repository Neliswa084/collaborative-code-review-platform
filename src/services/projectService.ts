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






