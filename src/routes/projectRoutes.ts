import {Router} from "express";
import {addProject, getAllProjects} from "../controllers/projectController"
import {protect} from "../middleware/authMiddleware"


const router = Router();

router.use(protect) 

router.post('/projects',addProject)
router.get('/projects',getAllProjects)

export default router;