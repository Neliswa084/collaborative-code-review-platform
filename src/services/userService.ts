import {query} from "../config/database";
import bcrypt from "bcryptjs";
import { User } from "../models/user.types";

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0] || null;
}

export const createUser = async (name: string ,email: string, password: string,role:string): Promise<User> => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const { rows } = await query("INSERT INTO users (name,email, password_hash,role) VALUES ($1, $2, $3, $4) RETURNING *", [name,email, password_hash,role]);
    return rows[0];
}

export const findAllUsers = async (): Promise<User[]> => {
        const { rows } = await query(
        "SELECT * FROM users ORDER BY applied_at DESC"

    );
    return rows
}

export const findUserById = async (id: number): Promise<User | null> => {
        const { rows } = await query("SELECT * FROM users WHERE id = $1", [
        id,

    ]);
    return rows[0] || null;
}


export const deleteUser = async (id: number): Promise<User | null> => {
    const { rows } = await query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return rows[0] || null;
};
