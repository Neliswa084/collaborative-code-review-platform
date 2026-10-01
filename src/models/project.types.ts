export interface Project {
    id:number,
    name: string,
    description: string, 
    owner_id: number,
    created_at: Date

}

export type NewProject = Omit<Project , 'id' | 'created_at'>





