import { Request, Response } from "express";
import * as userService from "../services/userService"
import brcypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req: Request, res: Response) => {
    const {name, email, password,role} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await userService.createUser(name,email, password,role);
        res.status(201).json({ message: "User registered successfully", userId : newUser.id });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await brcypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const payload = { userId: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
        res.status(200).json({message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
    };