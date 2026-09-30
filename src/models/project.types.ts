export interface Project {
    id:number,
    name: string,
    description: string, 
    created_at: Date

}

export type NewProject = Omit<Project , 'id' | 'created_at'>





