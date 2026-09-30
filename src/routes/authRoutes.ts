import {Router} from "express";
import { 
    registerUser, loginUser , getAllUsers,
    getUserById,deleteUserById
} from "../controllers/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users" ,getAllUsers )
router.get('/users/:id' ,getUserById )
router.delete('/users/:id' ,deleteUserById )



export default router; 