import {Router} from "express";
import {addProject} from "../controllers/projectController"
import {protect} from "../middleware/authMiddleware"


const router = Router();

router.use(protect) 

router.post('/projects',addProject)

export default router;