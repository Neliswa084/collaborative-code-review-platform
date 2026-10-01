import {Router} from "express";
import {addProject, addProjectMember, getAllProjects} from "../controllers/projectController"
import {protect} from "../middleware/authMiddleware"


const router = Router();

router.use(protect) 

router.post('/projects',addProject)
router.get('/projects',getAllProjects)
router.post('/projects/:id/members', addProjectMember)

export default router;